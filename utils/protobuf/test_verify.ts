import { parse } from "./proto2ts.ts";
import { verifyProto } from "./verify_proto.ts";
import { type ParsedResult } from "./decode_raw.ts";

const stringify = (obj: any) => JSON.stringify(obj, (k, v) => typeof v === "bigint" ? v.toString() : v, 2);

const sampleProto = `
// @version: 1.0.0
// syntax = "proto3";

enum Status {
  UNKNOWN = 0;
  OK = 1;
  ERROR = 2;
}

message SubMessage {
  int32 id = 1;
  string name = 2;
}

message TestMessage {
  int32 val_int = 1;
  string val_str = 2;
  repeated int32 tags = 3;
  SubMessage sub = 4;
  Status status = 5;
  optional string opt_field = 6;
}
`;

const layers = parse(sampleProto);

// Case 1: Perfect match
const data1: ParsedResult = {
  1: [123n],
  2: ["hello"],
  3: [1n, 2n, 3n],
  4: [{ 1: [456n], 2: ["subname"] }],
  5: [1n],
};

console.log("--- Test 1: Perfect Match ---");
const { errors: errors1, result: res1 } = verifyProto(data1, layers.message.get("TestMessage")!);
console.log("Errors:", stringify(errors1));
console.log("Result:", stringify(res1));

// Case 2: Errors
const data2: ParsedResult = {
  1: ["not a number"], // Type mismatch
  3: [1n],
  4: [{ 2: ["missing id"] }], // SubMessage missing id (index 1)
  5: [99n], // Invalid enum
  7: [123n], // Extra field
};

console.log("\n--- Test 2: Multiple Errors ---");
const { errors: errors2, result: res2 } = verifyProto(data2, layers.message.get("TestMessage")!);
console.log("Errors:", stringify(errors2));
console.log("Result:", stringify(res2));

// Case 3: Missing required field
const data3: ParsedResult = {
  2: ["only string"],
};

console.log("\n--- Test 3: Missing Required Fields ---");
const { errors: errors3, result: res3 } = verifyProto(data3, layers.message.get("TestMessage")!);
console.log("Errors:", stringify(errors3));
console.log("Result:", stringify(res3));

// Case 4: Repeated mismatch
const data4: ParsedResult = {
  1: [1n, 2n], // Not repeated but found 2
  2: ["test"],
  3: [1n],
  4: [{ 1: [1n], 2: ["test"] }],
  5: [1n]
};

console.log("\n--- Test 4: Repeated Mismatch ---");
const { errors: errors4, result: res4 } = verifyProto(data4, layers.message.get("TestMessage")!);
console.log("Errors:", stringify(errors4));
console.log("Result:", stringify(res4));
