# Página de Administración

## 📋 Información General

**Ruta**: `/admin`  
**Componente**: `AdminComponent`  
**Historia de Usuario**: US-019  
**Estado**: ✅ Completada

## 🎯 Objetivo

Panel de administración de contenidos con flujo de estados (Borrador → Revisado → Publicado), filtrado avanzado y estadísticas de analytics. Permite gestionar todos los contenidos de la aplicación de forma centralizada.

## 🏗️ Estructura

### Layout Principal
```
┌─────────────────────────────────────┐
│  Header: Admin Panel | [Logout]    │
├─────────────────────────────────────┤
│  📊 Estadísticas                    │
│  [Total] [Borrador] [Revisado] [...] │
├─────────────────────────────────────┤
│  🔍 Filtros                         │
│  [Estado▾] [Tipo▾] [Buscar...]     │
├─────────────────────────────────────┤
│  📋 Listado de Contenidos           │
│  ┌─────────────────────────────┐   │
│  │ Título | Tipo | Estado      │   │
│  │ [Cambiar estado ▾]          │   │
│  └─────────────────────────────┘   │
│  [Más contenidos...]                │
├─────────────────────────────────────┤
│  📈 Analytics                       │
│  - Vistas totales                   │
│  - Búsquedas frecuentes             │
│  - Estadísticas por categoría       │
└─────────────────────────────────────┘
```

## 🎨 Componentes Principales

### 1. Sistema de Autenticación
- **Login requerido**: Redirección a `/admin/login` si no autenticado
- **Verificación continua**: Check de sesión en cada carga
- **Logout**: Botón para cerrar sesión

```typescript
ngOnInit(): void {
  // Verificar autenticación
  if (!this.authService.checkAuth()) {
    this.router.navigate(['/admin/login']);
    return;
  }
  
  // Cargar contenidos
  this.loadSampleContents();
}

logout(): void {
  this.authService.logout();
  this.router.navigate(['/admin/login']);
}
```

### 2. Estadísticas Generales
Dashboard con métricas clave:
- **Total de contenidos**: Contador general
- **Por estado**: Borrador, Revisado, Publicado
- **Por tipo**: Historia, Concepto, Violencia, etc.

```typescript
stats = computed(() => {
  const contents = this.contents();
  return {
    total: contents.length,
    borrador: contents.filter(c => c.estado === 'borrador').length,
    revisado: contents.filter(c => c.estado === 'revisado').length,
    publicado: contents.filter(c => c.estado === 'publicado').length
  };
});
```

### 3. Sistema de Filtrado
Filtros múltiples combinables:
- **Por estado**: Todos, Borrador, Revisado, Publicado
- **Por tipo**: Todos, Historia, Concepto, Violencia, Recurso, etc.
- **Por búsqueda**: Texto en títulos

```typescript
selectedStatus = signal<ContentStatus | 'todos'>('todos');
selectedType = signal<ContentType | 'todos'>('todos');
searchQuery = signal('');

filteredContents = computed(() => {
  let result = this.contents();
  
  // Filtrar por estado
  if (this.selectedStatus() !== 'todos') {
    result = result.filter(c => c.estado === this.selectedStatus());
  }
  
  // Filtrar por tipo
  if (this.selectedType() !== 'todos') {
    result = result.filter(c => c.tipo === this.selectedType());
  }
  
  // Filtrar por búsqueda
  const query = this.searchQuery().toLowerCase();
  if (query) {
    result = result.filter(c => {
      const lang = this.languageService.getCurrentLanguage();
      const titulo = c.titulo[lang] || c.titulo.es;
      return titulo.toLowerCase().includes(query);
    });
  }
  
  return result;
});
```

### 4. Flujo de Estados de Contenido
Sistema de workflow con validaciones:

**Flujo válido:**
```
Borrador → Revisado → Publicado
```

**Transiciones permitidas:**
- Borrador → Revisado ✅
- Revisado → Publicado ✅

**Transiciones bloqueadas:**
- Borrador → Publicado ❌ (debe pasar por Revisado)
- Revisado → Borrador ❌ (no se puede retroceder)
- Publicado → Cualquier otro ❌ (estado final)

```typescript
changeStatus(content: Content, newStatus: ContentStatus): void {
  const currentStatus = content.estado;
  
  // Validar transición de estados
  if (currentStatus === 'borrador' && newStatus === 'publicado') {
    alert(this.translateService.instant('admin.error.invalidTransition'));
    return;
  }
  
  if (currentStatus === 'revisado' && newStatus === 'borrador') {
    alert(this.translateService.instant('admin.error.cannotGoBack'));
    return;
  }
  
  if (currentStatus === 'publicado' && newStatus !== 'publicado') {
    alert(this.translateService.instant('admin.error.cannotChangePublished'));
    return;
  }
  
  // Actualizar contenido
  const updatedContents = this.contents().map(c => {
    if (c.id === content.id) {
      return {
        ...c,
        estado: newStatus,
        fecha_modificacion: new Date(),
        modificado_por: this.authService.getCurrentUser() || undefined
      };
    }
    return c;
  });
  
  this.contents.set(updatedContents);
}
```

### 5. Tabla de Contenidos
Lista de contenidos con información clave:
- **Título**: Traducido según idioma
- **Tipo**: Badge con color según tipo
- **Estado**: Badge con color según estado
- **Fecha de modificación**: Formato localizado
- **Acciones**: Dropdown con transiciones disponibles

```html
<table class="contents-table">
  <thead>
    <tr>
      <th>Título</th>
      <th>Tipo</th>
      <th>Estado</th>
      <th>Fecha</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    @for (content of filteredContents(); track content.id) {
      <tr>
        <td>{{ getContentTitle(content) }}</td>
        <td>
          <span class="type-badge">{{ content.tipo }}</span>
        </td>
        <td>
          <span [class]="'status-badge ' + getStatusClass(content.estado)">
            {{ getStatusLabel(content.estado) | translate }}
          </span>
        </td>
        <td>{{ formatDate(content.fecha_modificacion) }}</td>
        <td>
          <select (change)="changeStatus(content, $event.target.value)">
            <option [value]="content.estado">
              {{ getStatusLabel(content.estado) | translate }}
            </option>
            @for (status of getAvailableTransitions(content.estado); track status) {
              <option [value]="status">
                {{ getStatusLabel(status) | translate }}
              </option>
            }
          </select>
        </td>
      </tr>
    }
  </tbody>
</table>
```

### 6. Analytics Dashboard
Estadísticas de uso de la aplicación:

#### Métricas Generales
- **Vistas totales**: Contador de todas las vistas
- **Búsquedas**: Total de búsquedas realizadas
- **Vídeos LSE vistos**: Reproducciones de vídeos

```typescript
analyticsStats = computed(() => {
  return this.analyticsService.getGeneralStats();
});
```

#### Estadísticas por Categoría
- **Vistas por tipo**: Historia, Concepto, Violencia, etc.
- **Gráfico de barras**: Visualización de popularidad

```typescript
contentViewStats = computed(() => {
  return this.analyticsService.getContentViewStatsByCategory();
});
```

#### Búsquedas Más Frecuentes
- **Top 10 búsquedas**: Términos más buscados
- **Contador de frecuencia**: Número de veces

```typescript
mostFrequentSearches = computed(() => {
  return this.analyticsService.getMostFrequentSearches(10);
});
```

#### Estadísticas de Vídeos LSE
- **Idioma de vídeos**: Distribución por idioma
- **Disponibilidad**: Porcentaje de contenidos con vídeo

```typescript
videoLanguageStats = computed(() => {
  return this.analyticsService.getVideoLanguageStats();
});

videoAvailabilityStats = computed(() => {
  const contents = this.contents();
  return this.analyticsService.calculateVideoAvailabilityStats(contents);
});
```

## 📊 Modelo de Datos

### Content (Base)
```typescript
interface Content {
  id: string;
  slug: string;
  tipo: ContentType;
  titulo: MultilingualText;
  descripcion: MultilingualText;
  descripcion_lectura_facil: MultilingualText;
  hashtags: Hashtag[];
  activo: boolean;
  fecha_publicacion: Date;
  estado: ContentStatus;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  creado_por?: string;
  modificado_por?: string;
}
```

### ContentStatus
```typescript
type ContentStatus = 'borrador' | 'revisado' | 'publicado';
```

### ContentType
```typescript
type ContentType = 
  | 'historia' 
  | 'concepto' 
  | 'violencia' 
  | 'recurso' 
  | 'testimonio' 
  | 'institucion';
```

## 🔧 Servicios Utilizados

### AuthService
- **checkAuth()**: Verifica si el usuario está autenticado
- **getCurrentUser()**: Obtiene el usuario actual
- **logout()**: Cierra la sesión

### LanguageService
- **getCurrentLanguage()**: Idioma activo para mostrar títulos

### AnalyticsService
- **getGeneralStats()**: Estadísticas generales
- **getContentViewStatsByCategory()**: Vistas por categoría
- **getContentViewStatsByHashtag()**: Vistas por hashtag
- **getMostFrequentSearches()**: Búsquedas más frecuentes
- **getVideoLanguageStats()**: Estadísticas de vídeos
- **calculateVideoAvailabilityStats()**: Disponibilidad de vídeos

### TranslateService
- **instant()**: Traduce textos de la interfaz

## 🎨 Estilos y Diseño

### Responsive Design
- **Desktop (>1024px)**: Layout completo con sidebar
- **Tablet (768-1024px)**: Layout adaptado
- **Mobile (<768px)**: Layout de 1 columna, tabla responsive

### Tabla de Contenidos
- **Zebra striping**: Filas alternadas
- **Hover**: Destacado de fila
- **Responsive**: Scroll horizontal en móvil
- **Acciones**: Dropdown compacto

### Badges de Estado
- **Borrador**: Amarillo (#fbbf24)
- **Revisado**: Azul (#3b82f6)
- **Publicado**: Verde (#10b981)

### Badges de Tipo
- **Historia**: Morado (#8b5cf6)
- **Concepto**: Verde (#10b981)
- **Violencia**: Rojo (#ef4444)
- **Recurso**: Azul (#3b82f6)

## ♿ Accesibilidad

### WCAG 2.2 AA
- ✅ **Navegación por teclado**: Tab, Enter, flechas
- ✅ **Lectores de pantalla**: Labels descriptivos
- ✅ **Contraste de color**: Mínimo 4.5:1
- ✅ **Roles semánticos**: table, select, button
- ✅ **Focus visible**: Indicadores claros

## 🌐 Internacionalización

### Textos Traducibles
```json
{
  "admin.title": "Panel de Administración",
  "admin.logout": "Cerrar sesión",
  "admin.stats.total": "Total",
  "admin.stats.draft": "Borradores",
  "admin.stats.reviewed": "Revisados",
  "admin.stats.published": "Publicados",
  "admin.status.draft": "Borrador",
  "admin.status.reviewed": "Revisado",
  "admin.status.published": "Publicado",
  "admin.type.all": "Todos",
  "admin.type.historia": "Historia",
  "admin.type.concepto": "Concepto",
  "admin.type.violencia": "Violencia",
  "admin.error.invalidTransition": "No se puede pasar directamente de borrador a publicado",
  "admin.error.cannotGoBack": "No se puede retroceder de revisado a borrador",
  "admin.error.cannotChangePublished": "No se puede cambiar el estado de un contenido publicado"
}
```

## 🔐 Seguridad

### Autenticación
- **Login requerido**: Redirección si no autenticado
- **Sesión persistente**: Token en localStorage/sessionStorage
- **Timeout**: Cierre automático tras inactividad

### Autorización
- **Roles**: Admin, Editor, Revisor (futuro)
- **Permisos**: Según rol del usuario
- **Auditoría**: Registro de cambios de estado

## 🧪 Testing

### Casos de Prueba
- ✅ Redirección a login si no autenticado
- ✅ Carga de contenidos correcta
- ✅ Filtros funcionan correctamente
- ✅ Transiciones de estado válidas
- ✅ Transiciones inválidas bloqueadas
- ✅ Estadísticas se calculan correctamente
- ✅ Logout funciona
- ✅ Responsive en diferentes dispositivos

## 🚀 Mejoras Futuras

- [ ] Edición inline de contenidos
- [ ] Creación de nuevos contenidos
- [ ] Eliminación de contenidos
- [ ] Historial de cambios
- [ ] Sistema de roles y permisos
- [ ] Notificaciones de cambios
- [ ] Exportación de datos
- [ ] Importación masiva
- [ ] Previsualización de contenidos
- [ ] Programación de publicaciones
- [ ] Comentarios entre revisores
- [ ] Asignación de tareas
- [ ] Dashboard personalizable
- [ ] Gráficos interactivos
- [ ] Filtros guardados

## 💡 Flujo de Trabajo

### Creación de Contenido
1. **Borrador**: Contenido en creación
   - Editable libremente
   - No visible públicamente
   - Puede tener campos incompletos

2. **Revisado**: Contenido listo para revisar
   - Completo y revisado por autor
   - Pendiente de aprobación
   - No visible públicamente

3. **Publicado**: Contenido aprobado
   - Visible públicamente
   - No editable (requiere nueva versión)
   - Estado final

### Roles (Futuro)
- **Editor**: Crea y edita borradores
- **Revisor**: Revisa y aprueba contenidos
- **Admin**: Publica contenidos y gestiona usuarios

## 📈 Métricas de Éxito

### KPIs del Panel
- **Tiempo medio de revisión**: Borrador → Revisado
- **Tiempo medio de publicación**: Revisado → Publicado
- **Tasa de aprobación**: % de contenidos publicados
- **Contenidos activos**: Total de contenidos publicados
- **Productividad**: Contenidos publicados por mes

### Analytics de Uso
- **Páginas más vistas**: Top contenidos
- **Búsquedas sin resultados**: Oportunidades de contenido
- **Vídeos más vistos**: Popularidad de LSE
- **Hashtags populares**: Tendencias de interés
