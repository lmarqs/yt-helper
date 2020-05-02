import express from "express";
import { videoRouter } from "./video";

const app = express();

app.use(express.static(`${__dirname}/public`));

app.use("/api/video", videoRouter);

app.use((err, req, res, next) => {
  res.status(500).send(err.toString());
});

// eslint-disable-next-line no-process-env
app.listen(process.env.PORT || 8080);

