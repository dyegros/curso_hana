sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("curso.ui.controller.Impostos", {
		onSearch: function (oEvent) {
			
			var path =
                    '/ImpostosParams(P_MANDT=\'' +
                    oEvent.MANDT +
                    '\',P_EMPRESA=\'' +
                    oEvent.YEAR + '\')/Results';
                
			var oTable = new sap.ui.comp.smarttable.SmartTable("clTable", {header: "Produtos", editable: false, showRowCount: true, enableAutoBiding: true, tableType: 'Table'});
			var vendasModel = this.getOwnerComponent().getModel("vendasModel");
			
			oTable.setModel(vendasModel);
			oTable.tableBindingPath=path;
			this.byId("content_vbox").addItem(oTable);
		},

		onInit: function () {
			this.getView().addStyleClass("sapUiSizeCompact"); // make everything inside this View appear in Compact mode
		},
		
		/**
		 * Convenience method for getting the view model by name in every controller of the application.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel : function (sName) {
			return this.getView().getModel(sName);
		}

	});
});