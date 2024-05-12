import { sendRequest } from "@api";
import { ExecuteMessage, GameObject } from "@types";
import { TTSRequestType } from "@utils";
import { randomUUID } from "crypto";

export async function getObjectJSON(guid: string): Promise<GameObject> {
    return new Promise(async (resolve, reject) => {
        const id = randomUUID();
        resolve((await sendRequest<GameObject, ExecuteMessage>(id, {
            "messageID": TTSRequestType.EXECUTE,
            "guid": "-1",
            "script": `
                local obj = getObjectFromGUID("${guid}")
                if obj and not obj.isDestroyed() then
                    sendExternalMessage({request=\"${id}\",data=obj.getJSON()})
                end
                else
                    sendExternalMessage({request=\"${id}\",data=nil})
                end
            `
        })).data);
    })
}

