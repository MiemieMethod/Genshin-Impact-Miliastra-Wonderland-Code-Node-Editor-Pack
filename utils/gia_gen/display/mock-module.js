// mock-fs.js
// import { createRequire } from 'module';
export const createRequire = () => any;

// 默认导出，兼容 import fs from 'fs'
export default {
  createRequire
};
