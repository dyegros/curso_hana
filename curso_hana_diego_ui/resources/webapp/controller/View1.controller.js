sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("curso_hana_diego_ui.curso_hana_diego_ui.controller.View1", {
		onInit: function () {
            var receitasModel = this.getOwnerComponent().getModel("receitasModel");
            var oTable = this.getView().byId("stReceitas");
            
            oTable.setModel(receitasModel);
            oTable.setInitiallyVisibleFields("MANDT,EMPRESA,FILIAL,ANO,MES,VALOR");
		}
	});
});