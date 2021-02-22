sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("curso.ui.controller.Impostos", {
		onSearch: function (oEvent) {
			var path =
                    "/ImpostosParams(P_MANDT=\'" +
                    oEvent.mParameters.selectionSet[0].getValue() +
                    "',P_YEAR='" +
                    oEvent.mParameters.selectionSet[1].getValue() + "')/Results";
            
			var oTable = this.byId("clTable");
	
			oTable.setTableBindingPath(path);
			oTable.rebindTable();
		},

		onInit: function () {
			this.getView().addStyleClass("sapUiSizeCompact"); // make everything inside this View appear in Compact mode
			var vendasModel = this.getOwnerComponent().getModel("vendasModel");
			var oTable = this.byId("clTable");

			function loadMetadata() {
				var oMeta = vendasModel.getServiceMetadata();
				var headerFields = "";
				for (var i = 0; i < oMeta.dataServices.schema[0].entityType[2].property.length; i++) {
					var property = oMeta.dataServices.schema[0].entityType[2].property[i];
					headerFields += property.name + ",";
				}
				oTable.setInitiallyVisibleFields(headerFields);
				oTable.setModel(vendasModel);
			}
			vendasModel.attachMetadataLoaded(vendasModel, loadMetadata);
			vendasModel.getMetaModel();
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