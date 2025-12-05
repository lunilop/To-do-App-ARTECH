sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("artech-capacitacion-fiori.controller.App", {
        onClick: function() {
            const inputName = this.byId("inputName");
            const name = inputName.getValue();

            const i18nModel = this.getView().getModel("i18n");
            const bundle = i18nModel.getResourceBundle();

            const text = bundle.getText("toastHello", [name]);

            sap.m.MessageToast.show(text);
            inputName.setValue("");
        }
    });
});