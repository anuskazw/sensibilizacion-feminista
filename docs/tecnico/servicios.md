# Servicios Core

## 📋 Información General

Documentación de los servicios principales de la aplicación ubicados en `src/app/core/services/`.

## 🔧 Servicios Disponibles

### 1. HashtagService
**Historia de Usuario**: US-004  
**Archivo**: `hashtag.service.ts`

#### Descripción
Servicio centralizado para la gestión completa de hashtags con operaciones CRUD, búsqueda y estadísticas.

#### API Pública

```typescript
// Signals reactivos
hashtags: Signal<Hashtag[]>

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
getHashtagStats(): HashtagStats
```

#### Ejemplo de Uso

```typescript
export class MyComponent {
  constructor(private hashtagService: HashtagService) {}
  
  ngOnInit() {
    // Obtener todos los hashtags
    const hashtags = this.hashtagService.hashtags();
    
    // Crear nuevo hashtag
    const newHashtag = this.hashtagService.createHashtag({
      nombre: 'Nuevo Hashtag',
      slug: 'nuevo-hashtag',
      descripcion: 'Descripción opcional'
    });
    
    // Buscar hashtags
    const results = this.hashtagService.searchHashtags('feminismo');
  }
}
```

---

### 2. ResourceService
**Historia de Usuario**: US-005  
**Archivo**: `resource.service.ts`

#### Descripción
Gestión completa de recursos (libros, películas, documentales), testimonios e instituciones de ayuda.

#### API Pública

```typescript
// Computed Signals
recursos: Signal<RecursoContent[]>
testimonios: Signal<TestimonioContent[]>
instituciones: Signal<InstitucionContent[]>
libros: Signal<RecursoContent[]>
peliculasSeries: Signal<RecursoContent[]>
documentales: Signal<RecursoContent[]>

// Contadores
totalRecursos: Signal<number>
totalTestimonios: Signal<number>
totalInstituciones: Signal<number>

// Filtrado de Recursos
filterRecursos(filters: RecursoFilters): RecursoContent[]
filterInstituciones(filters: InstitucionFilters): InstitucionContent[]

// Búsqueda por Slug
getRecursoBySlug(slug: string): RecursoContent | undefined
getTestimonioBySlug(slug: string): TestimonioContent | undefined
getInstitucionBySlug(slug: string): InstitucionContent | undefined
getInstitucionesByIds(ids: string[]): InstitucionContent[]

// Utilidades
getRecursosStats(): RecursosStats
getAutores(): string[]
getAnios(): number[]
sortRecursos(recursos: RecursoContent[], sortBy: SortBy, order: SortOrder): RecursoContent[]
```

#### Interfaces de Filtrado

```typescript
interface RecursoFilters {
  subtipo?: 'libro' | 'pelicula_serie' | 'documental';
  autor?: string;
  anio?: number;
  anioDesde?: number;
  anioHasta?: number;
  hashtags?: string[];
  searchQuery?: string;
}

interface InstitucionFilters {
  ambito?: 'nacional' | 'autonomico' | 'local';
  hashtags?: string[];
  searchQuery?: string;
}
```

#### Ejemplo de Uso

```typescript
export class RecursosComponent {
  constructor(private resourceService: ResourceService) {}
  
  ngOnInit() {
    // Obtener solo libros
    const libros = this.resourceService.libros();
    
    // Filtrar recursos
    const filtered = this.resourceService.filterRecursos({
      subtipo: 'libro',
      autor: 'Simone',
      hashtags: ['feminismo']
    });
    
    // Obtener estadísticas
    const stats = this.resourceService.getRecursosStats();
    console.log(`Total libros: ${stats.libros}`);
  }
}
```

---

### 3. SearchFilterService
**Historia de Usuario**: US-003  
**Archivo**: `search-filter.service.ts`

#### Descripción
Servicio avanzado de búsqueda y filtrado con soporte para fuzzy matching, sinónimos y multiidioma.

#### API Pública

```typescript
// Búsqueda
search(
  contents: Content[],
  query: string,
  filters?: SearchFilters,
  options?: SearchOptions
): Content[]

// Filtrado
filterByType(contents: Content[], tipo: ContentType): Content[]
filterByHashtags(contents: Content[], hashtags: string[]): Content[]
filterByYearRange(contents: HistoriaContent[], desde?: number, hasta?: number): HistoriaContent[]
filterBySubtipo(recursos: RecursoContent[], subtipo: string): RecursoContent[]

// Ordenamiento
sortContents(contents: Content[], sortBy: SortBy, order: SortOrder): Content[]

// Utilidades
getAvailableHashtags(contents: Content[]): string[]
getYearRange(historias: HistoriaContent[]): { min: number; max: number }
```

#### Interfaces

```typescript
interface SearchFilters {
  tipo?: ContentType;
  hashtags?: string[];
  anioDesde?: number;
  anioHasta?: number;
  subtipo?: string;
}

interface SearchOptions {
  fuzzy?: boolean;
  synonyms?: boolean;
  language?: string;
  caseSensitive?: boolean;
}
```

#### Ejemplo de Uso

```typescript
export class SearchComponent {
  constructor(private searchService: SearchFilterService) {}
  
  onSearch(query: string) {
    const results = this.searchService.search(
      this.allContents,
      query,
      {
        tipo: 'concepto',
        hashtags: ['feminismo', 'igualdad']
      },
      {
        fuzzy: true,
        synonyms: true,
        language: 'es'
      }
    );
  }
}
```

---

### 4. AnalyticsService
**Historia de Usuario**: US-023  
**Archivo**: `analytics.service.ts`

Ver documentación detallada en [analytics.md](./analytics.md)

---

### 5. CookieService
**Archivo**: `cookie.service.ts`

#### Descripción
Gestión del consentimiento de cookies y almacenamiento de preferencias.

#### API Pública

```typescript
// Consentimiento
hasConsent(): boolean
setConsent(categories: CookieCategories): void
getConsent(): CookieCategories | null
revokeConsent(): void

// Categorías
isCategoryEnabled(category: CookieCategory): boolean
enableCategory(category: CookieCategory): void
disableCategory(category: CookieCategory): void

// Almacenamiento
setCookie(name: string, value: string, days?: number): void
getCookie(name: string): string | null
deleteCookie(name: string): void
```

#### Categorías de Cookies

```typescript
interface CookieCategories {
  necessary: boolean;    // Siempre true
  analytics: boolean;    // Opcional
  preferences: boolean;  // Opcional
}
```

#### Ejemplo de Uso

```typescript
export class CookieBannerComponent {
  constructor(private cookieService: CookieService) {}
  
  acceptAll() {
    this.cookieService.setConsent({
      necessary: true,
      analytics: true,
      preferences: true
    });
  }
  
  acceptNecessary() {
    this.cookieService.setConsent({
      necessary: true,
      analytics: false,
      preferences: false
    });
  }
}
```

---

### 6. SeoService
**Archivo**: `seo.service.ts`

#### Descripción
Gestión de metadatos SEO y Open Graph para optimización en motores de búsqueda y redes sociales.

#### API Pública

```typescript
// Metadatos básicos
setTitle(title: string): void
setDescription(description: string): void
setKeywords(keywords: string[]): void

// Open Graph
setOpenGraph(config: OpenGraphConfig): void

// Twitter Card
setTwitterCard(config: TwitterCardConfig): void

// Canonical URL
setCanonicalUrl(url: string): void

// Idioma
setLanguage(lang: string): void
```

#### Ejemplo de Uso

```typescript
export class ConceptosComponent {
  constructor(private seo: SeoService) {}
  
  ngOnInit() {
    this.seo.setTitle('Conceptos Clave del Feminismo');
    this.seo.setDescription('Glosario de conceptos feministas en lectura fácil');
    this.seo.setKeywords(['feminismo', 'conceptos', 'igualdad']);
    this.seo.setOpenGraph({
      title: 'Conceptos Clave del Feminismo',
      description: 'Glosario accesible de conceptos feministas',
      image: 'https://example.com/og-image.jpg',
      url: 'https://example.com/conceptos'
    });
  }
}
```

---

### 7. TranslationService
**Historia de Usuario**: US-001  
**Archivo**: `translation.service.ts`

#### Descripción
Wrapper sobre ngx-translate con funcionalidades adicionales para el proyecto.

#### API Pública

```typescript
// Idioma
getCurrentLanguage(): string
setLanguage(lang: string): void
getAvailableLanguages(): string[]

// Traducción
translate(key: string, params?: any): string
instant(key: string, params?: any): string

// Utilidades
getMultilingualText(text: MultilingualText): string
hasTranslation(key: string): boolean
```

#### Ejemplo de Uso

```typescript
export class MyComponent {
  constructor(private translation: TranslationService) {}
  
  ngOnInit() {
    // Cambiar idioma
    this.translation.setLanguage('ca');
    
    // Obtener traducción
    const title = this.translation.instant('home.title');
    
    // Obtener texto multiidioma
    const multiText: MultilingualText = {
      es: 'Hola',
      en: 'Hello',
      ca: 'Hola'
    };
    const text = this.translation.getMultilingualText(multiText);
  }
}
```

---

## 🧪 Testing

### Cobertura de Pruebas

| Servicio | Tests | Cobertura |
|----------|-------|-----------|
| HashtagService | 13 | 100% |
| ResourceService | 50+ | 100% |
| SearchFilterService | 46 | 100% |
| AnalyticsService | Pendiente | - |
| CookieService | Pendiente | - |
| SeoService | Pendiente | - |
| TranslationService | Pendiente | - |

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests específicos
npm test -- hashtag.service.spec.ts
npm test -- resource.service.spec.ts
npm test -- search-filter.service.spec.ts
```

---

## 🔗 Dependencias entre Servicios

```
TranslationService
    ↓
SearchFilterService → ResourceService
    ↓                      ↓
HashtagService ←──────────┘
    ↓
AnalyticsService → CookieService
    ↓
SeoService
```

---

## 📊 Métricas

- **Total de servicios**: 7
- **Líneas de código**: ~2,000 líneas
- **Tests implementados**: 109+
- **Cobertura promedio**: ~85%

---

## 🔮 Mejoras Futuras

### Corto Plazo
1. Completar tests de servicios faltantes
2. Implementar caché en servicios de búsqueda
3. Agregar logging centralizado

### Mediano Plazo
1. Implementar persistencia con backend
2. Agregar sincronización offline
3. Implementar retry logic en llamadas HTTP

### Largo Plazo
1. Migrar a arquitectura de microservicios
2. Implementar GraphQL
3. Agregar real-time updates con WebSockets
