import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

import path from 'path';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSvgr({
      svgrOptions: {
        exportType: 'default',
      },
    }),
  ],
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
      forceSplitting: {
        'lib-zod': /node_modules[\\/]zod/,
        'lib-zustand': /node_modules[\\/]zustand/,
        'lib-material': /node_modules[\\/]@mui/,
      }
    }
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
});
