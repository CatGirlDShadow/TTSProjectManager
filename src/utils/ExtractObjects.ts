import { GameFieldName, GameObject, LooseObject, Scripts } from "@types";
import { GetCorrectDirName, sanitizeFilename, scriptFilesInfo, TTS_JSON_INTENT } from "@utils";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

export function RecursiveObjectResolve(rootPath: string, ObjectStates: Array<GameObject>) {
    if (!existsSync(rootPath)) {
        mkdirSync(rootPath);
    }
    for (const obj of ObjectStates) {
        let dirName = sanitizeFilename(obj.Nickname);
        if (dirName.trim() == "") dirName = obj.Name;
        dirName += ` (${obj.GUID})`;
        const objPath = GetCorrectDirName(join(rootPath, dirName));
        if (!existsSync(objPath)) {
            mkdirSync(objPath);
        }
        const jsonPath = join(objPath, "object.json");
        for (const info of scriptFilesInfo) {
            ExtractFieldToFile(obj, info.field, join(objPath, info.filename));
        }
        if (!!obj.ContainedObjects && obj.ContainedObjects.length) {
            RecursiveObjectResolve(join(objPath, "ContainedObjects"), obj.ContainedObjects);
            delete obj.ContainedObjects;
        }
        writeFileSync(jsonPath, StringifyCheckConstants(obj));
    }
}

export function ExtractFieldToFile(obj: Scripts, fieldName: GameFieldName, filePath: string) {
    if (!Object.hasOwn(obj, fieldName)) return;
    if (obj[fieldName]!.trim() != "") {
        writeFileSync(filePath, obj[fieldName]!);
    }
    delete obj[fieldName];
}

export function StringifyCheckConstants(obj: LooseObject) {
    return JSON.stringify(obj, null, TTS_JSON_INTENT).replace(/\"(\{\{\%[a-zA-Z0-9]+\%\}\})\"/gm, (match, group1) => group1);
}