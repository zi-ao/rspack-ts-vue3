import 'vue-router';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // biome-ignore lint: .vue 模板文件 TS 支持
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vue-router' {
  interface RouteMeta {
    // 路由需要使用的布局组件
    // 必须与 /src/layout/ 目录下文件名一致
    // 布局名称会被转换为 kebab-case
    // 默认值：default-layout
    layout?: string;
  }
}
