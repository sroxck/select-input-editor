/*
 * @Author: sroxck
 * @Date: 2023-10-19 10:33:44
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-06 15:11:59
 * @Description: 
 */
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from 'node:path';
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue',
      {
        '@vueuse/core': [
          // named imports
          'useTextSelection', // import { useMouse } from '@vueuse/core',
          
        ],
      },],
      dts: "./auto-import.d.ts",
      include: [
        /.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /.vue$/, /.vue?vue/, // .vue
        /.md$/, // .md
      ],
      eslintrc: {
        enabled: false, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | "readonly" | "readable" | "writable" | "writeable")
      },
    }),
    Components({
      dirs: ['src/components','src/views'],
      dts: true, resolvers: [
        ElementPlusResolver(),
      ],
    }),

    vueJsx(),
    createSvgIconsPlugin({
      // 指定目录
      iconDirs: [path.resolve(process.cwd(), "src/icons")],
      // 使用svg图标的格式
      symbolId: "icon-[dir]-[name]",
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
