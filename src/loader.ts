import {
    join,
    resolve
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
import { LoadOptions } from "./types/LoadOptions";

export function loadFile(options: LoadOptions) {
    if (!existsSync(options.input)) {
        console.log("File does not exist!");
        return false;
    }
    if (!existsSync(options.output)) {
        mkdirSync(options.output, {recursive: true});
        console.log(`Destination does not exist! Created directory ${resolve(options.output)}`);
        //return false;
    }
    try {
        const constantsMap = new Map<string, any>();
        LoadConstants(constantsMap, options.constants);
        const reversedConstantsMap = ReverseConstantsMap(constantsMap, false);
        const game: GameJson = JSON.parse(
            ProcessReversedConstants(
                reversedConstantsMap, 
                readFileSync(options.input, "utf-8")
                    .replace(/([\d]+)\.0(,?)$/gm, (match, group1, group2)=>group1+group2) // Replace Digit.0 to Digit
                    .replace(/^\s+\"([A-Za-z0-9]+)\"\:\s/gm, (match, group1)=>`"${group1}":`) // Remove trailing whitespaces and whitespaces before values
                    .replace(/^\s+(.*)/gm, (match, group)=>group) // remove rest of trailing whitespaces
                    .replaceAll("\n", "") // remove \n
                    .replaceAll("\r", "") // remove \r
            )
        );
        for (const entry of Object.keys(FieldDisribution)) {
            const jsonPath = join(options.output, entry + ".json");
            let obj: LooseObject = {};
            for (const fieldEntry of FieldDisribution[entry]) {
                let fieldName = fieldEntry.replace("?", "");
                if (Object.hasOwn(game, fieldName)){
                    obj[fieldName] = game[fieldName];
                }
            }
            writeFileSync(jsonPath, StringifyCheckConstants(obj));
        }

        const globalDirPath = join(options.output, "Global");
        if (!existsSync(globalDirPath)){
            mkdirSync(globalDirPath);
        }
        for (const info of scriptFilesInfo){
            ExtractFieldToFile(game, info.field, join(globalDirPath, info.filename));
        }


        if (!!game.ObjectStates && game.ObjectStates.length) {
            RecursiveObjectResolve(join(options.output, "Objects"), game.ObjectStates);
        }
    } catch (ex) {
        rmSync(options.output, {recursive: true, force: true});
        console.error(`Exception parsing file ${resolve(options.input)}!`);
        console.log(ex);
        return false;
    }

    return true;
}
