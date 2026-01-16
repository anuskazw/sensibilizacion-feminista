# Modelo de Datos Común

## 📋 Información General

**Historia de Usuario**: US-004  
**Estado**: ✅ Completada  
**Ubicación**: `src/app/core/models/content.model.ts`

## 🎯 Objetivo

Proporcionar una estructura de datos común y consistente para todos los tipos de contenido de la aplicación, garantizando:
- Reutilización de código
- Consistencia en la gestión de datos
- Soporte multiidioma
- Accesibilidad (vídeos en lengua de signos)
- Facilidad de mantenimiento

## 🏗️ Estructura Base

### BaseContent

Interfaz base que comparten todos los tipos de contenido:

```typescript
export interface BaseContent {
  // Identificadores
  id: string;
  slug: string;
  tipo: ContentType;
  
  // Contenido multiidioma
  titulo: MultilingualText;
  descripcion: MultilingualText;
  descripcion_lectura_facil: MultilingualText;
  
  // Vídeos en lengua de signos
  video_lse_url?: string;
  video_lsc_url?: string;
  video_transcription?: MultilingualText;
  video_subtitles_url?: string;
  
  // Metadatos
  hashtags: string[];
  referencias?: Reference[];
  
  // Control
  activo: boolean;
  fecha_publicacion: Date;
  orden?: number;
}
```

### ContentType

Enumeración de tipos de contenido soportados:

```typescript
export type ContentType = 
  | 'historia'
  | 'concepto'
  | 'violencia'
  | 'recurso'
  | 'testimonio'
  | 'institucion';
```

### MultilingualText

Estructura para textos en múltiples idiomas:

```typescript
export interface MultilingualText {
  es: string;      // Español (obligatorio)
  en?: string;     // English (opcional)
  ca?: string;     // Català (opcional)
  val?: string;    // Valencià (opcional)
  gl?: string;     // Galego (opcional)
  eu?: string;     // Euskara (opcional)
}
```

**Idiomas soportados**: 6 (español obligatorio, resto opcionales)

### Reference

Estructura para referencias bibliográficas:

```typescript
export interface Reference {
  titulo: string;
  autor?: string;
  url?: string;
  fecha?: string;
  tipo?: 'libro' | 'articulo' | 'web' | 'video' | 'otro';
}
```

## 📚 Tipos de Contenido Específicos

### 1. HistoriaContent

Eventos históricos del feminismo:

```typescript
export interface HistoriaContent extends BaseContent {
  tipo: 'historia';
  anio: number;           // Año del evento (requerido)
  anio_hasta?: number;    // Año final para períodos (opcional)
}
```

**Ejemplo**:
```typescript
{
  id: 'hist-001',
  slug: 'sufragio-femenino-espana',
  tipo: 'historia',
  anio: 1931,
  titulo: {
    es: 'Sufragio femenino en España',
    en: 'Women\'s suffrage in Spain'
  },
  // ... resto de campos
}
```

### 2. ConceptoContent

Conceptos clave del feminismo:

```typescript
export interface ConceptoContent extends BaseContent {
  tipo: 'concepto';
  // Solo campos base, sin campos adicionales
}
```

**Ejemplo**:
```typescript
{
  id: 'conc-001',
  slug: 'feminismo',
  tipo: 'concepto',
  titulo: {
    es: 'Feminismo',
    en: 'Feminism'
  },
  descripcion_lectura_facil: {
    es: 'El feminismo busca la igualdad entre hombres y mujeres.'
  },
  hashtags: ['feminismo', 'igualdad'],
  // ... resto de campos
}
```

### 3. ViolenciaContent

Tipos de violencia de género:

```typescript
export interface ViolenciaContent extends BaseContent {
  tipo: 'violencia';
  senales_alerta: MultilingualText;    // Señales de alerta
  recursos_ayuda: string[];            // IDs de instituciones
}
```

**Ejemplo**:
```typescript
{
  id: 'viol-001',
  slug: 'violencia-fisica',
  tipo: 'violencia',
  titulo: {
    es: 'Violencia Física'
  },
  senales_alerta: {
    es: 'Golpes, empujones, pellizcos...'
  },
  recursos_ayuda: ['inst-016', 'inst-024'],
  // ... resto de campos
}
```

### 4. RecursoContent

Recursos culturales (libros, películas, documentales):

```typescript
export interface RecursoContent extends BaseContent {
  tipo: 'recurso';
  subtipo: 'libro' | 'pelicula_serie' | 'documental';
  
  // Campos comunes
  sinopsis_lectura_facil?: MultilingualText;
  
  // Campos específicos para libros
  autor?: string;
  anio?: number;
  num_ediciones?: number;
  isbn?: string;
  enlace_catalogo?: string;
  
  // Campos específicos para películas/series
  direccion?: string;
  duracion?: number;
  num_temporadas?: number;
  
  // Campos específicos para documentales
  // (usa direccion, anio, duracion)
}
```

**Ejemplo - Libro**:
```typescript
{
  id: 'rec-001',
  slug: 'el-segundo-sexo',
  tipo: 'recurso',
  subtipo: 'libro',
  titulo: {
    es: 'El segundo sexo'
  },
  autor: 'Simone de Beauvoir',
  anio: 1949,
  isbn: '978-84-376-0676-6',
  hashtags: ['feminismo', 'filosofia'],
  // ... resto de campos
}
```

**Ejemplo - Película**:
```typescript
{
  id: 'rec-002',
  slug: 'las-sufragistas',
  tipo: 'recurso',
  subtipo: 'pelicula_serie',
  titulo: {
    es: 'Las Sufragistas'
  },
  direccion: 'Sarah Gavron',
  duracion: 106,
  hashtags: ['historia', 'sufragio'],
  // ... resto de campos
}
```

### 5. TestimonioContent

Testimonios de mujeres sordas:

```typescript
export interface TestimonioContent extends BaseContent {
  tipo: 'testimonio';
  anonimizado: boolean;
  consentimiento_rgpd: boolean;
}
```

**Ejemplo**:
```typescript
{
  id: 'test-001',
  slug: 'testimonio-001',
  tipo: 'testimonio',
  titulo: {
    es: 'Testimonio de superación'
  },
  anonimizado: true,
  consentimiento_rgpd: true,
  video_lse_url: 'https://...',
  // ... resto de campos
}
```

### 6. InstitucionContent

Instituciones de ayuda:

```typescript
export interface InstitucionContent extends BaseContent {
  tipo: 'institucion';
  telefono?: string;
  email?: string;
  web?: string;
  ambito: 'nacional' | 'autonomico' | 'local';
}
```

**Ejemplo**:
```typescript
{
  id: 'inst-016',
  slug: '016-violencia-genero',
  tipo: 'institucion',
  titulo: {
    es: '016 - Atención a víctimas de violencia de género'
  },
  telefono: '016',
  web: 'https://violenciagenero.igualdad.gob.es',
  ambito: 'nacional',
  // ... resto de campos
}
```

## 🔗 Tipo Unión Content

Para trabajar con cualquier tipo de contenido de forma polimórfica:

```typescript
export type Content = 
  | HistoriaContent
  | ConceptoContent
  | ViolenciaContent
  | RecursoContent
  | TestimonioContent
  | InstitucionContent;
```

**Uso**:
```typescript
function processContent(content: Content) {
  switch (content.tipo) {
    case 'historia':
      // TypeScript sabe que es HistoriaContent
      console.log(content.anio);
      break;
    case 'concepto':
      // TypeScript sabe que es ConceptoContent
      break;
    // ... otros casos
  }
}
```

## 🏷️ Sistema de Hashtags

### Interface Hashtag

```typescript
export interface Hashtag {
  id: string;
  nombre: string;
  slug: string;
  descripcion?: string;
}
```

### HashtagService

Servicio centralizado para gestión de hashtags:

```typescript
@Injectable({ providedIn: 'root' })
export class HashtagService {
  // Signals reactivos
  private hashtagsSignal = signal<Hashtag[]>([]);
  hashtags = this.hashtagsSignal.asReadonly();
  
  // CRUD
  createHashtag(hashtag: Omit<Hashtag, 'id'>): Hashtag
  getHashtagById(id: string): Hashtag | undefined
  getHashtagBySlug(slug: string): Hashtag | undefined
  updateHashtag(id: string, updates: Partial<Hashtag>): boolean
  deleteHashtag(id: string): boolean
  
  // Búsqueda y filtrado
  searchHashtags(query: string): Hashtag[]
  getAlphabeticalGroups(): { letter: string; hashtags: Hashtag[] }[]
  
  // Utilidades
  generateSlug(nombre: string): string
  validateSlug(slug: string): boolean
  getHashtagStats(): { total: number; /* ... */ }
}
```

### Hashtags Iniciales

10 hashtags precargados:
1. Feminismo
2. Igualdad
3. Violencia de Género
4. Accesibilidad
5. Lengua de Signos
6. Educación
7. Derechos Humanos
8. Empoderamiento
9. Discriminación
10. Sororidad

## 🧪 Validación y Testing

### Pruebas Implementadas

**content.model.spec.ts** - 21 tests:
- Validación de tipos
- Campos multiidioma
- Interfaces específicas por tipo
- Tipo unión Content

**hashtag.service.spec.ts** - 13 tests:
- Operaciones CRUD
- Búsqueda y filtrado
- Validación de datos
- Signals reactivos
- Generación de slugs

### Ejemplo de Test

```typescript
describe('BaseContent', () => {
  it('debe tener campos obligatorios', () => {
    const content: BaseContent = {
      id: 'test-001',
      slug: 'test-slug',
      tipo: 'concepto',
      titulo: { es: 'Título' },
      descripcion: { es: 'Descripción' },
      descripcion_lectura_facil: { es: 'Lectura fácil' },
      hashtags: [],
      activo: true,
      fecha_publicacion: new Date()
    };
    
    expect(content.id).toBe('test-001');
    expect(content.tipo).toBe('concepto');
  });
});
```

## 📊 Métricas

- **Líneas de código**: ~500 líneas (modelos)
- **Líneas de código**: ~300 líneas (HashtagService)
- **Pruebas**: 34 tests (21 modelos + 13 servicio)
- **Cobertura**: 100% del código de US-004
- **Tipos de contenido**: 6
- **Idiomas soportados**: 6

## 🔮 Mejoras Futuras

### Corto Plazo
1. Conectar con API REST backend
2. Implementar persistencia en base de datos
3. Panel de administración de hashtags

### Mediano Plazo
1. Caché de hashtags frecuentes
2. Paginación de resultados
3. Índices de búsqueda

### Largo Plazo
1. Sistema de versionado de contenidos
2. Workflow de aprobación
3. Auditoría de cambios

## 📁 Archivos Relacionados

```
src/app/core/models/
├── content.model.ts           # Modelos de datos
├── content.model.spec.ts      # Tests de modelos
├── filter.model.ts            # Modelos de filtros
└── README.md                  # Documentación adicional

src/app/core/services/
├── hashtag.service.ts         # Servicio de hashtags
├── hashtag.service.spec.ts    # Tests del servicio
├── search-filter.service.ts   # Servicio de búsqueda
└── search-filter.service.spec.ts  # Tests de búsqueda
```

## 🔗 Historias de Usuario Relacionadas

- **US-003**: Búsqueda y filtrado de contenidos
- **US-005**: Modelos de recursos y ayudas
- **US-007**: Página /historia
- **US-008**: Página /conceptos
- **US-009**: Página /violencia
- **US-010**: Sección /recursos
- **US-011**: Recursos de ayuda
