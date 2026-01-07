<script setup lang="ts">
import { usePreferredColorScheme } from "@vueuse/core";
import { watch } from "vue";

const colorScheme = usePreferredColorScheme();

// FOUC only happens in dev, not in production builds
watch(colorScheme, (scheme) => {
	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(scheme);
}, { immediate: true });
</script>

<template>
	<main>
		<div data-tauri-drag-region class="absolute top-0 left-0 z-10 h-7 w-full" />
		<RouterView />
	</main>
</template>