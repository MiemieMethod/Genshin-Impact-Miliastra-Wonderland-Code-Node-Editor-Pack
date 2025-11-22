import { Zlib } from "zlib";
import "./def.d.ts";

declare global {
  interface DataA {
    x: int;
    y: str;
  }

  namespace Self {
    const a: int;
    const b: float;
  }
  namespace Timer {
    const c: CountDown<10>;
    const d: Count<1234>;
  }
  namespace Signal {
    function e(val: str, x: int): Signal;
    function s(): Signal;
    function EventA(): Signal;
    function EventB(): Signal;
  }
}
declare namespace node {
  export const x = 1;
  const y = 1;
}

const _local_x = 1;

function MyComp() {
  const _local_y = 2;
  $(() => {
    _local_y;
    _local_x;
  })
  return []();
}

const _data_a: DataA = {
  x: 1n,
  y: "1"
};



const p = m.list(1.2, 2.3)[10] as int;

m.dict(3n, 4, 1n, 2)
m.struct("1", { x: 1, y: 2, 3: 4 }).$(() => {
  const p: float = node.y + Self.b;
  return 1;
});
// Branch["12"].$(()=>1)[12].$

[Signal(Signal.e)[x, val]].SendSignal(Signal.e, "", 1n).SendSignal(Signal.s);

// function DoSomething(): ExecFun<{ res: Entity, b: Str }> { return 0 as any; }
function DoSomething(): ExecFun<{}> { return 0 as any; }

[Timer(Timer.c)[x, val]].SetTime()[];

[OnCreate()]
  .Log("Starting...") >> {
    // 这三个分支将按 0, 1, 2 的顺序依次执行完毕
    0: Log("Branch 0: Runs first")[1].$(() => 1),
    2: Log("Branch 2: Runs last") >> "12"() >> "12"(),
    1: DoSomething().Log("Branch 1"),
  }.Log("注意: 这里不会被执行") >> "12"() >> 2().Log(""); // (执行方式见后文)


