import D from "./nodes.json" with {type: "json"};

console.log(new Set(D.map(x => x.parameters.map(y => y.type)).flat(2)));
console.log(new Set(D.map(x => x.parameters.map(y => y.dataType)).flat(2)));

// console.log(D.length);