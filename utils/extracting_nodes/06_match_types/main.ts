import type { NodePin } from "../../protobuf/gia.proto";
import { collection, dir, gia, save } from "../util.ts";

import records_raw from "../dist/node_records_no_type.json" with {type: "json"};
import records_in from "../dist/node_records_no_outs.json" with {type: "json"};
import type_name from "../dist/type_ids.json" with { type: 'json' };
import { assert, assertEq, assertEqs, assertNotEq } from "../../utils.ts";

import { ENUM_ID_CLIENT, ENUM_VALUE } from "../../node_data/index.ts";

const ENUM_VALUE_ = new Map(Object.entries(ENUM_ID_CLIENT).map(([k, v]) => [k.replaceAll("_", "").toLowerCase(), v]));
const ENUM_VALUE_TO_ID = new Map<number, number>(Object.entries(ENUM_VALUE).map(([k, v]) => [v, ENUM_VALUE_.get(k.split("_")[0].toLowerCase())!]));
ENUM_VALUE_TO_ID.set(0, -1);



function generate_all_links() {
  const graph = gia("skill");
  const node = graph.graph.graph?.inner.graph.nodes!;
  const info = collection().find(x => x.name === "skill")!;
  let cnt = 0;
  // get custom variable: all types
  for (const t of type_name) {
    node.push({
      nodeIndex: ++cnt,
      genericId: {
        class: info.node_class,
        type: info.node_type,
        kind: info.node_kind,
        nodeId: t.gid,
      },
      concreteId: {
        class: info.node_class,
        type: info.node_type,
        kind: info.node_kind,
        nodeId: t.cid,
      },
      pins: [{
        i1: {
          kind: 4,
          index: 0
        },
        i2: {
          kind: 4,
          index: 0
        },
        value: {
          class: 10000,
          alreadySetVal: true,
          bConcreteValue: {
            indexOfConcrete: t.ioc,
            value: {} as any,
          },
        },
        type: t.typeid,
        connects: []
      }],
      x: -cnt * 300,
      y: -300,
      usingStruct: []
    });
    if (t.ioc === -1) {
      node.pop();
    }
    assertEq(cnt, t.typeid);
  }
  for (const rec of records_raw) {
    for (let t = 0; t < type_name.length; t++) {
      const pins: NodePin[] = [];
      for (let pin = 0; pin < 50; pin++) {
        if (rec.inputs[pin] === undefined || rec.inputs[pin] === null) {
          pins.push({
            i1: {
              kind: 3,
              index: pin,
            },
            i2: {} as any,
            value: {} as any,
            type: type_name[t].typeid,
            connects: [{
              id: t + 1,
              connect: {
                kind: 4,
                index: 0
              },
              connect2: {
                kind: 4,
                index: 0
              },
            }]
          });
        }
      }
      node.push({
        nodeIndex: ++cnt,
        genericId: {
          class: info.node_class,
          type: info.node_type,
          kind: info.node_kind,
          nodeId: rec.id
        },
        pins,
        x: (cnt % 20) * 300,
        y: (cnt / 20) * 300,
        usingStruct: []
      });
    }
  }
  // dir(node[154]);
  save("all_link.gia", graph, true);
  // save("all_link.gia", graph, false);
  console.log("all_link saved");
}


function read_all_links() {
  const graph = gia("all_link.gia", true, true);
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  // return dir(nodes.slice(11, 14));
  // const info = collection().find(x => x.name === "skill")!;
  const types: string[] = [];
  let cnt = 0;
  // get custom variable: all types
  for (const t of type_name) {
    types.push(t.type);
    if (t.ioc !== -1) cnt++;
  }
  // console.log(nodes.length, cnt, cnt * records_raw.length);
  for (const node of nodes.slice(type_name.length)) {
    const ip = records_raw.find(r => r.id === node.genericId.nodeId)?.inputs as string[];
    for (const pin of node.pins) {
      if (pin.i1.kind === 4) continue;
      if (pin.connects.length > 0) {
        // if (node.genericId.nodeId === 200051) debugger;
        assertEqs(ip[pin.i1.index], undefined, null);
        assertEq(pin.connects[0].id, pin.type);
        ip[pin.i1.index] = type_name.find(x => x.typeid === pin.type)!.type;
      }
    }
  }
  const state = {
    type0: new Set(),
    type3: new Set(),
    restricted_pin: [] as any[],
    default_val: [] as any[],
  };
  for (const node of nodes.slice(type_name.length)) {
    const ip = records_raw.find(r => r.id === node.genericId.nodeId)?.inputs as string[];
    for (const pin of node.pins) {
      if (pin.i1.kind === 4) continue;
      if (pin.i1.kind === 5) {
        assertNotEq(pin.clientExecNode, undefined);
        if (node.genericId.nodeId === 200124 && pin.type !== 3) {
          assertEq(pin.clientExecNode.nodeId, undefined);
          assertEq(pin.clientExecNode.kind, 6);
          assertEq(pin.type, 9);
        } else {
          assertEq(pin.clientExecNode.nodeId?.id, node.genericId.nodeId);
          assertEq(pin.clientExecNode.kind, 5);
          assertEqs(pin.value.itemType?.type_client?.type, 3, 0);
          if (pin.value.itemType?.type_client?.type === 3) {
            state.type0.add(node.genericId.nodeId);
            assertEq(pin.value.bInt?.val, 0);
          } else {
            assertEq(pin.value.itemType?.type_client?.type, 0);
            state.type3.add(node.genericId.nodeId);
          }
        }
        assertEq(pin.clientExecNode.index, 1);
        continue;
      }
      assertEq(pin.i1.kind, 3);
      // if (node.genericId.nodeId === 200051) debugger;
      if (ip[pin.i1.index] === undefined || ip[pin.i1.index] === null) {
        assertEq(pin.connects.length, 0);
        if (pin.type === 13) {
          assertNotEq(pin.value.bEnum?.val, undefined);
          const type_id = ENUM_VALUE_TO_ID.get(pin.value.bEnum.val);
          assertNotEq(type_id, undefined);
          ip[pin.i1.index] = `E<${type_id}>`;
          if (type_id !== -1) {
            state.default_val.push({
              node: node.genericId.nodeId,
              pin: pin.i1.index,
              type: `E<${type_id}>`,
              val: pin.value.bEnum.val,
            });
          }
        } else {
          // restricted_pin: 无法通过连线传入值的
          state.restricted_pin.push({
            node: node.genericId.nodeId,
            pin: pin.i1.index,
            type: pin.type,
          });
          const val = pin.value.bEnum?.val
            ?? pin.value.bInt?.val
            ?? pin.value.bFloat?.val
            ?? pin.value.bString?.val
            ?? pin.value.bId?.val;
          if (val !== undefined && val !== 0 && val !== "") {
            console.warn("N/A");
            state.default_val.push({
              node: node.genericId.nodeId,
              pin: pin.i1.index,
              type: pin.type,
              val,
            });
          }
          const tp = type_name.find(t => t.typeid === pin.type)!.type;
          ip[pin.i1.index] = tp;
        }
      } else {
        if (pin.type === 0 || pin.type === 13) {

        } else {
          // ensure the types are all right
          assertEqs(type_name.find(x => x.typeid === pin.type)?.type, ip[pin.i1.index]);
        }
      }
    }
  }
  dir(state);
  // dir(records_raw.find(x => x.id === 200116));
  console.log("全部 37 个 Execution Node 均含有一个 kind=5 的引脚, 不知道是干啥的, 感觉是个中间体, 没啥有效信息. 且200124有两个 kind=5 的引脚.");
  save("node_pins_no_links.json", state.restricted_pin);
  save("node_pins_default_vals.json", state.default_val);
  save("node_records_no_outs.json", records_raw);
  // save("all_link.gia", graph, true);
  console.log("all_link saved");
}

function create_all_enums() {
  const rec = records_in.filter(x => x.inputs.includes("E<-1>"));
  dir(rec);

}

// generate_all_links();
read_all_links();

