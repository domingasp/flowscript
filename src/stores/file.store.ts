import { sep } from "@tauri-apps/api/path";
import { defineStore } from "pinia";

type FileState = {
  currentFile?: {
    name: string;
    path: string;
  };
};

export const useFileStore = defineStore("file", {
  actions: {
    setCurrentFile(path: string | undefined) {
      if (!path) {
        this.currentFile = undefined;
        return;
      }

      const lastSepIndex = path.lastIndexOf(sep());
      const name = lastSepIndex !== -1 ? path.slice(lastSepIndex + 1) : path;

      this.currentFile = { name, path };
    },
  },
  state: (): FileState => ({
    currentFile: undefined,
  }),
});
