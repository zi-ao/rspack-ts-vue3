const layoutContext = import.meta.webpackContext('/src/layouts', {
  mode: 'lazy',
  recursive: false,
  regExp: /^(?<!_).+\.vue$/,
});

const LoadingComponent = {
  name: 'LoadingComponent',
  render() {
    return h(
      'div',
      { style: 'padding: var(--spacing-base);text-align: center' },
      { default: () => '加载中...' },
    );
  },
};

const ErrorComponent = {
  name: 'LoadingErrorComponent',
  render() {
    return h(
      'div',
      { style: 'padding: var(--spacing-base);text-align: center' },
      [
        h('span', null, { default: () => '网络异常，请检查网络后' }),
        h('a', null, { default: () => '重试' }),
        h('span', null, { default: () => '。' }),
      ],
    );
  },
};

const layoutComponents: Record<string, Component> = {};
for (const path of layoutContext.keys()) {
  const layoutName = path
    .match(/\/([^.]+)\.vue$/)?.[1]
    .replace(/([A-Za-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
  if (layoutName) {
    layoutComponents[layoutName] = defineAsyncComponent({
      loader: () => layoutContext(path),
      loadingComponent: LoadingComponent,
      errorComponent: ErrorComponent,
    });
  }
}

export default layoutComponents;
