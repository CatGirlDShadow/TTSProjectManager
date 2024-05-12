import { BuildOptions, LooseObject } from "@types";
import { FieldDisribution, LoadConstants, LoadObjects, ProcessConstants, scriptFilesInfo, timeFormat, TTS_JSON_INTENT } from "@utils";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";


export function build(options: BuildOptions) {
    if (!existsSync(options.input)) {
        console.log("Directory does not exist");
        return false;
    }
    const constantsMap = new Map<string, any>();
    LoadConstants(constantsMap, options.constants);
    const game: LooseObject = {};
    for (const entry of Object.keys(FieldDisribution)) {
        const fileName = join(options.input, entry + ".json");
        if (!existsSync(fileName)) {
            console.log(`${resolve(fileName)}, which is required to build main object is missing!`);
            return false;
        }
        try {
            const obj = JSON.parse(ProcessConstants(constantsMap, readFileSync(fileName, "utf-8")));
            for (const field of FieldDisribution[entry]) {
                const fieldName = field.replace("?", "");
                if (!Object.hasOwn(obj, fieldName)) {
                    if (field.startsWith("?")) {
                        continue;
                    }
                    console.log(`${resolve(fileName)} Is missing required property ${fieldName}! Check if project files are corrupt!`);
                    return false;
                }
                game[fieldName] = obj[fieldName];
            }
        }
        catch (ex) {
            console.error(`Exception loading game object! File: ${resolve(fileName)}`);
            console.error(ex);
            return false;
        }
    }
    // const obj = JSON.parse(ProcessConstants(constantsMap, readFileSync(fileName, "utf-8")));
    const globalsDirPath = join(options.input, "Global");
    if (existsSync(globalsDirPath)) {
        for (const info of scriptFilesInfo) {
            const filePath = join(globalsDirPath, info.filename);
            if (existsSync(filePath)) {
                game[info.field] = readFileSync(filePath, "utf-8");
            }
            else game[info.field] = "";
        }
    }
    else {
        for (const info of scriptFilesInfo) {
            game[info.field] = "";
        }
    }
    const objectsDirPath = join(options.input, "Objects");
    if (!existsSync(objectsDirPath) && options.objects) {
        console.error("Objects directory not found. If this is intended run command again with --no-objects argument!");
        return false;
    }
    game["ObjectStates"] = LoadObjects(objectsDirPath, constantsMap);
    if (options.edit) {
        game["EpochTime"] = Math.floor(Date.now() / 1000);
        game["Date"] = timeFormat.format(new Date());
    }
    writeFileSync(options.output ?? "Build.json", JSON.stringify(game, null, TTS_JSON_INTENT));
    return true;
}

