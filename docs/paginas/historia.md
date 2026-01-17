# Página de Historia

## 📋 Información General

**Ruta**: `/historia`  
**Componente**: `HistoriaComponent`  
**Historia de Usuario**: US-007  
**Estado**: ✅ Completada

## 🎯 Objetivo

Página que presenta eventos, personas y movimientos históricos del feminismo con sistema de búsqueda, filtrado por hashtags y filtrado por año. Incluye soporte multiidioma y vídeos en lengua de signos.

## 🏗️ Estructura

### Layout de Dos Columnas
```
┌─────────────────────────────────────┐
│  Sidebar  │  Contenido Principal    │
│           │                         │
│  Filtros  │  Tarjetas de Historia   │
│  Hashtags │                         │
│  Años     │  [Evento 1 - 1931]      │
│           │  [Evento 2 - 1791]      │
│  Buscar   │  [Evento 3 - 1975]      │
│           │  ...                    │
└─────────────────────────────────────┘
```

## 🎨 Componentes Principales

### 1. Sistema de Filtrado (ContentSidebarComponent)
- **Búsqueda por texto**: En títulos y descripciones
- **Filtrado por hashtags**: Selección múltiple
- **Filtrado por año**: Rango de años con slider
- **Combinación de filtros**: Búsqueda + hashtags + año
- **Contador de resultados**: Muestra número de eventos encontrados

```typescript
currentFilters = signal<ContentFilters>({});

filteredContents = computed(() => {
  const filters = {
    ...this.currentFilters(),
    currentLanguage: this.languageService.getCurrentLanguage()
  };
  
  const result = this.searchFilterService.search(filters);
  return result.items as HistoriaContent[];
});
```

### 2. Tarjetas de Eventos Históricos
Cada tarjeta muestra:
- **Año del evento**: Badge destacado en la esquina
- **Título**: Traducido según idioma activo
- **Descripción en lectura fácil**: Versión simplificada
- **Hashtags**: Etiquetas temáticas
- **Indicador de vídeo**: Si tiene vídeo LSE disponible
- **Compartir en redes**: Botón de compartir (SocialShareComponent)
- **Navegación**: Click en tarjeta lleva al detalle

```html
<article class="content-card" [routerLink]="['/historia', content.slug]">
  <div class="card-header">
    <span class="card-year">{{ content.anio }}</span>
    <h2 class="card-title">{{ getTitle(content) }}</h2>
  </div>
  
  <div class="card-body">
    <p class="card-description">{{ getDescription(content) }}</p>
  </div>
  
  <div class="card-footer">
    <div class="card-hashtags">
      @for (hashtag of content.hashtags; track hashtag.id) {
        <span class="hashtag-badge">#{{ hashtag.nombre }}</span>
      }
    </div>
  </div>
  
  @if (content.video_lse_url) {
    <div class="card-actions">
      <span class="video-indicator">Vídeo disponible</span>
    </div>
  }
</article>
```

### 3. Estado Sin Resultados
Cuando no hay eventos que coincidan con los filtros:
- Icono de búsqueda
- Mensaje traducible
- Sugerencia para cambiar filtros

## 📊 Modelo de Datos

### HistoriaContent
```typescript
interface HistoriaContent extends Content {
  id: string;
  slug: string;
  tipo: 'historia';
  titulo: MultilingualText;
  descripcion: MultilingualText;
  descripcion_lectura_facil: MultilingualText;
  hashtags: Hashtag[];
  anio: number;  // Año del evento histórico
  activo: boolean;
  fecha_publicacion: Date;
  estado: ContentStatus;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  video_lse_url?: string;
  video_transcription?: MultilingualText;
  referencias?: Array<{
    titulo: string;
    autor: string;
    anio: number;
  }>;
}
```

## 🔧 Servicios Utilizados

### SearchFilterService
- **setContents()**: Inicializa los contenidos a filtrar
- **search()**: Aplica filtros de búsqueda, hashtags y año
- **getAllHashtags()**: Obtiene todos los hashtags disponibles
- **getYearRange()**: Obtiene rango de años (min-max)

### LanguageService
- **getCurrentLanguage()**: Idioma activo para mostrar contenido traducido

### AnalyticsService
- **trackContentView()**: Registra vista de página de historia

## 🎨 Estilos y Diseño

### Responsive Design
- **Desktop (>768px)**: Layout de 2 columnas (sidebar + contenido)
- **Tablet/Mobile (<768px)**: Layout de 1 columna, sidebar colapsable

### Tarjetas de Eventos
- **Grid responsive**: 1-3 columnas según ancho de pantalla
- **Hover effects**: Elevación y cambio de sombra
- **Transiciones suaves**: 0.3s ease
- **Accesibilidad**: aria-labels, roles semánticos

### Colores
- **Fondo tarjetas**: Blanco con sombra suave
- **Año badge**: Morado (#8b5cf6)
- **Hashtags**: Gris claro con texto morado
- **Hover**: Elevación y borde morado

## ♿ Accesibilidad

### WCAG 2.2 AA
- ✅ **Navegación por teclado**: Tab, Enter, Escape
- ✅ **Lectores de pantalla**: aria-labels descriptivos
- ✅ **Contraste de color**: Mínimo 4.5:1
- ✅ **Roles semánticos**: article, main, nav
- ✅ **Focus visible**: Indicadores claros

### Características Específicas
- **Vídeos LSE**: Indicador visible de disponibilidad
- **Lectura fácil**: Descripciones simplificadas
- **Multiidioma**: 6 idiomas disponibles

## 🌐 Internacionalización

### Textos Traducibles
```json
{
  "header.history": "Historia",
  "search.resultsCount": "{count} resultados encontrados",
  "search.noResults": "No se encontraron resultados"
}
```

### Contenido Multilingüe
Todos los títulos, descripciones y transcripciones están disponibles en:
- 🇪🇸 Español
- 🇬🇧 English
- 🇪🇸 Català
- 🇪🇸 Valencià
- 🇪🇸 Galego
- 🇪🇸 Euskara

## 📱 Funcionalidades Móviles

- **Sidebar colapsable**: Botón hamburguesa para filtros
- **Scroll infinito**: Carga progresiva de eventos
- **Touch gestures**: Swipe para navegar
- **Optimización de imágenes**: Lazy loading

## 🔗 Navegación

### Desde esta página
- Click en tarjeta → `/historia/:slug` (detalle del evento)
- Click en hashtag → Filtra por ese hashtag
- Compartir → Abre modal de compartir en redes

### Hacia esta página
- Menú superior → "Historia"
- Home → Tarjeta "Historia"
- Breadcrumbs desde detalle

## 📈 Datos de Ejemplo

La página incluye 5 eventos históricos de ejemplo:
1. **Sufragio femenino en España (1931)**
2. **Clara Campoamor (1931)**
3. **Olympe de Gouges (1791)**
4. **Día Internacional de la Mujer (1975)**
5. **Movimiento #MeToo (2017)**

## 🧪 Testing

### Casos de Prueba
- ✅ Filtrado por texto funciona correctamente
- ✅ Filtrado por hashtags múltiples
- ✅ Filtrado por rango de años
- ✅ Combinación de filtros
- ✅ Navegación a detalle
- ✅ Cambio de idioma actualiza contenido
- ✅ Compartir en redes funciona
- ✅ Responsive en diferentes dispositivos

## 🚀 Mejoras Futuras

- [ ] Paginación o scroll infinito para grandes volúmenes
- [ ] Línea de tiempo visual interactiva
- [ ] Filtrado por tipo de evento (persona, movimiento, ley, etc.)
- [ ] Exportar resultados a PDF
- [ ] Modo comparación de eventos
- [ ] Integración con API externa de eventos históricos
