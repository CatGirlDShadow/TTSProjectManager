import { LooseObject, Message, RequestMessage } from "@types";

export interface CustomMessage extends Message {
    customMessage: RequestMessage<LooseObject>
}