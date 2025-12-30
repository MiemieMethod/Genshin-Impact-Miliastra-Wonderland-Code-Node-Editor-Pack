graph {
  id {
    class: AffiliatedNode
    id: 1073741826
  }
  relatedIds {
    class: Basic
    id: 1073741827
  }
  name: "创建复合节点(3)(1)"
  which: CompositeGraph
  compositeDef {
    inner {
      def {
        id {
          genericId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1073741826
          }
          concreteId {
            class: SystemDefined
            type: BasicNode
            kind: SysGraph
            id: 1073741826
          }
          graphId {
            class: UserDefined
            type: BasicNode
            kind: CompositeGraph
            id: 1073741827
          }
        }
        inputs {
          name: "旋转偏移"
          xxxx_visible: 1
          index {
            kind: InParam
          }
          type {
            class: VectorBase
            type1: Vector
            type2: Vector
          }
          pinIndex: 16
        }
        inputs {
          name: "缩放倍率"
          xxxx_visible: 1
          index {
            kind: InParam
            index: 1
          }
          type {
            class: FloatBase
            type1: Float
            type2: Float
          }
          pinIndex: 17
        }
        type {
          kind: Composite
        }
        name: "创建复合节点(3)(1)"
        which: 6
      }
    }
  }
}
accessories {
  id {
    class: Basic
    id: 1073741827
  }
  which: EntityNode
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: BasicNode
          kind: CompositeGraph
          id: 1073741827
        }
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
          pins {
            i1 {
              kind: InParam
              index: 4
            }
            i2 {
              kind: InParam
              index: 7
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Boolean
                }
              }
              bEnum {
              }
            }
            type: 4
          }
          pins {
            i1 {
              kind: InParam
              index: 5
            }
            i2 {
              kind: InParam
              index: 4
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Server
                type_server {
                  type: Vector
                }
              }
              bVector {
                val {
                  x: 12
                  y: 2
                  z: 3
                }
              }
            }
            type: 12
          }
          x: 12.6
          y: -541
        }
        compositePins {
          outerPin {
            kind: InParam
          }
          innerNodeId: 1
          innerPin {
            kind: InParam
            index: 6
          }
          innerPin2 {
            kind: InParam
            index: 5
          }
        }
        compositePins {
          outerPin {
            kind: InParam
            index: 1
          }
          innerNodeId: 1
          innerPin {
            kind: InParam
            index: 7
          }
          innerPin2 {
            kind: InParam
            index: 6
          }
        }
      }
    }
  }
}
filePath: "201176311-1767088242-1073741840-\\1.gia"
gameVersion: "6.2.0"
