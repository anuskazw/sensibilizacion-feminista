# Modelos de Datos - US-004

## Descripción General

Este directorio contiene los modelos de datos implementados según la US-004: Modelo de datos común y gestión de hashtags.

## Arquitectura del Modelo

### Modelo Base Común (BaseContent)

Todos los contenidos de la aplicación heredan de `BaseContent`, que incluye:

#### Campos Identificadores
- **id**: Identificador único del contenido
- **slug**: URL-friendly identifier para enlaces
- **tipo**: Tipo de contenido (historia|concepto|violencia|recurso|testimonio|institucion)

#### Campos Multiidioma
Todos los campos de texto soportan 6 idiomas (es, en, ca, val, gl, eu):
- **titulo**: Título del contenido en todos los idiomas
- **descripcion**: Descripción completa del contenido
- **descripcion_lectura_facil**: Versión en lectura fácil (accesibilidad)

#### Campos de Vídeo en Lengua de Signos
- **video_lse_url**: URL del vídeo en Lengua de Signos Española (opcional)
- **video_lsc_url**: URL del vídeo en Lengua de Signos Catalana (opcional)
- **video_transcription**: Transcripción del vídeo en todos los idiomas
- **video_subtitles_url**: URL de los subtítulos del vídeo

#### Metadatos
- **hashtags**: Array de hashtags asociados al contenido
- **referencias**: Referencias bibliográficas (título, URL, autor, año)

#### Campos Opcionales según Tipo
- **anio**: Año (requerido para historias)
- **autor**: Autor del contenido
- **duracion**: Duración en minutos (para contenidos audiovisuales)

#### Campos de Control
- **activo**: Boolean que indica si el contenido está publicado
- **fecha_publicacion**: Fecha de publicación del contenido
- **orden**: Orden de visualización (opcional)

## Tipos de Contenido

### 1. HistoriaContent
Eventos históricos relevantes para el feminismo.
- Campos específicos: `anio` (requerido), `anio_hasta` (para períodos)

### 2. ConceptoContent
Conceptos clave del feminismo.
- Hereda solo campos base

### 3. ViolenciaContent
Información sobre tipos de violencia de género.
- Campos específicos: 
  - `senales_alerta`: Señales de alerta en todos los idiomas
  - `recursos_ayuda`: IDs de instituciones de ayuda relacionadas

### 4. RecursoContent
Recursos culturales (libros, películas, documentales).
- **subtipo**: libro | pelicula_serie | documental
- Campos para libros: `isbn`, `enlace_catalogo`, `num_ediciones`
- Campos para audiovisual: `direccion`, `num_temporadas`, `duracion`

### 5. TestimonioContent
Testimonios de mujeres sordas.
- Campos específicos:
  - `anonimizado`: Boolean indicando si es anónimo
  - `consentimiento_rgpd`: Boolean de consentimiento RGPD

### 6. InstitucionContent
Instituciones y aplicaciones de ayuda.
- Campos específicos:
  - `telefono`, `email`, `web`: Datos de contacto
  - `horario`: Horario de atención en todos los idiomas
  - `ambito`: nacional | autonomico | local

## Sistema de Hashtags

### Interface Hashtag
```typescript
interface Hashtag {
  id: string;
  nombre: string;
  slug: string;
  descripcion?: string;
}
```

### Características
- **Gestión centralizada**: Los hashtags se gestionan de forma independiente
- **Reutilización**: Un mismo hashtag puede usarse en múltiples contenidos
- **Descripción opcional**: Permite añadir contexto a cada hashtag
- **Slug único**: Para URLs amigables y filtrado

## Referencias Bibliográficas

### Interface Reference
```typescript
interface Reference {
  titulo: string;
  url?: string;
  autor?: string;
  anio?: number;
}
```

## Internacionalización

### MultilingualText
Todos los campos de texto usan esta interface para soportar múltiples idiomas:
- **es** (Español): Obligatorio
- **en** (English): Opcional
- **ca** (Català): Opcional
- **val** (Valencià): Opcional
- **gl** (Galego): Opcional
- **eu** (Euskera): Opcional

## Uso en Componentes

Los componentes deben:
1. Importar el tipo de contenido específico que necesiten
2. Usar el tipo `Content` para referencias genéricas
3. Acceder a campos multiidioma usando el idioma actual: `content.titulo[currentLang]`
4. Verificar la existencia de campos opcionales antes de usarlos

## Extensibilidad

El modelo permite:
- Añadir nuevos tipos de contenido extendiendo `BaseContent`
- Añadir campos específicos en interfaces derivadas
- Mantener compatibilidad con código existente mediante el tipo unión `Content`

## Validación

Todos los modelos son interfaces TypeScript que:
- Proporcionan validación en tiempo de compilación
- Se autocompletan en IDEs
- Documentan la estructura de datos esperada

## Referencias

- Historia de Usuario: US-004 - Modelo de datos común y gestión de hashtags
- Tickets: US-004-01, US-004-02, US-004-03

