import { assert, assertEq, assertDeepEq, assertNotEq } from "../utils.ts";
import { Doc } from "./instances.ts";
import * as NT from "./node_type.ts";

/**
 * TypeEngine Tests
 * 
 * This test suite verifies the functionality of the TypeEngine class,
 * covering type conversions, ID lookups, and system compatibility.
 */

const engine = Doc.Type;

function test_basic_conversions() {
  console.log("Testing basic type conversions...");

  // Test common atomic types
  const basics = ["Int", "Str", "Bol", "Flt", "Unk"] as const;
  for (const b of basics) {
    const node: NT.NodeType = { t: "b", b: b as any };

    // 1. toTypeDef: structural -> definition
    const typeDef = engine.toTypeDef(node);
    assert(!!typeDef, `TypeDef for ${b} should exist`);
    assertEq(typeDef.Identifier, b);

    // 2. toNodeType: definition -> structural
    const backToNode = engine.toNodeType(typeDef);
    assertDeepEq(backToNode, node);

    // 3. get_type_id: helper for ID lookup
    const id = engine.get_type_id(node);
    assertEq(typeof id, "number");

    // 4. get_type_base_id: helper for BaseTypeID
    const baseId = engine.get_type_base_id(b);
    assertEq(typeof baseId, "number");

    // 5. getTypeByID & getTypeByIdentifier
    assertEq(engine.getTypeByID(id!)?.Identifier, b);
    assertEq(engine.getTypeByIdentifier(b)?.Identifier, b);
  }
}

function test_list_types() {
  console.log("Testing list types...");

  // Note: These must exist in the loaded data.json Types array
  const listTypes = ["L<Int>", "L<Str>"];

  for (const lt of listTypes) {
    const node = NT.parse(lt);

    // 1. toTypeDef (Structural matching)
    const typeDef = engine.toTypeDef(node);
    assert(!!typeDef, `TypeDef for ${lt} should exist in data`);
    assertEq(typeDef.Identifier, lt);

    // 2. toTypeDefFull (Recursively resolving inner types)
    const full = engine.toTypeDefFull(node);
    assert(!!full, `Full TypeDef for ${lt} should be valid`);
    assert(!!full.list_type, `Full TypeDef for ${lt} should have list_type populated`);

    const itemTypeNode = (node as NT.ListType).i;
    assertEq(full.list_type.Identifier, NT.stringify(itemTypeNode));

    // 3. get_item_id helper
    const itemId = engine.get_item_id(node);
    const expectedItemId = engine.get_type_id(itemTypeNode);
    assertEq(itemId, expectedItemId);

    // 4. getListTypeByID helper
    const listTypeFound = engine.getListTypeByID(itemId!);
    assertEq(listTypeFound?.Identifier, lt);
  }

  // Test nested list
  const nested = "L<L<Int>>";
  const nestedNode = NT.parse(nested);
  const nestedDef = engine.toTypeDef(nestedNode);
  assertEq(nestedDef, undefined);
}

function test_dict_types() {
  console.log("Testing dict types...");

  // Dictionaries in this system are typically lossy converted to D<Unk,Unk>
  const dt = "D<Str,Int>";
  const node = NT.parse(dt);

  // 1. toTypeDef (Lossy lookup)
  const typeDef = engine.toTypeDef(node);
  assert(!!typeDef, `TypeDef for dictionary should fall back to generic`);
  assertEq(typeDef.Identifier, "D<Unk,Unk>");

  // 2. toTypeDefFull (Preserving inner types)
  const full = engine.toTypeDefFull(node);
  assert(!!full, `Full TypeDef for ${dt} should resolve`);
  assert(!!full.map_type, `Full TypeDef should have map_type populated`);
  assertEq(full.map_type[0].Identifier, "Str");
  assertEq(full.map_type[1].Identifier, "Int");

  // 3. get_key_value_id helper
  const kvIds = engine.get_key_value_id(node);
  assert(Array.isArray(kvIds), "get_key_value_id should return an array");
  assertEq(kvIds[0], engine.get_type_id("Str"));
  assertEq(kvIds[1], engine.get_type_id("Int"));

  // 4. getDictTypeByID helper (lossy)
  const dictType = engine.getDictTypeByID(kvIds[0]!, kvIds[1]!);
  assertEq(dictType?.Identifier, "D<Unk,Unk>");
}

function test_enum_types() {
  console.log("Testing enum types...");

  // 1. Lossy resolution for a fake enum
  const fakeEnum = "E<FAKE>";
  const fakeNode = NT.parse(fakeEnum);
  const lossyDef = engine.toTypeDef(fakeNode);
  assertEq(lossyDef?.Identifier, "E<Unk>");

  // 2. Resolution using real data
  const realEnumType = engine.enumTypes.find(et => et.System === "Server");
  if (realEnumType) {
    const enumIdentifier = realEnumType.Identifier;
    const enumNode = NT.parse(`E<${enumIdentifier}>`);

    // Full resolution
    const full = engine.toTypeDefFull(enumNode);
    assert(!!full, "Should resolve full enum type");
    assertEq(full.enum_type?.Identifier, enumIdentifier);

    // IDs
    const enumTypeId = engine.get_enum_type_id(enumNode);
    assertEq(enumTypeId, realEnumType.ID);

    // Lookup by different IDs
    assertEq(engine.getEnumTypeByID(realEnumType.ID)?.Identifier, enumIdentifier);
    assertEq(engine.getEnumTypeByTypeID(realEnumType.TypeID)?.Identifier, enumIdentifier);
    assertEq(engine.getEnumTypeByIdentifier(enumIdentifier)?.ID, realEnumType.ID);

    // ID conversion helpers
    assertEq(engine.getEnumIdentifierFromID(realEnumType.ID), enumIdentifier);
    assertEq(engine.getEnumIDFromIdentifier(enumIdentifier), realEnumType.ID);
  }
}

function test_system_switching() {
  console.log("Testing system switching (Server/Client)...");

  const serverEngine = Doc.Type;
  const clientEngine = Doc.ClientType;

  assertEq(serverEngine.system, "Server");
  assertEq(clientEngine.system, "Client");

  const node = NT.parse("Int");
  const serverId = serverEngine.get_type_id(node);
  const clientId = clientEngine.get_type_id(node);

  // Most IDs should differ or be matched to their respective system
  const typeDef = serverEngine.getTypeByID(serverId!)!;
  assertEq(typeDef.ID, serverId);
  assertEq(typeDef.ClientID, clientId);

  // Enum system check
  const serverGenericEnum = serverEngine.DEFAULT_ENUM;
  const clientGenericEnum = clientEngine.DEFAULT_ENUM;
  assertEq(serverGenericEnum.System, "Server");
  assertEq(clientGenericEnum.System, "Client");
}

function test_edge_cases() {
  console.log("Testing edge cases and fallbacks...");

  // 1. Non-existent IDs
  assertEq(engine.getTypeByID(-999), undefined);
  assertEq(engine.getEnumTypeByID(-999), undefined);

  // 2. Invalid NodeType strings
  try {
    engine.get_type_id("Invalid@@Type");
    assert(false, "Should have thrown on invalid parse");
  } catch (e) {
    // Expected
  }

  // 3. Helper branch coverage (wrong node type for helper)
  assertEq(engine.get_item_id("Int"), undefined, "get_item_id only for lists");
  assertEq(engine.get_key_value_id("Int"), undefined, "get_key_value_id only for dicts");
  assertEq(engine.get_enum_type_id("Int"), undefined, "get_enum_type_id only for enums");

  // 4. getTypeByIdentifier
  assertEq(engine.getTypeByIdentifier("NonExistentType"), undefined);
}

function run_all_tests() {
  console.log("--- Starting TypeEngine Verification ---");
  try {
    test_basic_conversions();
    test_list_types();
    test_dict_types();
    test_enum_types();
    test_system_switching();
    test_edge_cases();
    console.log("\n[SUCCESS] All TypeEngine tests passed!");
  } catch (e) {
    console.error("\n[FAILURE] TypeEngine tests failed!");
    console.error(e);
    process.exit(1);
  }
}

// Run if this is the main module
run_all_tests();
