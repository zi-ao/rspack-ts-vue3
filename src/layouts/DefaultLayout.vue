<template>
  <div
    class="ld__wrapper"
    :style="`--border-color: ${themeVars.borderColor}`"
  >
    <header class="ld__header">
      <nav class="ld__navbar ld__container">
        <router-link to="/" class="ld__logo">
          LOGO
        </router-link>

        <div class="ld__navbar-content pl-10">
          <ul v-if="!isCollapsed" class="ld__navbar-nav">
            <li class="ld__nav-item">
              <router-link to="/" class="ld__nav-link ld__nav-link--active">首页</router-link>
            </li>
            <li class="ld__nav-item">
              <router-link to="/" class="ld__nav-link">关于</router-link>
            </li>
          </ul>

          <ul class="ld__navbar-nav !ml-auto">
            <li class="ld__nav-item">
              <n-input placeholder="搜索" />
            </li>
            <li class="ld__nav-item ml-3">
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
            </li>
            <li v-if="isCollapsed" class="ld__nav-item ml-3 -mr-3">
              <n-popover
                class="!p-0"
                content-class="w-72"
              >
                <template #trigger>
                  <n-button quaternary class="text-2xl ml-auto md:hidden">
                    <n-icon>
                      <menu-outline />
                    </n-icon>
                  </n-button>
                </template>

                <n-menu :indent="16" :options="navbarMenuOptions" />
              </n-popover>
            </li>
            <template v-else>
              <li class="ld__nav-item ml-3">
                <n-button>注册</n-button>
              </li>
              <li class="ld__nav-item ml-3">
                <n-button type="primary">登录</n-button>
              </li>
            </template>
          </ul>
        </div>
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
      </n-flex>
    </footer>
  </div>
</template>

<script setup lang="ts">
import useDarkTheme from '@/composables/useDarkTheme';
import { MenuOutline, MoonOutline, SunnyOutline } from '@vicons/ionicons5';
import { type MenuProps, useThemeVars } from 'naive-ui';

const themeVars = useThemeVars();
const { isDark, toggleDark } = useDarkTheme();

const isCollapsed = ref(false);

const navbarMenuOptions: MenuProps['options'] = [
  {
    label: '首页',
    key: 'home',
  },
  {
    label: '关于',
    key: 'about',
  },
  {
    label: '登录',
    key: 'login',
  },
  {
    label: '注册',
    key: 'register',
  },
];

const handleWindowResize = useDebounceFn(
  () => {
    isCollapsed.value = window.innerWidth < 768;
  },
  20,
  { maxWait: 100 },
);

onBeforeMount(() => {
  handleWindowResize();
  window.addEventListener('resize', handleWindowResize, false);
});
onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResize, false);
});
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

  &__navbar {
    display: flex;

    &-content {
      display: flex;
      flex: 1 1 0;
      align-items: center;
    }

    &-nav {
      display: flex;
      align-items: center;
      padding-left: 0;
      margin-top: 0;
      margin-bottom: 0;
      list-style: none;
    }
  }

  &__nav {
    &-link {
      color: inherit;
      padding: 20px;
      text-decoration: none;
    }
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
