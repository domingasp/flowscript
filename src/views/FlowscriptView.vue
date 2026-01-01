<script setup lang="ts">
import Launchpad from "../features/launchpad/Launchpad.vue";
</script>

<template>
	<div class="container">
		<Launchpad />
	</div>
</template>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100dvh;
}
</style>