/*eslint no-console: 0*/
"use strict";

const express = require("express");
const appClientes = express();
const hdbext = require('@sap/hdbext');
const xsenv = require('@sap/xsenv');

var hanaConn = xsenv.cfServiceCredentials({hana: {tag: "hana"}});

appClientes.use(hdbext.middleware(hanaConn));

appClientes.get('/', (req, res) => {
  var conn = req.db;
  conn.exec("SELECT codigo, nome FROM Vendas.Clientes", function(resultado) {
  	res.json(resultado);
  });
});

/*appClientes.post('/', (req, res) => {
	var novoCliente = req.body;
	//Inserir no banco
	dbClientes.push(novoCliente);
	res.json(novoCliente);
});
*/

module.exports = appClientes;