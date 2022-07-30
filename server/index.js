import {fileURLToPath} from 'url';
import {dirname} from 'path';

import fs from "fs";
import http from "http";
import {Module} from "node:module";

export const require = Module.createRequire(import.meta.url); // instead use require() of commonJs
export const __filename = fileURLToPath(import.meta.url); // instead __filename & __dirname of commonJs
export const __dirname = dirname(__filename);

const express = require('express');
let bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');

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

app.post('/auth/login',(req, res) => {

    console.log(req);
    const email = req.body.username,
      password = req.body.password;

    if (validateEmailAndPassword(email, password)) {
      // const userId = '1';  //indUserIdForEmail(email);
      //
      // const jwtBearerToken: any = jwt.sign({}, RSA_PRIVATE_KEY, {
      //   algorithm: 'RS256',
      //   expiresIn: 120,
      //   subject: userId
      // })

      const cpol_token = "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6ImFkbWluIiwiVXNlcm5hbWUiOiJhZG1pbiJ9.EaNjxRUVMzq5l7aP7SbI0RcwemLDQKorQTrEeLRRSr4"
      res.cookie("SESSIONID", cpol_token, {httpOnly: true, secure: true});

      res.status(200).send({
        token: cpol_token,
        // expiresIn: ...
      })
    } else
      // send status 401 Unauthorized
      //res.sendStatus(400)
      res.status(400).send('username or password is wrong!')

  });

app.post('/auth/verify',(req, res) => {

    const token = req.body.token;

    jwt.verify(token, 'cpol-secret-key', {algorithms: ['HS256']}, function (err, decodedToken)
    {
      console.log(decodedToken)
    });

    res.status(200).send({
      user: jwt.decode(token),
    })

  });

// const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');

server.listen(port,host,() => {
  console.log(`server listening on ${host}:${port}`);
});

function validateEmailAndPassword(email, password) {
  return (email === 'admin' && password === 'admin')
}
