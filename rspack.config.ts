import { resolve } from 'node:path';
import { defineConfig } from '@rspack/cli';
import { type RspackPluginFunction, rspack } from '@rspack/core';
import { config as dotenvConfig } from 'dotenv';
import { expand as dotenvExpand } from 'dotenv-expand';
import AutoImport from 'unplugin-auto-import/rspack';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import VueComponents from 'unplugin-vue-components/rspack';
import { VueLoaderPlugin } from 'vue-loader';

const _resolve = (...paths: string[]) => resolve(__dirname, ...paths);

const { parsed: dotenvParsed } = dotenvExpand(
  dotenvConfig({
    path: [
      _resolve('.env'),
      _resolve('.env.local'),
      _resolve(`.env.${process.env.NODE_ENV}`),
      _resolve(`.env.${process.env.NODE_ENV}.local`),
    ],
  }),
);

const toImportMetaEnvs = (
  envs?: Record<string, string | number | boolean> | null,
) => {
  const importMetaEnvs: Record<string, string | number | boolean> = {};
  if (envs) {
    for (const key in envs) {
      importMetaEnvs[`import.meta.env.${key}`] =
        typeof envs[key] === 'string' ? `'${envs[key]}'` : envs[key].toString();
    }
  }
  return importMetaEnvs;
};

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14'];

export default defineConfig({
  context: resolve('.'),
  entry: {
    main: './src/main.ts',
  },
  resolve: {
    extensions: ['...', '.ts', '.vue'],
    alias: {
      '@': _resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.(js|ts)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                },
              },
              env: { targets },
              type: 'javascript/auto',
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              // 同时使用 `modern-compiler` 和 `sass-embedded` 可以显著提升构建性能
              // 需要 `sass-loader >= 14.2.1`
              api: 'modern-compiler',
              implementation: require.resolve('sass-embedded'),
            },
          },
        ],
        type: 'css',
      },
      {
        test: /\.svg/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      title: dotenvParsed?.RS_APP_TITLE ?? '',
      template: './index.html',
    }),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      ...toImportMetaEnvs(dotenvParsed),
      ...toImportMetaEnvs({
        PROD: process.env.NODE_ENV === 'production',
        DEV: process.env.NODE_ENV === 'development',
      }),
    }),
    new VueLoaderPlugin() as RspackPluginFunction,
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        {
          lodash: [
            'isNil',
            'isUndefined',
            'isNull',
            'isString',
            'isNaN',
            'isNumber',
            'isBoolean',
            'isSymbol',
            'isFunction',
            'isArray',
            'isSet',
            'isMap',
            'pick',
            'omit',
          ],
        },
      ],
      dts: _resolve('.temp/auto-imports.d.ts'),
    }),
    VueComponents({
      resolvers: [NaiveUiResolver()],
      dts: _resolve('.temp/components.d.ts'),
    }),
  ],
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  watchOptions: {
    poll: 2000,
  },
  experiments: {
    css: true,
  },
});
