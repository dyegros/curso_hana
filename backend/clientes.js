/*eslint no-console: 0*/
"use strict";

const express = require("express");
const appClientes = express();

var dbClientes = [
  	{codigo: 10, nome: "Antonio"},
  	{codigo: 20, nome: "Carlos"},
  	{codigo: 30, nome: "Maria"}
  ];

appClientes.get('/', (req, res) => {
  res.json(dbClientes);
});

appClientes.post('/', (req, res) => {
	var novoCliente = req.body;
	//Inserir no banco
	dbClientes.push(novoCliente);
	res.json(novoCliente);
});

module.exports = appClientes;