// mock-fs.js
// 为你的 Node 代码提供一套空的 fs 实现，防止 Vite 运行时报错
export const readFileSync = () => '';
export const readFile = (path, cb) => cb(null, '');
export const writeFileSync = () => { };
export const existsSync = () => true;
export const promises = {
  readFile: async () => '',
  writeFile: async () => { },
};
export const statSync = () => ({ isFile: () => false, isDirectory: () => false });

// 默认导出，兼容 import fs from 'fs'
export default {
  readFileSync,
  readFile,
  writeFileSync,
  existsSync,
  promises,
  statSync,
};
