import { LooseObject } from "@types";

export interface RequestMessage<T extends LooseObject> {
    request: string,
    data: T
}