"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var sync_1 = require("./sync");
commander_1.default
    .command("sync url")
    .description("sync youtube playlist with local files")
    .option("-f, --format <format>", "mp3,mp4", /mp3|mp4/u, "mp3")
    .action(sync_1.sync);
commander_1.default.parse(process.argv);
