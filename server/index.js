import {fileURLToPath} from 'url';
import {dirname} from 'path';

import fs from "fs";
import http from "http";
import {Module} from "node:module";

export const require = Module.createRequire(import.meta.url); // instead use require() of commonJs
export const __filename = fileURLToPath(import.meta.url); // instead __filename & __dirname of commonJs
export const __dirname = dirname(__filename);

const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const secretKey = "49UKZU60X1b7Em97VKeeW0blpvSsAm3m";
const {sign, verify} = require("jsonwebtoken");

const port = 8000;
const host = 'localhost';

const app = express();
const server = http.createServer(app);
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
  //res.sendFile(__dirname + '/client.html');
});

app.post('/auth/login', (req, res) => {

  console.log(req);
  const payload = req.body.payload;
  const token = generateToken(payload);

  if(token)
    res.status(200).send({
      token,
    })
  else
    res.status(400).send('error !')
});

app.post('/auth/verify', (req, res) => {

  const token = req.body.token;
  const verified = verifyToken(token)

  res.status(200).send({
    verified,
  })

});

// const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');

server.listen(port, host, () => {
  console.log(`server listening on ${host}:${port}`);
});

function validateEmailAndPassword(email, password) {
  return (email === 'admin' && password === 'admin')
}

function generateToken(payload) {
  const k = sign(payload, secretKey, {expiresIn: '1h'});
  return k
}

function verifyToken(token) {
  return verify(token, secretKey, {complete: true})
}
