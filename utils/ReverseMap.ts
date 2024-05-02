import { ConstantInfo } from "../types";
import { GetStringRepresentation } from "./BuildConstants";

export function ReverseConstantsMap(map: Map<string, any>, useIntent: boolean = true): Map<string, ConstantInfo>{
    const reversedMap = new Map<string, ConstantInfo>;
    for (const key of map.keys()){
        reversedMap.set(GetStringRepresentation(map.get(key), useIntent), {
            name: key,
            type: typeof map.get(key) 
        });
    }
    return reversedMap;
}