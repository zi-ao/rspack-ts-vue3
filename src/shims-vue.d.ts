declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // biome-ignore lint: .vue 模板文件 TS 支持
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
