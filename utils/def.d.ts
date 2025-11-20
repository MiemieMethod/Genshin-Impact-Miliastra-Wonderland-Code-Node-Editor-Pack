// version 1.0.0

interface Listed {
  (...cases: (string | float | null | boolean)[]): [][];

  Branch: [string][];

  $(lambda: (...args: any[]) => any): [][];

  // ------ 执行节点函数 ------ //
  // 打印字符串
  /* declare function */ Log(str: string): [][];

  // 设置局部变量: SetVal(_local_val, new_val)
  // 设置节点图变量: SetVal(self.val, new_val)
  // 设置自定义变量: SetVal(node.val, new_val)
  /* declare function */ SetVal<T>(
    val: T,
    new_val: T,
    target?: Entity,
    trigger_event?: boolean,
  ): [][];
  // 选择分支
  If(cond: boolean): [][];
  // 选择分支
  Switch(key: boolean | float | int | string): [][];
  // 有限循环 (from <= i <= to)
  /* declare function */ Loop(
    from: int,
    to: int,
    id: string | float | boolean,
  ): [i: int][];

  // 列表迭代循环
  /* declare function */ ForEach<T>(list: List<T>): [item: T][];
  // 对列表插入值
  /* declare function */ Insert<T>(list: List<T>, index?: int, val?: T): [][];
  // 对列表修改值
  /* declare function */ Modify<T>(list: List<T>, index: int, val: T): [][];
  // 对列表移除值
  /* declare function */ Remove<T>(list: List<T>, index: int): [][];
  // 对列表移除值
  /* declare function */ Sort<T>(list: List<T>, is_increase?: boolean): [][];
  // 拼接列表
  /* declare function */ Concat<T>(target: List<T>, src: List<T>): [][];
  // 清除列表
  /* declare function */ Clear<T>(list: List<T>): [][];

  // 创建实体
  /* declare function */ NewEntity(guid: GUID, tags?: List<int>): [][];
  // 创建元件
  /* declare function */ NewPrefab(
    id: Prefab,
    pos?: vec,
    rot?: vec,
    level?: int,
    use_level?: boolean,
    parent?: Entity,
    tags?: List<int>,
  ): [entity: Entity][];
  /* declare function */ NewPrefabs(
    idex: int,
    pos?: vec,
    rot?: vec,
    level?: int,
    use_level?: boolean,
    parent?: Entity,
    tags?: List<int>,
  ): [entities: List<Entity>][];
  // 销毁实体: RemoveEntity(target, true)
  // 移除实体: RemoveEntity(target, false)
  /* declare function */ RemoveEntity(
    target: Entity,
    is_destroy?: boolean,
  ): [][];
  // 激活/关闭模型显示
  /* declare function */ ModelDisplay(target: Entity, display: boolean): [][];

  // 结算关卡
  /* declare function */ Complete(): [][];

  // 传送玩家
  /* declare function */ Teleport(player: Entity, pos?: vec, rot?: vec): [][];
  // 复苏角色
  // 复苏玩家所有角色
  /* declare function */ Revive(player: Entity): [][];
  // 激活复苏点/注销复苏点: SetRevive(p, enable=true/false, point=id);
  // 允许/禁止玩家复苏: SetRevive(p, enable=true/false)
  // 设置玩家剩余复苏次数: SetRevive(p, left=count)
  // 设置玩家复苏耗时: SetRevive(p, duration=t)
  /* declare function */ SetRevive(
    player: Entity,
    enable?: boolean,
    duration?: float,
    left?: int,
    point?: int,
  ): [][];
  // 击倒玩家所有角色
  /* declare function */ Kill(player: Entity): [][];

  // 激活/关闭额外碰撞 SetCollision(e, true/false)
  // 激活/关闭额外碰撞可攀爬性 SetCollision(e, true/false, id=i, is_climb=true)
  // 激活/关闭原生碰撞  SetCollision(e, true/false)
  // 激活/关闭原生碰撞可攀爬性 SetCollision(e, true/false, is_climb=true)
  /* declare function */ SetCollision(
    target: Entity,
    enable: boolean,
    id?: int,
    is_climb?: boolean,
  ): [][];
  // 激活/关闭碰撞触发器
  /* declare function */ SetCollisionTrigger(
    target: Entity,
    enable: boolean,
    id?: int,
  ): [][];

  // 转发事件
  /* declare function */ ForwardTrigger(target: Entity): [][];

  // 设置当前环境时间(立即切换环境时间到指定小时，参数需要是0~24之间的浮点数值)
  /* declare function */ SetTime(hour: float): [][];
  // 设置环境时间流逝速度(min/second, 0~60)
  /* declare function */ SetTimeSpeed(minutes: float): [][];
}

// type AsGlobalFunctions<T> = {
//   [K in keyof T]: T[K] extends (...args: infer A) => infer R
//     ? (...args: A) => R
//     : never
// }

 declare global {
  // ------ Types ------ //
  // type int = BigInt;
  type int = bigint;
  // declare type boolean = any;
  type float = number;
  type vec = { x: float; y: float; z: float };
  type Entity = { type: "Entity"; id: float };
  type GUID = { type: "GUID"; id: float };
  type Prefab = { type: "Prefab"; id: float };
  type Config = { type: "Config"; id: float };
  type List<T> = Array<T>;
  type Dict<K, V> = Map<K, V>;
  type Count = number;
  type CountDown = number;
  // 实体类型, 枚举
  type EnumEntityType =
    | "Stage"
    | "Object"
    | "Player"
    | "Character"
    | "Creation";
  // 自定义变量快照(方便被销毁时查看变量)
  type EntityVars = { type: "EntityVars"; id: float };
  // 阵营
  type FactionType = { type: "FactionType"; id: float };
  // 死亡原因: 节点图导致/正常倒下/非正常倒下
  type EnumDeathCause = "NodeGraph" | "Defeat" | "Accident";
  type EnumInterruptStatus = "TODO";

  type EnumRoundMode =
    | "Round"
    | "RoundUp"
    | "RoundDown"
    | "Truncate";
  type EnumGameMode =
    | "PlayTest"
    | "RoomPlay"
    | "MatchmakingPlay";
  type EnumDevice =
    | "Keyboard"
    | "Gamepad"
    | "Touchscreen";
  type EnumSkillSlot =
    | "Attack"
    | "E"
    | "Q"
    | "R"
    | "T"
    | "Custom";

  // ------ 系统运算函数 ------ //
  namespace m {
    function equal<T>(x: T, y: T): boolean;

    function int(src: float | boolean): int;
    function boolean(src: float | int): int;
    function float(src: int): float;
    function string(src: int | float | boolean | vec): string;
    function string(src: Entity | GUID | FactionType): string;

    function vec(x: int, y: int, z: int): vec;
    function vec([x, y, z]: [int, int, int]): vec;
    function split_vec(v: vec): [x: int, y: int, z: int];

    function list<T>(...items: T[]): List<T>;
    function indices_of<T>(list: List<T>, item: T): List<int>;
    /** @deprecated Please use list[index] directly. */
    function list_item<T>(list: List<T>, index: int): T;
    /** @deprecated Please use list.length directly. */
    function list_len<T>(list: List<T>): int;
    /** @deprecated Please use list.includes directly. */
    function includes<T>(list: List<T>, item: T): boolean;
    function maximum(int_list: List<int>): int;
    function maximum(float_list: List<float>): float;
    function minimum(int_list: List<int>): int;
    function minimum(float_list: List<float>): float;

    function dict<K, V>(keys: List<K>, values: List<V>): Dict<K, V>;
    function dict<K, V>(...pairs: [K, V][]): Dict<K, V>;
    /** @deprecated Please use dict.has directly. */
    function dict_has<K, V>(dict: Dict<K, V>, key: K): boolean;
    /** @deprecated Please use dict.values().includes directly. */
    function dict_has_value<K, V>(dict: Dict<K, V>, value: V): boolean;
    /** @deprecated Please use dict.get directly. */
    function dict_get(): void;
    /** @deprecated Please use dict.keys directly. */
    function dict_keys(): void;
    /** @deprecated Please use dict.values directly. */
    function dict_values(): void;

    function struct<T>(...vals: (T[keyof T])[]): T;
    function split_struct<T>(src: T): (T[keyof T])[][];

    function add(x: int, y: int): int;
    function sub(x: int, y: int): int;
    function mul(x: int, y: int): int;
    function div(x: int, y: int): int;
    function mod(x: int, y: int): int;
    function min(x: int, y: int): int;
    function max(x: int, y: int): int;
    function range(min: int, max: int, x: int): int;
    function abs(x: int): int;
    function sgn(x: int): int;
    function shiftL(x: int, offset: int): int;
    function shiftR(x: int, offset: int): int;
    function bitand(x: int, y: int): int;
    function bitor(x: int, y: int): int;
    function bitxor(x: int, y: int): int;
    function bitnot(x: int, y: int): int;
    /** write x bitly from start to end(inclusive) */
    function bit_write(target: int, start: int, end: int, x: int): int;
    /** read x bitly from start to end(inclusive) */
    function bit_read(src: int, start: int, end: int): int;

    function add(x: float, y: float): float;
    function sub(x: float, y: float): float;
    function mul(x: float, y: float): float;
    function div(x: float, y: float): float;
    function min(x: float, y: float): float;
    function max(x: float, y: float): float;
    function range(x: float, min: float, max: float): float;
    function log(x: float, base: float): float;
    function pow(base: float, x: float): float;
    function cos(x: float): float;
    function sin(x: float): float;
    function tan(x: float): float;
    function acos(x: float): float;
    function asin(x: float): float;
    function atan(x: float): float;
    function deg(rad: float): float;
    function rad(deg: float): float;
    function abs(x: float): float;
    function sqrt(x: float): float;
    function sgn(x: float): float;
    function round(x: float, mode: EnumRoundMode): int;
    function floor(x: float): int;
    function ceil(x: float): int;

    function gt(x: int, y: int): boolean;
    function ge(x: int, y: int): boolean;
    function lt(x: int, y: int): boolean;
    function le(x: int, y: int): boolean;
    function gt(x: float, y: float): boolean;
    function ge(x: float, y: float): boolean;
    function lt(x: float, y: float): boolean;
    function le(x: float, y: float): boolean;

    function not(x: boolean): boolean;
    function or(x: boolean): boolean;
    function xor(x: boolean, y: boolean): boolean;
    function and(x: boolean, y: boolean): boolean;

    // ---- vec ---- //
    function distance(v1: vec, v2: vec): float;
    function normalize(v: vec): vec;
    /** Length of vec */
    function norm(v: vec): float;
    function add(v1: vec, v2: vec): vec;
    function sub(v1: vec, v2: vec): vec;
    function scale(v: vec, x: float): vec;
    function dot(v1: vec, v2: vec): float;
    function cross(v1: vec, v2: vec): vec;
    /** rad */
    function angle(v1: vec, v2: vec): float;
    /** rot is in deg uint */
    function eula_rot(front: vec, up: vec): vec;
    /** rot is in deg uint */
    function rotate(target: vec, rot: vec): vec;

    // ---- Should in query but i put them here in math ---- //
    /** from min to max */
    function random(min: float, max: float): float;
    /** from 0 to max */
    function random(max: float): float;
    /** from 0 to 1 */
    function random(): float;
    function randomInt(min?: int, max?: int): int;
    function randomDict(list: List<int>): int;

    namespace VEC {
      function zero(): vec;
      function front(): vec;
      function back(): vec;
      function up(): vec;
      function down(): vec;
      function left(): vec;
      function right(): vec;
    }

    function PI(): float;
  }

  // ------ 系统查询函数 ------ //
  namespace q {
    function game_mode(): EnumGameMode;
    function player_num(): int;

    function timezone(): int;
    function timestamp(): int;

    function env_time(): float;
    function env_day(): int;
    function game_time(): int;

    function timer(name: string, src?: Entity): float;

    function device(player: Entity): EnumDevice;
    function which_ui(player: string): int;

    function target_of(creation: Entity): Entity;
    function aggro_of(creation: Entity): List<Entity>;

    /** @deprecated Directly use `snap.var` */
    function snapshot_var(): void;
    /** @deprecated Directly use `_my_local_var` */
    function local_var(): void;
    /** @deprecated Directly use `self.var` or `entity.var` */
    function custom_var(): void;
    /** @deprecated Directly use `node.var` */
    function graph_var(): void;
    /** @deprecated Directly use `self` */
    function self(): void;

    // ------ player ------ //
    function pre_status(index: int, target?: Entity): int;
    function speed(character?: Entity): float;
    function velocity(character?: Entity): vec;

    function is_all_down(player: Entity): boolean;
    function player(id: int): Entity;
    function player(character: Entity): Entity;
    function player_id(guid: GUID): int;

    function revive_time(player: Entity): int;
    function nickname(player: Entity): string;
    function left_revives(player: Entity): int;
    function all_players(): List<Entity>;
    function all_characters(player: Entity): List<Entity>;

    function level_of(player: Entity, class_id?: Config): int;
    function class_id_of(player: Entity): Config;
    function skill_of(player: Entity, skill_slot: EnumSkillSlot): Config;
    // TODO: 16-22

    namespace attr {
      /** Character and Object and Creation */
      function level(target?: Entity): int;
      /** Character and Object and Creation */
      function hp(target?: Entity): float;
      /** Character and Object and Creation */
      function max_hp(target?: Entity): float;
      /** Character and Object and Creation */
      function atk(target?: Entity): float;
      /** Character and Object and Creation */
      function base_atk(target?: Entity): float;
      /** Character and Object and Creation */
      function def(target?: Entity): float;
      /** Character and Object and Creation */
      function base_def(target?: Entity): float;
      /** Character and Creation */
      function interrupt_threshold(target?: Entity): float;
      /** Character and Creation */
      function interrupt(target?: Entity): float;
      /** Character and Creation */
      function interrupt_status(target?: Entity): EnumInterruptStatus;

      /** Character Only */
      function crit_rate(target?: Entity): float;
      /** Character Only */
      function crit_dmg(target?: Entity): float;
      /** Character Only */
      function heal(target?: Entity): float;
      /** Character Only */
      function incoming_heal(target?: Entity): float;
      /** Character Only */
      function recharge(target?: Entity): float;
      /** Character Only */
      function cd_reduction(target?: Entity): float;
      /** Character Only */
      function shield(target?: Entity): float;

      // Object Only
      function pyro_dmg(target?: Entity): float;
      function pyro_res(target?: Entity): float;
      function hydro_dmg(target?: Entity): float;
      function hydro_res(target?: Entity): float;
      function dendro_dmg(target?: Entity): float;
      function dendro_res(target?: Entity): float;
      function electro_dmg(target?: Entity): float;
      function electro_res(target?: Entity): float;
      function anemo_dmg(target?: Entity): float;
      function anemo_res(target?: Entity): float;
      function cryo_dmg(target?: Entity): float;
      function cryo_res(target?: Entity): float;
      function geo_dmg(target?: Entity): float;
      function geo_res(target?: Entity): float;
      function physical_dmg(target?: Entity): float;
      function physical_res(target?: Entity): float;
    }

    // ------ entity ------ //
    // is on the field
    function adestne(entity: Entity): boolean;
    // get all on the field
    function adsont(type: EnumEntityType): List<Entity>;
    function adsont(prefab: Prefab): List<Entity>;
    function type(entity: Entity): EnumEntityType;

    function pos(entity?: Entity): vec;
    function rot(entity?: Entity): vec;
    function front(entity?: Entity): vec;
    function right(entity?: Entity): vec;
    function up(entity?: Entity): vec;
    function children(entity?: Entity): List<Entity>;

    function parent(entity?: Entity): Entity;
    function guid(entity: Entity): GUID;
    function entity(guid: GUID): Entity;
    function faction(entity: Entity): FactionType;
    function hostile(f1: FactionType, f2: FactionType): boolean;

    function filter(
      src: List<Entity>,
      center: vec,
      radius: float,
    ): List<Entity>;
    function filter(src: List<Entity>, type: EnumEntityType): List<Entity>;
    function filter(src: List<Entity>, prefab: Prefab): List<Entity>;
    function filter(src: List<Entity>, faction: FactionType): List<Entity>;
  }

  // ------ 系统事件函数 ------ //
  // 注意, 一些重要参数的位置被前置了, 方便直接填入/读取

  // 节点图变量变化时
  // 自定义变量变化时
  // function OnVarChange<T>(
  //   name?: string,
  //   type?: "self" | "node",
  // ): [new_val: T, old_val: T, name: string, src: Entity, src_guid: GUID][];
  function OnVarChange<T>(
    name?: symbol,
  ): [new_val: T, old_val: T, name: string, src: Entity, src_guid: GUID][];

  // 实体创建时
  function OnCreate(): [src: Entity, src_guid: GUID][];
  // 实体销毁时(仅在关卡实体上触发)
  function OnDestroy(): [
    src: Entity,
    src_guid: GUID,
    pos: vec,
    dir: vec,
    damage_src: Entity,
    vars: EntityVars,
    type: EnumEntityType,
    parent: Entity,
  ][];

  // 角色倒下时(角色实体上的节点图可以触发该事件)
  function OnDeath(): [
    character: Entity,
    cause: EnumDeathCause,
    damage_src: Entity,
  ][];
  // 角色复苏时(角色实体上的节点图可以触发该事件)
  function OnRevive(): [character: Entity][];
  // 玩家传送完成时
  function OnTeleport(): [character: Entity, character_guid: GUID][];

  // 进入碰撞触发器时
  function OnCollision(): [
    src: Entity,
    src_guid: GUID,
    trigger_id: int,
    entity: Entity,
    entity_guid: GUID,
  ][];
  // 离开碰撞触发器时
  function OnExitCollision(): [
    src: Entity,
    src_guid: GUID,
    trigger_id: int,
    entity: Entity,
    entity_guid: GUID,
  ][];

  // 基础运动器停止时
  function OnMotionFinish(): [name: string, src: Entity, src_guid: GUID][];
  // 路径到达路点时
  function OnPathFinish(): [
    name: string,
    point_index: int,
    src: Entity,
    src_guid: GUID,
  ][];

  // 命中检测触发时
  function OnHit(): [
    target: Entity,
    pos: vec,
    is_hitbox: boolean,
    src: Entity,
    src_guid: GUID,
  ][];

  // 定时器触发时
  function OnTimer(name: string): [
    name: string,
    index: int,
    i: int,
    src: Entity,
    src_guid: GUID,
  ][];
  // 全局计时器触发时
  function Timer(): [name: string, src: Entity, src_guid: GUID][];

  // 界面控件组触发时(只有触发交互的玩家节点图可以获取)
  function OnUI(): [id: int, group_id: int, src: Entity, src_guid: GUID][];
  // 选项卡选中时
  function OnTab(): [id: int, selector: Entity, src: Entity, src_guid: GUID][];

  // 监听信号
  function Signal(
    name: string,
  ): [...params: any[], sender: Entity, src: Entity, src_guid: GUID][];

  // interface globalThis extends Listed {}
  interface Array<T> extends Listed {
    [index: string | float | symbol]: [][]; // 修改索引签名返回类型
  }

  interface Object extends Listed {
  }

  // interface Branch extends Array<any> {}
  const Branch: any[][];
}

export { };

// TODO: auto sync with Listed
declare global {
  function $(lambda: (...args: any[]) => any): [][];
  // ------ 执行节点函数 ------ //
  // 打印字符串
  function Log(str: string): [][];

  // 设置局部变量: SetVal(_local_val, new_val)
  // 设置节点图变量: SetVal(self.val, new_val)
  // 设置自定义变量: SetVal(node.val, new_val)
  function SetVal<T>(
    val: T,
    new_val: T,
    target?: Entity,
    trigger_event?: boolean,
  ): [][];

  // 有限循环 (from <= i <= to)
  function Loop(
    from: int,
    to: int,
    id: string | float | boolean,
  ): [i: int][];
  // 列表迭代循环
  function ForEach<T>(list: List<T>): [item: T][];
  // 对列表插入值
  function Insert<T>(list: List<T>, index: int, val: T): [][];
  // 对列表修改值
  function Modify<T>(list: List<T>, index: int, val: T): [][];
  // 对列表移除值
  function Remove<T>(list: List<T>, index: int): [][];
  // 对列表移除值
  function Sort<T>(list: List<T>, is_increase?: boolean): [][];
  // 拼接列表
  function Concat<T>(target: List<T>, src: List<T>): [][];
  // 清除列表
  function Clear<T>(list: List<T>): [][];

  // 创建实体
  function NewEntity(guid: GUID, tags?: List<int>): [][];
  // 创建元件
  function NewPrefab(
    id: Prefab,
    pos?: vec,
    rot?: vec,
    level?: int,
    use_level?: boolean,
    parent?: Entity,
    tags?: List<int>,
  ): [entity: Entity][];
  function NewPrefabs(
    idex: int,
    pos?: vec,
    rot?: vec,
    level?: int,
    use_level?: boolean,
    parent?: Entity,
    tags?: List<int>,
  ): [entities: List<Entity>][];
  // 销毁实体: RemoveEntity(target, true)
  // 移除实体: RemoveEntity(target, false)
  function RemoveEntity(target: Entity, is_destroy?: boolean): [][];
  // 激活/关闭模型显示
  function ModelDisplay(target: Entity, display: boolean): [][];

  // 结算关卡
  function Complete(): [][];

  // 传送玩家
  function Teleport(player: Entity, pos?: vec, rot?: vec): [][];
  // 复苏角色
  // 复苏玩家所有角色
  function Revive(player: Entity): [][];
  // 激活复苏点/注销复苏点: SetRevive(p, enable=true/false, point=id);
  // 允许/禁止玩家复苏: SetRevive(p, enable=true/false)
  // 设置玩家剩余复苏次数: SetRevive(p, left=count)
  // 设置玩家复苏耗时: SetRevive(p, duration=t)
  function SetRevive(
    player: Entity,
    enable?: boolean,
    duration?: float,
    left?: int,
    point?: int,
  ): [][];
  // 击倒玩家所有角色
  function Kill(player: Entity): [][];

  // 激活/关闭额外碰撞 SetCollision(e, true/false)
  // 激活/关闭额外碰撞可攀爬性 SetCollision(e, true/false, id=i, is_climb=true)
  // 激活/关闭原生碰撞  SetCollision(e, true/false)
  // 激活/关闭原生碰撞可攀爬性 SetCollision(e, true/false, is_climb=true)
  function SetCollision(
    target: Entity,
    enable: boolean,
    id?: int,
    is_climb?: boolean,
  ): [][];
  // 激活/关闭碰撞触发器
  function SetCollisionTrigger(
    target: Entity,
    enable: boolean,
    id?: int,
  ): [][];

  // 转发事件
  function ForwardTrigger(target: Entity): [][];

  // 设置当前环境时间(立即切换环境时间到指定小时，参数需要是0~24之间的浮点数值)
  function SetTime(hour: float): [][];
  // 设置环境时间流逝速度(min/second, 0~60)
  function SetTimeSpeed(minutes: float): [][];
}
