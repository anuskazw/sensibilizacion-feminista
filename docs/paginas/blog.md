# Página de Blog

## 📋 Información General

**Ruta**: `/blog`  
**Componente**: `BlogComponent`  
**Historia de Usuario**: US-026  
**Estado**: ✅ Completada

## 🎯 Objetivo

Página que presenta artículos del blog sobre feminismo con sistema de comentarios moderados. Los artículos incluyen categorías, etiquetas, estadísticas de vistas/likes y contenido en lectura fácil.

## 🏗️ Estructura

### Vista de Listado
```
┌─────────────────────────────────────┐
│         Listado de Artículos        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ [Imagen]                    │   │
│  │ Título del Artículo         │   │
│  │ Resumen...                  │   │
│  │ Por: Autor | 15 Ene 2024   │   │
│  │ 👁️ 1250 | ❤️ 89           │   │
│  │ [Categoría] [Etiquetas]    │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Más artículos...]                │
└─────────────────────────────────────┘
```

### Vista de Detalle
```
┌─────────────────────────────────────┐
│  [← Volver al listado]              │
│                                     │
│  Título del Artículo                │
│  Por: Autor | 15 Ene 2024          │
│  [Categoría] [Etiquetas]           │
│                                     │
│  [Imagen destacada]                │
│                                     │
│  Contenido del artículo...         │
│                                     │
│  ──────────────────────────────    │
│  💬 Comentarios (2)                │
│                                     │
│  [Comentario 1]                    │
│  [Comentario 2]                    │
│                                     │
│  ✍️ Dejar un comentario            │
│  [Formulario]                      │
└─────────────────────────────────────┘
```

## 🎨 Componentes Principales

### 1. Listado de Artículos
- **Grid responsive**: 1-3 columnas según ancho
- **Tarjetas de artículo**: Imagen, título, resumen, metadatos
- **Estadísticas**: Vistas y likes
- **Categorías y etiquetas**: Badges visuales
- **Click en tarjeta**: Abre vista de detalle

```typescript
filteredArticles = computed(() => {
  return this.articles().filter(
    article => article.activo && article.estado === 'publicado'
  );
});
```

### 2. Vista de Detalle del Artículo
- **Contenido completo**: Versión estándar
- **Contenido lectura fácil**: Versión simplificada (opcional)
- **Información del autor**: Nombre y biografía
- **Metadatos**: Fecha, categorías, etiquetas
- **Compartir en redes**: Botones de compartir
- **Navegación**: Botón volver al listado

```html
<article class="article-detail">
  <button (click)="closeArticleDetail()">← Volver</button>
  
  <h1>{{ getTitle(selectedArticle()) }}</h1>
  
  <div class="article-meta">
    <span>Por: {{ selectedArticle().autor }}</span>
    <span>{{ formatDate(selectedArticle().fecha_publicacion) }}</span>
  </div>
  
  <img [src]="selectedArticle().imagen_destacada" 
       [alt]="getImageAlt(selectedArticle())" />
  
  <div class="article-content">
    {{ getContent(selectedArticle()) }}
  </div>
  
  <!-- Sección de comentarios -->
  <section class="comments-section">
    <!-- ... -->
  </section>
</article>
```

### 3. Sistema de Comentarios Moderados
- **Listado de comentarios aprobados**: Solo comentarios moderados
- **Formulario de nuevo comentario**: Nombre, email (opcional), contenido
- **Estado pendiente**: Los comentarios requieren aprobación
- **Notificación de envío**: Mensaje de éxito tras enviar

```typescript
submitComment(): void {
  const comment = this.newComment();
  if (!comment.nombre.trim() || !comment.contenido.trim()) {
    return;
  }
  
  this.isSubmittingComment.set(true);
  
  // Simular envío (en producción, llamada a API)
  setTimeout(() => {
    const newComment: BlogComment = {
      id: Date.now().toString(),
      articulo_id: this.selectedArticle()!.id,
      contenido: comment.contenido,
      autor_nombre: comment.nombre,
      autor_email: comment.email || undefined,
      estado: 'pendiente', // Requiere moderación
      fecha_creacion: new Date(),
      fecha_modificacion: new Date()
    };
    
    // Limpiar formulario
    this.newComment.set({ nombre: '', email: '', contenido: '' });
    this.isSubmittingComment.set(false);
    
    alert(this.translateService.instant('blog.comment.submitted'));
  }, 1000);
}
```

## 📊 Modelo de Datos

### BlogArticle
```typescript
interface BlogArticle {
  id: string;
  slug: string;
  titulo: MultilingualText;
  resumen: MultilingualText;
  contenido: MultilingualText;
  contenido_lectura_facil?: MultilingualText;
  autor: string;
  autor_bio: MultilingualText;
  imagen_destacada: string;
  imagen_alt: MultilingualText;
  categorias: Array<{
    id: string;
    nombre: string;
    slug: string;
    descripcion: string;
  }>;
  etiquetas: Array<{
    id: string;
    nombre: string;
    slug: string;
    descripcion: string;
  }>;
  comentarios_habilitados: boolean;
  comentarios: BlogComment[];
  num_comentarios_aprobados: number;
  activo: boolean;
  fecha_publicacion: Date;
  fecha_modificacion: Date;
  fecha_creacion: Date;
  estado: 'publicado' | 'borrador' | 'revisado';
  vistas: number;
  likes: number;
}
```

### BlogComment
```typescript
interface BlogComment {
  id: string;
  articulo_id: string;
  contenido: string;
  autor_nombre: string;
  autor_email?: string;
  estado: CommentStatus;  // 'pendiente' | 'aprobado' | 'rechazado'
  fecha_creacion: Date;
  fecha_modificacion: Date;
  fecha_aprobacion?: Date;
  moderado_por?: string;
}
```

## 🔧 Servicios Utilizados

### LanguageService
- **getCurrentLanguage()**: Idioma activo para mostrar contenido traducido

### OfflineService
- **isOffline()**: Detecta si hay conexión a internet

### AnalyticsService
- **trackContentView()**: Registra vistas de artículos

### TranslateService
- **instant()**: Traduce textos de la interfaz

## 🎨 Estilos y Diseño

### Responsive Design
- **Desktop (>1024px)**: Grid de 3 columnas
- **Tablet (768-1024px)**: Grid de 2 columnas
- **Mobile (<768px)**: Grid de 1 columna

### Tarjetas de Artículo
- **Imagen destacada**: Ratio 16:9
- **Hover effect**: Elevación y sombra
- **Transiciones suaves**: 0.3s ease
- **Truncado de texto**: Resumen limitado a 3 líneas

### Vista de Detalle
- **Ancho máximo**: 800px centrado
- **Tipografía**: Legible, line-height 1.6
- **Imágenes**: Responsive, max-width 100%
- **Espaciado**: Generoso entre secciones

### Comentarios
- **Separadores visuales**: Líneas entre comentarios
- **Avatar placeholder**: Inicial del nombre
- **Formulario**: Campos con validación visual
- **Botón enviar**: Deshabilitado mientras se envía

## ♿ Accesibilidad

### WCAG 2.2 AA
- ✅ **Navegación por teclado**: Tab, Enter, Escape
- ✅ **Lectores de pantalla**: aria-labels descriptivos
- ✅ **Contraste de color**: Mínimo 4.5:1
- ✅ **Roles semánticos**: article, section, form
- ✅ **Focus visible**: Indicadores claros
- ✅ **Validación de formulario**: Mensajes claros

### Características Específicas
- **Lectura fácil**: Versión simplificada del contenido
- **Alt text**: Todas las imágenes tienen descripción
- **Estructura semántica**: Headings jerárquicos

## 🌐 Internacionalización

### Textos Traducibles
```json
{
  "blog.title": "Blog",
  "blog.readMore": "Leer más",
  "blog.comments": "Comentarios",
  "blog.comment.submit": "Enviar comentario",
  "blog.comment.submitted": "Tu comentario está pendiente de moderación",
  "blog.comment.name": "Nombre",
  "blog.comment.email": "Email (opcional)",
  "blog.comment.content": "Comentario",
  "blog.stats.views": "vistas",
  "blog.stats.likes": "me gusta"
}
```

### Contenido Multilingüe
Todos los artículos están disponibles en 6 idiomas.

## 📱 Funcionalidades Móviles

- **Imágenes optimizadas**: Lazy loading
- **Scroll suave**: Entre secciones
- **Formulario táctil**: Campos grandes para móvil
- **Compartir nativo**: API de compartir del navegador

## 🔗 Navegación

### Desde esta página
- Click en artículo → Vista de detalle
- Click en categoría → Filtrar por categoría (futuro)
- Click en etiqueta → Filtrar por etiqueta (futuro)
- Botón volver → Listado de artículos

### Hacia esta página
- Menú superior → "Blog"
- Home → Tarjeta "Blog"
- URL directa → `/blog/:slug`

## 📈 Datos de Ejemplo

La página incluye 3 artículos de ejemplo:
1. **Feminismo Interseccional** (1250 vistas, 89 likes)
2. **Historia del Movimiento Feminista en España** (980 vistas, 67 likes)
3. **Prevención de la Violencia Machista** (1520 vistas, 112 likes)

## 🔄 Estados de la Página

### Estado de Carga
- Muestra skeleton screens para artículos
- Componente: `SkeletonScreenComponent`

### Estado de Error
- Muestra mensaje de error si falla la carga
- Botón de reintentar
- Componente: `ErrorStateComponent`

### Estado Sin Artículos
- Mensaje cuando no hay artículos publicados

## 🛡️ Moderación de Comentarios

### Flujo de Moderación
1. Usuario envía comentario → Estado: **Pendiente**
2. Admin revisa en panel → Aprueba/Rechaza
3. Si aprobado → Aparece en el artículo
4. Si rechazado → No se muestra

### Validaciones
- Nombre: Requerido, mínimo 2 caracteres
- Email: Opcional, formato válido si se proporciona
- Contenido: Requerido, mínimo 10 caracteres

## 🧪 Testing

### Casos de Prueba
- ✅ Listado muestra solo artículos publicados
- ✅ Click en artículo abre detalle
- ✅ Botón volver cierra detalle
- ✅ Comentarios aprobados se muestran
- ✅ Formulario valida campos requeridos
- ✅ Comentario se envía correctamente
- ✅ Mensaje de éxito tras enviar
- ✅ Cambio de idioma actualiza contenido
- ✅ Estadísticas se muestran correctamente

## 🚀 Mejoras Futuras

- [ ] Filtrado por categorías y etiquetas
- [ ] Búsqueda de artículos
- [ ] Paginación o scroll infinito
- [ ] Sistema de likes para usuarios
- [ ] Respuestas a comentarios (threading)
- [ ] Notificaciones de nuevos comentarios
- [ ] Editor WYSIWYG para comentarios
- [ ] Compartir citas del artículo
- [ ] Tiempo estimado de lectura
- [ ] Artículos relacionados
