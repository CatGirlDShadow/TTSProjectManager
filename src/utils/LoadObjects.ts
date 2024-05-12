import { LooseObject } from "@types";
import { ProcessConstants, scriptFilesInfo } from "@utils";
import { existsSync, readdirSync, readFileSync } from "fs";
import { join } from "path";

export function LoadObjects(dirPath: string, constants: Map<string, any>) {
    const objectList = [];
    for (const fileOrDir of readdirSync(dirPath, { withFileTypes: true })) {
        if (fileOrDir.isDirectory()) {

            objectList.push(LoadObject(join(dirPath, fileOrDir.name), constants));
        }
        else {
            console.info(`Ignoring file ${fileOrDir.name} in Objects directory`);
        }
    }
    return objectList;
}
export function LoadObject(dirPath: string, constants: Map<string, any>) {
    if (!existsSync(dirPath)) {
        throw Error(`Loading object from directory ${dirPath} which does not exist`);
    }
    const objectFilePath = join(dirPath, "object.json");
    if (!existsSync(objectFilePath)) {
        throw Error(`Loading object from file ${objectFilePath} which does not exist`);
    }
    const gameObject: LooseObject = JSON.parse(ProcessConstants(constants, readFileSync(objectFilePath, "utf-8")));
    for (const info of scriptFilesInfo) {
        const filePath = join(dirPath, info.filename);
        if (existsSync(filePath)) {
            gameObject[info.field] = readFileSync(filePath, "utf-8");
        }
        else gameObject[info.field] = "";
    }
    const containedObjectsDirPath = join(dirPath, "ContainedObjects");
    if (existsSync(containedObjectsDirPath)) {
        gameObject["ContainedObjects"] = LoadObjects(containedObjectsDirPath, constants);
    }
    return gameObject;
}
