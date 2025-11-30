# Node ID & Enum Definitions

本目录为**静态定义**, 包含解析出的全部节点定义和资源的相关信息.


## [concrete_map.ts](./concrete_map.ts)
泛类节点引脚的类型选择器的索引顺序

## [node_pin_records.ts](./node_pin_records.ts)
泛类节点可变类型的反射机制定义, 与每一类反射对应的

*TODO: 将来可能会扩展为每一个节点的引脚定义, 包含有反射的和没反射的.*

## [helper.ts](./helpers.ts)
提供了一些辅助函数以帮助解析或读取特定范围的静态值.

## [index.yaml](./index.yaml) / [index.json](./index.json)
单文件 yaml/json 格式的完全汇总数据, 任何外部程序都可以读取的高度结构化数据
