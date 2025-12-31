graph {
  id {
    class: Node
    type: ClientGraph
    id: 1082130433
  }
  relatedIds {
    class: AffiliatedNode
    id:   1610612739
  }
  name: "新建技能节点图"
  which: Skills
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: Skills
          kind: NodeGraph
          id: 1082130433
        }
        name: "新建技能节点图"
        nodes {
          nodeIndex: 1
          shellId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200042
          }
          kernelId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 2001
          }
          specialPin {
            kind: Signal
          }
        }
        nodes {
          nodeIndex: 3
          shellId {
            class: SystemDefined
            type: Skill
            kind: SysGraph
            nodeId: 1610612739
          }
          kernelId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 2000
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: IntBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Integer_
                }
              }
              bInt {
                val: 123
              }
            }
            type: 3
            compositePinUid: 29
          }
          pins {
            i1 {
              kind: InParam
              index: 1
            }
            i2 {
              kind: InParam
              index: 1
            }
            value {
              class: IntBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Integer_
                }
              }
              bInt {
                val: 123456
              }
            }
            type: 3
            compositePinUid: 30
          }
          pins {
            i1 {
              kind: SignalClient
            }
            i2 {
              kind: SignalClient
            }
            value {
              class: IntBase
              itemType {
                classBase: Client
                type_client {
                  type: Integer_
                }
              }
              bInt {
              }
            }
            type: 3
            signalPin {
              kind: SignalClient
              index: 1
              signalSource {
                id: 200124
              }
            }
            compositePinUid: 11
          }
          pins {
            i1 {
              kind: SignalClient
              index: 1
            }
            i2 {
              kind: SignalClient
              index: 1
            }
            value {
              class: StringBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: String_
                }
              }
              bString {
                val: "信号_1"
              }
            }
            type: 9
            signalPin {
              kind: Signal
              index: 1
            }
            compositePinUid: 12
          }
          x: -55.2
          y: -97
          signalVersion: 2
        }
        xxx_exposed_pin_index: 1
      }
    }
  }
}
accessories {
  id {
    class: AffiliatedNode
    id: 1610612739
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612738
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612737
  }
  name: "向服务器节点图发送信号"
  which: 14
  compositeDef {
    inner {
      def {
        id {
          shellId {
            class: SystemDefined
            type: Skills
            kind: SysGraph
            id: 1610612739
          }
          kernelId {
            class: SystemDefined
            type: Skills
            kind: SysCall
            id: 2000
          }
          graphId {
          }
          signalVersion: 2
        }
        inflows {
          xxxx_always_1: 1
          index {
            kind: InFlow
          }
          pinIndex: 9
        }
        outflows {
          xxxx_always_1: 1
          index {
            kind: OutFlow
          }
          pinIndex: 10
        }
        inputs {
          name: "参数_1"
          xxxx_always_1: 1
          index {
            kind: InParam
          }
          type {
            class: IntBase
            type1: Integer
            type2: Integer
          }
          pinIndex: 29
        }
        inputs {
          name: "参数_2"
          xxxx_always_1: 1
          index {
            kind: InParam
            index: 1
          }
          type {
            class: IntBase
            type1: Integer
            type2: Integer
          }
          pinIndex: 30
        }
        signals {
          xxxx_always_1: 1
          index {
            kind: SignalClient
          }
          type {
            class: IntBase
            type2: Integer
          }
          specialPinType {
            kind: SignalClient
            index: 1
            signalSource {
              id: 200124
            }
          }
          pinIndex: 11
        }
        signals {
          name: "信号名"
          xxxx_always_1: 1
          index {
            kind: SignalClient
            index: 1
          }
          type {
            class: StringBase
            type2: BooleanList
            special_pin_state {
              state: ShowAndEditable
            }
          }
          specialPinType {
            kind: Signal
            index: 1
          }
          pinIndex: 12
        }
        type {
          kind: SendSignal
          sendSignal {
            signalName: "信号_1"
            serverNodeId {
              class: SystemDefined
              type: BasicNode
              kind: SysGraph
              id: 1610612738
            }
            clientNodeId {
              class: SystemDefined
              type: BasicNode
              kind: SysGraph
              id: 1610612737
            }
          }
        }
        name: "向服务器节点图发送信号"
        which: SubWhich
        subWhich: SignalSub
      }
    }
  }
}
accessories {
  id {
    class: AffiliatedNode
    id: 1610612738
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612737
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612739
  }
  name: "监听信号"
  which: CompositeGraph
  compositeDef {
    inner {
      def {
        id {
          shellId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1610612738
          }
          kernelId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1610612738
          }
          graphId {
          }
          signalVersion: 2
        }
        outflows {
          xxxx_always_1: 1
          index {
            kind: OutFlow
          }
          pinIndex: 4
        }
        outputs {
          name: "事件源实体"
          xxxx_always_1: 1
          index {
            kind: OutParam
          }
          type {
            type1: Entity
            type2: Entity
          }
          pinIndex: 6
        }
        outputs {
          name: "事件源GUID"
          xxxx_always_1: 1
          index {
            kind: OutParam
            index: 1
          }
          type {
            class: IdBase
            type1: GUID
            type2: GUID
          }
          pinIndex: 7
        }
        outputs {
          name: "信号来源实体"
          xxxx_always_1: 1
          index {
            kind: OutParam
            index: 2
          }
          type {
            type1: Entity
            type2: Entity
          }
          pinIndex: 8
        }
        outputs {
          name: "参数_1"
          xxxx_always_1: 1
          index {
            kind: OutParam
            index: 3
          }
          type {
            class: IntBase
            type1: Integer
            type2: Integer
          }
          pinIndex: 27
        }
        outputs {
          name: "参数_2"
          xxxx_always_1: 1
          index {
            kind: OutParam
            index: 4
          }
          type {
            class: IntBase
            type1: Integer
            type2: Integer
          }
          pinIndex: 28
        }
        signals {
          name: "信号名"
          type {
            class: StringBase
            special_pin_state {
              state: ShowAndEditable
            }
          }
          specialPinType {
            kind: Signal
            index: 1
          }
          pinIndex: 5
        }
        type {
          kind: ListenSignal
          listenSignal {
            signalName: "信号_1"
            serverNodeId {
              class: SystemDefined
              type: BasicNode
              kind: SysGraph
              id: 1610612737
            }
            clientNodeId {
              class: SystemDefined
              type: Skills
              kind: SysGraph
              id: 1610612739
            }
          }
        }
        name: "监听信号"
        which: ListenSignal
        subWhich: SignalSub
      }
    }
  }
}
accessories {
  id {
    class: AffiliatedNode
    id: 1610612737
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612738
  }
  relatedIds {
    class: AffiliatedNode
    id: 1610612739
  }
  name: "发送信号"
  which: 14
  compositeDef {
    inner {
      def {
        id {
          shellId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1610612737
          }
          kernelId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1610612737
          }
          graphId {
          }
          signalVersion: 2
        }
        inflows {
          xxxx_always_1: 1
          index {
            kind: InFlow
          }
          pinIndex: 1
        }
        outflows {
          xxxx_always_1: 1
          index {
            kind: OutFlow
          }
          pinIndex: 2
        }
        inputs {
          name: "参数_1"
          xxxx_always_1: 1
          index {
            kind: InParam
          }
          type {
            class: IntBase
            type1: Integer
            type2: Integer
          }
          pinIndex: 25
        }
        inputs {
          name: "参数_2"
          xxxx_always_1: 1
          index {
            kind: InParam
            index: 1
          }
          type {
            class: IntBase
            type1: Integer
            type2: Integer
          }
          pinIndex: 26
        }
        signals {
          name: "信号名"
          type {
            class: StringBase
            special_pin_state {
              state: ShowAndEditable
            }
          }
          specialPinType {
            kind: Signal
            index: 1
          }
          pinIndex: 3
        }
        type {
          kind: SendSignal
          sendSignal {
            signalName: "信号_1"
            serverNodeId {
              class: SystemDefined
              type: BasicNode
              kind: SysGraph
              id: 1610612738
            }
            clientNodeId {
              class: SystemDefined
              type: Skills
              kind: SysGraph
              id: 1610612739
            }
          }
        }
        name: "发送信号"
        which: SubWhich
        subWhich: SignalSub
      }
    }
  }
}
filePath: "201176311-1767144428-1073741840-\\1.gia"
gameVersion: "6.2.0"
