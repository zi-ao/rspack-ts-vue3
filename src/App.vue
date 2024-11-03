<template>
  <n-config-provider
    abstract
    inline-theme-disabled
    :date-locale="dateZhCN"
    :locale="zhCN"
  >
    <n-global-style />
    <component :is="DefaultLayout">
      <router-view />
    </component>
  </n-config-provider>
</template>

<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui';
import DefaultLayout from './layouts/DefaultLayout.vue';
</script>
