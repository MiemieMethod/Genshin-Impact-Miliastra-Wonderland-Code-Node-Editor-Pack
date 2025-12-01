graph {
  id {
    type: Basic
    id: 1073741828
  }
  name: "\346\226\260\345\273\272\350\212\202\347\202\271\345\233\276"
  type: EntityNode
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: BasicNode
          kind: NodeGraph
          id: 1073741828
        }
        name: "\346\226\260\345\273\272\350\212\202\347\202\271\345\233\276"
        nodes {
          nodeIndex: 1
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 1
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 1
          }
          pins {
            i1 {
              kind: OutFlow
            }
            i2 {
              kind: OutFlow
            }
            connects {
              id: 2
              connect {
                kind: InFlow
              }
              connect2 {
                kind: InFlow
              }
            }
          }
          x: -473.257141
          y: -250.828568
        }
        nodes {
          nodeIndex: 2
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 5
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 5
          }
          pins {
            i1 {
              kind: OutFlow
            }
            i2 {
              kind: OutFlow
            }
            connects {
              id: 3
              connect {
                kind: InFlow
                index: 1
              }
              connect2 {
                kind: InFlow
                index: 1
              }
            }
            connects {
              id: 3
              connect {
                kind: InFlow
              }
              connect2 {
                kind: InFlow
              }
            }
          }
          pins {
            i1 {
              kind: OutFlow
              index: 1
            }
            i2 {
              kind: OutFlow
              index: 1
            }
            connects {
              id: 3
              connect {
                kind: InFlow
              }
              connect2 {
                kind: InFlow
              }
            }
          }
          x: -184.8
          y: -190.6
        }
        nodes {
          nodeIndex: 3
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 5
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 5
          }
          pins {
            i1 {
              kind: OutFlow
            }
            i2 {
              kind: OutFlow
            }
            connects {
              id: 4
              connect {
                kind: InFlow
              }
              connect2 {
                kind: InFlow
              }
            }
          }
          pins {
            i1 {
              kind: OutFlow
              index: 1
            }
            i2 {
              kind: OutFlow
              index: 1
            }
            connects {
              id: 6
              connect {
                kind: InFlow
              }
              connect2 {
                kind: InFlow
              }
            }
          }
          x: 284.8
          y: -202.6
        }
        nodes {
          nodeIndex: 4
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 2
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 2
          }
          pins {
            i1 {
              kind: OutFlow
            }
            i2 {
              kind: OutFlow
            }
            connects {
              id: 5
              connect {
                kind: InFlow
              }
              connect2 {
                kind: InFlow
              }
            }
            connects {
              id: 7
              connect {
                kind: InFlow
              }
              connect2 {
                kind: InFlow
              }
            }
          }
          x: 840.8
          y: -341.8
          comments {
            content: "4"
          }
        }
        nodes {
          nodeIndex: 5
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 1
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 1
          }
          x: 1436
          y: -395.4
          comments {
            content: "5"
          }
        }
        nodes {
          nodeIndex: 6
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 3
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 4
          }
          pins {
            i1 {
              kind: OutFlow
              index: 2
            }
            i2 {
              kind: OutFlow
              index: 2
            }
            connects {
              id: 5
              connect {
                kind: InFlow
              }
              connect2 {
                kind: InFlow
              }
            }
            connects {
              id: 7
              connect {
                kind: InFlow
              }
              connect2 {
                kind: InFlow
              }
            }
          }
          pins {
            i1 {
              kind: OutFlow
              index: 3
            }
            i2 {
              kind: OutFlow
              index: 3
            }
            connects {
              id: 7
              connect {
                kind: InFlow
              }
              connect2 {
                kind: InFlow
              }
            }
          }
          pins {
            i1 {
              kind: InParam
            }
            i2 {
              kind: InParam
            }
            value {
              class: NodeValueBase
              alreadySetVal: true
              bNodeValue {
                indexOfConcrete: 1
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
              class: NodeValueBase
              alreadySetVal: true
              bNodeValue {
                indexOfConcrete: 1
                value {
                  class: ArrayBase
                  alreadySetVal: true
                  itemType {
                    classBase: 1
                    itemType {
                      type: StringList
                    }
                  }
                  bArray {
                    entries {
                      class: StringBase
                      alreadySetVal: true
                      itemType {
                        classBase: 1
                        itemType {
                          type: String
                        }
                      }
                      bString {
                        val: "12"
                      }
                    }
                    entries {
                      class: StringBase
                      alreadySetVal: true
                      itemType {
                        classBase: 1
                        itemType {
                          type: String
                        }
                      }
                      bString {
                        val: "22"
                      }
                    }
                    entries {
                      class: StringBase
                      alreadySetVal: true
                      itemType {
                        classBase: 1
                        itemType {
                          type: String
                        }
                      }
                      bString {
                        val: "33"
                      }
                    }
                  }
                }
              }
            }
            type: StringList
          }
          x: 814.4
          y: -129
          comments {
            content: "6"
          }
        }
        nodes {
          nodeIndex: 7
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 1
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 1
          }
          x: 1401.6
          y: 4.6
          comments {
            content: "7"
          }
        }
        comments {
          content: "1"
          x: -417.028564
          y: -311.028564
        }
        comments {
          content: "2"
          x: -125.6
          y: -237.885712
        }
        comments {
          content: "3"
          x: 360.114288
          y: -253.885712
        }
      }
    }
  }
}
filePath: "201176311-1764554023-1073741837-\\link.gia"
