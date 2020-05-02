import express from "express";
import mime from "mime-types";
import ytdl from "ytdl-core";

const app = express();

app.use(express.static(`${__dirname}/public`));

app.get("/api/video/:id/info", async (req, res) => {
  const info = await ytdl.getInfo(`http://www.youtube.com/watch?v=${req.params.id}`);
  res.json(info);
});

app.get("/api/video/:id/download", (req, res) => {
  const { id } = req.params;
  const { name } = req.query;

  const ext = "mp4";

  const contentType = mime.lookup(`.${ext}`);

  if (!contentType) {
    throw new Error();
  }

  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(name?.toString() ?? "video")}.${ext}"`);

  ytdl(`http://www.youtube.com/watch?v=${id}`, {
    quality: "highestaudio",
    filter: (format) => format.container === "mp4",
  }).pipe(res);
});

// eslint-disable-next-line no-process-env
app.listen(process.env.PORT || 8080);
