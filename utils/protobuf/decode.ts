import { readFileSync } from "fs";
import proto from "protobufjs";
import "./gia.proto.d.ts"

const bytes = readFileSync(import.meta.dirname + "/../../src/test/enumAll.gia").buffer;

const root = proto.loadSync(import.meta.dirname + "/gia.proto");
const message = root.lookupType("Root");
// console.log(message);

const msg = message.decode(new Uint8Array(bytes, 20, bytes.byteLength - 24)) as any as Root;

const nodes = msg.graph.graph!.inner.graph.nodes;
function getInfo(node: GraphNode) {
  return {
    nodeId: node.concreteId?.nodeId,
    classBase: node.pins[0]?.value.bNodeValue?.classBase,
    // class: node.pins[0]?.value.bNodeValue.value.class,
    // type: node.pins[0]?.value.bNodeValue.value.itemType.itemType.type,
    val: node.pins[0]?.value.bNodeValue?.value.bEnum?.val,
    val2: node.pins[1]?.value.bNodeValue?.value.bEnum?.val,
  }
}
console.log(nodes.map(x => getInfo(x)));

console.log(nodes instanceof Array);

