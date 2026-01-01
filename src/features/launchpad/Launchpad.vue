<script setup lang="ts">
import { FilePlusCorner, FolderOpen } from 'lucide-vue-next';

import Button from '../../components/Button.vue';

</script>

<template>
	<div>
		<div class="container">
			<img src="@/assets/flowscript.svg" class="logo" />
			<p class="subtitle">Keep your words flowing smoothly</p>

			<div class="actions">
				<Button>
					<FilePlusCorner />New Script
				</Button>
				<Button variant="ghost">
					<FolderOpen />Open
				</Button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.container {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: $spacing-lg;
	align-items: center;
	justify-content: center;
	padding: $font-size-md;
	padding-top: 14rem;
}

.subtitle {
	margin: 0;
	color: var(--color-foreground-secondary);
}

.actions {
	display: flex;
	gap: $spacing-lg;
}

.logo {
	position: absolute;
	top: 0;
	height: 16rem;
	opacity: 0.3;
	filter: grayscale(1) invert(1);
	transform: rotate(-5deg);
}

.dark .logo {
	filter: grayscale(1);
}
</style>