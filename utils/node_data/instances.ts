import { Document } from "./core.ts";
import json from "./data.json" with { type: "json" };


/**
 * Global singleton document instance loading default data.json
 */
export const Doc = new Document(json as any);

/**
 * Global singleton helpers derived from the default document
 */
export const Node = Doc.Node;
export const Enum = Doc.Enum;
export const ServerType = Doc.Type;
export const ClientType = Doc.ClientType;

// Re-export types for convenience if needed, though usually handled by index.ts
