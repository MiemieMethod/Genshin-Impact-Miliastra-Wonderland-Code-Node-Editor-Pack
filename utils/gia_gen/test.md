参考上面我们总结的结构, 以及我之前猜测的proto3结构, 重新规范每个字段的名称和作用, 有不清楚的地方, 或有一些猜测要询问我.

message GraphNode {
  int32 nodeIndex = 1;                  // 1
  NodeProperty shellId = 2;             // Node's Template's Id
  optional NodeProperty kernelId = 3;   // Node's own Id(Null for generic nodes without types)
  repeated NodePin pins = 4;            // connect to other nodes
  float x = 5;                          // xpos
  float y = 6;                          // ypos
  optional Comments comments = 7;       // comments
  optional PinIndex specialPin = 8;     // Only in client Nodes
  optional int32 signalVersion = 9;     // Signals modified times
  repeated GraphAffiliation.Info usingStruct = 10;
}

message NodeProperty {
  enum Type {
    Unknown = 0;
    Server = 20000;
    Filter = 20001;
    Skill = 20002;
  }

  NodeGraph.Id.Class class = 1; // 10001
  Type type = 2;                // 20000 / 20002
  NodeGraph.Id.Kind kind = 3;   // 22000
  int32 nodeId = 5;             // enum.ts/NodeId
}

message PinIndex {
  enum Kind {
    Unknown = 0;
    InFlow = 1;
    OutFlow = 2;
    InParam = 3;
    OutParam = 4;

    SignalClient = 5;
    Signal = 6;
    Struct = 13;
    ModifyStructKey = 14;
    SetStructKey = 15;
    SelectStructKeys = 16;
  }
  Kind kind = 1;
  int32 index = 2; // index of the pin

  message SignalId { int64 id = 1; }
  optional SignalId signalSource = 100;
}

message NodePin {
  PinIndex i1 = 1;
  PinIndex i2 = 2;
  VarBase value = 3;
  int32 type = 4; // Be careful! VarType in Server and ClientVarType in Client
  repeated NodeConnection connects = 5; // OutFlow or InParam
  optional PinIndex signalPin = 6;
  optional int32 compositePinUid = 7; // Only when calling composite node
}

message NodeConnection {
  int32 id = 1;
  PinIndex connect = 2;
  PinIndex connect2 = 3;
}

message CompositePin {
  PinIndex outerPin = 1;
  int32 innerNodeId = 2;
  PinIndex innerPin = 3;
  PinIndex innerPin2 = 4;
}




composite 定义分为两个部分: 外壳定义与内部结构定义.
外壳定义非常简单: 有哪些引脚, 是什么类型, 有什么名字, 并分配一个全局的 composite pin id (从1开始)
内部结构定义包含基本的图结构, 并单独保存了对外的引脚列表(compositePins), 每一项均包含这些信息: 连接到了哪一个外壳引脚(组别和index), 内部连接的是哪个节点的哪个引脚(nodeIndex + pinType/Index of Shell and Kernel)


外壳定义非常简单: 有哪些引脚, 是什么类型, 有什么名字, 并分配一个全局的 composite pin id (从1开始) **可以用来导出枚举的id和类型扩展**
结构不能说很差吧, 反正不好.