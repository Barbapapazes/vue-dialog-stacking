import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Tailwind from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    Vue(),
    Tailwind(),

    Components({
      dts: true,
      dirs: [
        'src/components',
        'src/ui/components',
      ]
    }),
    AutoImport({
      imports: [
        'vue',
        {
          from: 'tailwind-variants',
          imports: ['tv'],
        }
      ],
      dirs: [
        'src/composables',
        'src/ui/composables',
      ],
      dts: true,
    })
  ],

  resolve: {
    alias: {
      '@/ui': resolve(__dirname, 'src/ui'),
    },
  },
})
