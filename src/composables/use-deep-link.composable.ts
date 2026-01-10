import { basename } from "@tauri-apps/api/path";
import { getCurrent, onOpenUrl } from "@tauri-apps/plugin-deep-link";
import { platform } from "@tauri-apps/plugin-os";
import mime from "mime";
import { onMounted } from "vue";

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

    return filePaths.filter((url) => mime.getType(url) === "text/markdown");
  }

  async function handleUrls(urls: string[]) {
    const markdownFiles = await filterMarkdownFiles(urls);
    if (markdownFiles.length > 0) {
      fileStore.setCurrentFile(markdownFiles[0]);
    }
  }

  onMounted(async () => {
    const startUrls = await getCurrent();
    if (startUrls && startUrls.length > 0) {
      handleUrls(startUrls);
    }

    onOpenUrl(handleUrls);
  });
}
