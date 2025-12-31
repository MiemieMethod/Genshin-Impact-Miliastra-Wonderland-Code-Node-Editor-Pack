graph {
  id {
    type_id: Node
    kind_id: ClientGraph
    graph_id: 1082130434
  }
  name: "New Skill Node Graph_1"
  which: Skills
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: Skills
          kind: NodeGraph
          id: 1082130434
        }
        name: "New Skill Node Graph_1"
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
          nodeIndex: 2
          shellId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200124
          }
          kernelId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 2000
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
                val: "12345t"
              }
            }
            type: 9
            signalPin {
              kind: Signal
              index: 1
            }
          }
          x: -120.8
          y: -242.2
        }
        xxx_exposed_pin_index: 1
      }
    }
  }
}
filePath: "201176311-1767195600-1073741840-\\1.gia"
gameVersion: "6.2.0"
