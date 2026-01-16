# Guía de Accesibilidad

## 📋 Información General

Esta aplicación cumple con las **Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2 nivel AA**, garantizando que sea accesible para todas las personas, incluyendo aquellas con discapacidades.

## 🎯 Objetivo

Crear una aplicación web inclusiva que sea utilizable por:
- Personas ciegas o con baja visión (lectores de pantalla)
- Personas sordas o con problemas auditivos (lengua de signos)
- Personas con discapacidades motoras (navegación por teclado)
- Personas con dificultades cognitivas (lectura fácil)
- Personas mayores
- Usuarios de tecnologías de asistencia

## ✅ Cumplimiento WCAG 2.2 AA

### Principio 1: Perceptible

#### 1.1 Alternativas de Texto
- ✅ Todas las imágenes tienen atributo `alt` descriptivo
- ✅ Iconos decorativos tienen `aria-hidden="true"`
- ✅ Iconos funcionales tienen `aria-label`

```html
<!-- Correcto -->
<img src="logo.png" alt="Logo de Sensibilización Feminista">
<button aria-label="Cerrar menú">
  <i class="icon-close" aria-hidden="true"></i>
</button>
```

#### 1.2 Medios Tempodependientes
- ✅ Vídeos en lengua de signos (LSE y LSC)
- ✅ Transcripciones de vídeos disponibles
- ✅ Subtítulos en vídeos
- ✅ Controles de reproducción accesibles

#### 1.3 Adaptable
- ✅ Estructura semántica HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`)
- ✅ Orden lógico de lectura
- ✅ Relaciones entre elementos claramente definidas
- ✅ Landmarks ARIA (`role="main"`, `role="navigation"`, etc.)

```html
<header role="banner">
  <nav role="navigation" aria-label="Menú principal">
    <!-- ... -->
  </nav>
</header>
<main role="main">
  <article>
    <!-- ... -->
  </article>
</main>
```

#### 1.4 Distinguible
- ✅ **Contraste de color**: Mínimo 4.5:1 para texto normal, 3:1 para texto grande
- ✅ **Redimensionamiento de texto**: Hasta 200% sin pérdida de funcionalidad
- ✅ **Imágenes de texto**: Evitadas cuando es posible usar texto real
- ✅ **Reflow**: Contenido adaptable sin scroll horizontal en 320px

**Paleta de colores accesible**:
```css
/* Colores principales con contraste AA */
--primary-color: #5c2d91;        /* Morado principal */
--text-color: #333333;           /* Texto oscuro (contraste 12.6:1 sobre blanco) */
--background: #ffffff;           /* Fondo blanco */
--secondary-bg: #f0e7f8;         /* Fondo secundario claro */
```

### Principio 2: Operable

#### 2.1 Accesible por Teclado
- ✅ **Toda la funcionalidad accesible con teclado**
- ✅ **Sin trampas de teclado**
- ✅ **Atajos de teclado documentados**

**Atajos implementados**:
- `Tab`: Navegar entre elementos interactivos
- `Shift + Tab`: Navegar hacia atrás
- `Enter` / `Space`: Activar botones y enlaces
- `Escape`: Cerrar modales y menús
- `Ctrl + ↓`: Siguiente sección (en home)
- `Ctrl + ↑`: Sección anterior (en home)
- `Ctrl + F`: Abrir buscador (nativo del navegador)

```typescript
@HostListener('window:keydown', ['$event'])
onKeyDown(event: KeyboardEvent) {
  if (event.ctrlKey && event.key === 'ArrowDown') {
    this.nextSection();
  }
  if (event.ctrlKey && event.key === 'ArrowUp') {
    this.previousSection();
  }
}
```

#### 2.2 Tiempo Suficiente
- ✅ Sin límites de tiempo para interacciones
- ✅ Pausar, detener o ocultar contenido en movimiento
- ✅ Control de reproducción de vídeos

#### 2.3 Convulsiones y Reacciones Físicas
- ✅ Sin contenido que destelle más de 3 veces por segundo
- ✅ Animaciones sutiles y opcionales
- ✅ Respeto a `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### 2.4 Navegable
- ✅ **Skip links**: Saltar al contenido principal
- ✅ **Títulos de página descriptivos**
- ✅ **Orden de foco lógico**
- ✅ **Propósito de enlaces claro**
- ✅ **Múltiples formas de navegación** (menú, búsqueda, breadcrumbs)
- ✅ **Foco visible** en todos los elementos interactivos

```css
/* Foco visible personalizado */
*:focus {
  outline: 2px solid #5c2d91;
  outline-offset: 2px;
}

button:focus,
a:focus {
  box-shadow: 0 0 0 3px rgba(92, 45, 145, 0.3);
}
```

#### 2.5 Modalidades de Entrada
- ✅ **Gestos táctiles**: Alternativas para gestos complejos
- ✅ **Cancelación de puntero**: Eventos en `mouseup` en lugar de `mousedown`
- ✅ **Etiquetas en nombres**: `aria-label` coincide con texto visible
- ✅ **Activación por movimiento**: Alternativas disponibles

### Principio 3: Comprensible

#### 3.1 Legible
- ✅ **Idioma de la página identificado**: `<html lang="es">`
- ✅ **Idioma de partes identificado**: `<span lang="en">Hello</span>`
- ✅ **Términos inusuales explicados**: Glosario de conceptos
- ✅ **Abreviaturas expandidas**: `<abbr title="Lengua de Signos Española">LSE</abbr>`

#### 3.2 Predecible
- ✅ **Navegación consistente** en todas las páginas
- ✅ **Identificación consistente** de componentes
- ✅ **Sin cambios de contexto inesperados**
- ✅ **Mensajes de error claros**

#### 3.3 Asistencia de Entrada
- ✅ **Identificación de errores** clara y descriptiva
- ✅ **Etiquetas e instrucciones** en todos los formularios
- ✅ **Sugerencias de corrección** cuando es posible
- ✅ **Prevención de errores** en acciones importantes

```html
<label for="search-input">Buscar contenidos</label>
<input 
  id="search-input"
  type="text"
  aria-describedby="search-help"
  aria-invalid="false"
>
<span id="search-help" class="help-text">
  Introduce palabras clave para buscar
</span>
```

### Principio 4: Robusto

#### 4.1 Compatible
- ✅ **HTML válido**: Sin errores de sintaxis
- ✅ **ARIA válido**: Uso correcto de roles y propiedades
- ✅ **Nombres, roles y valores**: Correctamente implementados
- ✅ **Mensajes de estado**: `role="status"`, `role="alert"`

```html
<!-- Mensaje de estado -->
<div role="status" aria-live="polite">
  Se encontraron {{ resultsCount }} resultados
</div>

<!-- Alerta importante -->
<div role="alert" aria-live="assertive">
  Error: No se pudo cargar el contenido
</div>
```

## 🎨 Componentes Accesibles

### Botones

```html
<button 
  type="button"
  aria-label="Cerrar modal"
  [attr.aria-expanded]="isOpen"
  [attr.aria-pressed]="isActive">
  Cerrar
</button>
```

### Enlaces

```html
<a 
  routerLink="/conceptos"
  aria-label="Ir a la página de conceptos clave">
  Conceptos
</a>
```

### Modales

```html
<div 
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description">
  <h2 id="modal-title">Título del Modal</h2>
  <p id="modal-description">Descripción del contenido</p>
  <button aria-label="Cerrar modal">×</button>
</div>
```

### Tabs

```html
<div role="tablist" aria-label="Tipos de recursos">
  <button 
    role="tab"
    [attr.aria-selected]="activeTab === 'libros'"
    [attr.aria-controls]="'panel-libros'"
    id="tab-libros">
    Libros
  </button>
</div>
<div 
  role="tabpanel"
  [attr.aria-labelledby]="'tab-libros'"
  id="panel-libros">
  <!-- Contenido -->
</div>
```

### Formularios

```html
<form>
  <div class="form-group">
    <label for="nombre">Nombre completo *</label>
    <input 
      id="nombre"
      type="text"
      required
      aria-required="true"
      aria-describedby="nombre-help"
      [attr.aria-invalid]="hasError('nombre')">
    <span id="nombre-help" class="help-text">
      Introduce tu nombre y apellidos
    </span>
    <span *ngIf="hasError('nombre')" role="alert" class="error">
      El nombre es obligatorio
    </span>
  </div>
</form>
```

## 🧪 Testing de Accesibilidad

### Herramientas Recomendadas

1. **Lighthouse** (Chrome DevTools)
   - Auditoría automática de accesibilidad
   - Puntuación y recomendaciones

2. **axe DevTools** (Extensión de navegador)
   - Análisis detallado de problemas WCAG
   - Sugerencias de corrección

3. **WAVE** (Web Accessibility Evaluation Tool)
   - Visualización de estructura accesible
   - Identificación de errores

4. **Lectores de Pantalla**
   - **NVDA** (Windows) - Gratuito
   - **JAWS** (Windows) - Comercial
   - **VoiceOver** (macOS/iOS) - Integrado
   - **TalkBack** (Android) - Integrado

### Checklist de Testing Manual

#### Teclado
- [ ] Navegar por toda la página solo con `Tab`
- [ ] Verificar que el foco es visible
- [ ] Probar atajos de teclado
- [ ] Verificar que no hay trampas de teclado

#### Lector de Pantalla
- [ ] Activar NVDA/JAWS/VoiceOver
- [ ] Navegar por encabezados (`H` en NVDA)
- [ ] Navegar por landmarks (`D` en NVDA)
- [ ] Verificar que se leen todos los textos alternativos
- [ ] Probar formularios y mensajes de error

#### Contraste
- [ ] Verificar contraste con herramienta (Contrast Checker)
- [ ] Probar en modo alto contraste del sistema
- [ ] Verificar legibilidad con diferentes tamaños de fuente

#### Responsive
- [ ] Probar en móvil (táctil)
- [ ] Verificar zoom hasta 200%
- [ ] Comprobar reflow en 320px de ancho

## 📊 Métricas de Accesibilidad

### Lighthouse Score
**Objetivo**: 95+ puntos en accesibilidad

```bash
# Ejecutar auditoría
npm run lighthouse
```

### Cobertura WCAG 2.2 AA
- ✅ **Nivel A**: 100% cumplido
- ✅ **Nivel AA**: 100% cumplido
- ⚠️ **Nivel AAA**: Parcial (no requerido)

## 🔗 Recursos Adicionales

### Documentación
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Angular Accessibility](https://angular.io/guide/accessibility)

### Herramientas
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### Comunidad
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)

## 🔮 Mejoras Futuras

### Corto Plazo
1. Tests automatizados de accesibilidad (axe-core)
2. Documentación de atajos de teclado en la UI
3. Modo de alto contraste personalizado

### Mediano Plazo
1. Certificación WCAG 2.2 AA oficial
2. Auditoría con usuarios reales con discapacidades
3. Implementar WCAG 2.2 AAA donde sea posible

### Largo Plazo
1. Soporte para braille
2. Integración con tecnologías de asistencia avanzadas
3. Personalización de accesibilidad por usuario
