// mock-path.js

// 简单的路径拼接实现
export const join = (...args) => {
  return args
    .map((part, i) => {
      if (i > 0) {
        // 去掉中间部分开头的斜杠
        return part.replace(/^\/+/, '');
      }
      return part;
    })
    .join('/')
    .replace(/\/+$/, ''); // 去掉末尾斜杠
};

// 常用其他方法的 Mock
export const resolve = (...args) => args.join('/');
export const dirname = (p) => p.substring(0, p.lastIndexOf('/')) || '.';
export const basename = (p) => p.substring(p.lastIndexOf('/') + 1);
export const extname = (p) => {
  const i = p.lastIndexOf('.');
  return i > -1 ? p.substring(i) : '';
};

// 默认导出，兼容 import path from 'path'
export default {
  join,
  resolve,
  dirname,
  basename,
  extname,
  sep: '/',
  delimiter: ':'
};
