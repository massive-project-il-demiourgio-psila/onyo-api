import "core-js";
import "reflect-metadata";
import { AddressInfo } from "net";
import { createServer } from "./infrastructures/http/server.ts";
import logger from './libs/logger.ts'
import { env } from "./utils/config.ts";
import { initContainerRegistry } from "./infrastructures/di.ts";

(async () => {
    const app = await createServer(initContainerRegistry());
    const server = app.listen(env.app.port, () => {
        logger.info(`Http server running on ${(server.address() as AddressInfo).port}`)
    })
})();
