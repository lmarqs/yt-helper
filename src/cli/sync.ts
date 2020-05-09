/* eslint-disable @typescript-eslint/no-use-before-define */
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import fs from "fs";
import path from "path";
import sanitizeFilename from "sanitize-filename";
import stream from "stream";
import util from "util";
import ytdl from "ytdl-core";
import ytpl from "ytpl";


interface Args {
  format: string;
  args: [string];
}


export async function sync({ format, args: [url] }: Args): Promise<void> {
  const { items: videos } = await ytpl(url);
  const files = await readDir();

  for (const [index, video] of videos.entries()) {
    const filename = sanitizeFilename(`${(index + 1).toString().padStart(3, "0")} - ${video.title}.${format}`);

    if (files.includes(filename)) {
      console.log(`[skip] ${filename}`);
      files.splice(files.indexOf(filename), 1);
      continue;
    }

    console.log(`[downloading] ${filename}`);
    await new Promise((resolve, reject) => {
      downloadVideo(video.url)
        .pipe(format === "mp4" ? new stream.PassThrough() : mp4ToMp3Conversor())
        .pipe(fs.createWriteStream(filename))
        .on("error", reject)
        .on("finish", resolve);
    });
  }

  await Promise.all(files.map(unlinkFile));
}

async function unlinkFile(file: string): Promise<void> {
  const unlink = util.promisify(fs.unlink);
  return unlink(path.join(process.cwd(), file));
}

async function readDir(): Promise<string[]> {
  const readdir = util.promisify(fs.readdir);
  return readdir(process.cwd());
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
