"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-use-before-define */
var ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
var fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var stream_1 = __importDefault(require("stream"));
var util_1 = __importDefault(require("util"));
var ytdl_core_1 = __importDefault(require("ytdl-core"));
var ytpl_1 = __importDefault(require("ytpl"));
function sync(_a) {
    var format = _a.format, _b = __read(_a.args, 1), url = _b[0];
    return __awaiter(this, void 0, void 0, function () {
        var videos, files, _loop_1, _c, _d, _e, index, video, e_1_1;
        var e_1, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, ytpl_1.default(url)];
                case 1:
                    videos = (_g.sent()).items;
                    return [4 /*yield*/, readDir()];
                case 2:
                    files = _g.sent();
                    _loop_1 = function (index, video) {
                        var filename;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    filename = (index + 1).toString().padStart(3, "0") + " - " + video.title;
                                    if (files.includes(filename)) {
                                        files.splice(files.indexOf(filename), 1);
                                        return [2 /*return*/, "continue"];
                                    }
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            downloadVideo(video.url)
                                                .pipe(format === "mp3" ? new stream_1.default.PassThrough() : mp4ToMp3Conversor())
                                                .pipe(fs_1.default.createWriteStream(filename))
                                                .on("error", reject)
                                                .on("finish", resolve);
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _g.label = 3;
                case 3:
                    _g.trys.push([3, 8, 9, 10]);
                    _c = __values(videos.entries()), _d = _c.next();
                    _g.label = 4;
                case 4:
                    if (!!_d.done) return [3 /*break*/, 7];
                    _e = __read(_d.value, 2), index = _e[0], video = _e[1];
                    return [5 /*yield**/, _loop_1(index, video)];
                case 5:
                    _g.sent();
                    _g.label = 6;
                case 6:
                    _d = _c.next();
                    return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 10: return [4 /*yield*/, Promise.all(files.map(unlinkFile))];
                case 11:
                    _g.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.sync = sync;
function unlinkFile(file) {
    return __awaiter(this, void 0, void 0, function () {
        var unlink;
        return __generator(this, function (_a) {
            unlink = util_1.default.promisify(fs_1.default.unlink);
            return [2 /*return*/, unlink(path_1.default.join(process.cwd(), file))];
        });
    });
}
function readDir() {
    return __awaiter(this, void 0, void 0, function () {
        var readdir;
        return __generator(this, function (_a) {
            readdir = util_1.default.promisify(fs_1.default.readdir);
            return [2 /*return*/, readdir(process.cwd())];
        });
    });
}
function downloadVideo(url) {
    return ytdl_core_1.default(decodeURIComponent(url), {
        filter: function (format) { return format.container === "mp4"; },
    });
}
function mp4ToMp3Conversor() {
    var input = new stream_1.default.PassThrough();
    var output = new stream_1.default.PassThrough();
    var combiner = new /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super.call(this) || this;
            _this.on("pipe", function (source) {
                source.unpipe(_this);
                // this.source = source.pipe(input);
            });
            _this.pipe = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return output.pipe.apply(output, __spread(args));
            };
            return _this;
        }
        return class_1;
    }(stream_1.default.PassThrough))();
    combiner.on("pipe", function (source) {
        source.unpipe(combiner);
        source.pipe(input);
    });
    fluent_ffmpeg_1.default()
        .setFfmpegPath(ffmpeg_static_1.default)
        .input(input)
        .format("mp3")
        .output(output)
        .run();
    return combiner;
}
