<script setup lang="ts">
import { cva, VariantProps } from "class-variance-authority";

const button = cva("button", {
  variants: {
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
</script>

<template>
  <button v-bind="$attrs" :class="button({ variant })">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  padding-inline: $spacing-md;
  padding-block: $spacing-sm;
  border-radius: $radius-lg;
  font-size: $font-size-md;
  font-weight: $font-weight-medium;
  border: solid 1px;

  transition: background-color $transition-duration-sm,
    border-color $transition-duration-sm, outline $transition-duration-sm;
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
