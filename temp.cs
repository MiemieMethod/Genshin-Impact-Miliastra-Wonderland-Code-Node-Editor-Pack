graph {
  id {
    type_id: Node
    kind_id: ClientGraph
    graph_id: 1082130435
  }
  name: "New Skill Node Graph"
  which: Skills
  graph {
    inner {
      graph {
        id {
          class: UserDefined
          type: Skills
          kind: NodeGraph
          id: 1082130435
        }
        name: "New Skill Node Graph"
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
          nodeIndex: 17
          shellId {
            class: SystemDefined
            type: Skill
            kind: SysCall
            nodeId: 200059
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
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 2001
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
              class: StringBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: String_
                }
              }
              bString {
                val: "12"
              }
            }
            type: 9
          }
          pins {
            i1 {
              kind: InParam
              index: 2
            }
            i2 {
              kind: InParam
              index: 6
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                  x: 12
                }
              }
            }
            type: 11
          }
          pins {
            i1 {
              kind: InParam
              index: 3
            }
            i2 {
              kind: InParam
              index: 7
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                  x: 12
                }
              }
            }
            type: 11
          }
          pins {
            i1 {
              kind: InParam
              index: 4
            }
            i2 {
              kind: InParam
              index: 3
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 12
              }
            }
            type: 7
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
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 12
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 6
            }
            i2 {
              kind: InParam
              index: 5
            }
            value {
              itemType {
                classBase: Client
                type_client {
                  type: EnumList_
                }
              }
            }
            type: 17
          }
          pins {
            i1 {
              kind: InParam
              index: 7
            }
            i2 {
              kind: InParam
              index: 29
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 2102
              }
            }
            type: 13
          }
          pins {
            i1 {
              kind: InParam
              index: 8
            }
            i2 {
              kind: InParam
              index: 2
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
                val: 12
              }
            }
            type: 3
          }
          pins {
            i1 {
              kind: InParam
              index: 9
            }
            i2 {
              kind: InParam
              index: 8
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 401
              }
            }
            type: 13
          }
          pins {
            i1 {
              kind: InParam
              index: 10
            }
            i2 {
              kind: InParam
              index: 9
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: VectorList_
                }
              }
              bVector {
                val {
                  x: 12
                }
              }
            }
            type: 12
          }
          pins {
            i1 {
              kind: InParam
              index: 11
            }
            i2 {
              kind: InParam
              index: 10
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 12
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 12
            }
            i2 {
              kind: InParam
              index: 11
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 12
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 13
            }
            i2 {
              kind: InParam
              index: 12
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 12
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 14
            }
            i2 {
              kind: InParam
              index: 13
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 12
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 15
            }
            i2 {
              kind: InParam
              index: 14
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 12
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 16
            }
            i2 {
              kind: InParam
              index: 15
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 451
              }
            }
            type: 13
          }
          pins {
            i1 {
              kind: InParam
              index: 17
            }
            i2 {
              kind: InParam
              index: 16
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 2602
              }
            }
            type: 13
          }
          pins {
            i1 {
              kind: InParam
              index: 18
            }
            i2 {
              kind: InParam
              index: 17
            }
            value {
              class: ArrayBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: StringList_
                }
              }
              bArray {
                entries {
                  class: StringBase
                  alreadySetVal: true
                  itemType {
                    classBase: Client
                    type_client {
                      type: String_
                    }
                  }
                  bString {
                    val: "12"
                  }
                }
              }
            }
            type: 10
          }
          pins {
            i1 {
              kind: InParam
              index: 19
            }
            i2 {
              kind: InParam
              index: 18
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 1302
              }
            }
            type: 13
          }
          pins {
            i1 {
              kind: InParam
              index: 20
            }
            i2 {
              kind: InParam
              index: 19
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 12
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 21
            }
            i2 {
              kind: InParam
              index: 20
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 2202
              }
            }
            type: 13
          }
          pins {
            i1 {
              kind: InParam
              index: 22
            }
            i2 {
              kind: InParam
              index: 21
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 2301
              }
            }
            type: 13
          }
          pins {
            i1 {
              kind: InParam
              index: 23
            }
            i2 {
              kind: InParam
              index: 22
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 12
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 24
            }
            i2 {
              kind: InParam
              index: 23
            }
            value {
              class: EnumBase
              itemType {
                classBase: Client
                type_client {
                  type: Boolean_
                }
              }
              bEnum {
              }
            }
            type: 5
          }
          pins {
            i1 {
              kind: InParam
              index: 25
            }
            i2 {
              kind: InParam
              index: 24
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Boolean_
                }
              }
              bEnum {
                val: 1
              }
            }
            type: 5
          }
          pins {
            i1 {
              kind: InParam
              index: 26
            }
            i2 {
              kind: InParam
              index: 25
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
                val: 12
              }
            }
            type: 3
          }
          pins {
            i1 {
              kind: InParam
              index: 27
            }
            i2 {
              kind: InParam
              index: 26
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
              }
            }
            type: 13
          }
          pins {
            i1 {
              kind: InParam
              index: 28
            }
            i2 {
              kind: InParam
              index: 27
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 2506
              }
            }
            type: 13
          }
          pins {
            i1 {
              kind: InParam
              index: 29
            }
            i2 {
              kind: InParam
              index: 28
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Boolean_
                }
              }
              bEnum {
                val: 1
              }
            }
            type: 5
          }
          pins {
            i1 {
              kind: InParam
              index: 30
            }
            i2 {
              kind: InParam
              index: 30
            }
            value {
              class: StringBase
              itemType {
                classBase: Client
                type_client {
                  type: String_
                }
              }
              bString {
              }
            }
            type: 9
          }
          pins {
            i1 {
              kind: InParam
              index: 31
            }
            i2 {
              kind: InParam
              index: 31
            }
            value {
              class: EnumBase
              itemType {
                classBase: Client
                type_client {
                  type: Boolean_
                }
              }
              bEnum {
              }
            }
            type: 5
          }
          pins {
            i1 {
              kind: InParam
              index: 32
            }
            i2 {
              kind: InParam
              index: 32
            }
            value {
              class: EnumBase
              itemType {
                classBase: Client
                type_client {
                  type: Boolean_
                }
              }
              bEnum {
              }
            }
            type: 5
          }
          pins {
            i1 {
              kind: InParam
              index: 33
            }
            i2 {
              kind: InParam
              index: 33
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                  x: 12
                }
              }
            }
            type: 11
          }
          pins {
            i1 {
              kind: InParam
              index: 34
            }
            i2 {
              kind: InParam
              index: 34
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                  x: 12
                }
              }
            }
            type: 11
          }
          pins {
            i1 {
              kind: InParam
              index: 35
            }
            i2 {
              kind: InParam
              index: 35
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 12
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 36
            }
            i2 {
              kind: InParam
              index: 36
            }
            value {
              class: StringBase
              itemType {
                classBase: Client
                type_client {
                  type: String_
                }
              }
              bString {
              }
            }
            type: 9
          }
          pins {
            i1 {
              kind: InParam
              index: 37
            }
            i2 {
              kind: InParam
              index: 37
            }
            value {
              class: EnumBase
              itemType {
                classBase: Client
                type_client {
                  type: Boolean_
                }
              }
              bEnum {
              }
            }
            type: 5
          }
          pins {
            i1 {
              kind: InParam
              index: 38
            }
            i2 {
              kind: InParam
              index: 38
            }
            value {
              class: EnumBase
              itemType {
                classBase: Client
                type_client {
                  type: Boolean_
                }
              }
              bEnum {
              }
            }
            type: 5
          }
          pins {
            i1 {
              kind: InParam
              index: 39
            }
            i2 {
              kind: InParam
              index: 39
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                  x: 12
                }
              }
            }
            type: 11
          }
          pins {
            i1 {
              kind: InParam
              index: 40
            }
            i2 {
              kind: InParam
              index: 40
            }
            value {
              class: VectorBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Vector_
                }
              }
              bVector {
                val {
                  x: 12
                }
              }
            }
            type: 11
          }
          pins {
            i1 {
              kind: InParam
              index: 41
            }
            i2 {
              kind: InParam
              index: 41
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 12
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 42
            }
            i2 {
              kind: InParam
              index: 42
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 12
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 43
            }
            i2 {
              kind: InParam
              index: 43
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
                val: 12
              }
            }
            type: 3
          }
          pins {
            i1 {
              kind: InParam
              index: 44
            }
            i2 {
              kind: InParam
              index: 44
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
                val: 3200
              }
            }
            type: 13
          }
          pins {
            i1 {
              kind: InParam
              index: 45
            }
            i2 {
              kind: InParam
              index: 45
            }
            value {
              class: EnumBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: EnumItem_
                }
              }
              bEnum {
                val: 3903
              }
            }
            type: 13
          }
          pins {
            i1 {
              kind: InParam
              index: 46
            }
            i2 {
              kind: InParam
              index: 46
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 12
              }
            }
            type: 7
          }
          pins {
            i1 {
              kind: InParam
              index: 47
            }
            i2 {
              kind: InParam
              index: 47
            }
            value {
              class: FloatBase
              alreadySetVal: true
              itemType {
                classBase: Client
                type_client {
                  type: Float_
                }
              }
              bFloat {
                val: 12
              }
            }
            type: 7
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
                id: 200059
              }
            }
          }
          x: 4295.85791
          y: -66.0949
        }
        xxx_exposed_pin_index: 1
      }
    }
  }
}
filePath: "201176311-1767203236-1073741840-\\1.gia"
gameVersion: "6.2.0"
