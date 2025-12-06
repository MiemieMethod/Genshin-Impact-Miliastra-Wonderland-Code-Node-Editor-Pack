# Source Code (`src`)

This directory contains the core source code for the project, responsible for parsing, converting, and managing the intermediate representations of the node graph data.

## Directory Structure

| Directory | Description |
| :--- | :--- |
| **[`convertor`](./convertor/readme.md)** | Core logic for converting between GIA formats, Intermediate Representations (IR), and other data structures. |
| **[`parser`](./parser/readme.md)** | A complete parsing pipeline (Tokenizer & Parser) for handling text-based node definitions and DSLs. |
| **[`types`](./types/)** | Shared TypeScript type definitions, interfaces, and constants used across the project. |
| **`test`** | *(Internal)* Unit tests and test cases. Not included in the public build. |

## Key Components

### Conversion Pipeline (`convertor`)
Handles the transformation of data. Key functionalities include:
- **IR Definitions**: Defines the structure of the Intermediate Representation used to manipulate node graphs.
- **Graph Processing**: Utilities for splitting and organizing node chains.

### Parsing Engine (`parser`)
Implements a recursive descent parser for extracting structured data from text.
- **Tokenizer**: Lexical analysis to convert raw text into tokens.
- **Parser**: Syntactic analysis to build Abstract Syntax Trees (AST) or IR from tokens.
- **Component Parsers**: Specialized modules for parsing specific constructs like declarations, constants, and blocks.
