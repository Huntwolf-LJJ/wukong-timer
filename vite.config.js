import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import pxToRemOrVwPlugin from "vite-plugin-px-rem-vw"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pxToRemOrVwPlugin({
      type: 'rem',
      options: {
        rootValue: 192,
        propList: ['*']
      }
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
