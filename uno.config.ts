import presetRemToPx from '@unocss/preset-rem-to-px';
import { defineConfig, presetMini } from 'unocss';

export default defineConfig({
  content: {
    filesystem: ['**/*.{html,js,ts,jsx,tsx,vue}'],
  },
  presets: [presetRemToPx(), presetMini()],
});
