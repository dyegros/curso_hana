sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("curso.ui.controller.Clientes", {
		onInit: function () {
			this.getView().addStyleClass("sapUiSizeCompact"); // make everything inside this View appear in Compact mode
			
			var vendasModel = this.getOwnerComponent().getModel("vendasModel");
			
			var oTable = this.getView().byId("clTable");
			
			oTable.setModel(vendasModel);
			oTable.setEntitySet("ClientesSet");

			function loadMetadata() {
				oTable.setModel(vendasModel);
				oTable.setEntitySet("ClientesSet");
				var oMeta = vendasModel.getServiceMetadata();
				var headerFields = "";
				for (var i = 0; i < oMeta.dataServices.schema[0].entityType[0].property.length; i++) {
					var property = oMeta.dataServices.schema[0].entityType[0].property[i];
					headerFields += property.name + ",";
				}
				oTable.setInitiallyVisibleFields(headerFields);
			}
			
			vendasModel.attachMetadataLoaded(vendasModel, loadMetadata);
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