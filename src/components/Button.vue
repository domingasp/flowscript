<script setup lang="ts">
import { ButtonHTMLAttributes } from "vue";

type Props = /* @vue-ignore */ ButtonHTMLAttributes;

defineProps<Props>();
</script>

<template>
  <button v-bind="$attrs"><slot /></button>
</template>
