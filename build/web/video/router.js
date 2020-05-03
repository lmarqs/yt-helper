"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var download_1 = require("./download");
var info_1 = require("./info");
var express_1 = require("express");
exports.videoRouter = express_1.Router();
exports.videoRouter.use("/:url/info", info_1.infoRequestHander);
exports.videoRouter.use("/:url/download", download_1.downloadRequestHander);
