import { Router } from "express";
import HelloHandler from "./handler";

export const helloRouter = (handler: HelloHandler) => {
    const router = Router();

    router.get('/hello', handler.getHello)

    return router;

}
