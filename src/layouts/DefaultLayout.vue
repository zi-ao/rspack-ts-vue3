<template>
  <div
    class="ld__wrapper"
    :style="`--border-color: ${themeVars.borderColor}`"
  >
    <header class="ld__header">
      <nav class="ld__container">
        <router-link to="/" class="ld__logo">
          LOGO
        </router-link>
      </nav>
    </header>
    <div class="ld__content">
      <div class="ld__container">
        <slot />
      </div>
    </div>
    <footer class="ld__footer">
      <n-flex justify="space-between" class="ld__container">
        <div class="flex-auto">
          123131
        </div>
        <n-switch
          :value="isDark"
          @update-value="toggleDark"
        >
          <template #checked-icon>
            <n-icon>
              <moon-outline />
            </n-icon>
          </template>

          <template #unchecked-icon>
            <n-icon>
              <sunny-outline />
            </n-icon>
          </template>
        </n-switch>
      </n-flex>
    </footer>
  </div>
</template>

<script setup lang="ts">
import useDarkTheme from '@/composables/useDarkTheme';
import { MoonOutline, SunnyOutline } from '@vicons/ionicons5';
import { useThemeVars } from 'naive-ui';

const themeVars = useThemeVars();
const { isDark, toggleDark } = useDarkTheme();
</script>

<style lang="scss">
@use "sass:map";
@use "@/style/_screen.scss";

$prefix-cls: "ld";

.#{$prefix-cls} {
  &__wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  &__header {
    border-bottom: 1px solid var(--border-color);
  }

  &__container {
    padding-left: var(--spacing-base);
    padding-right: var(--spacing-base);
    margin-left: auto;
    margin-right: auto;
  }

  &__logo {
    color: inherit;
    display: inline-block;
    max-width: 200px;
    height: 62px;
    line-height: 62px;
    text-align: center;
    text-decoration: none;
  }

  &__content {
    flex: 1 1 0;
  }

  &__footer {
    padding-top: var(--spacing-base);
    padding-bottom: var(--spacing-base);
    border-top: 1px solid var(--border-color);
  }
}

@include screen.screen-md() {
  .#{$prefix-cls} {
    &__container {
      width: map.get(screen.$screens, md);
    }
  }
}

@include screen.screen-lg() {
  .#{$prefix-cls} {
    &__container {
      width: map.get(screen.$screens, lg);
    }
  }
}

@include screen.screen-xl() {
  .#{$prefix-cls} {
    &__container {
      width: map.get(screen.$screens, xl);
    }
  }
}

@include screen.screen-xxl() {
  .#{$prefix-cls} {
    &__container {
      width: map.get(screen.$screens, xxl);
    }
  }
}
</style>
