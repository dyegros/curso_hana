/*eslint no-console: 0*/
"use strict";

const express = require("express");
const appClientes = express();
const hdbext = require("@sap/hdbext");
const xsenv = require("@sap/xsenv");

var hanaConn = xsenv.cfServiceCredentials({ tag: "hana" });

appClientes.use(hdbext.middleware(hanaConn));

appClientes.get("/", (req, res) => {
  var conn = req.db;
  conn.exec('SELECT * FROM "curso_dyegros.db::Vendas.Clientes"', function(err, resultado) {
  	if (err) {
  		res.status(501).send(new Error(err));
  	} else {
  		res.json(resultado);
  	}
  });
});

appClientes.post("/", (req, res) => {
	var novoCliente = req.body;
	var conn = req.db;
	conn.exec(`INSERT INTO "curso_dyegros.db::Vendas.Clientes" ("codigo", "nome") values (${novoCliente.codigo},'${novoCliente.nome}')`, (err) => {
		if (err) {
	  		res.status(500);
	  		res.json(err);
	  	} else {
	  		res.status(201);
	  		res.json(novoCliente);
	  	}
	});
});

appClientes.post("/notas-com-cst-incorreto-de-transferencia/:mandt/:empresa/:periodo/corrigir", (req, res) => {
	
	
});

appClientes.put("/:codigo", (req, res) => {
	var codigo = req.params.codigo;
	var clienteAlterado = req.body;
	var conn = req.db;
	conn.exec(`UPDATE "curso_dyegros.db::Vendas.Clientes" set "codigo" = ${clienteAlterado.codigo}, "nome" = '${clienteAlterado.nome}' where "codigo" = ${codigo}`, (err, resultado) => {
		if (err) {
			var resultError = err ? err : {message: "Linha não gravada"};
	  		res.status(500);
	  		res.json(resultError);
	  	} if (resultado === 0) 
	  	{
	  		res.status(404); //o código não existe
	  		res.json({message: "Código não existe"});
	  	}
	  	else {
	  		res.status(201);
	  		res.json(clienteAlterado);
	  	}
	});
});


appClientes.delete("/:codigo", (req, res) => {
	var codigo = req.params.codigo;
	var conn = req.db;
	conn.exec(`DELETE FROM "curso_dyegros.db::Vendas.Clientes" where "codigo" = ${codigo}`, (err, resultado) => {
		if (err) {
	  		res.status(500);
	  		res.json(err);
	  	} if (resultado === 0) {
	  		res.status(404); //o código não existe
	  		res.json({message: "Código não existe"});
	  	}
	  	else {
	  		res.status(204);
	  		res.send("");
	  	}
	});
});

module.exports = appClientes;