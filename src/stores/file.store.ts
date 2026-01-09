import { basename } from "@tauri-apps/api/path";
import { defineStore } from "pinia";

type FileState = {
  currentFile?: {
    name: string;
    path: string;
  };
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
        // deep link URLs are encoded
        name: decodeURIComponent(name),
        path,
      };
    },
  },
  state: (): FileState => ({
    currentFile: undefined,
  }),
});
