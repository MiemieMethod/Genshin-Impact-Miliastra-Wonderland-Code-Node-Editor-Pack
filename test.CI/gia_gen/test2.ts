import { inspect } from "util";
import { Graph } from "../../utils/gia_gen/interface.ts";
import { NODE_NAMES, NODES } from "../../utils/node_data/game_nodes.ts";
import { writeFileSync } from "fs";

const graph = new Graph("ENTITY_NODE_GRAPH");
// const graph = new Graph("SKILL_NODE_GRAPH");

// column 1
const Trig = graph.add_node(NODES.Trigger_Tab_OnTabSelect)!;
// column 2
const Branch1 = graph.add_node(NODES.Control_General_Switch)!;
const get_val = graph.add_node(NODES.Query_CustomVariable_GetVariable)!;
Branch1.setConstraints("C<T:Int>");
graph.flow(Trig, Branch1);
graph.connect(Trig, Branch1, "Output2", "key");
graph.connect(Trig, get_val, 0, 0);
get_val.connectWith("target_entity", Trig, "Output0");

Branch1.setVal("cases", [1, 2, 3]);

const g = graph.encode();

const g2 = Graph.decode(g);
graph.debugPrint();
g2.debugPrint();

// console.log(g2);

// writeFileSync("temp.cs", inspect(g, { depth: null }));

