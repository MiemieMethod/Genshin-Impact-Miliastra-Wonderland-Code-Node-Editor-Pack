// 节点图接口
import { Graph } from "../../utils/gia_gen/interface.ts";
// 节点定义(调取标识符)(你也可以直接用字符串/id)
import { NODE_NAMES, NODES } from "../../utils/node_data/game_nodes.ts";

import { ResourceClass } from "../../utils/node_data/types.ts";


// ========= 示例代码 ========= //
export function get_graph_client(system: ResourceClass) {

  // 创建不同类型的节点图
  // const graph = new Graph("ENTITY_NODE_GRAPH");
  // const graph = new Graph("SKILL_NODE_GRAPH");
  const graph = new Graph(system);

  const Begin = graph.add_node(NODES.Others_PortClient_GraphStart)!;
  const Signal = graph.add_node(NODES.Execution_SignalClient_SendToServer)!;
  const Eff1 = graph.add_node(NODES.Execution_CharacterSkillClient_PlayTimedFX)!;
  const Eff2 = graph.add_node(NODES.Execution_CharacterSkillClient_PlayTimedFX)!;
  const Eff3 = graph.add_node(NODES.Execution_CharacterSkillClient_PlayTimedFX)!;

  // TODO: rename NODES.Execution_SpecialEffect_PlayLoop

  graph.add_comment("Wind vortex", Eff1);
  graph.add_comment("sound effect", Eff2);
  graph.add_comment("Wind column", Eff3);

  graph.flow(Begin, Eff1);
  graph.flow(Begin, Signal);
  graph.flow(Begin, Eff2);
  graph.flow(Begin, Eff3);


  const get_att_pt = graph.add_node(NODES.Query_EntityRelatedClient_GetSocketLoc)!;
  const get_rot = graph.add_node(NODES.Query_EntityRelatedClient_GetSocketRot)!;
  const get_slf = graph.add_node(NODES.Query_EntityRelatedClient_GetSelf)!;
  const rot_v1 = graph.add_node(NODES.Arithmetic_MathClient_VectorRotate)!;
  const rot_v2 = graph.add_node(NODES.Arithmetic_MathClient_VectorRotate)!;
  const rot_v3 = graph.add_node(NODES.Arithmetic_MathClient_VectorRotate)!;
  const add_v1 = graph.add_node(NODES.Arithmetic_MathClient_VectorAdd)!;
  const add_v2 = graph.add_node(NODES.Arithmetic_MathClient_VectorAdd)!;
  {
    graph.connect(get_slf, get_rot, "self", "target_entity");
    graph.connect(get_slf, get_att_pt, "self", "target_entity");

    graph.connect(get_att_pt, add_v2, "attachment_position", "vector2");
    // graph.connect(get_att_pt, Signal, 0, 1); // TODO: Signal uses Complex Definition
    graph.connect(get_att_pt, Eff2, "attachment_position", "position");
    graph.connect(get_att_pt, add_v1, "attachment_position", "vector1");


    graph.connect(get_rot, rot_v1, "attachment_rotation", "rotation");
    graph.connect(get_rot, rot_v2, "attachment_rotation", "rotation");
    // graph.connect(get_rot, Signal, 0, 2);
    graph.connect(get_rot, rot_v3, "attachment_rotation", "rotation");

    graph.connect(rot_v1, add_v1, "result", "vector2");
    graph.connect(rot_v2, Eff1, "result", 2);
    graph.connect(add_v1, Eff3, "sum", 1);
    graph.connect(rot_v3, Eff3, "result", 2);
    graph.connect(add_v2, Eff1, "sum", 1);
  }
  get_att_pt.setVal("attachment_name", "GI_AvatarRoot");
  rot_v1.setVal("vector", [0, 2, 6]);
  rot_v2.setVal("vector", [90, 0, 0]);
  // Signal.setVal(0, "Dash");
  add_v2.setVal("vector1", [0, 1, 0]);
  rot_v3.setVal("vector", [80, 4, 0]);

  Eff1.setVal("effect_config_id", 10006238);
  Eff1.setVal("scale", 1);
  Eff1.setVal("play_default_sfx", true);

  Eff2.setVal("effect_config_id", 10011063);
  Eff2.setVal("rotation", [0, 0, 0]);
  Eff2.setVal("scale", 0);
  Eff2.setVal("play_default_sfx", true);

  Eff3.setVal("effect_config_id", 208);
  Eff3.setVal("scale", 1.3);
  Eff3.setVal("play_default_sfx", false);

  return graph;
}