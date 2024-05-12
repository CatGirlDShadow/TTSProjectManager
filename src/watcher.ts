import { startServer } from '@api';
import { WatchOptions } from "@types";
import { resolve } from "path";



export function Watch(options: WatchOptions) {
    console.log(`Starting watcher inside ${resolve(options.output)}`);
    startServer();
}