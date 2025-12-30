import { debugDecode } from "../protobuf/debug_decode.ts";
import { decode_gia_file, encode_gia_file, unwrap_gia } from "../protobuf/decode.ts";
import proto from "protobufjs";
import { Graph } from "./graph.ts";
import { CLIENT_NODE_ID, NODE_ID } from "../node_data/node_id.ts";
import { NODE_PIN_RECORDS } from "../node_data/node_pin_records.ts";
import { assert, assertEq, assertEqs } from "../utils.ts";
import { get_type_client, stringify } from "./nodes.ts";

const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";

function gen() {
  // const g = new Graph("server");
  // Object.values(NODE_ID).forEach((x, i) => g.add_node(x).setPos(i % 30, i / 30));
  const g = new Graph("skill");
  Object.values(CLIENT_NODE_ID).forEach((x, i) => g.add_node(x).setPos(i % 10, i / 10));
  // g.add_node(CLIENT_NODE_ID.Data_Type_Conversion__Bool_Int);
  // g.add_node(CLIENT_NODE_ID.Enumeration_Match__Attack_Type);
  encode_gia_file(PATH + "test.gia", g.encode());
}


import { NodesList } from "../node_data/data.ts";
function read() {
  const g = decode_gia_file(PATH + "test.gia");
  const nodes = g.graph.graph?.inner.graph.nodes!;

  nodes.slice(4).forEach((node, i) => {
    const cid = Object.values(CLIENT_NODE_ID)[node.nodeIndex - 1];
    const data = NodesList.find(x => x.ID === parseInt(cid))!;
    if (node.genericId.nodeId === 200022) return;//Skip Type Convert
    assertEq(data.ID, node.genericId.nodeId);
    if (data.TypeMappings !== undefined)
      assertEq(cid.split(" ")[1], node.concreteId?.nodeId.toString() ?? undefined);
    else {
      cid.split(" ")[1] === undefined || assertEqs(cid.split(" ")[1], data.ConcreteID?.toString() ?? undefined);
      assertEq(data.ConcreteID, node.concreteId?.nodeId)
    }
    if (node.concreteId?.nodeId === 2000) {
      console.log(data.Name, node.pins.filter(p => p.i1.kind === 3).map(p => p.i2.index + stringify(get_type_client(p.type))).join(" ")); // Set_Local_Variable
    } else if (["Query", "Arithmetic", "Hidden", "Others"].includes(data.Class)) {
      // console.log(data.Name); // Set_Local_Variable
    } else {
      // console.log(data.Name); // Set_Local_Variable
      return;
      if (data.TypeMappings === undefined) {
        assertEqs(data.Class, "Query", "Arithmetic", "Hidden", "Others")
        if (data.Class === "Arithmetic") {
          console.log("<<<", data.Name, data.ID, node.concreteId?.nodeId);
          // assert(data.TypeMappings !== undefined);
        }
        // console.log(data.Name);
      } else {
        assertEqs(data.Class, "Execution", "Arithmetic", "Query", "Trigger", "Control")
        if (data.Class === "Arithmetic") {
          console.log(">>>", data.Name, data.ID, data.ConcreteID);
          // assert(data.TypeMappings === undefined);
        }
      }
      // assert(data.TypeMappings !== undefined);
    }
    return;
    const pins = node.pins;
    let pin5 = false;
    let pin50 = false;
    pins.forEach(p => {
      // pin5 
      if (![1, 2, 3, 4].includes(p.i1.kind)) {
        if (data.Name === "Send_Signal_to_Server_Node_Graph" && p.i1.index === 1) {
          return;
        }
        assert(pin5 === false);
        pin5 = true;
        if (p.type === 0) {
          pin50 = true;
          return;
        }
        assertEq(p.type, 3);
        assertEq(p.value.bInt?.val, 0);
      }
    });

    if (pin5) {
      assertEq(node.pins.find(x => x.i1.kind === 5)!.clientExecNode?.nodeId?.id, data.ID)
      assertEqs(data.Class, "Execution", "Trigger", "Control", "Hidden");
      if (pin50) {
        assertEqs(data.Class, "Execution", "Control");
        // if (data.Class === "Execution")
        console.log("++++", data.Name, node.nodeIndex);
      } else {
        assertEqs(data.Class, "Execution", "Trigger", "Hidden");
        // if (data.Class === "Execution") console.log("----", data.Name);
        if (data.Class === "Hidden") console.log("<<<<", data.Name);
      }
    } else assertEqs(data.Class, "Arithmetic", "Query", "Others", "Hidden");
    if (data.Class === "Others" || data.Class === "Hidden") {
      console.log(">>>>", data.Name);
    }
  });

}

// gen();
// read();

const g = decode_gia_file(PATH + "1.gia");
g.graph.compositeDef!.inner.def.inputs[0].pinIndex = 4;
g.graph.compositeDef!.inner.def.outputs[0].pinIndex = 5;
encode_gia_file(PATH + "2.gia", g);