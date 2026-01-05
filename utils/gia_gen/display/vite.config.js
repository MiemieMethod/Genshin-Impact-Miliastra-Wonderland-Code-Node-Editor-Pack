// vite.config.js
import { defineConfig } from 'vite';
import path from 'node:path'; // 使用 node: 前缀是 2026 年的标准推荐写法
import { fileURLToPath } from 'node:url';

// 获取 __dirname 的 ESM 兼容写法
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      // 核心设置：将 fs 模块映射到你的本地 mock 文件
      // 使用 path.resolve 确保路径是绝对路径，防止递归解析错误
      'fs': path.resolve(__dirname, './mock-fs.js'),
      'path': path.resolve(__dirname, './mock-path.js'),
      // 也可以使用 node: 前缀的模块名
      'node:fs': path.resolve(__dirname, './mock-fs.js'),
      'node:path': path.resolve(__dirname, './mock-path.js'),
    }
  },
  define: {
    // 兼容某些 Node 库对全局变量的需求
    'process.env': {},
    'global': 'window'
  }
});
