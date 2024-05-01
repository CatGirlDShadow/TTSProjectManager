import {
    join
} from "path";
import {
    GameJson
} from "./types/GameJson";
import {
    FieldDisribution
} from "./distribution";
import {
    GameObject
} from "./types/Scripting/GameObject";
import {
    existsSync,
    mkdirSync,
    readFileSync,
    rmdirSync,
    rmSync,
    writeFileSync
} from "fs";

export function loadFile(filepath: string, targetPath: string) {
    if (!existsSync(filepath)) {
        console.log("File does not exist!");
        return false;
    }
    if (!existsSync(targetPath)) {
        mkdirSync(targetPath);
        console.log(`Destination does not exist! Created directory ${targetPath}`);
        //return false;
    }
    try {
        const game: GameJson = JSON.parse(readFileSync(filepath, "utf-8"));
        for (const entry of Object.keys(FieldDisribution)) {
            const jsonPath = join(targetPath, entry + ".json");
            let obj = {};
            for (const fieldEntry of FieldDisribution[entry]) {
                obj[fieldEntry] = game[fieldEntry];
            }
            writeFileSync(jsonPath, JSON.stringify(obj, null, "\t"));
        }

        const globalDirPath = join(targetPath, "Global");
        mkdirSync(globalDirPath);
        ExtractField(game, "LuaScript", join(globalDirPath, "global.lua"));
        ExtractField(game, "LuaScriptState", join(globalDirPath, "state.json"));
        ExtractField(game, "XmlUI", join(globalDirPath, "ui.xml"));


        if (!!game.ObjectStates && game.ObjectStates.length) {
            RecursiveObjectResolve(join(targetPath, "Objects"), game.ObjectStates);
        }
    } catch (ex) {
        rmSync(targetPath, {recursive: true, force: true});
        console.error(`Exception parsing file ${filepath}!`);
        console.log(ex);
        return false;
    }

    return true;
}

function RecursiveObjectResolve(rootPath: string, ObjectStates: Array < GameObject > ) {
    if (!existsSync(rootPath)) {
        mkdirSync(rootPath);
    }
    for (const obj of ObjectStates) {
        let dirName = sanitizeFilename(obj.Nickname);
        if (dirName.trim() == "") dirName = obj.Name;
        dirName += ` (${obj.GUID})`;
        const objPath = join(rootPath, dirName);
        mkdirSync(GetCorrectDirName(objPath));
        const jsonPath = join(objPath, "object.json");
        ExtractField(obj, "LuaScript", join(objPath, "script.lua"));
        ExtractField(obj, "LuaScriptState", join(objPath, "state.json"));
        ExtractField(obj, "XmlUI", join(objPath, "ui.xml"));
        if (!!obj.ContainedObjects && obj.ContainedObjects.length) {
            RecursiveObjectResolve(join(objPath, "ContainedObjects"), obj.ContainedObjects);
        }
        delete obj.ContainedObjects;
        writeFileSync(jsonPath, JSON.stringify(obj, null, "\t"));
    }
}
type GameProps = {
    LuaScript?: string,
    LuaScriptState?: string,
    XmlUI?: string
}
type GameFieldName = "LuaScript" | "LuaScriptState" | "XmlUI";
function ExtractField(obj: GameProps, fieldName: GameFieldName, filePath: string){
    if (obj[fieldName].trim() != "") {
        writeFileSync(filePath, obj[fieldName]);
    }
    delete obj[fieldName];
}

function GetCorrectDirName(baseName: string){
    if (!existsSync(baseName)) return baseName;
    for (let i = 1; i < 100; i++){
        if (!existsSync(baseName + ` (${i})`)) return baseName + ` (${i})`;
    }
    throw Error(`Too many objects with same Nickname/GUID! Check ${baseName}`);
}

function sanitizeFilename(filename: string) {
    return filename.replace(/[/\\?%*:|"<>]/g, '').replace(/(\r\n|\n|\r)/gm, "");
}