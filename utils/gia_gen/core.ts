import { counter_dynamic_id, counter_index, randomInt, type TypedValue } from "./utils.ts";
import { assert, assertEq, todo } from "../utils.ts";

import * as Gia from "../protobuf/gia.proto.ts";

import type { NodeDef, PinDef, GraphCategoryConstsDef } from "../node_data/types.ts";
import { type NodeType, stringify } from "../node_data/node_type.ts";
import { Doc, Node as NodeHelper } from "../node_data/instances.ts";

// ------------------------------------------------------------------
// Internal Helpers
// ------------------------------------------------------------------

function get_graph_const(key: keyof GraphCategoryConstsDef | string): Gia.ResourceLocator {
  const consts = Doc.systemConstants.GRAPH_CATEGORY_CONSTS;
  if (typeof key === "string" && key in consts) {
    // Exact match for known category
    const k = key as keyof GraphCategoryConstsDef;
    return {
      source_domain: consts[k].AssetsOrigin,
      service_domain: consts[k].AssetsCategory,
      kind: consts[k].AssetsKind,
      internal_logic_id: 0,
      world_entity_guid: 0,
    };
  }

  // Fallback or specific logic mapping
  // Since we don't have the original get_graph_const to reference exact mapping logic, 
  // we assume the key maps to one of the defined categories in SystemConstants.
  // If key is "Server" -> "Server" group

  // Common Defaults if not found directly
  return {
    source_domain: Gia.ResourceLocator_Origin.USER_DEFINED,
    service_domain: Gia.ResourceLocator_Category.BASIC_NODE_GRAPH,
    kind: Gia.ResourceLocator_AssetKind.BASIC,
    internal_logic_id: 0,
    world_entity_guid: 0,
  };
}

function make_resource_locator(def: NodeDef): Gia.ResourceLocator {
  // This logic mimics looking up how a NodeDef maps to a ResourceLocator
  // Using simple defaults for now based on NodeDef properties
  // Real mapping might need more lookup in SystemConstants based on NodeDef.Domain/System
  return {
    source_domain: Gia.ResourceLocator_Origin.SYSTEM_DEFINED,
    // Map System/Domain to Category? 
    service_domain: def.System === "Server" ? Gia.ResourceLocator_Category.SERVER_BASIC : Gia.ResourceLocator_Category.CLIENT_FILTER,
    kind: Gia.ResourceLocator_AssetKind.BASIC,
    internal_logic_id: def.ID,
    world_entity_guid: 0,
  }
}

// ------------------------------------------------------------------
// Core Interfaces
// ------------------------------------------------------------------

export interface GraphBody_ {
  graph_const: keyof GraphCategoryConstsDef | string;
  /** 唯一标识符 */
  uid: number;
  /** 图的 ID */
  graph_id: number;
  /** 图文件的ID，可选, 通常是 graph_id + i */
  file_id?: number;
  /** 图的名称，可选 */
  graph_name?: string;
  /** 图中包含的节点列表，可选 */
  nodes?: Gia.NodeInstance[];
  comments?: Gia.Annotation[];
  graphValues?: Gia.GraphVariable[];
}

// ------------------------------------------------------------------
// Graph Functions
// ------------------------------------------------------------------

/**
 * 根据提供的参数构建一个图对象 (Gia.AssetBundle)
 */
export function graph_body(body: GraphBody_): Gia.AssetBundle {
  const graph_name = body.graph_name ?? "Graph " + randomInt(8).toString() + ".gia";
  const file_name = graph_name.replaceAll(/[^a-zA-Z0-9_.]+/gs, "_").replaceAll(/[A-Z]/g, (m) => m.toLowerCase());
  const timestamp = Math.floor(Date.now() / 1000);
  const file_id = body.file_id ?? body.graph_id + counter_dynamic_id.value;

  const locator = get_graph_const(body.graph_const);
  locator.internal_logic_id = body.graph_id;

  const nodeGraph: Gia.NodeGraph = {
    identity: locator,
    display_name: graph_name,
    nodes: body.nodes ?? [],
    comments: body.comments ?? [],
    blackboard: body.graphValues ?? [],
    port_mappings: [],
    // entry_slot_index: ? 
    // evaluation_interval: ?
  };

  const assetBundle: Gia.AssetBundle = {
    primary_resource: {
      identity: locator,
      reference_list: [],
      internal_name: graph_name,
      resource_class: Gia.ResourceEntry_ResourceClass.BASIC_NODE_GRAPH, // Should match graph_const context
      graph_data: {
        inner: {
          graph: nodeGraph
        }
      }
    },
    dependencies: [],
    export_tag: `${body.uid}-${timestamp}-${file_id}-\\${file_name}`,
    engine_version: "6.2.0" // Or from Const
  };

  return assetBundle;
}

export interface NodeBody_ {
  def: NodeDef;
  /** 具体 ID, 可选 - if Variant node */
  concrete_id?: number;
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
  /** 是否抖动位置 */
  pos_jitter?: boolean;
  /** 节点的引脚列表 */
  pins: Gia.PinInstance[];
  /** ⚠️ Warning: This may cause ID collision. 节点唯一索引，不建议填入 */
  unique_index?: number;
  comment?: Gia.Annotation;
}

/**
 * 构建节点对象 (Gia.NodeInstance)
 */
export function node_body(body: NodeBody_): Gia.NodeInstance {
  const nodeIndex = body.unique_index ?? counter_index.value;

  // Construct Shell Ref (UI Definition)
  const shell_ref = make_resource_locator(body.def);

  // Construct Kernel Ref (Logic Implementation)
  let kernel_ref: Gia.ResourceLocator | undefined = undefined;
  if (body.def.Type === "Fixed") {
    kernel_ref = { ...shell_ref }; // Usually same for fixed
    if (body.def.KernelID) kernel_ref.internal_logic_id = body.def.KernelID;
  } else if (body.def.Type === "Variant") {
    if (body.concrete_id) {
      kernel_ref = { ...shell_ref, internal_logic_id: body.concrete_id };
      // Assuming concrete_id points to the variant kernel ID
      // In real logic, might need to lookup variant from def using constraints
    }
    // If no concrete_id, kernel_ref remains undefined (Unresolved)
  }

  return {
    index: nodeIndex,
    shell_ref,
    kernel_ref,
    pins: body.pins,
    x_pos: body.x * 300 + (body.pos_jitter ?? true ? Math.random() * 20 : 0),
    y_pos: body.y * 200 + (body.pos_jitter ?? true ? Math.random() * 20 : 0),
    attached_comment: body.comment,
    using_structs: [], // To be populated if needed
  };
}

export interface PinBody_ {
  def: PinDef; // Definition of the pin from NodeDef
  index: number; // Index in the pin list (of that direction/kind)

  kind: Gia.PinSignature_Kind;

  /** Pin Value (if input) */
  value?: Gia.TypedValue;
  /** Pin Type (Runtime) */
  type: NodeType;
  is_server: boolean;

  connections?: Gia.NodeConnection[];
}

/**
 * 构建引脚对象 (Gia.PinInstance)
 */
export function pin_body(body: PinBody_): Gia.PinInstance {
  // Map NodeType to ID (S_INT, etc.)
  // This requires TypeEngine lookup, but for now we can rely on simple mapping or pass lookup
  // Let's assume a helper or just use 0/Unknown if complex
  const typeId = 0; // TODO: Implement mapping from NodeType to ServerTypeId/ClientTypeId

  const sig: Gia.PinSignature = {
    kind: body.kind,
    index: body.index // The index of this pin among pins of this Kind
  };

  return {
    shell_sig: sig,
    kernel_sig: sig, // Usually same
    value: body.value ?? { widget: Gia.TypedValue_WidgetType.UNKNOWN, is_value_set: 0 },
    type: typeId,
    connections: body.connections ?? [],
  };
}

// ------------------------------------------------------------------
// Value Helpers
// ------------------------------------------------------------------

export function make_int_value(val: number): Gia.TypedValue {
  return {
    widget: Gia.TypedValue_WidgetType.NUMBER_INPUT,
    is_value_set: 1,
    val_int: { x: val }
  };
}

export function make_float_value(val: number): Gia.TypedValue {
  return {
    widget: Gia.TypedValue_WidgetType.DECIMAL_INPUT,
    is_value_set: 1,
    val_float: { x: val }
  };
}

export function make_bool_value(val: boolean): Gia.TypedValue {
  return {
    widget: Gia.TypedValue_WidgetType.ENUM_PICKER, // Bool is often Enum 0/1
    is_value_set: 1,
    val_enum: { enum: val ? 1 : 0 }
  };
}

export function make_string_value(val: string): Gia.TypedValue {
  return {
    widget: Gia.TypedValue_WidgetType.TEXT_INPUT,
    is_value_set: 1,
    val_string: { str: val }
  };
}

export function make_vector_value(x: number, y: number, z: number): Gia.TypedValue {
  return {
    widget: Gia.TypedValue_WidgetType.VECTOR_GROUP,
    is_value_set: 1,
    val_vector: { vec: { x, y, z } }
  };
}

// ------------------------------------------------------------------
// Connection Helpers
// ------------------------------------------------------------------

export function make_connection(target_node_index: number, target_pin_kind: Gia.PinSignature_Kind, target_pin_index: number): Gia.NodeConnection {
  const sig: Gia.PinSignature = {
    kind: target_pin_kind,
    index: target_pin_index
  };
  return {
    target_node_index,
    target_pin_shell: sig,
    target_pin_kernel: sig
  };
}
