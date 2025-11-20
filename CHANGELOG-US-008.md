# Changelog - US-008: Página /conceptos y fichas de conceptos

## [1.0.0] - 2025-11-20

### ✨ Funcionalidades Añadidas

#### Página de Conceptos
- Nuevo componente `ConceptosComponent` con ruta `/conceptos`
- Layout de dos columnas: sidebar + contenido principal
- 10 conceptos feministas de ejemplo con descripciones en lectura fácil
- Soporte multiidioma completo (es, en, ca, val, gl, eu)

#### Índice Alfabético
- Navegación alfabética (A-Z) en el sidebar
- Scroll suave al hacer clic en una letra
- Agrupación automática de conceptos por letra inicial
- Botones interactivos con estados hover y focus

#### Sistema de Filtrado
- Búsqueda por texto en títulos y descripciones
- Filtrado por hashtags (selección múltiple)
- Combinación de múltiples filtros
- Contador de resultados encontrados

#### Fichas de Conceptos
- Diseño de tarjeta limpio y accesible
- Título destacado con color principal
- Descripción en lectura fácil
- Hashtags visuales
- Espacio preparado para vídeos en LSE/LSC
- Efectos hover para mejor UX

### 🔧 Modificaciones

#### ContentSidebarComponent
**Archivo**: `src/app/shared/components/content-sidebar/`

**Nuevas propiedades**:
```typescript
@Input() showAlphabeticalIndex: boolean = false
@Input() alphabeticalLetters: string[] = []
@Output() letterClick = new EventEmitter<string>()
```

**Nuevo método**:
```typescript
onLetterClick(letter: string): void
```

**Nuevos estilos CSS**:
- `.alphabetical-index` - Contenedor flexible para botones
- `.alphabet-button` - Estilo de botones A-Z con estados interactivos

#### Rutas
**Archivo**: `src/app/app.routes.ts`

```typescript
{
  path: 'conceptos',
  loadComponent: () => import('./pages/conceptos/conceptos.component')
    .then(m => m.ConceptosComponent)
}
```

#### Traducciones
**Archivos**: `src/assets/i18n/*.json`

Nueva clave añadida en 6 idiomas:
```json
"sidebar": {
  "alphabeticalIndex": "..."
}
```

### 📁 Nuevos Archivos

```
src/app/pages/conceptos/
├── conceptos.component.ts       (234 líneas)
├── conceptos.component.html     (88 líneas)
└── conceptos.component.css      (197 líneas)
```

### 📊 Métricas

- **Líneas de código añadidas**: ~550 líneas
- **Componentes nuevos**: 1 (ConceptosComponent)
- **Componentes modificados**: 1 (ContentSidebarComponent)
- **Archivos de traducción actualizados**: 6
- **Tamaño del bundle**: 14.49 kB (conceptos-component chunk)

### ♿ Accesibilidad

- ✅ Navegación completa por teclado
- ✅ ARIA labels en botones alfabéticos
- ✅ Foco visible en todos los elementos interactivos
- ✅ Contraste AA cumplido
- ✅ Estructura semántica HTML5
- ✅ Responsive para móviles y tablets

### 📱 Responsive

- **Desktop (>1024px)**: Sidebar fijo visible, grid de 3 columnas
- **Tablet (768-1024px)**: Sidebar plegable, grid de 2 columnas
- **Mobile (<768px)**: Sidebar overlay, grid de 1 columna

### 🧪 Testing

- ✅ Build exitoso (npm run build)
- ✅ Sin errores de linter
- ⚠️ Advertencia CSS budget (+20 bytes en sidebar) - No crítico

### 🐛 Correcciones

#### Error de compilación en template
**Error**: `Bindings cannot contain assignments in template`

**Solución**: Crear computed signal `alphabeticalLetters()` en lugar de usar `.map()` en el template:

```typescript
// Antes (error)
[alphabeticalLetters]="alphabeticalIndex().map(g => g.letter)"

// Después (correcto)
alphabeticalLetters = computed(() => {
  return this.alphabeticalIndex().map(group => group.letter);
});
```

### 📚 Dependencias

- Angular 18.x
- @ngx-translate/core
- RxJS (signals)

### 🔗 Historias de Usuario Relacionadas

- US-001: Multiidioma y gestión de traducciones
- US-003: Búsqueda y filtrado de contenidos
- US-004: Modelo de datos común y gestión de hashtags
- US-012: Cabecera fija y lateral izquierdo reutilizable

### 📝 Notas de Desarrollo

1. **Patrón de diseño**: Se mantiene consistencia con la página `/historia`
2. **Datos de ejemplo**: Los conceptos actuales son de ejemplo y deben ser reemplazados por contenido real
3. **Vídeos**: Se preparó la estructura para vídeos LSE/LSC pero las URLs deben añadirse
4. **Performance**: Uso de signals de Angular para optimizar la reactividad
5. **Lazy Loading**: La ruta usa lazy loading para mejorar el rendimiento inicial

### 🚀 Próximas Mejoras Sugeridas

1. Añadir animaciones de transición entre letras
2. Implementar scroll spy para resaltar la letra actual
3. Añadir tests unitarios (Jasmine/Karma)
4. Añadir tests e2e (Playwright/Cypress)
5. Optimizar el CSS para reducir el tamaño del bundle
6. Añadir skeleton screens durante la carga

---

**Desarrollado por**: AI Assistant  
**Revisado por**: Pendiente  
**Estado**: ✅ Completado y funcionando

