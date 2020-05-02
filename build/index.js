"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var video_1 = require("./video");
var app = express_1.default();
app.use(express_1.default.static(__dirname + "/public"));
app.use("/api/video", video_1.videoRouter);
app.use(function (err, req, res, next) {
    res.status(500).send(err.toString());
});
// eslint-disable-next-line no-process-env
app.listen(process.env.PORT || 8080);
