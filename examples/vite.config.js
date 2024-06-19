import {resolve} from 'path'
import {defineConfig} from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

// vite默认会打包出umd和es模块化两种导出方式的文件，以下配置会打包出两份结果：
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './index.js'), name: 'examples', // 构建好的文件名（不包括文件后缀）
      fileName: 'examples',
    }, rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'], output: {
        // 在 UMD 构建模式下,全局模式下为这些外部化的依赖提供一个全局变量
        globals: {
          examples: 'examples',
        },
      },
    },
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
      /**
       * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
       * @default src/main.ts
       */
      entry: './index.js',
      /**
       * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
       * @default index.html
       */
      template: 'public/index.html',

      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        data: {
          title: 'index',
          // injectScript: `<script src="./examples.js"></script>`,
        },
        tags: [
          {
            injectTo: 'body-prepend',
            tag: 'div',
            attrs: {
              id: 'tag',
            },
          },
        ],
      },
    }),
  ],
})
