import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';
import fs from 'fs';

export default defineConfig({
  base: './',
  publicDir: 'public',
  plugins: [
    vue(),
    {
      name: 'copy-assets',
      configResolved() {
        const libsDir = join(__dirname, 'public/libs');
        if (!fs.existsSync(libsDir)) fs.mkdirSync(libsDir, { recursive: true });

        // 1. 同步模型和字典
        const modelsDir = join(__dirname, '../packages/models/assets');
        console.log(`Copying models from ${modelsDir} to ${libsDir}`);
        fs.readdirSync(modelsDir).forEach(file => {
          if (file.endsWith('.onnx') || file.endsWith('.txt') || file.endsWith('.json') || file.endsWith('.png')) {
            console.log(`  -> Copying ${file}`);
            fs.copyFileSync(join(modelsDir, file), join(libsDir, file));
          }
        });

        // 2. 同步 ONNX Runtime 资源
        const ortDir = join(__dirname, 'node_modules/onnxruntime-web/dist');
        fs.readdirSync(ortDir).forEach(file => {
          if (file.endsWith('.wasm') || file.endsWith('.mjs') || file.endsWith('.js') || file.endsWith('.json')) {
            fs.copyFileSync(join(ortDir, file), join(libsDir, file));
          }
        });

        // 3. 同步 jieba-wasm 资源
        const jiebaWasmDir = join(__dirname, 'node_modules/jieba-wasm/pkg/web');
        if (fs.existsSync(jiebaWasmDir)) {
          fs.readdirSync(jiebaWasmDir).forEach(file => {
            if (file.endsWith('.wasm')) {
              console.log(`  -> Copying jieba ${file}`);
              fs.copyFileSync(join(jiebaWasmDir, file), join(libsDir, file));
            }
          });
        }
      }
    },
    // 配置 WASM MIME 类型
    {
      name: 'wasm-mime-type',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.endsWith('.wasm')) {
            res.setHeader('Content-Type', 'application/wasm');
          }
          next();
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['onnxruntime-web', 'ibus-qikai', '@ibus-qikai/core', '@ibus-qikai/models', '@ibus-qikai/word-association']
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
});
