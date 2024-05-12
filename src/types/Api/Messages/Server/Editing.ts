import { Message, ObjectScriptInfo } from "@types";

export interface EditingMessage extends Message {
    scriptStates: [ObjectScriptInfo]
}