import { Message, ObjectScriptInfo } from "@types";

export interface FullSaveMessage extends Message {
    scriptStates: Array<ObjectScriptInfo>
}