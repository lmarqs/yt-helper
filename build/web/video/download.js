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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
var fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
var mime_types_1 = __importDefault(require("mime-types"));
var stream_1 = __importDefault(require("stream"));
var ytdl_core_1 = __importDefault(require("ytdl-core"));
function setHeaders(res, filename) {
    var contentType = mime_types_1.default.lookup(filename);
    if (!contentType) {
        throw new Error();
    }
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", "attachment; filename=\"" + encodeURIComponent(filename) + "\"");
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
            });
            _this.pipe = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return output.pipe.apply(output, args);
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
        .audioCodec('libmp3lame')
        .audioBitrate(192)
        .audioChannels(2)
        .format("mp3")
        .output(output)
        .run();
    return combiner;
}
exports.downloadRequestHander = function (req, res, next) {
    try {
        var url = req.params.url;
        var _a = req.query, _b = _a.name, name_1 = _b === void 0 ? "video" : _b, _c = _a.ext, ext = _c === void 0 ? "mp4" : _c;
        setHeaders(res, (name_1 + "." + ext).replace(/([^a-z0-9 ]+)/gi, ''));
        downloadVideo(url)
            .pipe(ext === "mp4" ? new stream_1.default.PassThrough() : mp4ToMp3Conversor())
            .pipe(res);
    }
    catch (err) {
        next(err);
        return;
    }
};
