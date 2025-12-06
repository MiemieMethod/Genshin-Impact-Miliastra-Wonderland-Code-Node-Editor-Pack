# Utils

This directory contains a collection of helper tools, generators, and reference data used to support the main conversion and parsing tasks.

## Directory Index

| Directory | Description | Status |
| :--- | :--- | :--- |
| **[`functions`](./functions/readme.md)** | Tools for defining and generating math/query function signatures. | Active |
| **[`gia_gen`](./gia_gen/readme.md)** | Helpers for generating GIA node graphs programmatically. | Active |
| **[`node_data`](./node_data/readme.md)** | Static definitions for Nodes, Pins, and Types (Reflective Data). | Active |
| **[`protobuf`](./protobuf/readme.md)** | GIA Protobuf definitions (`.proto`) and TS/Python adapters. | Active |
| **[`ref`](./ref/readme.md)** | Reference files (sample `.gia` files, `.cs` decompilations) for testing. | Reference |
| **[`extracting_nodes`](./extracting_nodes/readme.md)** | Scripts for extracting node definitions from C# binaries. | **Internal/Hidden** |

## Shared Utilities
- **`index.ts`**: Re-exports commonly used utilities from sub-modules.
