<script setup lang="ts">
import { Save } from "lucide-vue-next";

import Button from "../../components/Button.vue";
</script>

<template>
	<div class="wrapper">
		<Button @click="console.log('Clicked')">Click Me</Button>
		<Button>
			<template v-slot:icon>
				<Save />
			</template>
			Save
		</Button>
		<Button>
			<template v-slot:icon>
				<Save />
			</template>
		</Button>
	</div>
</template>

<style lang="scss" scoped>
.wrapper {
	display: flex;
	flex-direction: row;
	// gap: $spacing-md;
}
</style>
