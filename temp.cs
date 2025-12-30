graph {
  id {
    class: AffiliatedNode
    id: 1610612741
  }
  relatedIds {
    class: Basic
    id: 1610612741
  }
  name: "创建复合节点"
  which: CompositeGraph
  compositeDef {
    inner {
      def {
        id {
          genericId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1610612741
          }
          concreteId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1610612741
          }
          graphId {
            class: UserDefined
            type: BasicNode
            kind: CompositeGraph
            id: 1610612741
          }
        }
        inputs {
          name: "局部变量"
          xxxx_visible: 1
          index {
            kind: InParam
          }
          type {
            type1: LocalVariable
            type2: LocalVariable
          }
          pinIndex: 28
        }
        inputs {
          name: "值"
          xxxx_visible: 1
          index {
            kind: InParam
            index: 1
          }
          type {
            class: StringBase
            type1: String
            type2: String
          }
          pinIndex: 29
        }
        type {
          kind: Composite
        }
        name: "创建复合节点"
        which: 6
      }
    }
  }
}
accessories {
  id {
    class: Basic
    id: 1610612741
  }
  which: EntityNode
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: BasicNode
          kind: CompositeGraph
          id: 1610612741
        }
        nodes {
          nodeIndex: 5
          genericId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 19
          }
          concreteId {
            class: SystemDefined
            type: Server
            kind: SysCall
            nodeId: 2674
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
                  class: StringBase
                  itemType {
                    classBase: Server
                    type_server {
                      type: String
                    }
                  }
                  bString {
                  }
                }
              }
            }
            type: 6
          }
          x: 43.8
          y: -270.6
        }
        compositePins {
          outerPin {
            kind: InParam
          }
          innerNodeId: 5
          innerPin {
            kind: InParam
          }
          innerPin2 {
            kind: InParam
          }
        }
        compositePins {
          outerPin {
            kind: InParam
            index: 1
          }
          innerNodeId: 5
          innerPin {
            kind: InParam
            index: 1
          }
          innerPin2 {
            kind: InParam
            index: 1
          }
        }
      }
    }
  }
}
filePath: "201176311-1767089474-1073741840-\\1.gia"
gameVersion: "6.2.0"
