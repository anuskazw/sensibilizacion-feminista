# Documentación de Páginas

Este directorio contiene la documentación detallada de todas las páginas de la aplicación de sensibilización feminista.

## 📑 Índice de Páginas

### Páginas Principales

#### ✅ [Home](./home.md)
**Ruta**: `/`  
**US**: US-006  
Pantalla de bienvenida con 4 secciones a pantalla completa con scroll por "saltos" (snap scroll).

#### ✅ [Conceptos](./conceptos.md)
**Ruta**: `/conceptos`  
**US**: US-008  
Glosario de conceptos feministas con índice alfabético, búsqueda y filtrado por hashtags.

#### ✅ [Historia](./historia.md)
**Ruta**: `/historia`  
**US**: US-003  
Eventos, personas y movimientos históricos del feminismo con filtrado por año y hashtags.

#### ✅ [Violencia](./violencia.md)
**Ruta**: `/violencia`  
**US**: US-009  
Tipos de violencia de género con señales de alerta, índice de términos y recursos de ayuda.

### Recursos

#### ✅ [Recursos](./recursos.md)
**Ruta**: `/recursos`  
**US**: US-010  
Página índice con 3 categorías: Libros, Películas y Series, y Documentales.

**Subsecciones:**
- `/recursos/libros` - Colección de libros sobre feminismo
- `/recursos/peliculas-y-series` - Películas y series con perspectiva feminista
- `/recursos/documentales` - Documentales sobre feminismo y género

### Ayuda

#### ✅ [Ayuda](./ayuda.md)
**Ruta**: `/ayuda`  
**US**: US-032  
Teléfonos de emergencia y entidades de apoyo en accesibilidad y feminismo.

#### ✅ [Recursos de Ayuda](./recursos-ayuda.md)
**Ruta**: `/recursos-ayuda`  
**US**: US-011  
Página índice con 2 categorías: Testimonios de mujeres sordas e Instituciones y aplicaciones.

**Subsecciones:**
- `/ayuda/testimonios-mujeres-sordas` - Experiencias y testimonios
- `/ayuda/instituciones-aplicaciones-ayuda` - Directorio de instituciones y apps

### Contenido Dinámico

#### ✅ [Blog](./blog.md)
**Ruta**: `/blog`  
**US**: US-026  
Artículos sobre feminismo con sistema de comentarios moderados, categorías y etiquetas.

#### ✅ [Agenda](./agenda.md)
**Ruta**: `/agenda`  
**US**: US-027  
Calendario de eventos feministas (talleres, conferencias, manifestaciones, actividades).

### Administración

#### ✅ [Admin](./admin.md)
**Ruta**: `/admin`  
**US**: US-019  
Panel de administración con flujo de estados (Borrador → Revisado → Publicado) y analytics.

## 📊 Resumen de Funcionalidades

### Características Comunes

Todas las páginas incluyen:
- ✅ **Multiidioma**: 6 idiomas (ES, EN, CA, VAL, GL, EU)
- ✅ **Accesibilidad WCAG 2.2 AA**: Navegación por teclado, lectores de pantalla
- ✅ **Responsive Design**: Adaptación a móvil, tablet y desktop
- ✅ **Vídeos LSE**: Lengua de signos española cuando aplica
- ✅ **Lectura Fácil**: Versiones simplificadas de contenidos
- ✅ **Analytics**: Seguimiento de uso y estadísticas

### Funcionalidades Específicas

#### Búsqueda y Filtrado
- **Conceptos**: Índice A-Z + búsqueda + hashtags
- **Historia**: Búsqueda + hashtags + filtro por año
- **Violencia**: Índice de términos + búsqueda + hashtags

#### Contenido Dinámico
- **Blog**: Comentarios moderados, categorías, etiquetas
- **Agenda**: Calendario mensual, eventos futuros

#### Administración
- **Admin**: Flujo de estados, filtros, analytics dashboard

## 🎨 Patrones de Diseño

### Layout de Dos Columnas
Usado en: Conceptos, Historia, Violencia
```
┌─────────────────────────────────────┐
│  Sidebar  │  Contenido Principal    │
│  Filtros  │  Tarjetas/Fichas        │
└─────────────────────────────────────┘
```

### Layout de Índice
Usado en: Recursos, Recursos de Ayuda
```
┌─────────────────────────────────────┐
│  Grid de Tarjetas de Navegación     │
│  [Categoría 1]  [Categoría 2]       │
└─────────────────────────────────────┘
```

### Layout de Listado
Usado en: Blog, Ayuda
```
┌─────────────────────────────────────┐
│  Listado de Items                   │
│  [Item 1]                           │
│  [Item 2]                           │
└─────────────────────────────────────┘
```

### Layout de Calendario
Usado en: Agenda
```
┌─────────────────────────────────────┐
│  Navegación Mensual                 │
│  Calendario (Grid 7x6)              │
│  Listado de Eventos                 │
└─────────────────────────────────────┘
```

## 🔧 Componentes Compartidos

### ContentSidebarComponent
Usado en: Conceptos, Historia, Violencia
- Búsqueda por texto
- Filtrado por hashtags
- Filtrado por año (opcional)
- Índice alfabético (opcional)

### SocialShareComponent
Usado en: Historia, Violencia, Blog
- Compartir en redes sociales
- Copiar enlace
- Compartir por email

### SkeletonScreenComponent
Usado en: Todas las páginas con carga asíncrona
- Estados de carga
- Mejora de UX

### ErrorStateComponent
Usado en: Todas las páginas con carga asíncrona
- Estados de error
- Botón de reintentar
- Sugerencias según tipo de error

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
  /* Layout de 1 columna */
  /* Sidebar colapsable */
  /* Tarjetas apiladas */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Layout de 2 columnas */
  /* Grid adaptado */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Layout completo */
  /* Sidebar fijo */
  /* Grid de 3 columnas */
}
```

## ♿ Accesibilidad

### Navegación por Teclado
- **Tab**: Navegar entre elementos
- **Enter/Space**: Activar enlaces/botones
- **Escape**: Cerrar modales
- **Flechas**: Navegar en calendarios/sliders

### Lectores de Pantalla
- **aria-labels**: Descriptivos en todos los elementos interactivos
- **Roles semánticos**: article, nav, main, section
- **Live regions**: Anuncios de cambios dinámicos
- **Skip links**: Saltar al contenido principal

### Contraste de Color
- **Mínimo 4.5:1**: Texto normal
- **Mínimo 3:1**: Texto grande y elementos UI
- **Focus visible**: Bordes claros en elementos enfocados

## 🌐 Internacionalización

### Idiomas Soportados
1. 🇪🇸 **Español** (es) - Idioma por defecto
2. 🇬🇧 **English** (en)
3. 🇪🇸 **Català** (ca)
4. 🇪🇸 **Valencià** (val)
5. 🇪🇸 **Galego** (gl)
6. 🇪🇸 **Euskara** (eu)

### Contenido Traducible
- **UI**: Todos los textos de interfaz
- **Contenido**: Títulos, descripciones, textos
- **Fechas**: Formato localizado
- **Números**: Formato localizado

## 📈 Analytics

### Eventos Trackeados
- **Vistas de página**: Todas las páginas
- **Búsquedas**: Términos buscados
- **Filtros**: Hashtags y filtros aplicados
- **Vídeos LSE**: Reproducciones
- **Compartir**: Contenidos compartidos
- **Comentarios**: Envíos de comentarios

### Métricas
- **Páginas más vistas**
- **Búsquedas sin resultados**
- **Vídeos más vistos**
- **Hashtags populares**
- **Tiempo en página**

## 🚀 Estado de Implementación

| Página | Ruta | US | Estado | Documentación |
|--------|------|-----|--------|---------------|
| Home | `/` | US-006 | ✅ | ✅ |
| Conceptos | `/conceptos` | US-008 | ✅ | ✅ |
| Historia | `/historia` | US-003 | ✅ | ✅ |
| Violencia | `/violencia` | US-009 | ✅ | ✅ |
| Recursos | `/recursos` | US-010 | ✅ | ✅ |
| Ayuda | `/ayuda` | US-032 | ✅ | ✅ |
| Recursos Ayuda | `/recursos-ayuda` | US-011 | ✅ | ✅ |
| Blog | `/blog` | US-026 | ✅ | ✅ |
| Agenda | `/agenda` | US-027 | ✅ | ✅ |
| Admin | `/admin` | US-019 | ✅ | ✅ |

## 📝 Convenciones de Documentación

Cada archivo de documentación de página incluye:

1. **Información General**: Ruta, componente, US, estado
2. **Objetivo**: Propósito de la página
3. **Estructura**: Layout y organización
4. **Componentes Principales**: Elementos clave
5. **Modelo de Datos**: Interfaces y tipos
6. **Servicios Utilizados**: Dependencias
7. **Estilos y Diseño**: CSS y responsive
8. **Accesibilidad**: Cumplimiento WCAG
9. **Internacionalización**: Textos traducibles
10. **Funcionalidades Móviles**: Características específicas
11. **Navegación**: Flujos de navegación
12. **Estados**: Carga, error, sin resultados
13. **Testing**: Casos de prueba
14. **Mejoras Futuras**: Roadmap

## 🔗 Enlaces Relacionados

- [Documentación Técnica](../tecnico/README.md)
- [Modelo de Datos](../tecnico/modelo-datos.md)
- [Servicios](../tecnico/servicios.md)
- [Analytics](../tecnico/analytics.md)
- [Guía de Accesibilidad](../accesibilidad/guia.md)
- [Lengua de Signos](../accesibilidad/lengua-signos.md)
