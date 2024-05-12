import { requestMap } from "@api";
import { CustomMessage, EditingMessage, ErrorMessage, FullSaveMessage, LooseObject, NewObjectMessage, PrintMessage, RequestMessage, ReturnMessage, SaveMessage, ServerMessage } from "@types";
import { TABLETOP_SERVER_PORT, TTSMessageType } from "@utils";
import { Server } from "net";
import { HandleEditing, HandleError, HandleLoad, HandleNewObject, HandlePrint, HandleReturn, HandleSave } from "./Handlers";

export function startServer() {
    const server = new Server();

    server.on('connection', (socket) => {
        const chunks: Buffer[] = [];
        socket.on('data', (data: Buffer) => {
            chunks.push(data);
        });
        socket.on('end', () => {
            handleMessage(Buffer.concat(chunks).toString('utf-8'));
        });
    });

    server.once("listening", () => {
        console.log(`Server is listening to port ${TABLETOP_SERVER_PORT}!`);
    })
    server.listen(TABLETOP_SERVER_PORT, "127.0.0.1");
}

function handleMessage(requestData: string) {
    try {
        const JsonData: ServerMessage = JSON.parse(requestData);
        if (JsonData.messageID === TTSMessageType.CUSTOM) {
            const message: CustomMessage = JsonData as CustomMessage;
            const customMessage: RequestMessage<LooseObject> = message.customMessage;
            if (Object.hasOwn(customMessage, "request") && requestMap.has(customMessage.request)) {
                requestMap.get(customMessage.request)!(customMessage);
                requestMap.delete(customMessage.request);
            }
            else {
                console.warn(`Incoming request had invalid id!`);
                console.warn(customMessage);
            }
        }
        else switch (JsonData.messageID) {
            case TTSMessageType.EDITING_SCRIPT:
                HandleEditing((JsonData as EditingMessage).scriptStates[0]);
                return;
            case TTSMessageType.GAME_LOAD:
                HandleLoad(JsonData as FullSaveMessage);
                return;
            case TTSMessageType.PRINT:
                HandlePrint(JsonData as PrintMessage);
                return;
            case TTSMessageType.ERROR:
                HandleError(JsonData as ErrorMessage);
                return;
            case TTSMessageType.RETURN:
                HandleReturn(JsonData as ReturnMessage);
                return;
            case TTSMessageType.SAVE:
                HandleSave(JsonData as SaveMessage);
                return;
            case TTSMessageType.NEW_OBJECT:
                HandleNewObject(JsonData as NewObjectMessage);
                return;
        }
    } catch (ex) {
        console.error(`Exception processing server request: ${ex}`);
    }
}