/**
 * Controlador de la aplicación de saludo
 * Este módulo gestiona la lógica de la interfaz de usuario
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller",  // Importa la clase base Controller de UI5
    "sap/ui/model/json/JSONModel"  // Importa JSONModel para manejo de datos
], function(Controller, JSONModel) {
    "use strict";
    
    /**
     * Extiende Controller para crear el controlador específico de la aplicación
     * El primer parámetro es el nombre único del controlador
     */
    return Controller.extend("FioriArtech2025.controller.App", {
        
        /**
         * onInit: Se ejecuta automáticamente cuando se inicializa la vista
         * Este es el lugar ideal para configurar el modelo de datos inicial
         */
        onInit: function() {
            // Crea un modelo JSON vacío que almacenará el mensaje de saludo
            // El modelo permite vincular datos a los controles de la vista
            var oModel = new JSONModel({
                mensaje: ""  // Inicialmente el mensaje está vacío
            });
            
            // Establece el modelo como el modelo de datos por defecto de la vista
            // Esto permite que los controles XML accedan a los datos usando {/mensaje}
            this.getView().setModel(oModel);
            
            console.log("Aplicación de saludo inicializada correctamente");
        },

        /**
         * onSaludar: Se ejecuta cuando el usuario hace clic en el botón "Mostrar Saludo"
         * Esta función:
         * 1. Obtiene el valor del Input donde el usuario escribió su nombre
         * 2. Crea un saludo personalizado usando textos del i18n.properties
         * 3. Actualiza el modelo para mostrar el saludo en la vista
         */
        onSaludar: function() {
            // Obtiene la vista actual desde el controlador
            var oView = this.getView();
            
            // Obtiene el control Input por su id "inputNombre"
            var oInput = oView.byId("inputNombre");
            
            // Obtiene el valor que el usuario escribió en el Input
            var sNombre = oInput.getValue();
            
            // Valida que el usuario haya ingresado algo
            if (sNombre && sNombre.trim() !== "") {
                // Obtiene el modelo i18n para acceder a los textos internacionalizados
                var oI18nModel = oView.getModel("i18n");
                
                // Obtiene el ResourceBundle que contiene los textos del archivo i18n.properties
                var oResourceBundle = oI18nModel.getResourceBundle();
                
                // Obtiene el template del mensaje desde i18n.properties
                // El placeholder {0} será reemplazado por el nombre del usuario
                var sTemplateMessage = oResourceBundle.getText("saludoMensaje");
                
                // Reemplaza {0} con el nombre del usuario
                // Este es el método estándar de internacionalización en UI5
                var sMensaje = sTemplateMessage.replace("{0}", sNombre);
                
                // Obtiene el modelo de datos (JSONModel) de la vista
                var oModel = oView.getModel();
                
                // Actualiza la propiedad "mensaje" en el modelo
                // Esto automáticamente actualiza el control Text en la vista que está vinculado a /mensaje
                oModel.setProperty("/mensaje", sMensaje);
                
                console.log("Saludo generado para: " + sNombre);
            } else {
                // Obtiene el modelo i18n para el mensaje de error
                var oI18nModel = oView.getModel("i18n");
                var oResourceBundle = oI18nModel.getResourceBundle();
                
                // Obtiene el mensaje de error desde i18n.properties
                var sErrorMessage = oResourceBundle.getText("errorVacio");
                
                // Si el usuario no ingresó nada, muestra el mensaje de error internacionalizado
                alert(sErrorMessage);
            }
        }
    });
});
