<script setup lang="ts">
import { usePreferredColorScheme } from "@vueuse/core";
import { watch } from "vue";

const colorScheme = usePreferredColorScheme();
watch(colorScheme, (scheme) => {
  document.documentElement.setAttribute("data-theme", scheme);
});
</script>

<template>
  <main class="container">
    <RouterView />
  </main>
</template>
