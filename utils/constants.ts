import { ScriptFieldInfo } from "../types";

export const ConstantNameRegex = /\{\{\%([a-zA-Z0-9]+)\%\}\}/gm;
export const ConstantNameRegexStringEscaped = /\"(\{\{\%[a-zA-Z0-9]+\%\}\})\"/gm;
export const TTS_JSON_INTENT = "  ";
export const scriptFilesInfo: Array<ScriptFieldInfo> = [
    {
        filename: "global.lua",
        field: "LuaScript"
    },
    {
        filename: "state.json",
        field: "LuaScriptState"
    },
    {
        filename: "ui.xml",
        field: "XmlUI"
    }
];