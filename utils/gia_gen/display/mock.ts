import { TypedNodeDef } from "../../node_data/core.ts";
import { Graph, Node, Connection, Comment } from "../interface.ts"

export function createMockGraph(): Graph {
    // 1. 定义节点 Def
    const eventDef: TypedNodeDef = {
        Identifier: "EventBeginPlay",
        Domain: "Event",
        InGameName: { en: "Event BeginPlay" },
        DataPins: [],
        FlowPins: [{ Identifier: "Out", Direction: "Out", Type: "exec", Label: { en: "" } }]
    };

    const printDef: TypedNodeDef = {
        Identifier: "PrintString",
        Domain: "Logic",
        InGameName: { en: "Print String" },
        DataPins: [
            { Identifier: "InString", Direction: "In", Type: "string", Label: { en: "In String" } },
            { Identifier: "Duration", Direction: "In", Type: "float", Label: { en: "Duration" } }
        ],
        FlowPins: [
            { Identifier: "In", Direction: "In", Type: "exec", Label: { en: "" } },
            { Identifier: "Out", Direction: "Out", Type: "exec", Label: { en: "" } }
        ]
    };

    // 2. 创建节点实例 (先不填连接)
    const node1: Node = {
        system: "Engine",
        node_index: 1,
        def: eventDef,
        pin_values: new Map(), // 无需默认值
        data_from: new Map(),
        data_to: new Map(),
        flow_from: new Map(),
        flow_to: new Map(),
        x: 100,
        y: 100,
        comment: null
    };

    const node2: Node = {
        system: "Engine",
        node_index: 2,
        def: printDef,
        pin_values: new Map([
            ["InString", "Hello World"], // 静态值
            ["Duration", 2.0]
        ]),
        data_from: new Map(),
        data_to: new Map(),
        flow_from: new Map(),
        flow_to: new Map(),
        x: 400,
        y: 100,
        comment: null
    };

    // 3. 建立连接 (Flow: Event -> Print)
    const connection: Connection = {
        from_node: node1,
        from_pin: "Out",
        to_node: node2,
        to_pin: "In"
    };

    // 4. 将连接注入节点 (手动维护双向引用)
    // Node 1 (Out)
    if (!node1.flow_to.has("Out")) node1.flow_to.set("Out", []);
    node1.flow_to.get("Out")!.push(connection);

    // Node 2 (In)
    if (!node2.flow_from.has("In")) node2.flow_from.set("In", new Set());
    node2.flow_from.get("In")!.add(connection);

    // 5. 添加注释
    const comment: Comment = {
        content: "Game Start Logic",
        attached_node: node1
    };

    // 6. 组装 Graph
    const nodes = new Map<number, Node>();
    nodes.set(node1.node_index, node1);
    nodes.set(node2.node_index, node2);

    return {
        system: "Demo",
        graph_name: "DemoGraph",
        uid: 101,
        graph_id: 1,
        file_id: 1,
        nodes: nodes,
        comments: new Set([comment])
    };
}