import { basename } from "@tauri-apps/api/path";
import { defineStore } from "pinia";

type FileState = {
  currentFile?: {
    name: string;
    path: string;
  };
};

const isURL = (str: string) => {
  try {
    new URL(str);
    return true;
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
        name: isURL(path) ? decodeURIComponent(name) : name,
        path,
      };
    },
  },
  state: (): FileState => ({
    currentFile: undefined,
  }),
});
