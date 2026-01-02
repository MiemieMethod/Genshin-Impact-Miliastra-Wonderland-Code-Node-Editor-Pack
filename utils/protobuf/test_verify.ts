import { parse } from "./proto2ts.ts";
import { verifyProto } from "./verify_proto.ts";
import { type ParsedResult } from "./decode_raw.ts";

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
const errors1 = verifyProto(data1, layers.message.get("TestMessage")!);
console.log("Errors:", JSON.stringify(errors1, null, 2));

// Case 2: Errors
const data2: ParsedResult = {
  1: ["not a number"], // Type mismatch
  3: [1n],
  4: [{ 2: ["missing id"] }], // SubMessage missing id (index 1)
  5: [99n], // Invalid enum
  7: [123n], // Extra field
};

console.log("\n--- Test 2: Multiple Errors ---");
const errors2 = verifyProto(data2, layers.message.get("TestMessage")!);
console.log("Errors:", JSON.stringify(errors2, null, 2));

// Case 3: Missing required field
const data3: ParsedResult = {
  2: ["only string"],
};

console.log("\n--- Test 3: Missing Required Fields ---");
const errors3 = verifyProto(data3, layers.message.get("TestMessage")!);
console.log("Errors:", JSON.stringify(errors3, null, 2));

// Case 4: Repeated mismatch
const data4: ParsedResult = {
  1: [1n, 2n], // Not repeated but found 2
  2: ["test"],
  3: [1n],
  4: [{ 1: [1n], 2: ["test"] }],
  5: [1n]
};

console.log("\n--- Test 4: Repeated Mismatch ---");
const errors4 = verifyProto(data4, layers.message.get("TestMessage")!);
console.log("Errors:", JSON.stringify(errors4, null, 2));
