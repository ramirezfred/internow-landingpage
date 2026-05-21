---
trigger: always_on
---

# Manifiesto de Buenas Prácticas para Angular
## Basado en el Estándar de Arquitectura Principal (Vibe & Solidez)

---

## I. INTEGRIDAD ESTRUCTURAL (The Backbone en Angular)

### 1. Separación Estricta de Responsabilidades (SoC)
* **Regla:** Los componentes (`.component.ts`) deben ser visualmente "tontos" y ciegos a la infraestructura o procedencia de los datos. Su única función es gestionar el estado de la vista y reaccionar a los eventos de la UI.
* **Implementación:** Toda la lógica de negocio, llamadas HTTP, transformaciones de datos, manejo de traducciones complejas o cálculos lógicos debe vivir exclusivamente en **Servicios Inyectables (`@Injectable()`)**.
* **Flujo Estricto:** Componente (UI tonta) ➡️ Llama a Servicio (Lógica ciega) ➡️ Consume API/Capa de Datos.

### 2. Agnosticismo de Dependencias (Wrappers de Librerías)
* **Regla:** Queda prohibido importar o utilizar librerías externas de terceros directamente dentro de tus componentes de presentación.
* **Implementación:** Si el proyecto requiere una librería externa (para manejo de fechas, gráficas, animaciones o alertas), se debe crear un servicio o directiva propia de Angular que actúe como **Wrapper** e interfaz intermedia.
* **Por qué:** Si la librería X queda obsoleta o presenta fallas de seguridad mañana, solo se edita el archivo del wrapper local, evitando refactorizar toda la aplicación.

### 3. Principio de Inmutabilidad por Defecto (Change Detection Eficiente)
* **Regla:** Trata todos los datos de la aplicación y las propiedades `@Input()` como estrictamente inmutables para prevenir efectos secundarios inter-componentes.
* **Implementación:** Configura la estrategia de detección de cambios de los componentes como `ChangeDetectionStrategy.OnPush`. Para actualizar la UI, no mutes arreglos u objetos con `.push()` o asignaciones directas; genera nuevas referencias en memoria utilizando el operador spread (`[...]` o `{...}`).

---

## II. PROTOCOLO DE CONSERVACIÓN DE CONTEXTO (Clean Code)

### 4. La Regla del "Chesterton's Fence"
* **Regla:** Antes de eliminar, modificar o refactorizar un componente, directiva o servicio antiguo (o generado en iteraciones pasadas), es obligatorio analizar y enunciar de forma explícita por qué ese código existía. No se borra nada sin comprender su dependencia en el ecosistema de la landing.

### 5. Código Auto-Documentado
* **Regla:** Los nombres de variables, componentes, clases y métodos deben ser tan descriptivos que su lectura explique la intención del negocio sin necesidad de comentarios adicionales.
* **Ejemplos:**
  * ❌ `getData()` ➡️  `getVehiclesForImport()`
  * ❌ `submit()` ➡️ `sendContactForm()`
* **Excepción:** Se permite el uso de comentarios únicamente para explicar lógica de negocio de alta complejidad o decisiones no obvias ("hacks" temporales por limitaciones del navegador).

### 6. Atomicidad en Cambios y Estado Completo
* **Regla:** Cada componente autónomo (*Standalone Component*) entregado debe ser un bloque de código completo, funcional y libre de errores de compilación. No se permiten entregas con funciones a medio escribir o marcadores `// TODO` críticos que rompan la ejecución en cPanel.

---

## III. UI/UX: SISTEMA DE DISEÑO ATÓMICO (Atomic Vibe)

### 7. Tokenización Visual (Estilos Semánticos)
* **Regla:** Queda estrictamente prohibido el uso de "magic numbers" o códigos de color hardcodeados dentro del archivo SCSS/CSS de los componentes (ej: `color: #F00;`, `margin: 12px;`).
* **Implementación:** Toda la guía de estilos debe estar centralizada en variables de CSS nativas o variables globales de SASS. Utiliza siempre variables semánticas como `var(--color-danger)`, `var(--color-primary)` o `var(--spacing-medium)`.

### 8. Componentización Recursiva (Regla de las 20 Líneas)
* **Regla:** Si la plantilla HTML de un componente supera las 20-30 líneas de maquetación visual, o si un elemento de la interfaz se repite más de una vez, debe ser extraído a un componente aislado inmediatamente.
* **Implementación:** La landing debe estructurarse mediante componentes atómicos (`hero.component.ts`, `contact-form.component.ts`, `service-card.component.ts`) integrados de forma limpia en el contenedor principal.

### 9. Resiliencia Visual en Componentes
* **Regla:** Todo componente que dependa de datos dinámicos, asíncronos o de interacciones de red debe controlar y renderizar explícitamente sus estados de borde.
* **Implementación:** Se deben diseñar e implementar los estados de:
  * **Loading:** Esqueleto de carga o spinner limpio mientras responde el servidor.
  * **Error:** Mensaje amigable localizado si falla el envío de información.
  * **Empty:** Interfaz limpia si la consulta no arroja resultados.
  * **Data Overflow:** Reglas CSS estrictas (`text-overflow: ellipsis;`, `overflow: hidden;`) para asegurar que las traducciones al inglés (que suelen ser más largas) no rompan la estructura visual.

---

## IV. ESTÁNDARES DE CALIDAD GENÉRICOS

### 10. Patrón Early Return en Validaciones
* **Regla:** Evita el código en flecha (*Arrow Code*) provocado por el anidamiento excesivo de bloques `if-else`.
* **Implementación:** Al validar formularios reactivos o estados de respuesta, verifica siempre las condiciones negativas o de error primero para salir prematuramente del método, dejando el "camino feliz" libre, plano y legible al final.
```typescript
sendContactForm() {
  // 1. Validación negativa (Early Return)
  if (this.contactForm.invalid) {
    this.contactForm.markAllAsTouched();
    return; 
  }
  
  // 2. Camino feliz: código plano, limpio y legible
  this.contactService.saveLead(this.contactForm.value).subscribe();
}