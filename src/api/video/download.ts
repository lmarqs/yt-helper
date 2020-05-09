import express from "express";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import mime from "mime-types";
import sanitizeFilename from "sanitize-filename";
import stream from "stream";
import ytdl from "ytdl-core";

function setHeaders(res: express.Response, filename: string): void {
  const contentType = mime.lookup(filename);

  if (!contentType) {
    throw new Error();
  }

  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(filename)}"`);
}

function downloadVideo(url: string): stream.Readable {
  return ytdl(decodeURIComponent(url), {
    filter: (format) => format.container === "mp4",
  });
}

function mp4ToMp3Conversor(): stream.Duplex {
  const input = new stream.PassThrough();
  const output = new stream.PassThrough();

  const combiner = new class extends stream.PassThrough {
    private source: stream.PassThrough;

    constructor() {
      super();

      this.on("pipe", (source: stream.Readable) => {
        source.unpipe(this);
      });

      this.pipe = (...args) => output.pipe(...args);
    }
  }();

  combiner.on("pipe", (source) => {
    source.unpipe(combiner);
    source.pipe(input);
  });

  ffmpeg()
    .setFfmpegPath(ffmpegStatic)
    .input(input)
    .audioCodec('libmp3lame')
    .audioBitrate(192)
    .audioChannels(2)
    .format("mp3")
    .output(output)
    .run();

  return combiner;
}

export const downloadRequestHander: express.RequestHandler = (req, res, next) => {
  try {
    const { url } = req.params;
    const { name = "video", ext = "mp4" } = req.query;

    setHeaders(res, sanitizeFilename(`${name}.${ext}`));

    downloadVideo(url)
      .pipe(ext === "mp4" ? new stream.PassThrough() : mp4ToMp3Conversor())
      .pipe(res);
  } catch (err) {
    next(err);
    return;
  }
};

