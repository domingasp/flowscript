<script setup lang="ts">
import { cva, VariantProps } from "class-variance-authority";

const button = cva("button", {
  variants: {
    variant: {
      primary: "primary",
      secondary: "secondary",
    },
  },
});

type ButtonProps = VariantProps<typeof button>;

withDefaults(
  defineProps<{
    variant?: ButtonProps["variant"];
  }>(),
  {
    variant: "primary",
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
  padding: $padding-lg;
}

.primary {
  background-color: red;
}

.secondary {
  background-color: blue;
}
</style>
