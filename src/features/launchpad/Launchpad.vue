<script setup lang="ts">
import { open, save } from "@tauri-apps/plugin-dialog";
import { create } from "@tauri-apps/plugin-fs";
import { platform } from "@tauri-apps/plugin-os";
import { FilePlusCorner, FolderOpen } from "lucide-vue-next";
import mime from "mime";
import { AndroidFs } from "tauri-plugin-android-fs-api";

import Button from "../../components/Button.vue";
import { useFileStore } from "../../stores/file.store";

const DEFAULT_FILE_NAME = "Untitled Script";
const SUPPORTED_FILE_FILTERS = [
  { extensions: ["md", "markdown"], name: "Markdown content" },
];

const currentPlatform = platform();

const fileStore = useFileStore();

const onOpen = () => {
  open({
    directory: false,
    // Known bug: iOS file dialog does not support filters
    // https://github.com/tauri-apps/plugins-workspace/issues/3030
    filters: currentPlatform === "ios" ? undefined : SUPPORTED_FILE_FILTERS,
    multiple: false,
  })
    .then((path) => {
      if (!path) return;
      if (currentPlatform === "ios" && mime.getType(path) !== "text/markdown")
        return;
      return fileStore.setCurrentFile(path);
    })
    .catch((e) => console.error("Error opening file:", e));
};

const onNewAndroid = () =>
  AndroidFs.showSaveFilePicker(DEFAULT_FILE_NAME, "text/markdown")
    .then((uri) => {
      if (!uri) return;
      return fileStore.setCurrentFile(uri.uri);
    })
    .catch((e) => console.error("Error creating new file:", e));

const onNewDefault = () =>
  save({
    defaultPath: `${DEFAULT_FILE_NAME}.md`,
    filters: SUPPORTED_FILE_FILTERS,
  })
    .then(async (path) => {
      if (!path) return;
      // Native file dialog handles check to overwrite existing files
      try {
        (await create(path)).close();
      } catch (e) {
        console.error("Error creating new file:", e);
        return;
      }

      return fileStore.setCurrentFile(path);
    })
    .catch((e) => console.error("Error creating new file:", e));

const onNew = currentPlatform === "android" ? onNewAndroid : onNewDefault;
</script>

<template>
  <div
    class="relative flex flex-col items-center justify-center gap-md p-md pt-53"
  >
    <!-- 
			Workaround for prettier + better tailwindcss conflict
			https://github.com/schoero/eslint-plugin-better-tailwindcss/issues/243
		-->
    <img
      :class="`
        absolute top-0 h-64 -rotate-5 opacity-30 grayscale select-none
        not-dark:invert
      `"
      src="@/assets/flowscript.svg"
    />

    <p class="text-foreground-secondary">Keep your words flowing smoothly</p>

    <div class="flex gap-lg">
      <Button @click="onNew"> <FilePlusCorner />New Script </Button>
      <Button variant="ghost" @click="onOpen"> <FolderOpen />Open </Button>
    </div>
  </div>
</template>
