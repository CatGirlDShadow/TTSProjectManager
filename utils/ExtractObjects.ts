import { existsSync, mkdirSync, writeFileSync } from "fs";
import { GameFieldName, GameObject, LooseObject, Scripts } from "../types";
import { join } from "path";
import { scriptFilesInfo, TTS_JSON_INTENT } from "./constants";
import { GetCorrectDirName, sanitizeFilename } from "./File";

export function RecursiveObjectResolve(rootPath: string, ObjectStates: Array < GameObject >, reversedConstantsMap: Map<string, string> = undefined ) {
    if (!existsSync(rootPath)) {
        mkdirSync(rootPath);
    }
    for (const obj of ObjectStates) {
        let dirName = sanitizeFilename(obj.Nickname);
        if (dirName.trim() == "") dirName = obj.Name;
        dirName += ` (${obj.GUID})`;
        const objPath = GetCorrectDirName(join(rootPath, dirName));
        if (!existsSync(objPath)){
            mkdirSync(objPath);
        }
        const jsonPath = join(objPath, "object.json");
        for (const info of scriptFilesInfo){
            ExtractFieldToFile(obj, info.field, join(objPath, info.filename));
        }
        if (!!obj.ContainedObjects && obj.ContainedObjects.length) {
            RecursiveObjectResolve(join(objPath, "ContainedObjects"), obj.ContainedObjects);
            delete obj.ContainedObjects;
        }
        writeFileSync(jsonPath, StringifyCheckConstants(obj));
    }
}

export function ExtractFieldToFile(obj: Scripts, fieldName: GameFieldName, filePath: string){
    if (obj[fieldName].trim() != "") {
        writeFileSync(filePath, obj[fieldName]);
    }
    delete obj[fieldName];
}

export function StringifyCheckConstants(obj: LooseObject){
    return JSON.stringify(obj, null, TTS_JSON_INTENT).replace(/\"(\{\{\%[a-zA-Z0-9]+\%\}\})\"/gm, (match, group1)=>group1);
}