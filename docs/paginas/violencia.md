# Página de Violencia

## 📋 Información General

**Ruta**: `/violencia`  
**Componente**: `ViolenciaComponent`  
**Historia de Usuario**: US-009  
**Estado**: ✅ Completada

## 🎯 Objetivo

Página educativa sobre tipos de violencia de género con búsqueda, filtrado por hashtags e índice alfabético de términos. Incluye señales de alerta, recursos de ayuda y soporte multiidioma.

## 🏗️ Estructura

### Layout de Dos Columnas
```
┌─────────────────────────────────────┐
│  Sidebar  │  Contenido Principal    │
│           │                         │
│  Índice   │  Fichas de Violencia    │
│  A-Z      │                         │
│           │  [Tipo 1]               │
│  Filtros  │  - Definición           │
│  Hashtags │  - Señales de alerta    │
│           │  - Recursos             │
│  Buscar   │                         │
│           │  [Tipo 2]               │
│           │  ...                    │
└─────────────────────────────────────┘
```

## 🎨 Componentes Principales

### 1. Sistema de Filtrado (ContentSidebarComponent)
- **Búsqueda por texto**: En títulos y descripciones
- **Filtrado por hashtags**: Selección múltiple
- **Índice alfabético**: Navegación rápida por letra
- **Combinación de filtros**: Búsqueda + hashtags
- **Contador de resultados**: Muestra número de tipos encontrados

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
Lista alfabética de todos los tipos de violencia:
- **Ordenación alfabética**: A-Z
- **Scroll suave**: Al hacer click en término
- **Actualización dinámica**: Según filtros activos

```typescript
termsIndex = computed(() => {
  const contents = this.filteredContents();
  const lang = this.languageService.getCurrentLanguage();
  const terms: string[] = [];
  
  contents.forEach(content => {
    const title = this.getTitle(content);
    terms.push(title);
  });
  
  // Ordenar alfabéticamente
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

### 3. Fichas de Tipos de Violencia
Cada ficha muestra:
- **Título**: Nombre del tipo de violencia
- **Descripción en lectura fácil**: Versión simplificada
- **Señales de alerta**: Lista de indicadores
- **Hashtags**: Etiquetas temáticas
- **Recursos de ayuda**: Enlaces a ayuda
- **Compartir**: Botón de compartir (SocialShareComponent)

```html
@for (content of filteredContents(); track content.id) {
  <article [id]="'content-' + content.id" class="violence-card">
    <h2 class="card-title">{{ getTitle(content) }}</h2>
    
    <div class="card-description">
      <p>{{ getDescription(content) }}</p>
    </div>
    
    @if (getAlertSigns(content)) {
      <div class="alert-signs">
        <h3>⚠️ Señales de alerta</h3>
        <p>{{ getAlertSigns(content) }}</p>
      </div>
    }
    
    <div class="card-hashtags">
      @for (hashtag of content.hashtags; track hashtag.id) {
        <span class="hashtag-badge">#{{ hashtag.nombre }}</span>
      }
    </div>
    
    <div class="card-share">
      <app-social-share [content]="content"></app-social-share>
    </div>
  </article>
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
  activo: boolean;
  fecha_publicacion: Date;
  estado: ContentStatus;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  video_lse_url?: string;
  recursos_ayuda?: Array<{
    nombre: string;
    telefono?: string;
    url?: string;
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

### Fichas de Violencia
- **Diseño vertical**: Información apilada
- **Secciones diferenciadas**: Bordes y fondos
- **Señales de alerta**: Destacadas con color de advertencia
- **Espaciado generoso**: Legibilidad mejorada

### Colores
- **Fondo fichas**: Blanco con sombra suave
- **Señales de alerta**: Fondo amarillo claro (#fef3c7), borde amarillo (#f59e0b)
- **Hashtags**: Gris claro con texto morado
- **Títulos**: Negro (#111827)
- **Texto**: Gris oscuro (#374151)

### Índice de Términos
- **Lista vertical**: Términos uno debajo de otro
- **Hover**: Fondo morado claro
- **Click**: Scroll suave al término
- **Separadores**: Líneas sutiles

## ♿ Accesibilidad

### WCAG 2.2 AA
- ✅ **Navegación por teclado**: Tab, Enter
- ✅ **Lectores de pantalla**: aria-labels descriptivos
- ✅ **Contraste de color**: Mínimo 4.5:1
- ✅ **Roles semánticos**: article, section, nav
- ✅ **Focus visible**: Indicadores claros
- ✅ **Scroll suave**: Animación reducida respetada

### Características Específicas
- **Lectura fácil**: Descripciones simplificadas
- **Señales de alerta**: Claramente destacadas
- **Recursos de ayuda**: Fácilmente accesibles
- **Multiidioma**: 6 idiomas disponibles

## 🌐 Internacionalización

### Textos Traducibles
```json
{
  "violencia.title": "Tipos de Violencia",
  "violencia.alertSigns": "Señales de alerta",
  "violencia.resources": "Recursos de ayuda",
  "search.resultsCount": "{count} tipos encontrados",
  "search.noResults": "No se encontraron tipos de violencia"
}
```

### Contenido Multilingüe
Todos los títulos, descripciones y señales de alerta están disponibles en 6 idiomas.

## 📱 Funcionalidades Móviles

- **Sidebar colapsable**: Botón hamburguesa para filtros
- **Scroll suave**: Navegación fluida entre términos
- **Touch gestures**: Swipe para navegar
- **Optimización**: Lazy loading de contenido

## 🔗 Navegación

### Desde esta página
- Click en término del índice → Scroll a ese tipo
- Click en hashtag → Filtra por ese hashtag
- Click en recurso de ayuda → Abre enlace externo
- Compartir → Abre modal de compartir en redes

### Hacia esta página
- Menú superior → "Violencia"
- Home → Tarjeta "Violencia"
- Breadcrumbs desde otras secciones

## 📈 Datos de Ejemplo

La página incluye varios tipos de violencia de ejemplo:
- Violencia física
- Violencia psicológica
- Violencia económica
- Violencia sexual
- Violencia digital

Cada tipo incluye:
- Definición clara
- Señales de alerta específicas
- Hashtags relacionados
- Recursos de ayuda

## 🔄 Estados de la Página

### Estado de Carga
- Muestra skeleton screens para fichas
- Componente: `SkeletonScreenComponent`

### Estado de Error
- Muestra mensaje de error si falla la carga
- Botón de reintentar
- Componente: `ErrorStateComponent`
- Sugerencias según tipo de error

```typescript
ngOnInit(): void {
  this.hasError.set(false);
  
  setTimeout(() => {
    try {
      if (this.offlineService.isOffline()) {
        throw new Error('offline');
      }
      this.searchFilterService.setContents(sampleContents);
      this.analyticsService.trackContentView('violencia-page', 'violencia', []);
      this.isLoading.set(false);
    } catch (error: any) {
      this.hasError.set(true);
      this.isLoading.set(false);
      if (error.message === 'offline') {
        this.errorMessage.set('error.offline');
      } else {
        this.errorMessage.set('error.generic');
      }
    }
  }, 0);
}
```

### Estado Sin Resultados
- Mensaje cuando no hay tipos que coincidan con filtros
- Sugerencia para cambiar filtros

## 🛡️ Consideraciones de Seguridad

### Contenido Sensible
- **Advertencia inicial**: Aviso sobre contenido sensible
- **Recursos de ayuda**: Siempre visibles
- **Teléfonos de emergencia**: Destacados
- **Privacidad**: No se guarda historial de búsqueda

### Enlaces de Ayuda
- **Verificados**: Solo enlaces oficiales
- **Actualizados**: Revisión periódica
- **Disponibles 24/7**: Teléfonos de emergencia

## 🧪 Testing

### Casos de Prueba
- ✅ Filtrado por texto funciona correctamente
- ✅ Filtrado por hashtags múltiples
- ✅ Índice alfabético navega correctamente
- ✅ Señales de alerta se muestran
- ✅ Recursos de ayuda son accesibles
- ✅ Cambio de idioma actualiza contenido
- ✅ Compartir en redes funciona
- ✅ Responsive en diferentes dispositivos

## 🚀 Mejoras Futuras

- [ ] Test de autoevaluación de riesgo
- [ ] Chat anónimo con especialistas
- [ ] Mapa de recursos locales
- [ ] Historias de supervivientes (anónimas)
- [ ] Guías descargables en PDF
- [ ] Vídeos educativos
- [ ] Integración con servicios de emergencia
- [ ] Modo de salida rápida (botón de pánico)
- [ ] Estadísticas de violencia de género
- [ ] Recursos específicos por comunidad autónoma
