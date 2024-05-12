import { requestMap } from "@api";
import { LooseObject, Message, RequestMessage } from "@types";
import { SERVER_REQUEST_IP, TABLETOP_REQUEST_PORT } from "@utils";
import { Socket } from "net";

export async function sendRequest<T extends LooseObject, TMessage extends Message>(id: string, data: TMessage): Promise<RequestMessage<T>> {
  const client = new Socket();
  return new Promise((resolve, reject) => {
    client.once('error', reject);
    client.connect(TABLETOP_REQUEST_PORT, SERVER_REQUEST_IP, () => {
      client.write(JSON.stringify(data), (error) => {
        if (error) {
          reject(error);
        } else {
          requestMap.set(id, (message: RequestMessage<T>) => {
            resolve(message);
          });
        }
        client.destroy();
      });
    });
  });
}