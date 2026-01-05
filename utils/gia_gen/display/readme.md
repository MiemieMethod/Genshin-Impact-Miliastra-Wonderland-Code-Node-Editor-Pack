# 动态测试布线与连接效果

使用 node + vite 创建的简单 ts 网页(调试展示用).

安装: `npm install`

运行: `npm run dev`

渲染函数在 [GraphRender.ts](./GraphRender.ts) 中, 通过 [gen.ts](./gen.ts) 调用 [interface.ts](../interface.ts) 接口快速创建图. GraphRender 可以直接传入接口中的 Graph 对象进行渲染.

后续: 可能会考虑写一个简单的测试网页, 线上通过代码动态生成图.