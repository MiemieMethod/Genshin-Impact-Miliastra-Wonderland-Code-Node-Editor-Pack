graph {
  id {
    class: Basic
    id: 1073741828
  }
  name: "server_3"
  which: EntityNode
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: BasicNode
          kind: NodeGraph
          id: 1073741828
        }
        name: "server_3"
        nodes {
          nodeIndex: 1
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 100000
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 100000
          }
          x: -461.6
          y: -75.6
        }
        nodes {
          nodeIndex: 2
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 300000
          }
          x: 608
          y: 64
        }
        nodes {
          nodeIndex: 3
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 300001
          }
          x: 908
          y: 64
        }
        nodes {
          nodeIndex: 4
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 300002
          }
          x: 1208
          y: 64
        }
        nodes {
          nodeIndex: 5
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 300003
          }
          x: 1508
          y: 64
        }
        nodes {
          nodeIndex: 6
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 300004
          }
          x: 1808
          y: 64
        }
        nodes {
          nodeIndex: 7
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 14
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 14
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
                value {
                  class: StringBase
                  itemType {
                    classBase: 1
                    itemType {
                      type: String
                    }
                  }
                  bString {
                  }
                }
              }
            }
            type: String
            connects {
              id: 1
              connect {
                kind: OutParam
                index: 4
              }
              connect2 {
                kind: OutParam
                index: 4
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
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
                value {
                  class: StringBase
                  itemType {
                    classBase: 1
                    itemType {
                      type: String
                    }
                  }
                  bString {
                  }
                }
              }
            }
            type: String
            connects {
              id: 1
              connect {
                kind: OutParam
                index: 5
              }
              connect2 {
                kind: OutParam
                index: 5
              }
            }
          }
          x: 402.666656
          y: 268.5
        }
        nodes {
          nodeIndex: 8
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 14
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 370
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
                indexOfConcrete: 5
                value {
                  class: IntBase
                  itemType {
                    classBase: 1
                    itemType {
                      type: Integer
                    }
                  }
                  bInt {
                  }
                }
              }
            }
            type: Integer
            connects {
              id: 1
              connect {
                kind: OutParam
                index: 2
              }
              connect2 {
                kind: OutParam
                index: 2
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
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
                indexOfConcrete: 5
                value {
                  class: IntBase
                  itemType {
                    classBase: 1
                    itemType {
                      type: Integer
                    }
                  }
                  bInt {
                  }
                }
              }
            }
            type: Integer
            connects {
              id: 1
              connect {
                kind: OutParam
                index: 3
              }
              connect2 {
                kind: OutParam
                index: 3
              }
            }
          }
          x: 406.666656
          y: 83.1666641
        }
        nodes {
          nodeIndex: 9
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 14
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 15
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
                indexOfConcrete: 1
                value {
                  class: IdBase
                  itemType {
                    classBase: 1
                    itemType {
                      type: GUID
                    }
                  }
                  bId {
                  }
                }
              }
            }
            type: GUID
            connects {
              id: 1
              connect {
                kind: OutParam
                index: 1
              }
              connect2 {
                kind: OutParam
                index: 1
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
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
                indexOfConcrete: 1
                value {
                  class: IdBase
                  itemType {
                    classBase: 1
                    itemType {
                      type: GUID
                    }
                  }
                  bId {
                  }
                }
              }
            }
            type: GUID
          }
          x: 246.4
          y: 5.4333334
        }
        nodes {
          nodeIndex: 10
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 14
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 16
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
                indexOfConcrete: 2
                value {
                  itemType {
                    classBase: 1
                    itemType {
                      type: Entity
                    }
                  }
                }
              }
            }
            type: Entity
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
              class: ConcreteBase
              alreadySetVal: true
              bConcreteValue {
                indexOfConcrete: 2
                value {
                  itemType {
                    classBase: 1
                    itemType {
                      type: Entity
                    }
                  }
                }
              }
            }
            type: Entity
          }
          x: 414
          y: -198.166672
        }
      }
    }
  }
}
filePath: "201176311-1765008862-1073741840-\\server.gia"
gameVersion: "6.2.0"
