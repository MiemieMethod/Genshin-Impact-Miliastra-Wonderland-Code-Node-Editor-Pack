import { NODES } from "../../node_data/game_nodes";
import { Graph } from "../interface";

const graph = new Graph("ENTITY_NODE_GRAPH");
// const graph = new Graph("SKILL_NODE_GRAPH");


// column 1
const Trig = graph.add_node(NODES.Trigger_Tab_OnTabSelect)!;
// column 2
const Branch1 = graph.add_node(NODES.Control_General_Switch)!;
const get_val = graph.add_node(NODES.Query_CustomVariable_GetVariable)!;
Branch1.setConstraints("C<T:Int>");
get_val.setConstraints("C<T:Int>");
graph.flow(Trig, Branch1);
graph.connect(Trig, Branch1, "Output2", "key");
graph.connect(Trig, get_val, 0, 0);
// multiple def will override old def
get_val.connectPinWith("target_entity", Trig, "Output0");
graph.flow(Trig, Branch1, "FlowOut", "FlowIn", 3);

Branch1.setVal("cases", [1, 2, 3]);

Trig.setPosition(1, 1);
Branch1.setPosition(3, 1);
get_val.setPosition(4, 4);

Branch1.add_comment("Comment Attached to Node");
graph.add_comment("Comment Not Attached to Node", 600, 100);
graph.add_comment("Comment2 Also Attached to Node", Trig);


export { graph, Branch1 };