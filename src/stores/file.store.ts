import { basename } from "@tauri-apps/api/path";
import { platform } from "@tauri-apps/plugin-os";
import { defineStore } from "pinia";

const currentPlatform = platform();

type FileState = {
  currentFile?: {
    name: string;
    path: string;
  };
};

const isURL = (str: string) => {
  try {
    const url = new URL(str);
    return url.protocol === "file:" || url.protocol === "content:";
  } catch {
    return false;
  }
};

export const useFileStore = defineStore("file", {
  actions: {
    async setCurrentFile(path: string | undefined) {
      if (!path) {
        this.currentFile = undefined;
        return;
      }

      const name = await basename(path);
      this.currentFile = {
        name:
          // Android paths use Content URIs ending in numbers
          isURL(path) && currentPlatform !== "android"
            ? decodeURIComponent(name)
            : name,
        path,
      };
    },
  },
  state: (): FileState => ({
    currentFile: undefined,
  }),
});
