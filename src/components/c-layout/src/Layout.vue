<template>
  <component :is="component">
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { LayoutProps } from './interface';
import layoutComponents from './layouts';

const { name } = defineProps<LayoutProps>();

const component = computed(
  () => layoutComponents[name] || layoutComponents['default-layout'],
);
</script>
