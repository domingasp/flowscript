<script setup lang="ts">
import { tv, VariantProps } from 'tailwind-variants';
import { useSlots } from 'vue';

const buttonVariants = tv({
	base: `
   flex shrink-0 items-center justify-center gap-sm rounded-xl border-1
   border-transparent font-medium transition-all select-none
 `,
	variants: {
		size: {
			default: "px-md py-sm",
			icon: "h-[2.625rem] w-[2.625rem] p-0"
		},
		variant: {
			default: `
     border-fill-brand bg-fill-brand text-fill-on-brand
     hover:border-fill-brand-hover hover:bg-fill-brand-hover
     active:border-fill-brand-active active:bg-fill-brand-active
   `,
			ghost: `
     border-transparent bg-transparent text-fill-brand
     hover:text-fill-brand-hover
     active:text-fill-brand-active
   `
		}
	}
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

withDefaults(
	defineProps<{
		variant?: ButtonVariants['variant'];
	}>(),
	{
		variant: 'default'
	})

const slots = useSlots();
</script>

<template>
	<button v-bind="$attrs"
		:class="buttonVariants({ variant, size: !!slots.icon && !slots.default ? 'icon' : 'default' })">
		<slot name="icon" />
		<slot />
	</button>
</template>