import {
    join
} from "path";
import {
    FieldDisribution,
    LoadConstants,
    ProcessReversedConstants,
    ReverseConstantsMap,
    TTS_JSON_INTENT
} from "./utils";
import {
    existsSync,
    mkdirSync,
    readFileSync,
    rmSync,
    writeFileSync
} from "fs";
import { GameFieldName, GameJson, GameObject, LooseObject, Scripts } from "./types";
import { scriptFilesInfo } from "./utils";
import { ExtractFieldToFile, RecursiveObjectResolve, StringifyCheckConstants } from "./utils/ExtractObjects";

export function loadFile(filepath: string, targetPath: string, constantsDirPath: string = undefined) {
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
        const constantsMap = new Map<string, any>();
        LoadConstants(constantsMap, constantsDirPath);
        const reversedConstantsMap = ReverseConstantsMap(constantsMap, false);
        console.log(reversedConstantsMap);
        const game: GameJson = JSON.parse(
            ProcessReversedConstants(
                reversedConstantsMap, 
                readFileSync(filepath, "utf-8")
                    .replace(/([\d]+)\.0(,?)$/gm, (match, group1, group2)=>group1+group2) // Replace Digit.0 to Digit
                    .replace(/^\s+\"([A-Za-z0-9]+)\"\:\s/gm, (match, group1)=>`"${group1}":`) // Remove trailing whitespaces and whitespaces before values
                    .replace(/^\s+(.*)/gm, (match, group)=>group) // remove rest of trailing whitespaces
                    .replaceAll("\n", "") // remove \n
                    .replaceAll("\r", "") // remove \r
            )
        );
        for (const entry of Object.keys(FieldDisribution)) {
            const jsonPath = join(targetPath, entry + ".json");
            let obj: LooseObject = {};
            for (const fieldEntry of FieldDisribution[entry]) {
                let fieldName = fieldEntry.replace("?", "");
                if (Object.hasOwn(game, fieldName)){
                    obj[fieldName] = game[fieldName];
                }
            }
            writeFileSync(jsonPath, StringifyCheckConstants(obj));
        }

        const globalDirPath = join(targetPath, "Global");
        if (!existsSync(globalDirPath)){
            mkdirSync(globalDirPath);
        }
        for (const info of scriptFilesInfo){
            ExtractFieldToFile(game, info.field, join(globalDirPath, info.filename));
        }


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
