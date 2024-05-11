import { ScriptFieldInfo } from "../types";

export const TABLETOP_APP_ID = "286160";
export const TABLETOP_APP_ID_NUMBER = 286160;
export const ConstantNameRegex = /\{\{\%([a-zA-Z0-9]+)\%\}\}/gm;
export const ConstantNameRegexStringEscaped = /\"(\{\{\%[a-zA-Z0-9]+\%\}\})\"/gm;
export const SteamWorkshopLinkBeginning = "https://steamcommunity.com/sharedfiles/filedetails/?id=";
export const TTS_JSON_INTENT = "  ";
export const timeFormat = new Intl.DateTimeFormat('US', { year: 'numeric', month: '2-digit', day: '2-digit',
hour: '2-digit',minute: '2-digit', second: '2-digit' });
export const scriptFilesInfo: Array<ScriptFieldInfo> = [
    {
        filename: "script.lua",
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