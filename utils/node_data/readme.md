# Node ID & Enum Definitions

本目录为**静态定义**, 包含解析出的全部节点定义和资源的相关信息.

## 数据文件

### [concrete_map.ts](./concrete_map.ts)
泛类节点引脚的类型选择器的索引顺序

### [node_pin_records.ts](./node_pin_records.ts)
泛类节点可变类型的反射机制定义, 与每一类反射对应的

*TODO: 将来可能会扩展为每一个节点的引脚定义, 包含有反射的和没反射的.*

### [server.yaml](./yaml/server.yaml)
全部节点的 扩展类-基类对应. 以及节点名称

### [server_node_id.yaml](./yaml/server_node_id.yaml)
阅读友好的节点 id 列表和名称.

### [enum_id.yaml](./yaml/enum_id.yaml)
阅读友好的 Enum 类型和每种类型下的枚举id和名称列表
