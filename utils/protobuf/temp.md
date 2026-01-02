首先, 复合节点是只在服务器端可用的. 
WhichDef 与 subWhich 的作用可用参考下面的数据分析. 
我猜测xxxx_always_1是位掩码, 控制可见性(考虑到有系统节点被隐藏了), 因为用户节点不能隐藏引脚, 可能是导入中强制忽略并设置为true了.
signals(我名字可能起错了)在被调用时对应Type5的引脚, 至少内部结构看类似.
CompositeDef 中没有引脚映射表了, 它与实现是弱耦合的(内部实现定义了导出引脚指向外侧哪一个), 我可以随意设置外部引脚的结构, 完全不用与内部导出引脚对应, 只有最后服务器端编译运行时才会抛出异常.
关于 varTypeShell/Kernel 的取值: 是基本类型(VarType 枚举), 我们在这一步先不分享类型系统与数值系统. 后面的注释我标错了, 是只有 Server 端.

下面给出了图的真实数据结构, 请借此对比分析, 得到更完整准确的结构分析.

最简单的用户创建的图:
```
id {
  shellId {
    origin: SYSTEM_DEFINED
    category: SERVER_BASIC
    kind: GENERATED_STUB
    uid: 1610612739
  }
  kernelId {
    origin: SYSTEM_DEFINED
    category: SERVER_BASIC
    kind: GENERATED_STUB
    uid: 1610612739
  }
  graphId {
    origin: USER_DEFINED
    category: SERVER_BASIC
    kind: COMPOSITE_GRAPH
    uid: 1610612739 // 有些时候这个 uid 可以不同于上面两个, 但必然等同实际结构定义的图
  }
}
inflows {
  xxxx_always_1: 1
  index {
    kind: IN_FLOW
  }
  persistent_pin_uid: 17
}
inputs {
  name: "Input Str"
  xxxx_always_1: 1
  index {
    kind: IN_PARAM
  }
  type {
    class: StringBase
    varTypeShell: String
    varTypeKernel: String
  }
  persistent_pin_uid: 18
}
type {
  class: Composite
}
name: "New Composite Graph"
which: UserComposite
```

发送信号而自动生成的图
```
id {
  shellId {
    origin: SYSTEM_DEFINED
    category: SERVER_BASIC
    kind: GENERATED_STUB
    uid: 1610612745
  }
  kernelId {
    origin: SYSTEM_DEFINED
    category: SERVER_BASIC
    kind: GENERATED_STUB
    uid: 1610612745
  }
  graphId {
  }
  signalVersion: 2 # 是我编辑信号结构体的次数
}
inflows {
  xxxx_always_1: 1
  index {
    kind: IN_FLOW
  }
  persistent_pin_uid: 40
}
outflows {
  xxxx_always_1: 1
  index {
    kind: OUT_FLOW
  }
  persistent_pin_uid: 41
}
inputs {
  name: "signal_field_1"
  xxxx_always_1: 1
  index {
    kind: IN_PARAM
  }
  type {
    class: IntBase
    varTypeShell: 3
    varTypeKernel: 3
  }
  persistent_pin_uid: 72
}
signals {
  name: "Input Signal Name"
  type {
    class: StringBase
    special_pin_state {
      state: SignalName
    }
  }
  specialPinType {
    kind: META_TOPIC_NAME
    index: 1
  }
  persistent_pin_uid: 42
}
type {
  class: SendSignal
  sendSignal {
    signalName: "MySignal"
    serverNodeId {
      origin: SYSTEM_DEFINED
      category: SERVER_BASIC
      kind: GENERATED_STUB
      uid: 1610612746
    }
    clientNodeId {
      origin: SYSTEM_DEFINED
      category: CLIENT_SKILL
      kind: GENERATED_STUB
      uid: 1610612747
    }
  }
}
name: "发送信号"
which: SubWhich
subWhich: SignalSub
```

最后的 which, subWhich 为:
SendSignal: SubWhich,SignalSub
ListenSignal:ListenSignal,SignalSub
SendSignalToServerFromClient:SubWhich,SignalSub


拆分结构体:
```
id {
  shellId {
    origin: SYSTEM_DEFINED
    category: SERVER_BASIC
    kind: GENERATED_STUB
    uid: 1610612749
  }
  kernelId {
    origin: SYSTEM_DEFINED
    category: SERVER_BASIC
    kind: GENERATED_STUB
    uid: 1610612749
  }
  graphId {
  }
}
inputs {
  name: "MyStru1"
  xxxx_always_1: 1
  index {
    kind: IN_PARAM
  }
  type {
    class: StructBase
    varTypeShell: Struct
    varTypeKernel: Struct
    valueId {
      id: 1077936129
    }
  }
  specialPinType {
    kind: STRUCT_REF
  }
  persistent_pin_uid: 77
}
outputs {
  name: "field 1"
  xxxx_always_1: 1
  index {
    kind: OUT_PARAM
  }
  type {
    class: StringBase
    varTypeShell: String
    varTypeKernel: String
  }
  persistent_pin_uid: 78
}
type {
  class: Split
  split {
    id: 1077936129
  }
}
name: "Split Struct"
which: Struct
subWhich: StructSub
```

最后的 which, subWhich 为:
Split: Struct,StructSub
Assembly:Struct,StructSub
Modify:SubWhich,ModifyStruct

我没能推断这两个which的顺序与逻辑关系(或者我起名字不对影响思维了), 请分析.

