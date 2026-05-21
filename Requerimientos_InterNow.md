# Especificación de Requerimientos de Software (ERS)
## Desarrollo de Landing Page Corporativa Multilingüe — InterNow (cPanel Optimized)

---

### Propósito del Documento
Establecer los requerimientos funcionales, técnicos y de interfaz para la creación de la Landing Page de la consultora **InterNow** utilizando Angular. Se incorpora la arquitectura multilingüe (Español/Inglés), optimización SEO on-page para Client-Side Rendering (CSR), diseño responsivo y compatibilidad para despliegue directo en servidores tradicionales **cPanel**.

### Datos del Proyecto
* **Proyecto:** Landing Page Institucional InterNow (Multilingüe)
* **Framework:** Angular (Componentes Autónomos - CSR)
* **Servidor de Despliegue:** cPanel (Servidor Apache Tradicional)
* **Fecha de Emisión:** 21 de mayo de 2026
* **Estado:** Aprobado para Desarrollo

---

## 1. Introducción y Objetivos de Internacionalización

El propósito de la Landing Page de **InterNow** es consolidar la presencia global de la firma como una consultora 100% digital experta en aceleración de negocios y optimización operativa. Al manejar operaciones internacionales que conectan mercados en Estados Unidos, China y México, la plataforma exige una experiencia de usuario global mediante un sistema dinámico de cambio de idioma.

### 1.1 Objetivos de Negocio
* **Proyección Internacional:** Facilitar el acceso y comprensión de los servicios a partners y prospectos tanto en el mercado hispanohablante como en el angloparlante.
* **Captación Centralizada:** Canalizar los leads de diferentes países mediante un formulario dinámico adaptado localmente.
* **Despliegue Ágil:** Compilación optimizada para producción estática, facilitando su carga directa vía FTP o Administrador de Archivos en cPanel sin dependencias activas de Node.js en ejecución continua.

---

## 2. Arquitectura de la Información y Gestión de Idiomas

El sitio operará bajo una estructura *One-Page* donde todas las secciones clave traducirán su contenido de manera inmediata tras la interacción del usuario con el selector de idioma.

### 2.1 Sistema de Localización (Español / Inglés)
* **Idioma por Defecto:** El sistema detectará la configuración del navegador del usuario. Si el navegador está en inglés (`en`), la página iniciará en Inglés; de lo contrario, se mostrará en Español (`es`) por defecto.
* **Selector de Idioma:** Un menú desplegable o botón toggle visualmente claro estará disponible de forma persistente en la barra de navegación (tanto en escritorio como en móvil) permitiendo alternar de forma inmediata entre "ES" y "EN" sin recargar la aplicación.

### 2.2 Estructura del Contenido a Traducir
1.  **Hero / Presentación:** Traducción de la propuesta conceptual ("Consultoría Integral de Soluciones Digitales y Operativas" / "Comprehensive Digital and Operational Solutions Consulting").
2.  **¿Quiénes Somos?:** Exposición del modelo de consultoría digital, la reducción de fricciones técnicas y operativas y el acompañamiento estratégico de la cadena de suministro global.
3.  **Propuesta de Valor:** Bloques correspondientes a Agilidad Digital (Digital Agility), Soluciones Llave en Mano (Turnkey Solutions - End-to-End) y Visión 360° (360° Vision).
4.  **Pilares de Servicio:**
    * *Pilar 1 (Creación de Marca):* "Crea tu Mezcal" (Brand Development & Identity / Regulatory Strategy).
    * *Pilar 2 (Importación y Logística):* InterNow Motors (Importación de vehículos USA-México) y Operaciones China DDP (Delivered Duty Paid).
    * *Pilar 3 (Tecnología):* Desarrollo de Apps a Medida (Custom App Development) y Consultoría en Digitalización (Digitalization Consulting).
5.  **Formulario e Interfaz:** Todos los marcadores de posición (*placeholders*), etiquetas de campos y alertas de error del formulario de contacto cambiarán de idioma de manera reactiva.

---

## 3. Requerimientos Funcionales (RF)

| ID | Requerimiento | Descripción y Reglas de Negocio |
| :--- | :--- | :--- |
| **RF-01** | Navegación Dinámica | Navegación fluida tipo *Smooth Scroll* controlada por Angular Router o Viewport Scroller a través de las secciones de la Landing. |
| **RF-02** | Cambio de Idioma en Caliente | El usuario podrá alternar entre Español e Inglés en cualquier momento. Toda la interfaz cambiará en tiempo real sin perder el estado del formulario ni provocar re-renderizados pesados. |
| **RF-03** | Formulario Reactivo | Formulario implementado con `ReactiveForms` que valide obligatoriamente: Nombre, Correo, Teléfono, Servicio de Interés (las opciones cambian según el idioma) y Mensaje. |
| **RF-04** | Validación y Feedback | Los mensajes de error ("Campo obligatorio", "Formato inválido") se mostrarán en tiempo real en el idioma activo. El botón de envío se bloqueará ante datos inválidos. |
| **RF-05** | Persistencia de Preferencia | Cuando un usuario elija un idioma explícitamente, esta preferencia se almacenará en el `localStorage` del navegador para que sea recordada en sus próximas visitas. |

---

## 4. Requerimientos No Funcionales (RNF)

### 4.1 Implementación Técnica de Idiomas e i18n
* **RNF-01 [Estrategia de Traducción Angular]:** Se debe emplear una librería de traducción dinámica como `@ngx-translate/core` para permitir el cambio de idioma en tiempo de ejecución (*on-the-fly*), almacenando los textos en archivos JSON independientes (`es.json` y `en.json`).
* **RNF-02 [Configuración para Servidor Apache - cPanel]:** Al compilarse como Single Page Application (CSR), se debe incluir un archivo `.htaccess` en la raíz de `public_html` para redirigir todas las peticiones del navegador al `index.html` y evitar errores 404 de Apache al refrescar o navegar por rutas internas.
* **RNF-03 [SEO en el Cliente (Meta Service)]:** Dado que no se usará SSR, el SEO se gestionará dinámicamente mediante los servicios `Title` y `Meta` integrados en Angular para actualizar las etiquetas de descripción, keywords y Open Graph directamente en el cliente.

### 4.2 Responsividad y Diseño (Mobile-Friendly)
* **RNF-04 [Diseño Responsivo y Móvil]:** Uso de Flexbox/CSS Grid adaptándose desde resoluciones de smartphones mínimos (320px) hasta pantallas corporativas Ultra-Wide (1920px). El selector de idioma debe integrarse de forma limpia dentro del menú hamburguesa móvil.
* **RNF-05 [Diseño Moderno y Adaptación Visual]:** Diseño premium con transiciones estéticas y fluidas en hover. Se debe prever en el CSS que las longitudes de los textos traducidos al inglés suelen variar para evitar desbordamientos visuales o roturas de diseño en la interfaz.

---

## 5. Canales de Redes Sociales Integrados

Todos los enlaces deben configurarse con apertura en pestaña externa independiente (`target="_blank" rel="noopener noreferrer"`):

### InterNow IT
* **Facebook:** https://www.facebook.com/profile.php?id=100092537898574
* **Instagram:** https://www.instagram.com/internowmex?igsh=MXU3amU4cHR2YWJ0NA==

### Crea tu Mezcal
* **Facebook:** https://www.facebook.com/creatumezcal
* **Instagram:** https://www.instagram.com/creatumezcal?igsh=dzZ6eHczbnF6N2Fr

### InterNow Motors
* **Facebook:** https://www.facebook.com/profile.php?id=61576521206113

---

## 6. Anexo Técnico para Despliegue en cPanel

Para asegurar la correcta navegación en el servidor Apache de cPanel al usar Client-Side Rendering (CSR), se especifica la creación obligatoria del archivo `.htaccess` en el directorio raíz de distribución con la siguiente regla de reescritura:

```apache
RewriteEngine On
# Si el archivo o directorio solicitado existe, usarlo directamente
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
# Si no existe, redirigir todo al index.html de Angular
RewriteRule ^ index.html [L]