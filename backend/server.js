/*eslint no-console: 0*/
"use strict";

const express = require("express");
const clientes = require("./clientes");
const bodyParser = require('body-parser')

const app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json()); 
app.use("/clientes", clientes);
app.get("/", (req, res) => {
	res.send("Backend");
});

app.listen(port, () => {
	console.log(`Exemplo backend ounvindo na porta ${port}`);
});
