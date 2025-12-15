import { ClientVarType, NodeConnection, VarBase_Class, VarBase_ItemType_ClassBase, type GraphNode, type NodePin } from "../../protobuf/gia.proto.ts";
import { collection, dir, gia, save } from "../util.ts";
import { is_reflect } from "../../gia_gen/nodes.ts";

import RECORDS from "../dist/node_records.json" with {type: "json"};
import type_name from "../dist/type_ids.json" with { type: 'json' };
import { assert } from "../../utils";

// 1. 对于每一个 node, 尽可能连接全部的引脚, 或设置初值(reflective pin除外). 观测是否完全连接, 然后验证输入输出类型是否完全一致
// 2. 对于每一个 reflective node, 构造全部的反射类型, 并连接/设置初值, 然后验证输入输出类型是否完全一致
// 3. 对于每一个 enum 类型, 设置每一种可能的值, 然后验证输入输出值是否一致


const info = collection().find(x => x.name === "skill")!;
function create_node(index: number, gid: number, cid?: number, pins?: NodePin[], pos: [number, number] = [0, 0]): GraphNode {
  return {
    nodeIndex: index++,
    genericId: {
      class: info.node_class,
      type: info.node_type,
      kind: info.node_kind,
      nodeId: gid
    },
    concreteId: cid === undefined ? undefined : {
      class: info.node_class,
      type: info.node_type,
      kind: info.node_kind,
      nodeId: cid
    },
    pins: pins ?? [],
    x: x_pos,
    y: y_pos,
    usingStruct: []
  };
}
// set local var/get local var
function get_var_node(type: string, index: number, pos?: [number, number]) {
  const tp = type_name.find(x => x.type === type);
  if (tp === undefined || tp.type === "E<0>" || tp.type === "L<E<0>>") {
    return null;
  }
  const node = create_node(index, 200082, tp.cid, [{
    i1: {
      kind: 4,
      index: 0,
    },
    i2: {
      kind: 4,
      index: 0,
    },
    value: {
      class: VarBase_Class.ConcreteBase,
      alreadySetVal: true,
      itemType: {
        classBase: VarBase_ItemType_ClassBase.Client,
        type_client: {
          type: tp.typeid as ClientVarType,
        }
      },
      bConcreteValue: {
        indexOfConcrete: tp.ioc,
        value: {} as any,
      }
    },
    type: tp.typeid,
    connects: [],
  }], pos);
  // 从 Target 引脚连接到 node 引脚
  const connect: NodeConnection = {
    id: index,
    connect: {
      kind: 4,
      index: 0,
    },
    connect2: {
      kind: 4,
      index: 0
    }
  };
  return { node, connect };

}
function set_var_node(type: string, index: number, connect_node: [number, number], pos?: [number, number]) {
  const tp = type_name.find(x => x.type === type);
  if (tp === undefined || tp.type === "E<0>" || tp.type === "L<E<0>>") {
    return null;
  }
  const node = create_node(index, 200081, tp.cid, [{
    i1: {
      kind: 3,
      index: 1,
    },
    i2: {
      kind: 3,
      index: 1,
    },
    value: {
      class: VarBase_Class.ConcreteBase,
      alreadySetVal: true,
      itemType: {
        classBase: VarBase_ItemType_ClassBase.Client,
        type_client: {
          type: tp.typeid as ClientVarType,
        }
      },
      bConcreteValue: {
        indexOfConcrete: tp.ioc,
        value: {} as any,
      }
    },
    type: tp.typeid,
    connects: [{
      id: connect_node[0],
      connect: {
        kind: 4,
        index: connect_node[1],
      },
      connect2: {
        kind: 4,
        index: 0,
      }
    }],
  }], pos);
  return node;
}

function test1(read = false) {
  const graph = gia("skill");
  const records = RECORDS.filter(x => !x.name.startsWith("Node Graph End"));
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  let y_pos = 0;
  let index = 1;
  records.slice(0, 5).forEach((rec, i) => {
    const pins: NodePin[] = [];
    nodes.push(create_node(index, rec.id, undefined, pins, [0, y_pos]));
    for (let i = 0; i < rec.inputs.length; i++) {
      if (is_reflect(rec.inputs[i])) continue;
      const get_var = get_var_node(rec.inputs[i], index++, [-500 - i * 200, y_pos]);
      if (get_var === null) continue;
      nodes.push(get_var.node);
      pins.push({
        i1: { kind: 3, index: i },
        i2: { kind: 3, index: 0 },
        value: {} as any,
        type: type_name.find(x => x.type === rec.inputs[i])!.typeid,
        connects: [get_var.connect]
      });
    }
    y_pos += 100 + 30 * rec.inputs.length;
  });
  save("outputs_int.gia", graph, true);
  console.log("outputs_int.gia saved with", nodes.length, "nodes");
}