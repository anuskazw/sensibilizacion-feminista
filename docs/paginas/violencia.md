# Página de Violencia

## 📋 Información General

**Ruta**: `/violencia`  
**Componente**: `ViolenciaComponent`  
**Historia de Usuario**: US-009  
**Estado**: ✅ Completada

## 🎯 Objetivo

Página informativa sobre tipos de violencia de género, señales de alerta y recursos de ayuda inmediata. Incluye sistema de búsqueda, filtrado por hashtags e índice de términos para facilitar la navegación. Proporciona información en lectura fácil y acceso directo a recursos de ayuda como el 016.

## 🏗️ Estructura

### Layout de Dos Columnas
```
┌─────────────────────────────────────┐
│  Sidebar  │  Contenido Principal    │
│           │                         │
│  Filtros  │  Índice de Términos     │
│  Hashtags │                         │
│           │  [Violencia física]     │
│  Buscar   │  [Violencia psicológica]│
│           │  [Violencia sexual]     │
│           │  [Violencia económica]  │
│           │  ...                    │
└─────────────────────────────────────┘
```

## 🎨 Componentes Principales

### 1. Sistema de Filtrado (ContentSidebarComponent)
- **Búsqueda por texto**: En títulos y descripciones
- **Filtrado por hashtags**: Selección múltiple
- **Sin filtro por año**: No aplica para este contenido
- **Combinación de filtros**: Búsqueda + hashtags
- **Contador de resultados**: Muestra número de tipos de violencia encontrados

```typescript
currentFilters = signal<ContentFilters>({});

filteredContents = computed(() => {
  const filters = {
    ...this.currentFilters(),
    currentLanguage: this.languageService.getCurrentLanguage()
  };
  
  const result = this.searchFilterService.search(filters);
  return result.items as ViolenciaContent[];
});
```

### 2. Índice de Términos
Lista alfabética de todos los tipos de violencia con navegación rápida:
- **Ordenamiento alfabético**: Términos ordenados A-Z
- **Navegación por scroll**: Click en término desplaza a la tarjeta correspondiente
- **Accesibilidad**: Botones con aria-labels descriptivos

```typescript
termsIndex = computed(() => {
  const contents = this.filteredContents();
  const terms: string[] = [];
  
  contents.forEach(content => {
    const title = this.getTitle(content);
    terms.push(title);
  });
  
  return terms.sort((a, b) => a.localeCompare(b));
});

scrollToTerm(term: string): void {
  const content = this.filteredContents().find(c => this.getTitle(c) === term);
  if (content) {
    const element = document.getElementById(`content-${content.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
```

### 3. Tarjetas de Tipos de Violencia
Cada tarjeta muestra:
- **Título**: Tipo de violencia traducido según idioma activo
- **Descripción en lectura fácil**: Versión simplificada y comprensible
- **Señales de alerta**: Indicadores específicos de cada tipo
- **Recursos de ayuda**: Teléfonos y servicios disponibles (016, 112, 017)
- **Hashtags**: Etiquetas temáticas
- **Vídeo LSE**: Indicador si tiene vídeo en lengua de signos
- **Compartir**: Botón de compartir en redes (SocialShareComponent)

```html
<article class="content-card" [id]="'content-' + content.id">
  <div class="card-header">
    <h2 class="card-title">{{ getTitle(content) }}</h2>
  </div>
  
  <div class="card-body">
    <p class="card-description">{{ getDescription(content) }}</p>
    
    @if (getAlertSigns(content)) {
      <div class="alert-signs">
        <h3 class="alert-signs-title">Señales de alerta</h3>
        <p class="alert-signs-content">{{ getAlertSigns(content) }}</p>
      </div>
    }
  </div>
  
  <div class="card-footer">
    <div class="card-hashtags">
      @for (hashtag of content.hashtags; track hashtag.id) {
        <span class="hashtag-badge">#{{ hashtag.nombre }}</span>
      }
    </div>
  </div>
  
  @if (content.recursos_ayuda && content.recursos_ayuda.length > 0) {
    <div class="card-help-resources">
      <h3>Recursos de ayuda</h3>
      <div class="help-resources-list">
        @for (resource of content.recursos_ayuda; track resource) {
          <div class="help-resource-item">
            <strong>{{ resource }}</strong>
            <!-- Descripción del recurso -->
          </div>
        }
      </div>
    </div>
  }
</article>
```

### 4. Estados de Carga y Error
- **Skeleton Screen**: Mientras carga el contenido
- **Estado de error**: Con mensaje y botón "Reintentar"
- **Estado offline**: Detección automática con sugerencias específicas
- **Sin resultados**: Mensaje cuando no hay coincidencias con los filtros

```html
@if (isLoading()) {
  <app-skeleton-screen
    type="list"
    [count]="4"
    [showTitle]="true"
    [showDescription]="true"
    [showHashtags]="true">
  </app-skeleton-screen>
} @else if (hasError()) {
  <app-error-state
    [message]="errorMessage()"
    [showRetry]="true"
    [suggestions]="getErrorSuggestions()"
    (retry)="retryLoad()">
  </app-error-state>
}
```

## 📊 Modelo de Datos

### ViolenciaContent
```typescript
interface ViolenciaContent extends Content {
  id: string;
  slug: string;
  tipo: 'violencia';
  titulo: MultilingualText;
  descripcion: MultilingualText;
  descripcion_lectura_facil: MultilingualText;
  senales_alerta?: MultilingualText;  // Señales de alerta específicas
  hashtags: Hashtag[];
  recursos_ayuda?: string[];  // Teléfonos y recursos (016, 112, 017)
  activo: boolean;
  fecha_publicacion: Date;
  estado: ContentStatus;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  video_lse_url?: string;
  video_transcription?: MultilingualText;
  referencias?: Array<{
    titulo: string;
    url?: string;
    anio: number;
  }>;
}
```

## 🔧 Servicios Utilizados

### SearchFilterService
- **setContents()**: Inicializa los contenidos a filtrar
- **search()**: Aplica filtros de búsqueda y hashtags
- **getAllHashtags()**: Obtiene todos los hashtags disponibles

### LanguageService
- **getCurrentLanguage()**: Idioma activo para mostrar contenido traducido

### OfflineService
- **isOffline()**: Detecta si hay conexión a internet

### AnalyticsService
- **trackContentView()**: Registra vista de página de violencia

## 🎨 Estilos y Diseño

### Responsive Design
- **Desktop (>768px)**: Layout de 2 columnas (sidebar + contenido)
- **Tablet/Mobile (<768px)**: Layout de 1 columna, sidebar colapsable

### Tarjetas de Violencia
- **Layout vertical**: Cada tarjeta ocupa el ancho completo
- **Secciones diferenciadas**: Título, descripción, señales, recursos
- **Destacado de recursos**: Teléfonos de ayuda en color destacado
- **Accesibilidad**: aria-labels, roles semánticos, navegación por teclado

### Colores
- **Fondo tarjetas**: Blanco con sombra suave
- **Señales de alerta**: Fondo amarillo claro (#fff3cd)
- **Recursos de ayuda**: Fondo verde claro (#d1e7dd) con texto destacado
- **Hashtags**: Gris claro con texto morado
- **Hover**: Elevación y borde morado

### Índice de Términos
- **Layout horizontal**: Botones en línea con wrap
- **Botones interactivos**: Efecto hover y focus visible
- **Scroll suave**: Animación al navegar a término

## ♿ Accesibilidad

### WCAG 2.2 AA
- ✅ **Navegación por teclado**: Tab, Enter, Escape
- ✅ **Lectores de pantalla**: aria-labels descriptivos
- ✅ **Contraste de color**: Mínimo 4.5:1
- ✅ **Roles semánticos**: article, main, nav, button
- ✅ **Focus visible**: Indicadores claros
- ✅ **ARIA live regions**: Para anunciar cambios de estado

### Características Específicas
- **Recursos de ayuda destacados**: Teléfonos visibles y accesibles
- **Lectura fácil**: Descripciones simplificadas en todas las tarjetas
- **Multiidioma**: 6 idiomas disponibles
- **Navegación alternativa**: Índice de términos + búsqueda + filtros

## 🌐 Internacionalización

### Textos Traducibles
```json
{
  "header.violence": "Violencia",
  "violence.termsIndex": "Índice de términos",
  "violence.scrollToTerm": "Ir a {term}",
  "violence.alertSigns": "Señales de alerta",
  "violence.helpResources": "Recursos de ayuda",
  "violence.phone016": "Teléfono contra la violencia de género (24h, gratuito)",
  "violence.phone112": "Emergencias",
  "violence.phone017": "Atención a víctimas de violencia sexual",
  "violence.noResultsMessage": "Prueba con otros términos de búsqueda o cambia los filtros",
  "search.resultsCount": "{count} resultados encontrados",
  "search.noResults": "No se encontraron resultados"
}
```

### Contenido Multilingüe
Todos los títulos, descripciones, señales de alerta y transcripciones están disponibles en:
- 🇪🇸 Español
- 🇬🇧 English
- 🇪🇸 Català
- 🇪🇸 Valencià
- 🇪🇸 Galego
- 🇪🇸 Euskara

## 📱 Funcionalidades Móviles

- **Sidebar colapsable**: Botón hamburguesa para filtros
- **Índice responsive**: Botones adaptan tamaño en móvil
- **Touch gestures**: Scroll suave optimizado para táctil
- **Recursos destacados**: Teléfonos con enlaces directos (tel:)

## 🔗 Navegación

### Desde esta página
- Click en término del índice → Scroll a tarjeta específica
- Click en hashtag → Filtra por ese hashtag
- Compartir → Abre modal de compartir en redes

### Hacia esta página
- Menú superior → "Violencia"
- Home → Tarjeta "Violencia"
- Enlaces desde otras secciones

## 📈 Datos de Ejemplo

La página incluye 6 tipos de violencia de ejemplo:

1. **Violencia física**
   - Señales: golpes, empujones, heridas, moretones, fracturas
   - Recursos: 016, 112

2. **Violencia psicológica**
   - Señales: insultos, amenazas, humillaciones, aislamiento, control excesivo
   - Recursos: 016, 112

3. **Violencia sexual**
   - Señales: agresiones sexuales, acoso sexual, coacción sexual
   - Recursos: 016, 112

4. **Violencia económica**
   - Señales: control del dinero, prohibición de trabajar, limitación de recursos básicos
   - Recursos: 016

5. **Violencia digital**
   - Señales: acoso online, amenazas por redes sociales, control de dispositivos, difusión de imágenes sin consentimiento
   - Recursos: 016, 017

6. **Violencia institucional**
   - Señales: falta de respuesta institucional, revictimización, falta de recursos
   - Recursos: 016

## 🆘 Recursos de Ayuda Destacados

### Teléfonos de Emergencia
- **016**: Teléfono contra la violencia de género (24h, gratuito, no deja rastro en factura)
- **112**: Emergencias generales
- **017**: Atención a víctimas de violencia sexual (24h)

### Características de los Recursos
- **Visibilidad destacada**: Aparecen en cada tarjeta relevante
- **Descripciones claras**: Explicación de cada servicio
- **Enlaces directos**: En móvil, click para llamar directamente
- **Multiidioma**: Descripciones traducidas

## 🧪 Testing

### Casos de Prueba
- ✅ Filtrado por texto funciona correctamente
- ✅ Filtrado por hashtags múltiples
- ✅ Combinación de filtros
- ✅ Navegación por índice de términos con scroll suave
- ✅ Cambio de idioma actualiza contenido
- ✅ Recursos de ayuda visibles y accesibles
- ✅ Estados de carga y error funcionan
- ✅ Detección offline correcta
- ✅ Compartir en redes funciona
- ✅ Responsive en diferentes dispositivos

## 🚀 Mejoras Futuras

- [ ] Página de detalle individual por tipo de violencia
- [ ] Filtro por gravedad o urgencia
- [ ] Testimonios anónimos (con consentimiento RGPD)
- [ ] Mapa de recursos de ayuda por ubicación geográfica
- [ ] Chat de ayuda en tiempo real
- [ ] Guía de actuación paso a paso
- [ ] Exportar información a PDF
- [ ] Modo de navegación privada/incógnito

## ⚠️ Consideraciones Especiales

### Contenido Sensible
- **Tratamiento respetuoso**: Lenguaje claro y no revictimizante
- **Información verificada**: Basada en fuentes oficiales
- **Recursos actualizados**: Teléfonos y servicios vigentes
- **Privacidad**: No se registra navegación en esta sección

### Seguridad
- **Sin tracking**: No se registran métricas identificables en esta página
- **Navegación segura**: No deja rastro en historial (modo incógnito recomendado)
- **Salida rápida**: Botón de salida rápida (mejora futura)

## 📚 Referencias

- Ley Orgánica 1/2004, de Medidas de Protección Integral contra la Violencia de Género
- Ministerio de Igualdad - Delegación del Gobierno contra la Violencia de Género
- ONU Mujeres - Poner fin a la violencia contra las mujeres
