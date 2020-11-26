import express from "express";
import { videoRouter } from "./video";

const app = express();

app.use(express.static(`${__dirname}/public`));

app.use("/api/video", videoRouter);

const errorhandler: express.ErrorRequestHandler = (err, req, res) => {
  res.status(500).send(err instanceof Error ? err.toString() : err);
};

app.use(errorhandler);

// eslint-disable-next-line no-process-env
app.listen(process.env.PORT || 8080);

