import { basename } from "@tauri-apps/api/path";
import { getCurrent, onOpenUrl } from "@tauri-apps/plugin-deep-link";
import { platform } from "@tauri-apps/plugin-os";
import mime from "mime";
import { onMounted, onUnmounted } from "vue";

import { useFileStore } from "../stores/file.store";

const currentPlatform = platform();
export function useDeepLink() {
  const fileStore = useFileStore();

  async function filterMarkdownFiles(urls: string[]) {
    let filePaths = urls;
    if (currentPlatform === "android") {
      filePaths = await Promise.all(
        urls.map(async (url) => await basename(url)),
      );
    }

    const markdownIndices = filePaths
      .map((path, i) => ({ i, path }))
      .filter(({ path }) => mime.getType(path) === "text/markdown")
      .map(({ i }) => i);

    return markdownIndices.map((i) => urls[i]);
  }

  async function handleUrls(urls: string[]) {
    const markdownFiles = await filterMarkdownFiles(urls);
    if (markdownFiles.length > 0) {
      fileStore.setCurrentFile(markdownFiles[0]);
    }
  }

  let unlisten: () => void;
  onMounted(async () => {
    const startUrls = await getCurrent();
    if (startUrls && startUrls.length > 0) {
      handleUrls(startUrls);
    }

    onOpenUrl(handleUrls).then((fn) => {
      unlisten = fn;
    });
  });

  onUnmounted(() => {
    unlisten?.();
  });
}
