/**
 * Punto de entrada principal de la aplicación
 * Este archivo se ejecuta primero y configura la aplicación
 */
sap.ui.define([], function () {
    "use strict";

    // Incluye el archivo CSS personalizado para estilos de la aplicación
    jQuery.sap.includeStyleSheet("css/styles.css");

    /**
     * Crea la vista XML de forma asincrónica
     * XMLView.create es el método moderno para crear vistas
     */
    sap.ui.core.mvc.XMLView.create({
        viewName: "FioriArtech2025.view.App"  // Referencia al archivo App.view.xml
    }).then(function (oView) {

        /**
         * Configura el modelo de internacionalización (i18n)
         * Aunque en esta aplicación usamos principalmente datos dinámicos,
         * lo dejamos para compatibilidad con estructura UI5 estándar
         */
        oView.setModel(new sap.ui.model.resource.ResourceModel({
            bundleName: "FioriArtech2025.i18n.i18n"
        }), "i18n");

        // Coloca la vista en el elemento HTML con id="content"
        // Esto renderiza la aplicación en el DOM
        oView.placeAt("content");
    });
});
