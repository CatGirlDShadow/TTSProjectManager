import { readFileSync } from "fs";

const original = JSON.parse(readFileSync("./ScriptExample.json", "utf-8"));
const compareTo = JSON.parse(readFileSync("./Build.json", "utf-8"));

function Compare(original: any, compareTo: any, GUIDPath=""){
    for (const key of Object.keys(original)){
        if (!Object.hasOwn(compareTo, key)){
            console.log(`CompareTo does not have ${key}! Path: ${GUIDPath}`);
            continue;
        }
        if (typeof original[key] != typeof compareTo[key]){
            console.log(`CompareTo type mismatch ${key}! Path: ${GUIDPath}`);
            continue;
        }
        if (original[key] instanceof Array){
            original[key].sort();
            compareTo[key].sort();
            if (original[key].length != compareTo[key].length){
                console.warn(`${key} (path: ${GUIDPath}/${key} length mismatch!`);
            }
            for (let i = 0; i < original.length; i++){
                if (compareTo.length > i){
                    Compare(original[key][i], compareTo[key][i], GUIDPath + `/${key}/${original[key][i].GUID??"Unknown"}|${compareTo[key][i].GUID??"Unknown"}`);
                }
                else {
                    console.error(`${original[key][i].GUID ?? "unknown"} (path: ${GUIDPath + "/" + key}) Is present only in original!`)
                }
            }
            
        }
        else if (typeof original[key] == "object"){
            Compare(original[key], compareTo[key], GUIDPath+`/${original[key].GUID ?? key}`)
        }
        else if (original[key] != compareTo[key]){
            console.log(`CompareTo value not equal ${key}! Path: ${GUIDPath} Path: ${GUIDPath}`);
            console.log(`Original value!`);
            console.log(original[key].GUID ?? "root?");
            console.log(`CompareTo value !`);
            console.log(compareTo[key].GUID ?? "root?");
        }
    }
}
try{
    Compare(original, compareTo);
}
catch (ex){
    console.error("Root exception");
    console.error(ex);
}