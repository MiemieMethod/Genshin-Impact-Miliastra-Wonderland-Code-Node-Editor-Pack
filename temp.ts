const res = Graph {
  system: 'ENTITY_NODE_GRAPH',
  graph_name: 'within per based',
  uid: 201233286,
  graph_id: 1073742400,
  file_id: 1073742401,
  counter_idx: Counter { count: 3 },
  counter_dyn_id: Counter { count: 1073742401 },
  nodes: Set(3) {
    <ref *1> Node {
      system: 'ENTITY_NODE_GRAPH',
      node_index: 1,
      def: {
        Identifier: 'Trigger.Tab.On_Tab_Select',
        ID: 307,
        InGameName: { en: 'When Tab Is Selected', 'zh-Hans': '选项卡选中时' },
        Alias: [ 'When_Tab_Is_Selected' ],
        Type: 'Fixed',
        System: 'Server',
        Domain: 'Trigger',
        FlowPins: [
          {
            Identifier: 'FlowOut',
            Direction: 'Out',
            Label: { en: '', 'zh-Hans': '' },
            ShellIndex: 0,
            KernelIndex: 0
          }
        ],
        DataPins: [
          {
            Identifier: 'Output0',
            Direction: 'Out',
            Type: 'Ety',
            Label: null,
            Placeholder: null,
            ShellIndex: 0,
            KernelIndex: 0,
            Visibility: 'Display',
            Connectability: true
          },
          {
            Identifier: 'Output1',
            Direction: 'Out',
            Type: 'Gid',
            Label: null,
            Placeholder: null,
            ShellIndex: 1,
            KernelIndex: 1,
            Visibility: 'Display',
            Connectability: true
          },
          {
            Identifier: 'Output2',
            Direction: 'Out',
            Type: 'Int',
            Label: null,
            Placeholder: null,
            ShellIndex: 2,
            KernelIndex: 2,
            Visibility: 'Display',
            Connectability: true
          },
          {
            Identifier: 'Output3',
            Direction: 'Out',
            Type: 'Ety',
            Label: null,
            Placeholder: null,
            ShellIndex: 3,
            KernelIndex: 3,
            Visibility: 'Display',
            Connectability: true
          },
          {
            Identifier: 'Output4',
            Direction: 'Out',
            Type: 'Gid',
            Label: null,
            Placeholder: null,
            ShellIndex: 4,
            KernelIndex: 4,
            Visibility: 'Display',
            Connectability: true
          }
        ],
        Implementation: null,
        __ref_id: 'event.tabSelected',
        __todo_set_out_pin: true
      },
      variant_def: null,
      constraint: undefined,
      pin_values: Map(0) {},
      data_from: Map(0) {},
      data_to: Map(1) {
        'Statement' => Set(1) {
          <ref *2> {
            from: [Circular *1],
            to: <ref *3> Node {
              system: 'ENTITY_NODE_GRAPH',
              node_index: 2,
              def: {
                Identifier: 'Control.General.Switch',
                ID: 3,
                InGameName: { en: 'Multiple Branches', 'zh-Hans': '多分支' },
                Alias: [ 'Multiple_Branches' ],
                Type: 'Variant',
                System: 'Server',
                Domain: 'Control',
                FlowPins: [
                  {
                    Identifier: 'FlowIn',
                    Direction: 'In',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'DefaultBranch',
                    Direction: 'Out',
                    ShellIndex: 0,
                    KernelIndex: 0,
                    Label: { en: 'Default', 'zh-Hans': '默认' }
                  },
                  {
                    Identifier: 'Case1',
                    Direction: 'Out',
                    ShellIndex: 1,
                    KernelIndex: 1,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case2',
                    Direction: 'Out',
                    ShellIndex: 2,
                    KernelIndex: 2,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case3',
                    Direction: 'Out',
                    ShellIndex: 3,
                    KernelIndex: 3,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case4',
                    Direction: 'Out',
                    ShellIndex: 4,
                    KernelIndex: 4,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case5',
                    Direction: 'Out',
                    ShellIndex: 5,
                    KernelIndex: 5,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case6',
                    Direction: 'Out',
                    ShellIndex: 6,
                    KernelIndex: 6,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case7',
                    Direction: 'Out',
                    ShellIndex: 7,
                    KernelIndex: 7,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case8',
                    Direction: 'Out',
                    ShellIndex: 8,
                    KernelIndex: 8,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case9',
                    Direction: 'Out',
                    ShellIndex: 9,
                    KernelIndex: 9,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  }
                ],
                DataPins: [
                  {
                    Identifier: 'Statement',
                    Direction: 'In',
                    Type: 'R<T>',
                    Label: null,
                    Placeholder: null,
                    ShellIndex: 0,
                    KernelIndex: 0,
                    Visibility: 'Display',
                    Connectability: true
                  },
                  {
                    Identifier: 'CasesList',
                    Direction: 'In',
                    Type: 'L<R<T>>',
                    Label: null,
                    Placeholder: null,
                    ShellIndex: 1,
                    KernelIndex: 1,
                    Visibility: 'Display',
                    Editability: true,
                    Connectability: true
                  }
                ],
                Variants: [
                  {
                    Constraints: 'S<T:Int>',
                    KernelID: 3,
                    InjectedContents: [
                      { Identifier: 'Statement', TypeSelectorIndex: 0 },
                      { Identifier: 'CasesList', TypeSelectorIndex: 0 }
                    ]
                  },
                  {
                    Constraints: 'S<T:Str>',
                    KernelID: 4,
                    InjectedContents: [
                      { Identifier: 'Statement', TypeSelectorIndex: 1 },
                      { Identifier: 'CasesList', TypeSelectorIndex: 1 }
                    ]
                  }
                ],
                Implementation: null,
                __ref_id: 'flow.branch.multi',
                __todo_set_in_manually: true
              },
              variant_def: null,
              constraint: undefined,
              pin_values: Map(0) {},
              data_from: Map(1) { 'Statement' => [Circular *2] },
              data_to: Map(0) {},
              flow_from: Map(1) {
                'FlowIn' => Set(1) {
                  {
                    from: [Circular *1],
                    to: [Circular *3],
                    from_pin: {
                      Identifier: 'FlowOut',
                      Direction: 'Out',
                      Label: { en: '', 'zh-Hans': '' },
                      ShellIndex: 0,
                      KernelIndex: 0
                    },
                    to_pin: {
                      Identifier: 'FlowIn',
                      Direction: 'In',
                      Label: { en: '', 'zh-Hans': '' }
                    }
                  }
                }
              },
              flow_to: Map(0) {},
              x: 0,
              y: 0,
              comment: null
            },
            from_pin: {
              Identifier: 'Output2',
              Direction: 'Out',
              Type: 'Int',
              Label: null,
              Placeholder: null,
              ShellIndex: 2,
              KernelIndex: 2,
              Visibility: 'Display',
              Connectability: true
            },
            to_pin: {
              Identifier: 'Statement',
              Direction: 'In',
              Type: 'R<T>',
              Label: null,
              Placeholder: null,
              ShellIndex: 0,
              KernelIndex: 0,
              Visibility: 'Display',
              Connectability: true
            }
          }
        }
      },
      flow_from: Map(0) {},
      flow_to: Map(1) {
        'FlowIn' => [
          <ref *4> {
            from: [Circular *1],
            to: <ref *3> Node {
              system: 'ENTITY_NODE_GRAPH',
              node_index: 2,
              def: {
                Identifier: 'Control.General.Switch',
                ID: 3,
                InGameName: { en: 'Multiple Branches', 'zh-Hans': '多分支' },
                Alias: [ 'Multiple_Branches' ],
                Type: 'Variant',
                System: 'Server',
                Domain: 'Control',
                FlowPins: [
                  {
                    Identifier: 'FlowIn',
                    Direction: 'In',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'DefaultBranch',
                    Direction: 'Out',
                    ShellIndex: 0,
                    KernelIndex: 0,
                    Label: { en: 'Default', 'zh-Hans': '默认' }
                  },
                  {
                    Identifier: 'Case1',
                    Direction: 'Out',
                    ShellIndex: 1,
                    KernelIndex: 1,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case2',
                    Direction: 'Out',
                    ShellIndex: 2,
                    KernelIndex: 2,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case3',
                    Direction: 'Out',
                    ShellIndex: 3,
                    KernelIndex: 3,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case4',
                    Direction: 'Out',
                    ShellIndex: 4,
                    KernelIndex: 4,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case5',
                    Direction: 'Out',
                    ShellIndex: 5,
                    KernelIndex: 5,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case6',
                    Direction: 'Out',
                    ShellIndex: 6,
                    KernelIndex: 6,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case7',
                    Direction: 'Out',
                    ShellIndex: 7,
                    KernelIndex: 7,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case8',
                    Direction: 'Out',
                    ShellIndex: 8,
                    KernelIndex: 8,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  },
                  {
                    Identifier: 'Case9',
                    Direction: 'Out',
                    ShellIndex: 9,
                    KernelIndex: 9,
                    Visibility: 'Conditional',
                    Remarks: 'Visibility Depends on the length of CasesList',
                    Label: { en: '', 'zh-Hans': '' }
                  }
                ],
                DataPins: [
                  {
                    Identifier: 'Statement',
                    Direction: 'In',
                    Type: 'R<T>',
                    Label: null,
                    Placeholder: null,
                    ShellIndex: 0,
                    KernelIndex: 0,
                    Visibility: 'Display',
                    Connectability: true
                  },
                  {
                    Identifier: 'CasesList',
                    Direction: 'In',
                    Type: 'L<R<T>>',
                    Label: null,
                    Placeholder: null,
                    ShellIndex: 1,
                    KernelIndex: 1,
                    Visibility: 'Display',
                    Editability: true,
                    Connectability: true
                  }
                ],
                Variants: [
                  {
                    Constraints: 'S<T:Int>',
                    KernelID: 3,
                    InjectedContents: [
                      { Identifier: 'Statement', TypeSelectorIndex: 0 },
                      { Identifier: 'CasesList', TypeSelectorIndex: 0 }
                    ]
                  },
                  {
                    Constraints: 'S<T:Str>',
                    KernelID: 4,
                    InjectedContents: [
                      { Identifier: 'Statement', TypeSelectorIndex: 1 },
                      { Identifier: 'CasesList', TypeSelectorIndex: 1 }
                    ]
                  }
                ],
                Implementation: null,
                __ref_id: 'flow.branch.multi',
                __todo_set_in_manually: true
              },
              variant_def: null,
              constraint: undefined,
              pin_values: Map(0) {},
              data_from: Map(1) {
                'Statement' => <ref *2> {
                  from: [Circular *1],
                  to: [Circular *3],
                  from_pin: {
                    Identifier: 'Output2',
                    Direction: 'Out',
                    Type: 'Int',
                    Label: null,
                    Placeholder: null,
                    ShellIndex: 2,
                    KernelIndex: 2,
                    Visibility: 'Display',
                    Connectability: true
                  },
                  to_pin: {
                    Identifier: 'Statement',
                    Direction: 'In',
                    Type: 'R<T>',
                    Label: null,
                    Placeholder: null,
                    ShellIndex: 0,
                    KernelIndex: 0,
                    Visibility: 'Display',
                    Connectability: true
                  }
                }
              },
              data_to: Map(0) {},
              flow_from: Map(1) { 'FlowIn' => Set(1) { [Circular *4] } },
              flow_to: Map(0) {},
              x: 0,
              y: 0,
              comment: null
            },
            from_pin: {
              Identifier: 'FlowOut',
              Direction: 'Out',
              Label: { en: '', 'zh-Hans': '' },
              ShellIndex: 0,
              KernelIndex: 0
            },
            to_pin: {
              Identifier: 'FlowIn',
              Direction: 'In',
              Label: { en: '', 'zh-Hans': '' }
            }
          }
        ]
      },
      x: 0,
      y: 0,
      comment: null
    },
    <ref *3> Node {
      system: 'ENTITY_NODE_GRAPH',
      node_index: 2,
      def: {
        Identifier: 'Control.General.Switch',
        ID: 3,
        InGameName: { en: 'Multiple Branches', 'zh-Hans': '多分支' },
        Alias: [ 'Multiple_Branches' ],
        Type: 'Variant',
        System: 'Server',
        Domain: 'Control',
        FlowPins: [
          {
            Identifier: 'FlowIn',
            Direction: 'In',
            Label: { en: '', 'zh-Hans': '' }
          },
          {
            Identifier: 'DefaultBranch',
            Direction: 'Out',
            ShellIndex: 0,
            KernelIndex: 0,
            Label: { en: 'Default', 'zh-Hans': '默认' }
          },
          {
            Identifier: 'Case1',
            Direction: 'Out',
            ShellIndex: 1,
            KernelIndex: 1,
            Visibility: 'Conditional',
            Remarks: 'Visibility Depends on the length of CasesList',
            Label: { en: '', 'zh-Hans': '' }
          },
          {
            Identifier: 'Case2',
            Direction: 'Out',
            ShellIndex: 2,
            KernelIndex: 2,
            Visibility: 'Conditional',
            Remarks: 'Visibility Depends on the length of CasesList',
            Label: { en: '', 'zh-Hans': '' }
          },
          {
            Identifier: 'Case3',
            Direction: 'Out',
            ShellIndex: 3,
            KernelIndex: 3,
            Visibility: 'Conditional',
            Remarks: 'Visibility Depends on the length of CasesList',
            Label: { en: '', 'zh-Hans': '' }
          },
          {
            Identifier: 'Case4',
            Direction: 'Out',
            ShellIndex: 4,
            KernelIndex: 4,
            Visibility: 'Conditional',
            Remarks: 'Visibility Depends on the length of CasesList',
            Label: { en: '', 'zh-Hans': '' }
          },
          {
            Identifier: 'Case5',
            Direction: 'Out',
            ShellIndex: 5,
            KernelIndex: 5,
            Visibility: 'Conditional',
            Remarks: 'Visibility Depends on the length of CasesList',
            Label: { en: '', 'zh-Hans': '' }
          },
          {
            Identifier: 'Case6',
            Direction: 'Out',
            ShellIndex: 6,
            KernelIndex: 6,
            Visibility: 'Conditional',
            Remarks: 'Visibility Depends on the length of CasesList',
            Label: { en: '', 'zh-Hans': '' }
          },
          {
            Identifier: 'Case7',
            Direction: 'Out',
            ShellIndex: 7,
            KernelIndex: 7,
            Visibility: 'Conditional',
            Remarks: 'Visibility Depends on the length of CasesList',
            Label: { en: '', 'zh-Hans': '' }
          },
          {
            Identifier: 'Case8',
            Direction: 'Out',
            ShellIndex: 8,
            KernelIndex: 8,
            Visibility: 'Conditional',
            Remarks: 'Visibility Depends on the length of CasesList',
            Label: { en: '', 'zh-Hans': '' }
          },
          {
            Identifier: 'Case9',
            Direction: 'Out',
            ShellIndex: 9,
            KernelIndex: 9,
            Visibility: 'Conditional',
            Remarks: 'Visibility Depends on the length of CasesList',
            Label: { en: '', 'zh-Hans': '' }
          }
        ],
        DataPins: [
          {
            Identifier: 'Statement',
            Direction: 'In',
            Type: 'R<T>',
            Label: null,
            Placeholder: null,
            ShellIndex: 0,
            KernelIndex: 0,
            Visibility: 'Display',
            Connectability: true
          },
          {
            Identifier: 'CasesList',
            Direction: 'In',
            Type: 'L<R<T>>',
            Label: null,
            Placeholder: null,
            ShellIndex: 1,
            KernelIndex: 1,
            Visibility: 'Display',
            Editability: true,
            Connectability: true
          }
        ],
        Variants: [
          {
            Constraints: 'S<T:Int>',
            KernelID: 3,
            InjectedContents: [
              { Identifier: 'Statement', TypeSelectorIndex: 0 },
              { Identifier: 'CasesList', TypeSelectorIndex: 0 }
            ]
          },
          {
            Constraints: 'S<T:Str>',
            KernelID: 4,
            InjectedContents: [
              { Identifier: 'Statement', TypeSelectorIndex: 1 },
              { Identifier: 'CasesList', TypeSelectorIndex: 1 }
            ]
          }
        ],
        Implementation: null,
        __ref_id: 'flow.branch.multi',
        __todo_set_in_manually: true
      },
      variant_def: null,
      constraint: undefined,
      pin_values: Map(0) {},
      data_from: Map(1) {
        'Statement' => <ref *2> {
          from: <ref *1> Node {
            system: 'ENTITY_NODE_GRAPH',
            node_index: 1,
            def: {
              Identifier: 'Trigger.Tab.On_Tab_Select',
              ID: 307,
              InGameName: { en: 'When Tab Is Selected', 'zh-Hans': '选项卡选中时' },
              Alias: [ 'When_Tab_Is_Selected' ],
              Type: 'Fixed',
              System: 'Server',
              Domain: 'Trigger',
              FlowPins: [
                {
                  Identifier: 'FlowOut',
                  Direction: 'Out',
                  Label: { en: '', 'zh-Hans': '' },
                  ShellIndex: 0,
                  KernelIndex: 0
                }
              ],
              DataPins: [
                {
                  Identifier: 'Output0',
                  Direction: 'Out',
                  Type: 'Ety',
                  Label: null,
                  Placeholder: null,
                  ShellIndex: 0,
                  KernelIndex: 0,
                  Visibility: 'Display',
                  Connectability: true
                },
                {
                  Identifier: 'Output1',
                  Direction: 'Out',
                  Type: 'Gid',
                  Label: null,
                  Placeholder: null,
                  ShellIndex: 1,
                  KernelIndex: 1,
                  Visibility: 'Display',
                  Connectability: true
                },
                {
                  Identifier: 'Output2',
                  Direction: 'Out',
                  Type: 'Int',
                  Label: null,
                  Placeholder: null,
                  ShellIndex: 2,
                  KernelIndex: 2,
                  Visibility: 'Display',
                  Connectability: true
                },
                {
                  Identifier: 'Output3',
                  Direction: 'Out',
                  Type: 'Ety',
                  Label: null,
                  Placeholder: null,
                  ShellIndex: 3,
                  KernelIndex: 3,
                  Visibility: 'Display',
                  Connectability: true
                },
                {
                  Identifier: 'Output4',
                  Direction: 'Out',
                  Type: 'Gid',
                  Label: null,
                  Placeholder: null,
                  ShellIndex: 4,
                  KernelIndex: 4,
                  Visibility: 'Display',
                  Connectability: true
                }
              ],
              Implementation: null,
              __ref_id: 'event.tabSelected',
              __todo_set_out_pin: true
            },
            variant_def: null,
            constraint: undefined,
            pin_values: Map(0) {},
            data_from: Map(0) {},
            data_to: Map(1) { 'Statement' => Set(1) { [Circular *2] } },
            flow_from: Map(0) {},
            flow_to: Map(1) {
              'FlowIn' => [
                <ref *4> {
                  from: [Circular *1],
                  to: [Circular *3],
                  from_pin: {
                    Identifier: 'FlowOut',
                    Direction: 'Out',
                    Label: { en: '', 'zh-Hans': '' },
                    ShellIndex: 0,
                    KernelIndex: 0
                  },
                  to_pin: {
                    Identifier: 'FlowIn',
                    Direction: 'In',
                    Label: { en: '', 'zh-Hans': '' }
                  }
                }
              ]
            },
            x: 0,
            y: 0,
            comment: null
          },
          to: [Circular *3],
          from_pin: {
            Identifier: 'Output2',
            Direction: 'Out',
            Type: 'Int',
            Label: null,
            Placeholder: null,
            ShellIndex: 2,
            KernelIndex: 2,
            Visibility: 'Display',
            Connectability: true
          },
          to_pin: {
            Identifier: 'Statement',
            Direction: 'In',
            Type: 'R<T>',
            Label: null,
            Placeholder: null,
            ShellIndex: 0,
            KernelIndex: 0,
            Visibility: 'Display',
            Connectability: true
          }
        }
      },
      data_to: Map(0) {},
      flow_from: Map(1) {
        'FlowIn' => Set(1) {
          <ref *4> {
            from: <ref *1> Node {
              system: 'ENTITY_NODE_GRAPH',
              node_index: 1,
              def: {
                Identifier: 'Trigger.Tab.On_Tab_Select',
                ID: 307,
                InGameName: { en: 'When Tab Is Selected', 'zh-Hans': '选项卡选中时' },
                Alias: [ 'When_Tab_Is_Selected' ],
                Type: 'Fixed',
                System: 'Server',
                Domain: 'Trigger',
                FlowPins: [
                  {
                    Identifier: 'FlowOut',
                    Direction: 'Out',
                    Label: { en: '', 'zh-Hans': '' },
                    ShellIndex: 0,
                    KernelIndex: 0
                  }
                ],
                DataPins: [
                  {
                    Identifier: 'Output0',
                    Direction: 'Out',
                    Type: 'Ety',
                    Label: null,
                    Placeholder: null,
                    ShellIndex: 0,
                    KernelIndex: 0,
                    Visibility: 'Display',
                    Connectability: true
                  },
                  {
                    Identifier: 'Output1',
                    Direction: 'Out',
                    Type: 'Gid',
                    Label: null,
                    Placeholder: null,
                    ShellIndex: 1,
                    KernelIndex: 1,
                    Visibility: 'Display',
                    Connectability: true
                  },
                  {
                    Identifier: 'Output2',
                    Direction: 'Out',
                    Type: 'Int',
                    Label: null,
                    Placeholder: null,
                    ShellIndex: 2,
                    KernelIndex: 2,
                    Visibility: 'Display',
                    Connectability: true
                  },
                  {
                    Identifier: 'Output3',
                    Direction: 'Out',
                    Type: 'Ety',
                    Label: null,
                    Placeholder: null,
                    ShellIndex: 3,
                    KernelIndex: 3,
                    Visibility: 'Display',
                    Connectability: true
                  },
                  {
                    Identifier: 'Output4',
                    Direction: 'Out',
                    Type: 'Gid',
                    Label: null,
                    Placeholder: null,
                    ShellIndex: 4,
                    KernelIndex: 4,
                    Visibility: 'Display',
                    Connectability: true
                  }
                ],
                Implementation: null,
                __ref_id: 'event.tabSelected',
                __todo_set_out_pin: true
              },
              variant_def: null,
              constraint: undefined,
              pin_values: Map(0) {},
              data_from: Map(0) {},
              data_to: Map(1) {
                'Statement' => Set(1) {
                  <ref *2> {
                    from: [Circular *1],
                    to: [Circular *3],
                    from_pin: {
                      Identifier: 'Output2',
                      Direction: 'Out',
                      Type: 'Int',
                      Label: null,
                      Placeholder: null,
                      ShellIndex: 2,
                      KernelIndex: 2,
                      Visibility: 'Display',
                      Connectability: true
                    },
                    to_pin: {
                      Identifier: 'Statement',
                      Direction: 'In',
                      Type: 'R<T>',
                      Label: null,
                      Placeholder: null,
                      ShellIndex: 0,
                      KernelIndex: 0,
                      Visibility: 'Display',
                      Connectability: true
                    }
                  }
                }
              },
              flow_from: Map(0) {},
              flow_to: Map(1) { 'FlowIn' => [ [Circular *4] ] },
              x: 0,
              y: 0,
              comment: null
            },
            to: [Circular *3],
            from_pin: {
              Identifier: 'FlowOut',
              Direction: 'Out',
              Label: { en: '', 'zh-Hans': '' },
              ShellIndex: 0,
              KernelIndex: 0
            },
            to_pin: {
              Identifier: 'FlowIn',
              Direction: 'In',
              Label: { en: '', 'zh-Hans': '' }
            }
          }
        }
      },
      flow_to: Map(0) {},
      x: 0,
      y: 0,
      comment: null
    },
    Node {
      system: 'ENTITY_NODE_GRAPH',
      node_index: 3,
      def: {
        Identifier: 'Query.Custom_Variable.Get_Variable',
        ID: 50,
        InGameName: { en: 'Get Custom Variable', 'zh-Hans': '获取自定义变量' },
        Alias: [ 'Get_Custom_Variable' ],
        Type: 'Variant',
        System: 'Server',
        Domain: 'Query',
        FlowPins: [],
        DataPins: [
          {
            Identifier: 'target_entity',
            Direction: 'In',
            Type: 'Ety',
            Label: { 'zh-Hans': '目标实体' },
            Placeholder: null,
            ShellIndex: 0,
            KernelIndex: 0,
            Visibility: 'Display',
            Connectability: true
          },
          {
            Identifier: 'var_name',
            Direction: 'In',
            Type: 'Str',
            Label: { 'zh-Hans': '变量名' },
            Placeholder: null,
            ShellIndex: 1,
            KernelIndex: 1,
            Visibility: 'Display',
            Connectability: true
          },
          {
            Identifier: 'Input2',
            Direction: 'In',
            Type: 'Bol',
            Label: null,
            Placeholder: null,
            ShellIndex: 2,
            KernelIndex: 2,
            Visibility: 'Hidden',
            Connectability: true
          },
          {
            Identifier: 'value',
            Direction: 'Out',
            Type: 'R<T>',
            Label: { 'zh-Hans': '变量值' },
            Placeholder: null,
            ShellIndex: 0,
            KernelIndex: 0,
            Visibility: 'Display',
            Connectability: true
          }
        ],
        Variants: [
          {
            Constraints: 'S<T:Int>',
            KernelID: 50,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 0 } ]
          },
          {
            Constraints: 'S<T:Str>',
            KernelID: 51,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 1 } ]
          },
          {
            Constraints: 'S<T:Ety>',
            KernelID: 52,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 2 } ]
          },
          {
            Constraints: 'S<T:Gid>',
            KernelID: 53,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 3 } ]
          },
          {
            Constraints: 'S<T:Flt>',
            KernelID: 54,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 4 } ]
          },
          {
            Constraints: 'S<T:Vec>',
            KernelID: 55,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 5 } ]
          },
          {
            Constraints: 'S<T:Bol>',
            KernelID: 56,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 6 } ]
          },
          {
            Constraints: 'S<T:L<Int>>',
            KernelID: 57,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 7 } ]
          },
          {
            Constraints: 'S<T:L<Str>>',
            KernelID: 58,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 8 } ]
          },
          {
            Constraints: 'S<T:L<Ety>>',
            KernelID: 59,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 9 } ]
          },
          {
            Constraints: 'S<T:L<Gid>>',
            KernelID: 60,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 10 } ]
          },
          {
            Constraints: 'S<T:L<Flt>>',
            KernelID: 61,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 11 } ]
          },
          {
            Constraints: 'S<T:L<Vec>>',
            KernelID: 62,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 12 } ]
          },
          {
            Constraints: 'S<T:L<Bol>>',
            KernelID: 63,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 13 } ]
          },
          {
            Constraints: 'S<T:Cfg>',
            KernelID: 576,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 14 } ]
          },
          {
            Constraints: 'S<T:Pfb>',
            KernelID: 577,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 15 } ]
          },
          {
            Constraints: 'S<T:L<Cfg>>',
            KernelID: 578,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 16 } ]
          },
          {
            Constraints: 'S<T:L<Pfb>>',
            KernelID: 579,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 17 } ]
          },
          {
            Constraints: 'S<T:Fct>',
            KernelID: 624,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 18 } ]
          },
          {
            Constraints: 'S<T:L<Fct>>',
            KernelID: 693,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 19 } ]
          },
          {
            Constraints: 'S<T:D<Ety,Ety>>',
            KernelID: 2068,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,Gid>>',
            KernelID: 2069,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,Int>>',
            KernelID: 2070,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,Bol>>',
            KernelID: 2071,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,Flt>>',
            KernelID: 2072,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,Str>>',
            KernelID: 2073,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,Fct>>',
            KernelID: 2074,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,Vec>>',
            KernelID: 2075,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,Cfg>>',
            KernelID: 2076,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,Pfb>>',
            KernelID: 2077,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,L<Ety>>>',
            KernelID: 2078,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,L<Gid>>>',
            KernelID: 2079,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,L<Int>>>',
            KernelID: 2080,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,L<Bol>>>',
            KernelID: 2081,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,L<Flt>>>',
            KernelID: 2082,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,L<Str>>>',
            KernelID: 2083,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,L<Fct>>>',
            KernelID: 2084,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,L<Vec>>>',
            KernelID: 2085,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Ety,L<Cfg>>>',
            KernelID: 2086,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,Ety>>',
            KernelID: 2088,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,Gid>>',
            KernelID: 2089,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,Int>>',
            KernelID: 2090,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,Bol>>',
            KernelID: 2091,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,Flt>>',
            KernelID: 2092,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,Str>>',
            KernelID: 2093,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,Fct>>',
            KernelID: 2094,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,Vec>>',
            KernelID: 2095,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,Cfg>>',
            KernelID: 2096,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,Pfb>>',
            KernelID: 2097,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,L<Ety>>>',
            KernelID: 2098,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,L<Gid>>>',
            KernelID: 2099,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,L<Int>>>',
            KernelID: 2100,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,L<Bol>>>',
            KernelID: 2101,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,L<Flt>>>',
            KernelID: 2102,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,L<Str>>>',
            KernelID: 2103,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,L<Fct>>>',
            KernelID: 2104,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,L<Vec>>>',
            KernelID: 2105,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Gid,L<Cfg>>>',
            KernelID: 2106,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,Ety>>',
            KernelID: 2108,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,Gid>>',
            KernelID: 2109,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,Int>>',
            KernelID: 2110,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,Bol>>',
            KernelID: 2111,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,Flt>>',
            KernelID: 2112,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,Str>>',
            KernelID: 2113,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,Fct>>',
            KernelID: 2114,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,Vec>>',
            KernelID: 2115,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,Cfg>>',
            KernelID: 2116,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,Pfb>>',
            KernelID: 2117,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,L<Ety>>>',
            KernelID: 2118,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,L<Gid>>>',
            KernelID: 2119,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,L<Int>>>',
            KernelID: 2120,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,L<Bol>>>',
            KernelID: 2121,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,L<Flt>>>',
            KernelID: 2122,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,L<Str>>>',
            KernelID: 2123,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,L<Fct>>>',
            KernelID: 2124,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,L<Vec>>>',
            KernelID: 2125,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Int,L<Cfg>>>',
            KernelID: 2126,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,Ety>>',
            KernelID: 2128,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,Gid>>',
            KernelID: 2129,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,Int>>',
            KernelID: 2130,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,Bol>>',
            KernelID: 2131,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,Flt>>',
            KernelID: 2132,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,Str>>',
            KernelID: 2133,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,Fct>>',
            KernelID: 2134,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,Vec>>',
            KernelID: 2135,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,Cfg>>',
            KernelID: 2136,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,Pfb>>',
            KernelID: 2137,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,L<Ety>>>',
            KernelID: 2138,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,L<Gid>>>',
            KernelID: 2139,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,L<Int>>>',
            KernelID: 2140,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,L<Bol>>>',
            KernelID: 2141,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,L<Flt>>>',
            KernelID: 2142,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,L<Str>>>',
            KernelID: 2143,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,L<Fct>>>',
            KernelID: 2144,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,L<Vec>>>',
            KernelID: 2145,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Str,L<Cfg>>>',
            KernelID: 2146,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Fct,Ety>>',
            KernelID: 2148,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Fct,Gid>>',
            KernelID: 2149,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Fct,Int>>',
            KernelID: 2150,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          {
            Constraints: 'S<T:D<Fct,Bol>>',
            KernelID: 2151,
            InjectedContents: [ { Identifier: 'value', TypeSelectorIndex: 20 } ]
          },
          ... 53 more items
        ],
        Implementation: null,
        __ref_id: 'query.customVar.get',
        __todo_set_in_pin: true
      },
      variant_def: null,
      constraint: undefined,
      pin_values: Map(0) {},
      data_from: Map(0) {},
      data_to: Map(0) {},
      flow_from: Map(0) {},
      flow_to: Map(0) {},
      x: 0,
      y: 0,
      comment: null
    }
  },
  comments: Set(0) {}
}