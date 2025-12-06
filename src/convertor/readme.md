# Convertor Utils

This directory contains parsing, conversion, and graph analysis utilities that are core to the system's intermediate data processing.

## Files

### [`gia_ir.ts`](./gia_ir.ts)
**Purpose**: Handles the conversion from GIA (Graph Intermediate Format) to IR (Intermediate Representation) Graph Modules.
- **`giaIrConvertor(gia: Graph, raw: true)`**: Entry point for converting GIA graphs.
  - Currently implements `raw` conversion mode via `giaToRawIRModule`.
  - Future support for non-raw conversion is planned (currently throws Error).

### [`graph_chain_split.ts`](./graph_chain_split.ts)
**Purpose**: Advanced graph analysis algorithm that decomposes a directed graph into linear chains, cycles, and isolated nodes. This is efficiently implemented with O(N+E) complexity using Tarjan's SCC algorithm.

**Core Function: `analyzeGraph(nodes, edges)`**
Returns a structured analysis result:
- **`single`**: Isolated nodes (0 in-degree, 0 out-degree).
- **`chain`**: List of detected chains. Each chain has:
  - `starter`: The node starting the chain.
  - `chains`: Array of node sequences (paths).
  - `targets`: Where each chain leads to (a merge point, a cycle start, or `null` if it's a dead end).
- **`in_deg` / `out_deg`**: Degree maps for all nodes.

**Key Features**:
- **Pure Cycle Detection**: Identifies "isolated pure cycles" (rings with no external connections).
- **Chain Tracing**: Traces non-branching paths from "starter" nodes (nodes that are entry points or branching points).
- **Tarjan's Algorithm**: Used to identify Strongly Connected Components (SCCs) for cycle detection.
