<script setup lang="ts">
import { cva, VariantProps } from "class-variance-authority";
import { useSlots } from "vue";

const button = cva("button", {
	variants: {
		icon: {
			true: "icon",
		},
		variant: {
			default: "default",
		},
	},
});

type ButtonProps = VariantProps<typeof button>;

withDefaults(
	defineProps<{
		variant?: ButtonProps["variant"];
	}>(),
	{
		variant: "default",
	}
);

const slots = useSlots();
</script>

<template>
	<button v-bind="$attrs"
		:class="button({ variant, icon: !!slots.icon && !slots.default })"
		class="button">
		<slot name="icon" />
		<slot />
	</button>
</template>

<style lang="scss" scoped>
.button {
	@include user-select(none);
	flex-shrink: 0;

	padding-inline: $spacing-lg;
	padding-block: $spacing-md;
	border-radius: $radius-xl;
	font-size: $font-size-md;
	font-weight: $font-weight-medium;
	border: solid 1px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: $spacing-sm;
	font-size: 1rem;

	transition: background-color $transition-duration-sm,
		border-color $transition-duration-sm, outline $transition-duration-sm;
}

.icon {
	--button-height: 2.785rem;
	width: var(--button-height);
	height: var(--button-height);
	padding: 0;
}

.default {
	background-color: var(--color-fill-brand);
	color: var(--color-fill-on-brand);
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
