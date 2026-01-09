import { getCurrent, onOpenUrl } from "@tauri-apps/plugin-deep-link";
import mime from "mime";
import { onMounted } from "vue";

import { useFileStore } from "../stores/file.store";
export function useDeepLink() {
  const fileStore = useFileStore();

  function filterMarkdownFiles(urls: string[]) {
    return urls.filter((url) => mime.getType(url) === "text/markdown");
  }

  function handleUrls(urls: string[]) {
    const markdownFiles = filterMarkdownFiles(urls);
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
