import { Graph } from "../interface";
import { GraphRenderer } from "./GraphRender";
import { graph, Branch1 } from "./gen";
import "./graph-style.css"; // 引入 CSS

const sleep = async (sec: number) => new Promise(resolve => setTimeout(resolve, sec * 1000));

// 获取 DOM
const app = document.getElementById("app");

if (app) {
    // 初始化渲染器
    const renderer = new GraphRenderer(app);

    // 渲染
    renderer.render(graph);
    console.log("Graph rendered!");


    await sleep(5);

    console.log("Change Data");

    Branch1.setPosition(5, 5);
    Branch1.setVal("cases", [112, 2314]);

    renderer.render(graph);
} else {
    console.error("Root element #app not found");
}