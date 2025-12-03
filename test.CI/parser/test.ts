import { createParserState } from "../../src/parser/tokenizer.ts";
import { parse } from "../../src/parser/parser.ts";
import { decompile, ir_to_string } from "../../src/parser/decompiler.ts";
import { src_pos } from "../../src/parser/utils.ts";
import { readFileSync, writeFileSync } from "fs";
import { inspect } from "util";

function BigIntStringify(key: string, value: any) {
  if (typeof value === 'bigint') {
    return value.toString(); // Convert BigInt to string
  }
  return value; // Return other values unchanged
}

function compile(dsl: string) {
  console.log("Testing parser and decompiling")
  console.log("The original DSL is:", JSON.stringify(dsl.slice(0, 40)), "... <", dsl.length, "in total >");
  const state = createParserState(dsl);
  try {
    const ir = parse(state);
    console.log("Compile Ok!", "A brief view of IR:");
    console.log(inspect(ir, { depth: 2 }));
    writeFileSync("./dist/IR.json", JSON.stringify(ir, BigIntStringify, 2));
    console.log("IR saved to `dist/IR.json`");
    return ir;

  } catch (e) {
    console.error(e);
    const failure = src_pos(state);
    console.log("Source: ");
    console.log(state.source.slice(failure - 10, failure + 20).replaceAll("\n", " "));
    console.log(" ".repeat(10) + "^");
  }
}

function main() {
  const dsl = readFileSync(import.meta.dirname + "/test.dsl.ts").toString().replaceAll("\r", "");
  const ir = compile(dsl);

  if (!ir) return;

  console.log("\nFile structure is:");
  console.log(ir_to_string(ir, dsl));

  console.log("\nDecompiling");
  const dsl_new = decompile(ir);
  console.log("Decompile Ok!", "Generated DSL is:");
  console.log(dsl_new);
  writeFileSync("./dist/GeneratedDSL.dsl.ts", dsl_new);
  console.log("Decompile IR to generated DSL saved to `dist/GeneratedDSL.dsl.ts`");
}



if (import.meta.main) {
  main();
}