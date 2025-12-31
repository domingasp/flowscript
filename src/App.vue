<script setup lang="ts">
import { usePreferredColorScheme } from "@vueuse/core";
import { watch } from "vue";

const colorScheme = usePreferredColorScheme();
watch(colorScheme, (scheme) => {
	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(scheme);
});
</script>

<template>
	<main class="container">
		<RouterView />
	</main>
</template>
