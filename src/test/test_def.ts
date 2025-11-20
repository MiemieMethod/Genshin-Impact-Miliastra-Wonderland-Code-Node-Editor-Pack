import "./def.d.ts";

declare global {
  namespace Self {
    const a = 2;
    const b: number;
  }
}


const p = m.list(1.2, 2.3)[10] as int;

m.dict(3n, 4, 1n, 2)
m.struct("1", { x: 1, y: 2, 3: 4 }).$(() => {
  const p: float = Self.a + Self.b;
  return 1;
});
// Branch["12"].$(()=>1)[12].$
