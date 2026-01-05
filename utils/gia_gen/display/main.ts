import { Graph } from "../interface";
import { GraphRenderer } from "./GraphRender";
import "./graph-style.css"; // 引入 CSS

// 获取 DOM
const app = document.getElementById("app");

if (app) {
    // 初始化渲染器
    const renderer = new GraphRenderer(app);
    
    // 生成数据
    // const graphData = createMockGraph();
    const graph = await import("./gen");
    
    // 渲染
    renderer.render(graph.default);
    
    console.log("Graph rendered!");
} else {
    console.error("Root element #app not found");
}