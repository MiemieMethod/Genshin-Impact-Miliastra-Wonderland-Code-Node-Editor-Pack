graph {
  id {
    type: Basic
    id: 1025528424
  }
  name: "another not large"
  type: EntityNode
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: BasicNode
          kind: NodeGraph
          id: 1025528424
        }
        name: "another not large"
        nodes {
          nodeIndex: 1
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 93
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 93
          }
          x: 4.11030674
          y: 9.07218552
        }
        nodes {
          nodeIndex: 2
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 200
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 201
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
                  class: FloatBase
                  alreadySetVal: true
                  itemType {
                    classBase: 1
                    itemType {
                      type: Float
                    }
                  }
                  bFloat {
                  }
                }
              }
            }
            type: Float
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
                  class: FloatBase
                  alreadySetVal: true
                  itemType {
                    classBase: 1
                    itemType {
                      type: Float
                    }
                  }
                  bFloat {
                  }
                }
              }
            }
            type: Float
          }
          pins {
            i1 {
              kind: OutParam
            }
            i2 {
              kind: OutParam
            }
            value {
              class: NodeValueBase
              alreadySetVal: true
              bNodeValue {
                indexOfConcrete: 1
                value {
                  class: FloatBase
                  alreadySetVal: true
                  itemType {
                    classBase: 1
                    itemType {
                      type: Float
                    }
                  }
                  bFloat {
                  }
                }
              }
            }
            type: Float
          }
          x: -894.82843
          y: 8.23610115
        }
      }
    }
  }
}
filePath: "201056545-1764347908-1025528425-\\another_not_large"
