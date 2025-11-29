import { NODE_PIN_RECORDS } from "../node_data/node_pin_records.ts";
import { EncodeOptions, Graph, Pin } from "../gia_gen/graph.ts";
import { decode_gia_file, encode_gia_file } from "../protobuf/decode.ts";
import { type GraphNode } from "../protobuf/gia.proto.ts";
// import assert from "assert";
import { get_concrete_index, get_generic_id, get_node_record, get_node_record_generic, is_generic_id } from "../node_data/helpers.ts";
import { get_id, parse, reflect, type_equal } from "../gia_gen/nodes.ts";
import { get_node_info } from "../gia_gen/extract.ts";
import { assert, assert_equal, assert_unequal } from "./utils.ts";
import { execSync } from "child_process";

const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";
const FILE = PATH + "check_nodes.gia";



function test_all_nodes(read = false) {
  let nodes: GraphNode[] = null as any, j = 0;
  if (read) {
    nodes = decode_gia_file(FILE).graph.graph?.inner.graph.nodes!;
  }
  const graph = new Graph();
  for (let i = 1; i < 4000; i++) {
    if (!read) {
      const node0 = graph.add_node(i);
      node0.setPos(0, i);
      continue;
    }
    // 检查一致性
    const gid = get_generic_id(i);
    if (gid === null) { // only basic node or generic node or not a node
      if (!is_generic_id(i)) {
        // node a node.
        assert_unequal(nodes[j]?.nodeIndex, i); // not exist
        continue;
      }
      const record = get_node_record_generic(i);
      assert(record !== null);
      const node = nodes[j++];
      assert_equal(node.nodeIndex, i); // exist(the same index as define)
      assert_equal(node.genericId.nodeId, i); // same generic id
      if (record.reflectMap === undefined) {
        // TODO: basic node
        assert_equal(node.concreteId.nodeId, i); // same index as define
        let k = 0;
        for (let j = 0; j < record.inputs.length; j++) {
          const pin = parse(record.inputs[j]);
          if (pin.t !== "b" && pin.t !== "e") continue;
          if (record.inputs[j] === "Unk") continue;
          const p = node.pins[k++];
          assert_equal(p.i1.index, j);
          assert_equal(p.type, get_id(pin));
        }
        continue;
      }
      // generic node but without concrete node.
      assert_equal(node.concreteId, null); // without concrete id
      continue;
    }
    // reflected concrete node
    const node = nodes[j++];
    const record = get_node_record(i);
    assert(record !== null);
    assert(record.reflectMap !== null);
  }
  if (!read) {
    encode_gia_file(FILE, graph.encode(new EncodeOptions(true)));
  }
}

function get_missing_node(read = false) {
  const missing = get_node_record_generic(50)!;
  missing.id = 3360;

  if (!read) {
    const g = new Graph();
    for (const [_, ref] of missing.reflectMap!) {
      const n = g.add_node(3360);
      const p = new Pin(3360, 4, 0);
      n.pins.push(p);
      const refl = parse(ref as string);
      assert_equal(refl.t, "s");
      p.setType(refl.f[0][1]);
      p.concrete_index = get_concrete_index(50, 4, 0, get_id(refl.f[0][1]));
      console.log(p);
    }
    encode_gia_file(FILE, g.encode());
    return;

  }
  const g = decode_gia_file(FILE).graph.graph?.inner.graph.nodes!;
  assert_equal(g.length, missing.reflectMap!.length);
  for (let i = 0; i < missing.reflectMap!.length; i++) {
    const info = get_node_info(g[i]);
    const refl = parse(missing.reflectMap![i][1] as string);
    assert_equal(refl.t, "s");
    assert_equal(info.generic_id, missing.id);
    assert_equal(info.pins[0].indexOfConcrete, get_concrete_index(50, 4, 0, get_id(refl.f[0][1])));
    assert(type_equal(info.pins[0].node_type, refl.f[0][1]))
    missing.reflectMap![i][0] = info.concrete_id;
  }
  console.dir(missing, { maxArrayLength: null });
}





execSync("cls", { stdio: 'inherit' });
console.time("Time consume");

// 生成全部节点列表
// test_all_nodes();
// 检查全部节点存在性
test_all_nodes(true);

// console.dir(decode_gia_file(FILE).graph.graph?.inner.graph.nodes[0], { depth: null, maxArrayLength: null });



// encode_gia_file(FILE, g.encode());



console.timeEnd("Time consume");