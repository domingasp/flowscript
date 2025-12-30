import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function run(cmd: string) {
  execSync(cmd, { stdio: "inherit" });
}

const root = process.cwd();
const iconsDir = path.join(root, "src-tauri", "icons");
const macosDir = path.join(iconsDir, "macos");

console.log("Generating base icons");
run("tauri icon ./src-tauri/icons/flowscript-with-bg.png -o ./src-tauri/icons");

console.log("Generating macOS icons");
run(
  "tauri icon ./src-tauri/icons/macos/flowscript-macos.png -o ./src-tauri/icons/macos"
);

const rootIcns = path.join(iconsDir, "icon.icns");
if (fs.existsSync(rootIcns)) {
  fs.unlinkSync(rootIcns);
}

console.log("Cleaning up unnecessary macOS icon files");
const allowed = new Set(["flowscript-macos.png", "icon.icns"]);
for (const file of fs.readdirSync(macosDir)) {
  if (!allowed.has(file)) {
    const fullPath = path.join(macosDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      fs.rmSync(fullPath, { force: true, recursive: true });
    } else {
      fs.unlinkSync(fullPath);
    }
  }
}

console.log("Icon generation complete");
