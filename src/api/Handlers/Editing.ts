import { getObjectJSON } from "@api";
import { ObjectScriptInfo } from "@types";

export function HandleEditing(object: ObjectScriptInfo) {
    const guid: string = object.guid;
    console.log(`Editing ${guid}`);
    getObjectJSON(guid).then(console.log);
}