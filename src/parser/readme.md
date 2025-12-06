# Parser

This directory contains the implementation of the DSL parser, which converts text-based definitions into the Intermediate Representation (IR).

## Parsing Pipeline

The parsing process follows a standard two-stage approach:

1.  **Tokenization**: The [`Tokenizer`](./tokenizer.ts) converts the raw source string into a stream of tokens.
2.  **Parsing**: The [`Parser`](./parser.ts) consumes the token stream to build the IR structure.

## Key Files

### Core Components
- **[`parser.ts`](./parser.ts)**: The main entry point. Exports the `parse(state)` function which orchestrates the parsing of the entire module, including imports, globals, declarations, functions, and execution blocks.
- **[`tokenizer.ts`](./tokenizer.ts)**: Implements regex-based scanning. Explicitly handles disambiguation (via `post_lexing_disambiguation`) to refine token types after initial scanning.
- **[`parse_utils.ts`](./parse_utils.ts)**: Essential utilities for the recursive descent parser, including:
  - `expect()`, `next()`, `peek()`: Token stream navigation.
  - `parse_type()`: Parses DSL type strings (e.g., "List", "Int").
  - `parse_value()`: Parses literal values including complex structures like nested lists or dictionaries.

### Specialized Parsers (Sub-modules)
These modules handle specific grammatical constructs:
- **`parse_block.ts`**: Parses execution blocks (logic flow).
- **`parse_component.ts`**: Parses function/component definitions.
- **`parse_const.ts`**: Handles constant and variable definitions.
- **`parse_decl.ts`**: Parses global declarations and namespaces.
- **`parse_node.ts`**: Parses node instantiation and connections.

## Usage

```typescript
import { createParserState, tokenize } from "./tokenizer";
import { parse } from "./parser";

const source = "...";
const state = createParserState(source);
const ir = parse(state);
```
