import express from "express";
import mime from "mime-types";
import ytdl from "ytdl-core";

const app = express();

app.use(express.static(`${__dirname}/public`));

app.get("/api/video/:url/info", async (req, res, next) => {
  try {
    const info = await ytdl.getInfo(decodeURIComponent(req.params.url));
    return res.json(info);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/video/:url/download", (req, res) => {
  const { url } = req.params;
  const { name } = req.query;

  const ext = "mp4";

  const contentType = mime.lookup(`.${ext}`);

  if (!contentType) {
    throw new Error();
  }

  res.setHeader("Content-Type", contentType);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${encodeURIComponent(name?.toString() ?? "video")}.${ext}"`,
  );

  ytdl(decodeURIComponent(url), {
    quality: "highestaudio",
    filter: (format) => format.container === "mp4",
  }).pipe(res);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.toString());
});

// eslint-disable-next-line no-process-env
app.listen(process.env.PORT || 8080);
