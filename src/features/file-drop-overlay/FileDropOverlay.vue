<script setup lang="ts">
import { getCurrentWindow } from "@tauri-apps/api/window";
import mime from "mime";
import { onMounted, onUnmounted, ref } from "vue";

import { useFileStore } from "../../stores/file.store";

const fileStore = useFileStore();
const isFileDragOver = ref(false);
let unlisten: (() => void) | undefined;

onMounted(async () => {
  unlisten = await getCurrentWindow().onDragDropEvent((event) => {
    isFileDragOver.value = event.payload.type === "over";

    if (event.payload.type === "drop" && event.payload.paths.length > 0) {
      const markdownFiles = event.payload.paths.filter(
        (path) => mime.getType(path) === "text/markdown",
      );

      if (markdownFiles.length === 0) return;
      fileStore.setCurrentFile(markdownFiles[0]);
    }
  });
});

onUnmounted(() => {
  unlisten?.();
});
</script>

<template>
  <Transition
    enter-from-class="opacity-0"
    enter-active-class="transition duration-md"
    leave-to-class="opacity-0"
    leave-active-class="transition duration-md"
  >
    <div
      v-if="isFileDragOver"
      class="fixed inset-0 z-50 bg-foreground/3 backdrop-blur-xs"
    />
  </Transition>
</template>
