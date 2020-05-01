/* eslint-disable import/first */
/// <reference path="index.d.ts" />

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Postgres from '@metamodules/postgres';

const postgres = Postgres();

const app = express()
const port = 4000

postgres.query(`CREATE TABLE IF NOT EXISTS clicks (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
)`)

app.get('/api/count', (req, res) => {
  postgres.query('SELECT count(*) AS count FROM clicks', (err, resp) => {
    res.send({ count: resp.rows[0].count || 0 })
  })
})

app.post('/api/count/increment', (req, res) => {
  postgres.query('INSERT INTO clicks DEFAULT VALUES', (err, insert) => {
    postgres.query('SELECT count(*) AS count FROM clicks', (err, resp) => {
      res.send({ count: resp.rows[0].count || 0 })
    })
  })
})

app.listen(port, () => console.log(`Example backend API listening on port ${port}!`))
