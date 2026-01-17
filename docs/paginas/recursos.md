# Página de Recursos

## 📋 Información General

**Ruta**: `/recursos`  
**Componente**: `RecursosComponent`  
**Historia de Usuario**: US-010  
**Estado**: ✅ Completada

## 🎯 Objetivo

Página principal de recursos que presenta un índice visual con 3 categorías principales de materiales educativos: Libros, Películas y Series, y Documentales. Sirve como hub de navegación hacia las subsecciones de recursos.

## 🏗️ Estructura

### Layout Principal
```
┌─────────────────────────────────────┐
│         Recursos                    │
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │    📚    │  │    🎬    │       │
│  │  Libros  │  │ Películas│       │
│  │          │  │ y Series │       │
│  └──────────┘  └──────────┘       │
│                                     │
│  ┌──────────┐                      │
│  │    🎥    │                      │
│  │Documenta-│                      │
│  │   les    │                      │
│  └──────────┘                      │
└─────────────────────────────────────┘
```

## 🎨 Componentes Principales

### 1. Grid de Tarjetas de Recursos
Tres tarjetas principales que actúan como navegación:

#### 📚 Libros
- **Ruta**: `/recursos/libros`
- **Icono**: 📚
- **Descripción**: Colección de libros sobre feminismo
- **Aria-label**: "Ir a la sección de Libros"

#### 🎬 Películas y Series
- **Ruta**: `/recursos/peliculas-y-series`
- **Icono**: 🎬
- **Descripción**: Películas y series con perspectiva feminista
- **Aria-label**: "Ir a la sección de Películas y series"

#### 🎥 Documentales
- **Ruta**: `/recursos/documentales`
- **Icono**: 🎥
- **Descripción**: Documentales sobre feminismo y género
- **Aria-label**: "Ir a la sección de Documentales"

```typescript
resourceCards = [
  {
    id: 'libros',
    icon: '📚',
    route: '/recursos/libros',
    ariaLabel: 'Ir a la sección de Libros'
  },
  {
    id: 'peliculas-series',
    icon: '🎬',
    route: '/recursos/peliculas-y-series',
    ariaLabel: 'Ir a la sección de Películas y series'
  },
  {
    id: 'documentales',
    icon: '🎥',
    route: '/recursos/documentales',
    ariaLabel: 'Ir a la sección de Documentales'
  }
];
```

### 2. Tarjetas Interactivas
Cada tarjeta incluye:
- **Icono grande**: Emoji representativo
- **Título traducible**: Según idioma activo
- **Efecto hover**: Elevación y cambio de color
- **Click**: Navegación a la subsección
- **Accesibilidad**: aria-label descriptivo

```html
@for (card of resourceCards; track card.id) {
  <a [routerLink]="card.route" 
     class="resource-card"
     [attr.aria-label]="card.ariaLabel">
    <div class="card-icon">{{ card.icon }}</div>
    <h2 class="card-title">
      {{ 'recursos.' + card.id + '.title' | translate }}
    </h2>
    <p class="card-description">
      {{ 'recursos.' + card.id + '.description' | translate }}
    </p>
  </a>
}
```

## 🔧 Servicios Utilizados

### OfflineService
- **isOffline()**: Detecta si hay conexión a internet
- Muestra estado de error si no hay conexión

### TranslateService
- **instant()**: Traduce títulos y descripciones de tarjetas

## 🎨 Estilos y Diseño

### Responsive Design
- **Desktop (>1024px)**: Grid de 3 columnas
- **Tablet (768-1024px)**: Grid de 2 columnas
- **Mobile (<768px)**: Grid de 1 columna

### Tarjetas
- **Tamaño**: Cuadradas o rectangulares según viewport
- **Padding**: Generoso (2-3rem)
- **Border-radius**: 1rem
- **Sombra**: Box-shadow suave
- **Hover**: 
  - Elevación (translateY -8px)
  - Sombra más pronunciada
  - Cambio de color de fondo
- **Transición**: 0.3s ease

### Iconos
- **Tamaño**: 4-6rem
- **Centrado**: Flex center
- **Margin**: Espacio inferior

### Colores
- **Fondo tarjetas**: Blanco (#ffffff)
- **Hover fondo**: Morado claro (#f3e8ff)
- **Borde**: Gris claro (#e5e7eb)
- **Texto**: Gris oscuro (#1f2937)
- **Título**: Negro (#111827)

## ♿ Accesibilidad

### WCAG 2.2 AA
- ✅ **Navegación por teclado**: Tab, Enter
- ✅ **Lectores de pantalla**: aria-labels descriptivos
- ✅ **Contraste de color**: Mínimo 4.5:1
- ✅ **Roles semánticos**: nav, link
- ✅ **Focus visible**: Borde morado en focus
- ✅ **Touch targets**: Mínimo 44x44px

### Características Específicas
- **Iconos grandes**: Fácil identificación visual
- **Texto descriptivo**: Claridad en la función
- **Área clickeable grande**: Toda la tarjeta es clickeable

## 🌐 Internacionalización

### Textos Traducibles
```json
{
  "recursos.title": "Recursos",
  "recursos.description": "Explora nuestra colección de recursos educativos",
  "recursos.libros.title": "Libros",
  "recursos.libros.description": "Colección de libros sobre feminismo",
  "recursos.peliculas-series.title": "Películas y Series",
  "recursos.peliculas-series.description": "Películas y series con perspectiva feminista",
  "recursos.documentales.title": "Documentales",
  "recursos.documentales.description": "Documentales sobre feminismo y género"
}
```

### Contenido Multilingüe
Todos los textos están disponibles en 6 idiomas.

## 📱 Funcionalidades Móviles

- **Touch-friendly**: Áreas grandes de toque
- **Scroll suave**: Entre secciones
- **Optimización**: Carga rápida sin imágenes pesadas
- **Responsive**: Adaptación a diferentes tamaños

## 🔗 Navegación

### Desde esta página
- Click en "Libros" → `/recursos/libros`
- Click en "Películas y Series" → `/recursos/peliculas-y-series`
- Click en "Documentales" → `/recursos/documentales`

### Hacia esta página
- Menú superior → "Recursos"
- Home → Tarjeta "Recursos"
- Breadcrumbs desde subsecciones

## 🔄 Estados de la Página

### Estado de Carga
- Muestra skeleton screens para tarjetas
- Componente: `SkeletonScreenComponent`

### Estado de Error
- Muestra mensaje de error si falla la carga
- Botón de reintentar
- Componente: `ErrorStateComponent`
- Sugerencias según tipo de error (offline vs network)

```typescript
ngOnInit(): void {
  this.hasError.set(false);
  
  setTimeout(() => {
    try {
      if (this.offlineService.isOffline()) {
        throw new Error('offline');
      }
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

## 🧪 Testing

### Casos de Prueba
- ✅ Las 3 tarjetas se renderizan correctamente
- ✅ Click en cada tarjeta navega a la ruta correcta
- ✅ Hover muestra efecto visual
- ✅ Navegación por teclado funciona
- ✅ Aria-labels están presentes
- ✅ Cambio de idioma actualiza textos
- ✅ Estado de error se muestra correctamente
- ✅ Responsive en diferentes dispositivos

## 🚀 Mejoras Futuras

- [ ] Contador de recursos en cada categoría
- [ ] Recursos destacados en cada tarjeta
- [ ] Búsqueda global de recursos
- [ ] Filtros avanzados
- [ ] Recursos favoritos del usuario
- [ ] Recomendaciones personalizadas
- [ ] Estadísticas de recursos más visitados
- [ ] Nuevos recursos destacados con badge

## 📊 Subsecciones

### /recursos/libros
- Listado de libros con filtros
- Información de autores
- Enlaces de compra/descarga
- Reseñas y valoraciones

### /recursos/peliculas-y-series
- Catálogo de películas y series
- Información de directores y reparto
- Plataformas de visualización
- Sinopsis y tráilers

### /recursos/documentales
- Colección de documentales
- Información de productores
- Enlaces de visualización
- Duración y temáticas

## 💡 Notas de Implementación

- **Simplicidad**: Página de índice minimalista
- **Performance**: Sin imágenes pesadas, solo iconos emoji
- **Escalabilidad**: Fácil añadir nuevas categorías
- **Mantenibilidad**: Configuración en array simple
- **UX**: Navegación clara e intuitiva
