import {existsSync} from "fs";

export function build(directoryPath: string){
    if (!existsSync(directoryPath)){
        console.log("Directory does not exist");
        return false;
    }
    return true;
}