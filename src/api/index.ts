/* eslint-disable import/first */

require("dotenv").config();

import HttpStatus from "http-status-codes";
import Postgres from "@metamodules/postgres";
import express from "express";

const postgres = new Postgres();

const app = express();
const port = 4000;

app.use(express.static(`${__dirname}/public`));

postgres.query(`CREATE TABLE IF NOT EXISTS clicks (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
)`);

app.get("/api/count", (req, res) => {
  postgres.query("SELECT count(*) AS count FROM clicks", (err, resp) => {
    if (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      return;
    }

    res.send({ count: resp.rows[0].count || 0 });
  });
});

app.post("/api/count/increment", (req, res) => {
  postgres.query("INSERT INTO clicks DEFAULT VALUES", (insertErr, insert) => {
    postgres.query("SELECT count(*) AS count FROM clicks", (selectErr, resp) => {
      res.send({ count: resp.rows[0].count || 0 });
    });
  });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example backend API listening on port ${port}!`));
