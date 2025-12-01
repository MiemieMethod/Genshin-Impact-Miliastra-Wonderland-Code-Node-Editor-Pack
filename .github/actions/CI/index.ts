import { readFileSync } from "fs";

console.log(import.meta.dirname);
console.log(process.argv);

try {
  console.log(readFileSync("./gia_gen/test.ts", "utf-8"));
} catch (e) {
  console.log(e);
}


console.log("CI Pass");