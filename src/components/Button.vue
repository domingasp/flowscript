<script setup lang="ts">
// import { useSlots } from "vue";

// const button = cva("button", {
// 	variants: {
// 		icon: {
// 			true: "icon",
// 		},
// 		variant: {
// 			default: "default",
// 		},
// 	},
// });

// type ButtonProps = VariantProps<typeof button>;

// withDefaults(
// 	defineProps<{
// 		variant?: ButtonProps["variant"];
// 	}>(),
// 	{
// 		variant: "default",
// 	}
// );

// const slots = useSlots();
// 		:class="button({ variant, icon: !!slots.icon && !slots.default })"

</script>

<template>
	<button v-bind="$attrs" class="button">
		<slot name="icon" />
		<slot />
	</button>
</template>

<style lang="scss" scoped>
.button {
	// @include user-select(none);
	// display: flex;
	// flex-shrink: 0;
	// gap: $spacing-sm;
	// align-items: center;
	// justify-content: center;
	// padding-block: $spacing-md;
	// padding-inline: $spacing-lg;
	// font-size: $font-size-md;
	// font-weight: $font-weight-medium;
	// border: solid 1px;
	// border-radius: $radius-xl;
	// transition: background-color $transition-duration-sm,
	// 	border-color $transition-duration-sm, outline $transition-duration-sm;
}

.icon {
	--button-height: 2.785rem;
	width: var(--button-height);
	height: var(--button-height);
	padding: 0;
}

.default {
	color: var(--color-fill-on-brand);
	background-color: var(--color-fill-brand);
	border-color: var(--color-fill-brand);

	&:hover {
		background-color: var(--color-fill-brand-hover);
		border-color: var(--color-fill-brand-hover);
	}

	&:active {
		background-color: var(--color-fill-brand-active);
		border-color: var(--color-fill-brand-active);
	}
}
</style>
