import { defineConfig } from 'vite';
import { join } from 'path';
import fs from 'fs';

export default defineConfig({
  base: './',
  publicDir: 'public',
  plugins: [
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
          // 拷贝所有相关文件，但不改变后缀，后续通过 wasmPaths 拦截
          if (file.endsWith('.wasm') || file.endsWith('.mjs') || file.endsWith('.js') || file.endsWith('.json')) {
            fs.copyFileSync(join(ortDir, file), join(libsDir, file));
          }
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['onnxruntime-web', 'ibus-qikai', '@ibus-qikai/core', '@ibus-qikai/models']
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
});
