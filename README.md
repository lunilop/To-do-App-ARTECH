# FioriArtech2025 - Aplicación de Saludo UI5 Freestyle

## Descripción del Proyecto

Esta es una aplicación **UI5 Freestyle** que implementa una funcionalidad básica pero completa de saludo al usuario. La aplicación permite que un usuario ingrese su nombre en un campo de entrada (Input) y, al hacer clic en un botón, muestra un saludo personalizado.

### Requisitos Implementados ✓

- ✓ **Campo de entrada (Input)**: Permite al usuario escribir su nombre
- ✓ **Botón (Button)**: Ejecuta la acción de mostrar el saludo
- ✓ **Sin plantillas predefinidas**: Desarrollado desde cero con freestyle
- ✓ **Saludo personalizado**: Muestra el nombre ingresado por el usuario

---

## Estructura del Proyecto

```
FioriArtech2025/
├── webapp/
│   ├── index.html          # Punto de entrada HTML
│   ├── index.js            # Script de inicialización
│   ├── manifest.json       # Configuración de la aplicación
│   ├── controller/
│   │   └── App.controller.js    # Lógica de la aplicación
│   ├── view/
│   │   └── App.view.xml         # Interfaz de usuario (UI)
│   ├── css/
│   │   └── styles.css           # Estilos personalizados
│   └── i18n/
│       └── i18n.properties      # Textos internacionalizados
├── package.json            # Dependencias del proyecto
├── ui5.yaml               # Configuración de UI5
└── README.md              # Este archivo
```

---

## Explicación del Código

### 1. **index.html** - Página Principal
El archivo HTML es el punto de entrada de la aplicación. Contiene:

```html
<script
    id="sap-ui-bootstrap"
    src="resources/sap-ui-core.js"
    data-sap-ui-on-init="module:FioriArtech2025/index"
    ...
>
```

**¿Por qué?**
- Carga el framework UI5 desde SAP
- Ejecuta el archivo `index.js` al inicializar
- Configura el tema visual (Horizon)
- Define la ubicación de los recursos de la aplicación

### 2. **index.js** - Inicializador de la Aplicación

```javascript
sap.ui.core.mvc.XMLView.create({
    viewName: "FioriArtech2025.view.App"
}).then(function (oView) {
    oView.placeAt("content");
});
```

**¿Por qué?**
- Crea la vista XML de forma asincrónica (mejor rendimiento)
- Configura los modelos de la aplicación
- Renderiza la vista en el DOM
- Este es el punto de integración entre HTML y la aplicación UI5

### 3. **App.view.xml** - Interfaz de Usuario

```xml
<!-- Usando data binding con i18n para textos internacionalizados -->
<Label text="{i18n>labelNombre}" />
<Input id="inputNombre" placeholder="{i18n>placeholderNombre}" />
<Button text="{i18n>buttonSaludar}" press=".onSaludar" type="Emphasized" />
<Text id="textMensaje" text="{/mensaje}" />
```

**Componentes principales:**

| Componente | Propósito | Atributos importantes |
|-----------|----------|---------------------|
| **Input** | Captura el nombre del usuario | `id="inputNombre"` permite referenciarlo desde el código |
| **Button** | Ejecuta la acción de saludo | `press=".onSaludar"` vincula el clic a una función |
| **Text** | Muestra el saludo personalizado | `text="{/mensaje}"` vincula a datos del modelo |
| **Data Binding i18n** | Textos internacionalizados | `{i18n>clave}` obtiene textos del archivo properties |

**¿Por qué esta estructura?**
- Separación de responsabilidades: Vista (XML) vs Lógica (Controller)
- Data binding (`{/mensaje}`): Permite que los datos se actualicen automáticamente
- Data binding i18n (`{i18n>labelNombre}`): Permite cambiar de idioma sin modificar el código
- Controles estándar de UI5: Garantizan consistencia visual y accesibilidad

### 4. **App.controller.js** - Lógica de la Aplicación

```javascript
onInit: function() {
    var oModel = new JSONModel({ mensaje: "" });
    this.getView().setModel(oModel);
}
```

**¿Qué hace?**
- **JSONModel**: Crea un modelo de datos en formato JSON
- `{ mensaje: "" }`: El estado inicial del saludo está vacío
- `setModel()`: Vincula este modelo a la vista para que se actualicen automáticamente

```javascript
onSaludar: function() {
    // Obtiene el nombre del usuario
    var sNombre = oView.byId("inputNombre").getValue();
    
    // Obtiene el modelo i18n para textos internacionalizados
    var oI18nModel = oView.getModel("i18n");
    var oResourceBundle = oI18nModel.getResourceBundle();
    
    // Obtiene el template del mensaje desde i18n.properties
    var sTemplateMessage = oResourceBundle.getText("saludoMensaje");
    
    // Reemplaza {0} con el nombre del usuario
    var sMensaje = sTemplateMessage.replace("{0}", sNombre);
    
    // Actualiza el modelo
    oModel.setProperty("/mensaje", sMensaje);
}
```

**¿Por qué?**
- `getValue()`: Obtiene el texto que escribió el usuario
- `getModel("i18n")`: Accede al modelo de internacionalización
- `getResourceBundle()`: Obtiene los textos del archivo i18n.properties
- `getText("saludoMensaje")`: Obtiene el template de saludo del archivo properties
- `replace("{0}", sNombre)`: Reemplaza el placeholder con el nombre real
- `setProperty()`: Actualiza el modelo y automáticamente se refleja en la vista
- Validación: Comprueba que el usuario haya ingresado un nombre válido

### 5. **i18n.properties** - Textos Internacionalizados

```properties
# Título de la página
appTitle=Aplicación de Saludo UI5
appDescription=Aplicación de saludo personalizado con entrada de usuario

# Etiqueta del campo de entrada
labelNombre=Ingresa tu nombre:
placeholderNombre=Escribe tu nombre aquí

# Botón
buttonSaludar=Mostrar Saludo

# Mensajes de saludo
saludoMensaje=¡Hola {0}! Bienvenido a nuestra aplicación.
errorVacio=Por favor, ingresa tu nombre
```

**¿Por qué?**
- **Centralización de textos**: Todos los textos están en un solo lugar
- **Fácil de traducir**: Solo cambiar este archivo para otro idioma
- **Mantenimiento simple**: Si necesitas cambiar un texto, lo haces aquí
- **Placeholders {0}**: Permite insertar valores dinámicos en los textos
- **Data binding desde XML**: `{i18n>labelNombre}` obtiene el texto automáticamente

### 6. **styles.css** - Estilos Personalizados

```css
.sapUiMediumMargin {
    padding: 2rem;
    max-width: 500px;
    margin: 0 auto;
}
```

**¿Por qué?**
- Mejora la experiencia visual
- Centra el contenido en pantalla
- Proporciona espaciado uniforme
- Las clases `sapUi*` son estándares de UI5 para mantenibilidad

---

## Flujo de Ejecución

```
1. Usuario carga index.html
   ↓
2. Script bootstrap carga UI5 y ejecuta index.js
   ↓
3. index.js crea la vista desde App.view.xml
   ↓
4. App.controller.js inicializa con:
   - JSONModel vacío para el saludo
   - ResourceModel i18n para los textos
   ↓
5. La vista XML utiliza data binding para:
   - Obtener textos del i18n.properties (etiquetas, botón, etc.)
   - Vincular con el JSONModel (para mostrar el saludo cuando cambie)
   ↓
6. Usuario escribe su nombre en el Input
   ↓
7. Usuario hace clic en "Mostrar Saludo"
   ↓
8. onSaludar() obtiene el nombre y crea el mensaje
   ↓
7. onSaludar() obtiene el nombre y crea el mensaje
   ↓
8. setProperty() actualiza el modelo
   ↓
9. La vista se re-renderiza automáticamente con el saludo
```

---

## ¿Por Qué Esta Arquitectura?

### Patrón MVC (Model-View-Controller)
- **Model**: JSONModel - Almacena el estado de la aplicación
- **View**: App.view.xml - Define cómo se ve la interfaz
- **Controller**: App.controller.js - Contiene la lógica

**Ventajas:**
- Código organizado y mantenible
- Fácil de debuggear (cada parte tiene una responsabilidad)
- Escalable para aplicaciones más grandes

### Freestyle (Sin Plantillas)
- Desarrollado desde cero sin usar generadores automáticos
- Control total sobre cada aspecto
- Mejor para entender cómo funciona UI5

### Data Binding
- Los controles se actualizan automáticamente cuando cambian los datos
- No necesitamos actualizar manualmente elementos del DOM
- Código más limpio y menos propenso a errores

---

## Cómo Ejecutar

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar servidor de desarrollo:**
   ```bash
   npm start
   ```

3. **Abrir en navegador:**
   ```
   http://localhost:8080
   ```

4. **Usar la aplicación:**
   - Ingresa tu nombre
   - Haz clic en "Mostrar Saludo"
   - ¡Verás tu saludo personalizado!

---

## Tecnologías Utilizadas

- **SAP UI5**: Framework de desarrollo de aplicaciones empresariales
- **XML**: Para definir la interfaz de usuario
- **JavaScript**: Para la lógica de la aplicación
- **CSS**: Para estilos personalizados
- **JSON**: Para el modelo de datos

---

## Conclusión

Esta aplicación demuestra los conceptos fundamentales de UI5 freestyle:
- Estructura MVC clara
- Data binding automático
- Controles estándar de UI5
- Código comentado para fácil comprensión
- Flujo de usuario intuitivo

Es una excelente base para aprender UI5 y puede expandirse con funcionalidades más complejas.
