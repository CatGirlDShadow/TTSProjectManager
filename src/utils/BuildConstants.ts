import { ConstantInfo } from "@types";
import { ConstantNameRegex, TTS_JSON_INTENT } from "@utils";
import { existsSync, readdirSync, readFileSync } from "fs";
import { join } from "path";

export function LoadConstants(map: Map<string, any>, constantsDirPath: string) {
    if (!constantsDirPath) return;
    if (existsSync(constantsDirPath)) {
        for (const entry of readdirSync(constantsDirPath, { withFileTypes: true })) {
            if (entry.isFile()) {
                try {
                    const mapping = JSON.parse(readFileSync(join(constantsDirPath, entry.name), "utf-8"));
                    for (const key of Object.keys(mapping)) {
                        map.set(key, mapping[key]);
                    }
                }
                catch (ex) {
                    console.error(`Exception checning file ${constantsDirPath}/${entry}!`);
                    console.error(ex);
                }
            }
            else {
                LoadConstants(map, join(constantsDirPath, entry.name));
            }
        }
    }
    else {
        console.warn(`Warning while loading constants: directory does not exist ${constantsDirPath}`);
    }
}

export function ProcessConstants(constants: Map<string, any>, content: string, useIntent: boolean = true) {
    return content.replace(ConstantNameRegex, (fullMatch, group1) => {
        if (constants.has(group1)) {
            const constant = constants.get(group1);
            return GetStringRepresentation(constant, useIntent);
        }
        console.error(`Constant ${group1} is not set, but is used!`);
        throw Error("Constant unset");
    });
}

export function ProcessReversedConstants(reversedConstants: Map<string, ConstantInfo>, content: string) {
    for (const [constantKey, constantValue] of reversedConstants.entries()) {
        if (constantValue.type == "string")
            content = content.replaceAll(constantKey, `{{%${constantValue.name}%}}`);
        else
            content = content.replaceAll(constantKey, `"{{%${constantValue.name}%}}"`);
    }
    return content;
}

export function GetStringRepresentation(constant: any, useIntent: boolean = true) {
    if (typeof constant == "string")
        return constant;
    if (!useIntent)
        return JSON.stringify(constant);
    return JSON.stringify(constant, null, TTS_JSON_INTENT);
}