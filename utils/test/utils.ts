
export function assert_equal<T>(a: unknown, b: T): asserts a is T {
  if (a !== b) { debugger; throw new Error(`Assert Equal Fail: ${a} !== ${b}`); }
}
export function assert_unequal<T>(a: unknown, b: T) {
  if (a === b) { debugger; throw new Error(`Assert Unequal Fail: ${a} === ${b}`); }
}
export function assert(a: boolean): asserts a {
  if (!a) { debugger; throw new Error("Assert Fail"); }
}
