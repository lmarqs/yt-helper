import express from "express";
import ytdl from "ytdl-core";

export const infoRequestHander: express.RequestHandler = async (req, res, next) => {
  try {
    const info = await ytdl.getInfo(decodeURIComponent(req.params.url));
    return res.json(info);
  } catch (err) {
    return next(err);
  }
};
