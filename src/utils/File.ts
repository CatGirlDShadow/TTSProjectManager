import { existsSync } from "fs";

export function GetCorrectDirName(baseName: string){
    if (!existsSync(baseName)) return baseName;
    for (let i = 1; i < 100; i++){
        if (!existsSync(baseName + ` (${i})`)) return baseName + ` (${i})`;
    }
    throw Error(`Too many objects with same Nickname/GUID! Check ${baseName}`);
}

export function sanitizeFilename(filename: string) {
    return filename.replace(/[/\\?%*:|"<>]/g, '').replace(/(\r\n|\n|\r)/gm, "");
}