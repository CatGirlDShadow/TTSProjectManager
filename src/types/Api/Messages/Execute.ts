import { Message } from "@types";

export interface ExecuteMessage extends Message {
    guid: string,
    script: string
}