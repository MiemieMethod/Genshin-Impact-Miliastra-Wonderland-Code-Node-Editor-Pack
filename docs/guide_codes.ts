import "../src/test/def.d.ts"

declare global {
  namespace Self {
    const a: int;
    const b: float;
  }
  namespace Timer {
    const c: CountDown<10>;
    const d: Count<1234>;
  }
  namespace Signal {
    function e(val: str): Signal;
  }
}
declare namespace node {
  export const x = 1;
  const y = 1;
}
const _local_x = 1;



declare global {
  namespace Self {
    const my_var: int = 0n; // 定义全局变量(实体身上)
  }
}

[OnCreate()]
  // `$` 为运算节点只在被调用时求值, 执行到此处不求值, 当需要访问 `val` 时才计算.
  .$(() => 1.0)[val] // (1) 
  .Log("Hello, World!")
  // return `object` 表示多个返回值, 可以用变量名映射: `a` 的值赋给 `x` .
  .$((val) => { return { a: val + 1, y: val + Self.my_var }; })[x = a, y] // (2) 
  .SetVal(Self.my_var, x)  // 修改变量
  .Log("New Val is Set")
  // `m.vec` 是 Math 空间中的构造 Vec 的函数
  .$((x, y) => { return m.vec(x, y, 2.5); })[my_vec] // (3) 
  .Teleport(pos = my_vec); // 默认目标为 Self (自身实体)



// @ts-nocheck
import "./def.d.ts"; // 导入系统类型和方法定义

// 1. 导入
// 从其他文件导入可复用的组件或纯函数
import { MyReusableComponent, my_calc_func } from "./shared_components.ts";
import "../src/test/test_def.ts"

// 全局声明和定义 (全部文件可用)
declare global {

  // 2. 定义自定义数据结构
  interface PlayerData {
    id: int;
    name: string;
  }

  // 3. 声明全局可发送和接收的信号
  namespace Signal {
    function PlayerHit(damage: int): Signal; // 信号函数需以 `Signal` 为返回值
    function RenderFrame(): Signal;
  }

  // 4. 声明全局计时器
  namespace Timer {
    const five_second: CountDown<5>; // 倒计时5秒
    const time: Count<10>; // 从 10 开始正计时 
  }

  // 5. 声明实体的全局变量 (每个实体一个实例, 所有节点图可访问)
  namespace Self {
    const player_name: str = "Default";
    const is_alive: bool = true;
  }
}

// 6. 声明节点图变量 (每个实体的每个节点图一个实例)
declare namespace node {
  const config_id: ConfigId = 12345678;
  export const exposed_x: float = -12.34; // 通过 `export` 标记对外暴露的变量
}

// 7. 声明临时变量 (每个触发树每次触发重新创建实例)
const _local_counter: int = 0; //  变量名须以 _ 开头

// ----- 逻辑开始 -----
[OnCreate()].Log(Self.player_name).Log(m.str(node.exposed_x));

// 游戏对象创建时触发
[OnCreate()]
  .Log("I'm alive!");

// 全局计时器 "five_second" 触发时
[Timer(Timer.five_second)]
  .Log("Five seconds have passed.");

// 收到 "PlayerHit" 信号时触发，并将信号的 "damage" 参数
// 赋值给一个名为 "dmg_val" 的新变量
[Signal(Signal.PlayerHit)[dmg_val]]
  .Log("Ouch! Took " + m.str(dmg_val));

// 游戏对象创建时触发
[OnDeath()[cause]]
  .Log("I'm dead! Because of " + m.str(cause));


[OnCreate()]
  .Log("Starting...") >> {
    // 这三个分支将按 0, 1, 2 的顺序依次执行完毕
    0: Log("Branch 0: Runs first"),
    2: Log("Branch 2: Runs last"),
    1: DoSomething().Log("Branch 1"),
  }.Log("注意: 这里不会被执行"); // (执行方式见后文)

// 定义 "finish-logic" 锚点
// 无论 EventA 或 EventA 发生, 这里都会被执行
Branch["Merge Branch"]
  .Log("Finished!");

[Signal(Signal.EventA)]
  .Log("A happened")
  .Wait(1.0)
  + "Merge Branch"; // 跳转到 "Merge Branch"

[Signal(Signal.EventB)]
  .Log("B happened")
  + "Merge Branch"; // 跳转到 "Merge Branch"

;