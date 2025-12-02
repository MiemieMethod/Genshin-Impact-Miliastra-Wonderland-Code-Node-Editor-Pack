export type NodeVarValue =
  | number
  | int
  | float
  | string
  | boolean
  | NodeVarValue[];

export type BranchId = string | number | boolean; // literal strings are required in source for non-numeric ids

export interface IRBase {
  _id: number;
  kind: string;
  // debug info
  _srcRange: { start: number; end: number; };
}
