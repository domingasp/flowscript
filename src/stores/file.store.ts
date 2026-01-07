import { basename } from "@tauri-apps/api/path";
import { platform } from "@tauri-apps/plugin-os";
import { defineStore } from "pinia";

type FileState = {
  currentFile?: {
    name: string;
    path: string;
  };
};

const currentPlatform = platform();

export const useFileStore = defineStore("file", {
  actions: {
    async setCurrentFile(path: string | undefined) {
      if (!path) {
        this.currentFile = undefined;
        return;
      }

      const name = await basename(path);
      this.currentFile = {
        name: currentPlatform === "ios" ? decodeURIComponent(name) : name,
        path,
      };
    },
  },
  state: (): FileState => ({
    currentFile: undefined,
  }),
});
