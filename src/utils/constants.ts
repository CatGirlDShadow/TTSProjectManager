import { ScriptFieldInfo } from "@types";


export const TABLETOP_SERVER_PORT = 39998;
export const TABLETOP_REQUEST_PORT = 39999;
export const SERVER_REQUEST_IP = "127.0.0.1";
export const TABLETOP_APP_ID = "286160";
export const TABLETOP_APP_ID_NUMBER = 286160;
export const ConstantNameRegex = /\{\{\%([a-zA-Z0-9]+)\%\}\}/gm;
export const ConstantNameRegexStringEscaped = /\"(\{\{\%[a-zA-Z0-9]+\%\}\})\"/gm;
export const SteamWorkshopLinkBeginning = "https://steamcommunity.com/sharedfiles/filedetails/?id=";
export const TTS_JSON_INTENT = "  ";
export const timeFormat = new Intl.DateTimeFormat('US', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
});
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
export const TTSMessageType = {
    EDITING_SCRIPT: 0,
    GAME_LOAD: 1,
    PRINT: 2,
    ERROR: 3,
    CUSTOM: 4,
    RETURN: 5,
    SAVE: 6,
    NEW_OBJECT: 7
}
export const TTSRequestType = {
    REQUEST_SCRIPT_INFO: 0,
    UPDATE_SCRIPTS_UI: 1,
    CUSTOM: 2,
    EXECUTE: 3
}