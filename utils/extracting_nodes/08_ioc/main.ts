import type { ClientVarType, NodeConnection, GraphNode, NodePin } from "../../protobuf/gia.proto.ts";
import { VarBase_Class, VarBase_ItemType_ClassBase } from "../../protobuf/gia.proto.ts";
import { collection, dir, gia, save } from "../util.ts";
import { assert, assertDeepEq, assertEq, exclude_keys } from "../../utils.ts";
import { get_id_client, is_reflect, parse, reflects } from "../../gia_gen/nodes.ts";

import RECORDS from "../dist/node_records.json" with {type: "json"};
import ioc_list from "./ioc.json" with {type: "json"};
import type_name from "../dist/type_ids.json" with { type: 'json' };
import NO_LINK from "../dist/node_pins_no_links.json" with { type: 'json' };

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
    x: pos[0],
    y: pos[1],
    usingStruct: []
  };
}
function pinWithIoc(is_in: boolean, type: string, ref: string, index: number, ioc: number): NodePin {
  return {
    i1: {
      kind: is_in ? 3 : 4,
      index: index
    },
    i2: {} as any,
    value: {
      class: VarBase_Class.ConcreteBase,
      alreadySetVal: true,
      bConcreteValue: {
        indexOfConcrete: ioc,
        value: {
          class: 0,
          alreadySetVal: true
        }
      }
    },
    type: get_id_client(reflects(type, ref)),
    connects: []
  }
}


function generateAllRefs() {
  const graph = gia("skill");
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  const records = RECORDS.filter(rec => rec.reflectMap !== undefined);
  let index = 1;
  records.forEach((rec, i) => {
    const ins = rec.inputs.map((x, i) => [i, x] as [number, string]).filter(x => is_reflect(x[1]));
    const outs = rec.outputs.map((x, i) => [i, x] as [number, string]).filter(x => is_reflect(x[1]));
    const refs = [...ins, ...outs].map(x => x[1]);

    const ioc_entry = ioc_list.find(x => x.name === rec.name);
    assert(ioc_entry !== undefined);
    // 200022
    assert(refs.length > 0 && (refs.every(x => x === refs[0]) || [200017, 200019, 200020, 200021, 200022, 200049].includes(rec.id)));
    for (let j = 0; j < rec.reflectMap.length; j++) {
      const ref = rec.reflectMap[j];
      assertEq(ref[1], ioc_entry.ioc[j].type);
      const ioc_in = ioc_entry.ioc[j].ins;
      const ioc_out = ioc_entry.ioc[j].outs;
      const node = create_node(index, rec.id, undefined, [
        ...ins.map((x, k) => pinWithIoc(true, x[1], ref[1], x[0], (assertEq(ioc_in[k].index, x[0]), ioc_in[k].ioc))),
        ...outs.map((x, k) => pinWithIoc(false, x[1], ref[1], x[0], (assertEq(ioc_out[k].index, x[0]), ioc_out[k].ioc)))
      ], [i * 300, j * 300]);
      nodes.push(node);
      index++;
    }
  });
  save("refs.gia", graph, true);
  console.log("refs.gia saved with", nodes.length, "nodes");
}

function verify_ioc_matches() {
  const graph = gia("refs.gia", true, true);
  const nodes = graph.graph.graph?.inner.graph.nodes!;
  const records = RECORDS.filter(rec => rec.reflectMap !== undefined);
  let index = 1;
  let node_index = 0;
  records.forEach((rec, i) => {
    const ins = rec.inputs.map((x, i) => [i, x] as [number, string]).filter(x => is_reflect(x[1]));
    const outs = rec.outputs.map((x, i) => [i, x] as [number, string]).filter(x => is_reflect(x[1]));
    const refs = [...ins, ...outs].map(x => x[1]);

    const ioc_entry = ioc_list.find(x => x.name === rec.name);
    assert(ioc_entry !== undefined);
    // 200022
    assert(refs.length > 0 && (refs.every(x => x === refs[0]) || [200017, 200019, 200020, 200021, 200022, 200049].includes(rec.id)));
    for (let j = 0; j < rec.reflectMap.length; j++) {
      const ref = rec.reflectMap[j];
      assertEq(ref[1], ioc_entry.ioc[j].type);
      const node = nodes[node_index++];
      assertEq(node.nodeIndex, index++);
      if (rec.name === "Enumeration Match" && j === 0) continue;
      assertEq(node.concreteId?.nodeId, parseInt(ref[0].split(" ")[1])); // 验证 cid 是存在且对应的
      ioc_entry.ioc[j].ins.forEach((ioc, k) => {
        const pin = node.pins.find(p => p.i1.kind === 3 && p.i1.index === ioc.index);
        const type = reflects(ins[k][1], ref[1]);
        assertEq(pin?.type, get_id_client(type)); // 验证 pin 的类型是否正确
        assertEq(pin?.value.bConcreteValue?.indexOfConcrete, ioc.ioc); // 验证 pin 的类型是否正确
      })
      const ioc_out = ioc_entry.ioc[j].outs;
      ioc_out.forEach((ioc, k) => {
        const pin = node.pins.find(p => p.i1.kind === 4 && p.i1.index === ioc.index);
        const type = reflects(outs[k][1], ref[1]);
        assertEq(pin?.type, get_id_client(type)); // 验证 pin 的类型是否正确
        assertEq(pin?.value.bConcreteValue?.indexOfConcrete, ioc.ioc); // 验证 pin 的类型是否正确
      })

    }
  });

  console.log("verified", nodes.length, "nodes");
}

// generateAllRefs();
verify_ioc_matches();