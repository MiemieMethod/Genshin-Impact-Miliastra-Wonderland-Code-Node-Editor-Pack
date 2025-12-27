graph {
  id {
    class: Node
    type: ClientGraph
    id: 1082130437
  }
  name: "New Filter Node Graph_2"
  which: IntegerFilter
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: IntegerFilter
          kind: NodeGraph
          id: 1082130437
        }
        name: "New Filter Node Graph_2"
                nodes {
          nodeIndex: 3
          genericId {
            class: SystemDefined
            type: Filter
            kind: SysCall
            nodeId: 200122
          }
          concreteId {
            class: SystemDefined
            type: Filter
            kind: SysCall
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
            connects {
              id: 1
              connect {
                kind: OutParam
              }
              connect2 {
                kind: OutParam
              }
            }
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
              class: EnumBase
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 10000011
              }
            }
            type: 13
          }
          x: 85.6
          y: -156
        }
        nodes {
          nodeIndex: 1
          genericId {
            class: SystemDefined
            type: Filter
            kind: SysCall
            nodeId: 200011
          }
          concreteId {
            class: SystemDefined
            type: Filter
            kind: SysCall
            nodeId: 30
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: EnumBase
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 300
              }
            }
            type: 13
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
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
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
                    val: 1
                  }
                }
              }
            }
            type: 3
          }
          pins {
            i1 {
              kind: InParam
              index: 2
            }
            i2 {
              kind: InParam
              index: 2
            }
            value {
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
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
              }
            }
            type: 3
          }
          pins {
            i1 {
              kind: OutParam
            }
            i2 {
              kind: OutParam
            }
            value {
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
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
              }
            }
            type: 3
          }
          x: -578.4
          y: -5
        }
        ioNodeIndex: 3
        xxxx: 0.3
      }
    }
  }
}
filePath: "201176311-1766800208-1073741840-\\_2.gia"
gameVersion: "6.2.0"
