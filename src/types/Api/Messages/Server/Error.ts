import { Message } from "@types";

export interface ErrorMessage extends Message {
    error: string,
    guid: string,
    errorMessagePrefix: string
}