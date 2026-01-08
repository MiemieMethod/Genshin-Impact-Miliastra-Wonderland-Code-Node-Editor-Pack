import { Graph } from "../../utils/index.ts";
import { IR_GraphModule } from "../types/IR.ts";
import { IR_CallNode, IR_EvalNode, IR_ExecutionBlock, IR_FunctionArg, IR_Node, IR_NodeChain } from "../types/IR_node.ts";

// // 假设的 Graph 类接口
// interface Graph {
//   // 返回唯一的 NodeID
//   add_node(data: any): string;
//   // 数据连接: port 名称统一使用字符串
//   connect(srcNode: string, dstNode: string, srcPort: string, dstPort: string): void;
//   // 控制流: 也可以支持 insert_pos 等高级参数，这里简化表示
//   // order 用于表示控制流输出的顺序 (Jump 优先于 Next)
//   flow(srcNode: string, dstNode: string, srcPort: string, dstPort: string, order?: number): void;
// }

// 模拟提供的 get_arg_maps 辅助函数签名
declare function get_arg_maps(fun_identifier: string, args: IR_FunctionArg[], is_output?: boolean): string[];

declare function get_node_identifier(node: IR_Node): string;

// 编译器上下文
class CompilerContext {
  // 符号表: 变量名 -> { 生产该变量的节点ID, 输出端口名 }
  varMap = new Map<string, { nodeId: number, port: string }>();

  // 锚点表: AnchorID -> 紧跟在 Anchor 后的真实节点 ID
  anchorMap = new Map<string | number, number>();

  // 待处理的跳转: 记录 JumpNodeID 和它想要跳去的 AnchorID
  pendingJumps: { jumpNodeId: number, anchorId: string | number }[] = [];

  // 生成临时变量名 (用于隐式 Eval)
  private tempVarCount = 0;
  genTempVar() { return `__tmp_${this.tempVarCount++}`; }
}

class IRToGraphBuilder {
  private graph: Graph;
  private ctx: CompilerContext;

  constructor(graph: Graph) {
    this.graph = graph;
    this.ctx = new CompilerContext();
  }

  public build(module: IR_GraphModule) {
    // 1. 预注册全局变量/导入声明 (如果有必要生成对应节点，在此处处理)
    // ...

    // 2. 第一遍扫描: 生成所有节点，注册 Anchor，处理隐式 Eval
    for (const block of module.graph) {
      this.processBlock_Pass1(block);
    }

    // 3. 第二遍扫描: 构建控制流和数据流连接
    // 由于我们在 Pass1 已经记录了所有节点 ID 和 Anchor 映射，
    // 这里主要处理 flow(next), flow(jump) 和 connect(data)
    for (const block of module.graph) {
      this.processBlock_Pass2(block);
    }
  }

  // ==========================================
  // Pass 1: 节点生成 & 符号注册
  // ==========================================

  private processBlock_Pass1(block: IR_ExecutionBlock) {
    // 处理 Trigger/Starter
    if (block.starter.kind === "trigger") {
      this.createNodeAndRegister(block.starter.node); // 视为 CallNode 处理 √
    } else if (block.starter.kind === "inout") {
      this.createNodeAndRegister(block.starter);
    } else if (block.starter.kind === "anchor") {
      // Starter 是 Anchor 的情况，标记 Block 入口，稍后处理 √
      // 这里的逻辑需要根据 Chain 的处理方式统一，见下文 processChain_Pass1
    }

    // 遍历 Chain
    this.processChain_Pass1(block.chain);
  }

  private processChain_Pass1(chains: IR_NodeChain[]) {
    // 扁平化遍历所有 Chain
    for (const chainObj of chains) {
      let activeAnchorId: string | number | null = null;

      for (const node of chainObj.chain) {
        if (node.kind === "anchor") {
          // 遇到 Anchor，不要生成节点
          // 记录 ID，待遇到下一个真实节点时注册
          activeAnchorId = node.id;
          continue;
        }

        // 生成真实节点
        const nodeId = this.createNodeAndRegister(node);

        // 如果之前有悬空的 Anchor，现在指向这个新节点
        if (activeAnchorId !== null) {
          // todo: 检查唯一性.
          this.ctx.anchorMap.set(activeAnchorId, nodeId);
          activeAnchorId = null;
        }

        // 递归处理嵌套结构 (Branches)
        if (node.kind === "call") {
          node.branches.forEach(b => this.processChain_Pass1(b.nodes));
        } else if (node.kind === "branch") {
          node.branches.forEach(b => this.processChain_Pass1(b.nodes));
        } // todo: What about jump and eval?
      }

      // 边界情况：Chain 以 Anchor 结尾？
      // 用户规则：Anchor 必须有后继。如果代码合法，这里 activeAnchorId 应该为 null。
      // 如果出现，可能指向某种 "EndBlock" 节点，这里暂略。
    }
  }

  /**
   * 核心方法：创建节点，处理隐式 Eval，注册输出变量
   */
  private createNodeAndRegister(node: IR_Node): number {
    // 1. 处理输入参数中的隐式表达式
    // 需要在创建当前节点前，先创建隐式 Eval 节点
    if (node.kind === "call" || node.kind === "eval") { // Branch/Jump 没有数据输入 √
      this.handleImplicitEvals(node);
    }

    // 2. 创建当前节点
    const _node = Graph.add_node_with_index(this.graph, get_node_identifier(node), node._id);
    // todo: check existence

    // 3. 注册 Jump (稍后连接)
    if (node.kind === "jump") {
      this.ctx.pendingJumps.push({ jumpNodeId: node._id, anchorId: node.id });
    }

    // 4. 注册输出变量 (Data Flow Source)
    if (node.kind === "call" || node.kind === "eval") {
      const outNames = get_arg_maps(this.graph.nodes.get(node._id)!.def.Identifier, node.outputs, true);
      node.outputs.forEach((arg, index) => {
        // IR 保证输出 expr 是单一 identifier // todo: check it
        const varName = arg.expr[0].value;
        const portName = outNames[index];
        // todo: 检查唯一性.
        this.ctx.varMap.set(varName, { nodeId: node._id, port: portName });
      });
    }

    return node._id;
  }

  private handleImplicitEvals(node: IR_CallNode | IR_EvalNode) {
    const inputs = node.kind === "call" ? node.inputs : node.captures;
    inputs.forEach((arg, index) => {
      // 简单判断：如果 Token 数 > 1 或者是字面量/操作符等，视为表达式
      // 或者根据规则：非单一 Identifier 即为表达式
      const isExpression = arg.expr.length > 1 || (arg.expr.length === 1 && arg.expr[0].type !== "Identifier");

      if (isExpression) {
        // 1. 生成隐式 Eval 节点
        const evalNodeData = {
          kind: "eval",
          lambda: arg.expr, // 表达式内容
          implicit: true
        };
        // todo: eval node 不是某个节点, 而是一组节点
        const evalId = this.graph.add_node(evalNodeData);

        // 2. 提取表达式依赖的变量
        const deps = arg.expr.filter(t => t.type === "Identifier");
        // 记录这些依赖，以便 Pass2 进行连接
        // 我们需要一个地方暂存隐式节点的输入需求，或者简化处理：
        // 将隐式节点放入一个列表，Pass2 统一处理数据连线

        // 3. 注册隐式节点的输出为临时变量
        const tempVar = this.ctx.genTempVar();
        this.ctx.varMap.set(tempVar, { nodeId: evalId, port: "result" });

        // 4. **关键修正**: 修改原 Node 的输入 Arg
        // 为了让 Pass 2 能连线，我们将原参数的 expr 替换为指向这个临时变量
        // 注意：这里修改了 IR 对象，如果不可变，需用 Map 存储 "NodeInputOverride"
        arg.expr = [{ type: "Identifier", value: tempVar, pos: 0 }];
      }
    });
  }

  // ==========================================
  // Pass 2: 连线构建
  // ==========================================

  private processBlock_Pass2(block: IR_ExecutionBlock) {
    // 1. 启动点流向 Chain 头
    let prevNodeId: string | null = null;
    let prevPort = "default"; // 默认流出口

    if (block.starter.kind !== "anchor") {
      prevNodeId = nodeToIdMap.get(block.starter)!;
      // Starter 也是节点，它的后继是 Chain 的第一个
    }

    // 处理 Chain 内部连接
    this.processChain_Pass2(block.chain, prevNodeId, prevPort);
  }

  private processChain_Pass2(chains: IR_NodeChain[], entryNodeId: string | null, entryPort: string) {
    // 这里的逻辑稍微复杂，因为 Chain 是数组，且有 << >> 操作符
    // 但 Graph 层面只关心顺序：Node A -> Node B

    let lastNodeId = entryNodeId;
    let lastPort = entryPort;

    for (const chainObj of chains) {
      // 如果 chainObj.suspend 为 true (<<)，说明这是新的一条并行/挂起链
      // 它可能并不直接承接上一个 Chain 的流，或者依赖特定的调度逻辑。
      // 根据题目描述 '<<' 转化为 '>>' {0: next_chain, 1: this_chain}，这暗示了分叉。
      // 为了简化，我们假设普通的 '>>' 线性连接。

      for (const node of chainObj.chain) {
        if (node.kind === "anchor") continue; // 跳过虚节点

        const currentNodeId = nodeToIdMap.get(node)!;

        // 1. 构建来自上一个节点的控制流 (Flow)
        if (lastNodeId) {
          // 如果上一个节点是 Jump，它的 Default 流向这里
          // 如果上一个节点是普通 Call，它的 Default 流向这里
          this.graph.flow(lastNodeId, currentNodeId, lastPort, "in");
        }

        // 2. 构建数据流 (Data Connect)
        // 遍历 Inputs
        if (node.kind === "call" || node.kind === "eval") {
          const inNames = get_arg_maps(node.name, node.inputs, false);
          node.inputs.forEach((arg, idx) => {
            // 此时 arg.expr 已经全都是单一 Identifier (隐式 Eval 处理过)
            const varName = arg.expr[0].value;
            const source = this.ctx.varMap.get(varName);
            if (source) {
              this.graph.connect(source.nodeId, currentNodeId, source.port, inNames[idx]);
            } else {
              // 可能是全局变量或未定义，需额外处理
            }
          });
        }

        // 3. 处理 Jump 的目标流 (Fork Flow)
        if (node.kind === "jump") {
          const targetNodeId = this.ctx.anchorMap.get(node.id);
          if (targetNodeId) {
            // 优先流向目标 (Order 0)
            this.graph.flow(currentNodeId, targetNodeId, "jump_port", "in", 0);
          }
          // Jump 节点的 "next_port" 将在下一次循环作为 lastPort 连接到 Chain 的下一个节点 (Order 1)
          lastNodeId = currentNodeId;
          lastPort = "next_port";
        }
        // 4. 处理 Branch/Call 的内嵌流
        else if (node.kind === "branch") {
          // Branch Node 没有默认的 "next"，流全都进子分支了？
          // 既然是 IR，通常 Branch 执行完会汇聚？或者 Branch 就是末端？
          // 假设 Branch Node 根据 index 分发流
          node.branches.forEach(br => {
            // Branch 的每个分支，其“入口”来自 Parent 的特定端口
            // 端口名可能是 index (string)
            this.processChain_Pass2(br.nodes, currentNodeId, br.id.toString());
          });
          // Branch 节点本身通常不再流向 Chain 的下一个（除非所有分支都汇聚回来）
          // 如果 IR 语义是分支后继续执行 Chain，则需要汇聚逻辑 (Merge Node)。
          // 这里假设 Branch 后没有线性流，或者由 Graph 引擎自动处理汇聚。
          // 如果 Chain 在 Branch 节点后还有节点，则逻辑变得复杂（谁连向它？）。
          // 暂定：Branch 节点作为 Splitter，更新 lastNodeId 为 null (中断线性流)
          lastNodeId = null;
        }
        else if (node.kind === "call" && node.branches.length > 0) {
          // Call 节点的内嵌分支 (e.g. 成功/失败 回调)
          node.branches.forEach(br => {
            const port = br.branchId || "default"; // 这里的 branchId 对应 Call 的特定出口
            this.processChain_Pass2(br.nodes, currentNodeId, port.toString());
          });
          // Call 节点本身通常还有默认的完成流？
          // 如果 branches 覆盖了所有情况，则流中断。否则 lastNodeId 保持指向 Call 的 Default
          // 假设：如果有显式 branch 定义，则控制流交给 branch；否则默认流向下。
        }
        else {
          // 普通节点，更新指针
          lastNodeId = currentNodeId;
          lastPort = "default";
        }
      }
    }
  }
}