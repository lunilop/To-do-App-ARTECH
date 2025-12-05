sap.ui.define(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
  "use strict";
  includeStylesheet("css/style.css");

  sap.ui.core.mvc.XMLView.create({
    viewName: "artech-capacitacion-fiori.view.App",
  }).then(function (oView) {
    oView.setModel(new sap.ui.model.resource.ResourceModel({ 
        bundleName: "artech-capacitacion-fiori.i18n.i18n" 
    }), "i18n");

    oView.placeAt("content");
  });
});