<template>
  <n-config-provider
    abstract
    inline-theme-disabled
    :theme="isDark ? darkTheme : null"
    :date-locale="dateZhCN"
    :locale="zhCN"
  >
    <n-global-style />
    <c-layout :name="layoutName">
      <router-view />
    </c-layout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui';

const route = useRoute();
const isDark = useDark();
const toggleDark = useToggle(isDark);

const layoutName = ref('');

watch(
  () => route.path,
  () => {
    const currentLayoutName = route.meta.layout;
    if (!isNil(currentLayoutName) && currentLayoutName !== layoutName.value) {
      layoutName.value = currentLayoutName;
    }
  },
  { immediate: true },
);
provide('APP_DARK_THEME', { isDark, toggleDark });
</script>
