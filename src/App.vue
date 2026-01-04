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
	<main class="container">
		<div data-tauri-drag-region />
		<RouterView />
	</main>
</template>

<style lang="scss" scoped>
[data-tauri-drag-region] {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	height: 2rem;
}
</style>