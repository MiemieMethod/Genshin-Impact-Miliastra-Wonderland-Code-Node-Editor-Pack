graph {
  id {
    type_id: AffiliatedNode
    graph_id: 1610612742
  }
  relatedIds {
    type_id: Basic
    graph_id: 1610612742
  }
  name: "Create Composite Node"
  which: CompositeGraph
  compositeDef {
    inner {
      def {
        id {
          shellId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1610612742
          }
          kernelId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1610612742
          }
          graphId {
            class: UserDefined
            type: BasicNode
            kind: CompositeGraph
            id: 1610612742
          }
        }
        inputs {
          name: "Enumeration 1"
          xxxx_always_1: 1
          index {
            kind: InParam
          }
          type {
            class: EnumBase
            type1: 10002
            type2: EnumItem
            enumType {
              enumId: 2
            }
          }
          pinIndex: 48
        }
        type {
          kind: Composite
        }
        name: "Create Composite Node"
        which: UserComposite
      }
    }
  }
}
accessories {
  id {
    type_id: Basic
    graph_id: 1610612742
  }
  which: EntityNode
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: BasicNode
          kind: CompositeGraph
          id: 1610612742
        }
        nodes {
          nodeIndex: 1
          shellId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 475
          }
          kernelId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 476
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
                  class: EnumBase
                  itemType {
                    classBase: Server
                    type_server {
                      type: EnumItem
                    }
                  }
                  bEnum {
                  }
                }
              }
            }
            type: 14
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
                  class: EnumBase
                  itemType {
                    classBase: Server
                    type_server {
                      type: EnumItem
                    }
                  }
                  bEnum {
                  }
                }
              }
            }
            type: 14
          }
          x: -13.8
          y: -326.6
        }
        compositePins {
          outerPin {
            kind: InParam
          }
          innerNodeId: 1
          innerPin {
            kind: InParam
          }
          innerPin2 {
            kind: InParam
          }
        }
      }
    }
  }
}
filePath: "201176311-1767249053-1073741840-\\1.gia"
gameVersion: "6.2.0"
