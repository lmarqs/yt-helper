import { downloadRequestHander } from "./download";
import { infoRequestHander } from "./info";
import { Router as router } from "express";

export const videoRouter = router();

videoRouter.use("/:url/info", infoRequestHander);
videoRouter.use("/:url/download", downloadRequestHander);
