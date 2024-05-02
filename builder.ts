import {existsSync, readFileSync, writeFileSync} from "fs";
import { FieldDisribution, TTS_JSON_INTENT } from "./utils";
import { join } from "path";
import { scriptFilesInfo } from "./utils";
import { LooseObject } from "./types";
import { LoadConstants, ProcessConstants } from "./utils";
import { LoadObjects } from "./utils";


export function build(directoryPath: string, constantsDirPath: string=undefined){
    if (!existsSync(directoryPath)){
        console.log("Directory does not exist");
        return false;
    }
    const constantsMap = new Map<string, any>();
    LoadConstants(constantsMap, constantsDirPath);
    const game: LooseObject = {};
    for (const entry of Object.keys(FieldDisribution)){
        const fileName = join(directoryPath, entry + ".json");
        if (!existsSync(fileName)){
            console.log(`${fileName}, which is required to build main object is missing!`);
            return false;
        }
        try{
            const obj = JSON.parse(ProcessConstants(constantsMap, readFileSync(fileName, "utf-8")));
            for (const field of FieldDisribution[entry]){
                const fieldName = field.replace("?", "");
                if (!Object.hasOwn(obj, fieldName)){
                    if (field.startsWith("?")){
                        continue;
                    }
                    console.log(`${fileName} Is missing property ${fieldName}! Check if project files are corrupt!`);
                    return false;
                }
                game[fieldName] = obj[fieldName];
            }
        }
        catch (ex){
            console.error(`Exception loading game object! File: ${fileName}`);
            console.error(ex);
            return false;
        }
    }
    // const obj = JSON.parse(ProcessConstants(constantsMap, readFileSync(fileName, "utf-8")));
    const globalsDirPath = join(directoryPath, "Global");
    if (existsSync(globalsDirPath)){
        for (const info of scriptFilesInfo){
            const filePath = join(globalsDirPath, info.filename);
            if (existsSync(filePath)){
                game[info.field] = readFileSync(filePath, "utf-8");
            }
            else game[info.field]="";
        }
    }
    else{
        for (const info of scriptFilesInfo){
            game[info.field] = "";
        }
    }
    const objectsDirPath = join(directoryPath, "Objects");
    if (!existsSync(objectsDirPath)){
        console.error("Objects directory not found. If this is intended run command again with --no-objects argument!");
        return false;
    }
    game["ObjectStates"] = LoadObjects(objectsDirPath, constantsMap);
    writeFileSync("Build.json", JSON.stringify(game, null, TTS_JSON_INTENT));
    return true;
}

