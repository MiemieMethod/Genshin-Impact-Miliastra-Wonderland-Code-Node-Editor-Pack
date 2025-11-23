

import { enum_value, graph_body, node_body, pin_body, pin_value } from "./basic.ts";
import type { EnumValue, GraphBody, NodeBody, PinBody, PinValue } from "./basic.ts";

import { randomInt } from "./utils.ts";

export const gia = {
  // basic
  basic_enum_value: enum_value,
  basic_graph_body: graph_body,
  basic_node_body: node_body,
  basic_pin_body: pin_body,
  basic_pin_value: pin_value,
  // utils
  random_int: randomInt
}

export type BasicEnumValue = EnumValue;
export type BasicGraphBody = GraphBody;
export type BasicNodeBody = NodeBody;
export type BasicPinBody = PinBody;
export type BasicPinValue = PinValue;