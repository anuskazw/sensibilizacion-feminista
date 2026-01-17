# Página de Recursos de Ayuda

## 📋 Información General

**Ruta**: `/recursos-ayuda`  
**Componente**: `RecursosAyudaComponent`  
**Historia de Usuario**: US-011  
**Estado**: ✅ Completada

## 🎯 Objetivo

Página índice que presenta dos categorías principales de recursos de ayuda: Testimonios de mujeres sordas e Instituciones y aplicaciones de ayuda. Sirve como hub de navegación hacia subsecciones especializadas.

## 🏗️ Estructura

### Layout Principal
```
┌─────────────────────────────────────┐
│      Recursos de Ayuda              │
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │    💬    │  │    🏢    │       │
│  │Testimon. │  │Institucio│       │
│  │  Mujeres │  │   nes y  │       │
│  │  Sordas  │  │  Apps    │       │
│  └──────────┘  └──────────┘       │
└─────────────────────────────────────┘
```

## 🎨 Componentes Principales

### 1. Grid de Tarjetas de Recursos
Dos tarjetas principales que actúan como navegación:

#### 💬 Testimonios de Mujeres Sordas
- **Ruta**: `/ayuda/testimonios-mujeres-sordas`
- **Icono**: 💬
- **Descripción**: Experiencias y testimonios de mujeres sordas
- **Aria-label**: "Ir a la sección de Testimonios de mujeres sordas"

#### 🏢 Instituciones y Aplicaciones de Ayuda
- **Ruta**: `/ayuda/instituciones-aplicaciones-ayuda`
- **Icono**: 🏢
- **Descripción**: Directorio de instituciones y apps de apoyo
- **Aria-label**: "Ir a la sección de Instituciones y aplicaciones de ayuda"

```typescript
helpCards = [
  {
    id: 'testimonios',
    icon: '💬',
    route: '/ayuda/testimonios-mujeres-sordas',
    ariaLabel: 'Ir a la sección de Testimonios de mujeres sordas'
  },
  {
    id: 'instituciones',
    icon: '🏢',
    route: '/ayuda/instituciones-aplicaciones-ayuda',
    ariaLabel: 'Ir a la sección de Instituciones y aplicaciones de ayuda'
  }
];
```

### 2. Tarjetas Interactivas
Cada tarjeta incluye:
- **Icono grande**: Emoji representativo
- **Título traducible**: Según idioma activo
- **Descripción breve**: Explicación del contenido
- **Efecto hover**: Elevación y cambio de color
- **Click**: Navegación a la subsección
- **Accesibilidad**: aria-label descriptivo

```html
@for (card of helpCards; track card.id) {
  <a [routerLink]="card.route" 
     class="help-card"
     [attr.aria-label]="card.ariaLabel">
    <div class="card-icon">{{ card.icon }}</div>
    <h2 class="card-title">
      {{ 'recursos-ayuda.' + card.id + '.title' | translate }}
    </h2>
    <p class="card-description">
      {{ 'recursos-ayuda.' + card.id + '.description' | translate }}
    </p>
  </a>
}
```

## 🔧 Servicios Utilizados

### TranslateService
- **instant()**: Traduce títulos y descripciones de tarjetas

### RouterLink
- Navegación entre secciones de la aplicación

## 🎨 Estilos y Diseño

### Responsive Design
- **Desktop (>768px)**: Grid de 2 columnas
- **Tablet/Mobile (<768px)**: Grid de 1 columna

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
- **Enfoque en accesibilidad**: Recursos para personas con discapacidad

## 🌐 Internacionalización

### Textos Traducibles
```json
{
  "recursos-ayuda.title": "Recursos de Ayuda",
  "recursos-ayuda.description": "Encuentra testimonios y recursos de apoyo",
  "recursos-ayuda.testimonios.title": "Testimonios de Mujeres Sordas",
  "recursos-ayuda.testimonios.description": "Experiencias y testimonios de mujeres sordas sobre feminismo y accesibilidad",
  "recursos-ayuda.instituciones.title": "Instituciones y Aplicaciones",
  "recursos-ayuda.instituciones.description": "Directorio de instituciones y aplicaciones de ayuda y apoyo"
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
- Click en "Testimonios" → `/ayuda/testimonios-mujeres-sordas`
- Click en "Instituciones" → `/ayuda/instituciones-aplicaciones-ayuda`

### Hacia esta página
- Menú superior → "Recursos de Ayuda"
- Home → Tarjeta "Recursos de Ayuda"
- Footer → Enlace de ayuda
- Breadcrumbs desde subsecciones

## 📊 Subsecciones

### /ayuda/testimonios-mujeres-sordas
**Contenido esperado:**
- Testimonios en vídeo con LSE
- Transcripciones de testimonios
- Historias de superación
- Experiencias de discriminación
- Logros y reivindicaciones
- Filtrado por temática
- Compartir testimonios

### /ayuda/instituciones-aplicaciones-ayuda
**Contenido esperado:**
- Directorio de instituciones
  - CNSE, ONCE, CERMI
  - Instituto de la Mujer
  - Organizaciones feministas
- Catálogo de aplicaciones
  - Apps de emergencia
  - Apps de comunicación LSE
  - Apps de apoyo psicológico
- Información de contacto
- Valoraciones y reseñas
- Filtrado por tipo y ubicación

## 💡 Notas de Implementación

- **Simplicidad**: Página de índice minimalista
- **Performance**: Sin imágenes pesadas, solo iconos emoji
- **Escalabilidad**: Fácil añadir nuevas categorías
- **Mantenibilidad**: Configuración en array simple
- **UX**: Navegación clara e intuitiva
- **Enfoque social**: Recursos para colectivos vulnerables

## 🧪 Testing

### Casos de Prueba
- ✅ Las 2 tarjetas se renderizan correctamente
- ✅ Click en cada tarjeta navega a la ruta correcta
- ✅ Hover muestra efecto visual
- ✅ Navegación por teclado funciona
- ✅ Aria-labels están presentes
- ✅ Cambio de idioma actualiza textos
- ✅ Responsive en diferentes dispositivos

## 🚀 Mejoras Futuras

- [ ] Contador de testimonios/instituciones en cada tarjeta
- [ ] Testimonios destacados en preview
- [ ] Búsqueda global de recursos
- [ ] Filtros avanzados
- [ ] Mapa de instituciones cercanas
- [ ] Valoraciones de usuarios
- [ ] Recursos favoritos
- [ ] Compartir recursos
- [ ] Notificaciones de nuevos testimonios
- [ ] Integración con redes sociales

## 🎯 Propósito Social

Esta página tiene un propósito social importante:

### Visibilidad
- **Dar voz**: A mujeres sordas y sus experiencias
- **Romper barreras**: Mostrar realidades poco visibles
- **Empoderar**: A través de testimonios inspiradores

### Apoyo
- **Recursos accesibles**: Para personas con discapacidad
- **Información verificada**: Instituciones oficiales
- **Ayuda práctica**: Apps y herramientas útiles

### Educación
- **Sensibilización**: Sobre discriminación múltiple
- **Concienciación**: Sobre accesibilidad
- **Formación**: Recursos educativos

## 🔐 Privacidad y Ética

### Testimonios
- **Consentimiento informado**: Todos los testimonios con permiso
- **Anonimato opcional**: Opción de testimonios anónimos
- **Moderación**: Revisión antes de publicar
- **Respeto**: Tratamiento digno de las experiencias

### Datos de Instituciones
- **Información pública**: Solo datos públicos
- **Verificación**: Contactos verificados
- **Actualización**: Revisión periódica
- **Sin publicidad**: No promoción comercial
