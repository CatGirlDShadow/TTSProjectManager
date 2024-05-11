export interface ConstantInfo {
    name: string,
    type: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
}