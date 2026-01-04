<script setup lang="ts">
import { usePreferredColorScheme } from "@vueuse/core";
import { watch } from "vue";

import "./styles/globals.css";

const colorScheme = usePreferredColorScheme();
watch(colorScheme, (scheme) => {
	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(scheme);
});
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