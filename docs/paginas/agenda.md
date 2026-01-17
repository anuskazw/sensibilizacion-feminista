# Página de Agenda

## 📋 Información General

**Ruta**: `/agenda`  
**Componente**: `AgendaComponent`  
**Historia de Usuario**: US-027  
**Estado**: ✅ Completada

## 🎯 Objetivo

Página que presenta un calendario de eventos feministas (talleres, conferencias, manifestaciones, actividades) con vista de calendario mensual y listado de eventos futuros. Incluye vídeos signados y soporte multiidioma.

## 🏗️ Estructura

### Layout Principal
```
┌─────────────────────────────────────┐
│         Navegación Mensual          │
│    [<]  Septiembre 2025  [>]        │
│         [Hoy]                       │
├─────────────────────────────────────┤
│         Calendario                  │
│  L  M  X  J  V  S  D               │
│  1  2  3  4  5  6  7               │
│  8  9 10 11 12 13 14               │
│ 15 16 17 18 19 20 21               │
│ 22 23 24 25 26 27 28               │
│ 29 30                              │
├─────────────────────────────────────┤
│      Listado de Eventos             │
│  [15 Sep] Taller Feminismo          │
│  [20 Oct] Conferencia Historia      │
│  [25 Sep] Círculo Sororidad         │
└─────────────────────────────────────┘
```

## 🎨 Componentes Principales

### 1. Navegación del Calendario
- **Mes/Año actual**: Formato localizado según idioma
- **Botones de navegación**: Anterior/Siguiente mes
- **Botón "Hoy"**: Vuelve al mes actual
- **Responsive**: Se adapta a móviles

```typescript
currentMonth = signal(new Date().getMonth());
currentYear = signal(new Date().getFullYear());

previousMonth(): void {
  if (this.currentMonth() === 0) {
    this.currentMonth.set(11);
    this.currentYear.set(this.currentYear() - 1);
  } else {
    this.currentMonth.set(this.currentMonth() - 1);
  }
}

nextMonth(): void {
  if (this.currentMonth() === 11) {
    this.currentMonth.set(0);
    this.currentYear.set(this.currentYear() + 1);
  } else {
    this.currentMonth.set(this.currentMonth() + 1);
  }
}
```

### 2. Vista de Calendario
- **Grid 7x6**: Días de la semana + días del mes
- **Días con eventos**: Indicador visual (punto/badge)
- **Día actual**: Destacado con color
- **Click en día**: Scroll a eventos de ese día
- **Accesibilidad**: Navegación por teclado

```typescript
daysWithEvents = computed(() => {
  const days = new Set<number>();
  this.eventsByDate().forEach((events, dateKey) => {
    const date = new Date(dateKey);
    if (date.getMonth() === this.currentMonth() && 
        date.getFullYear() === this.currentYear()) {
      days.add(date.getDate());
    }
  });
  return days;
});
```

### 3. Listado de Eventos
Cada evento muestra:
- **Fecha**: Formato localizado
- **Hora**: Formato 24h
- **Título**: Traducido según idioma activo
- **Descripción**: Versión completa o lectura fácil
- **Lugar**: Nombre del lugar
- **Dirección**: Dirección completa
- **Tipo**: Badge con tipo de evento (taller, conferencia, etc.)
- **Vídeo signado**: Indicador si disponible

```html
@for (eventDate of getSortedEventDates(); track eventDate.dateKey) {
  <section class="event-date-section">
    <h2 class="event-date-title">
      {{ formatDate(getDateFromKey(eventDate.dateKey)) }}
    </h2>
    
    @for (event of eventDate.events; track event.id) {
      <article class="event-card">
        <div class="event-time">{{ event.hora }}</div>
        <div class="event-content">
          <h3 class="event-title">{{ getTitle(event) }}</h3>
          <p class="event-description">{{ getDescription(event) }}</p>
          <div class="event-location">
            <strong>{{ getLugar(event) }}</strong>
            <span>{{ getDireccion(event) }}</span>
          </div>
          <span class="event-type-badge">{{ event.tipo }}</span>
        </div>
      </article>
    }
  </section>
}
```

## 📊 Modelo de Datos

### AgendaEvent
```typescript
interface AgendaEvent {
  id: string;
  slug: string;
  titulo: MultilingualText;
  descripcion: MultilingualText;
  fecha: Date;
  hora: string;  // Formato "HH:MM"
  lugar: MultilingualText;
  direccion?: MultilingualText;
  video_signado?: string;  // URL del vídeo LSE
  activo: boolean;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  tipo: 'taller' | 'conferencia' | 'manifestacion' | 'actividad';
}
```

## 🔧 Servicios Utilizados

### LanguageService
- **getCurrentLanguage()**: Idioma activo para mostrar contenido traducido

### OfflineService
- **isOffline()**: Detecta si hay conexión a internet

### AnalyticsService
- **trackContentView()**: Registra vista de página de agenda

## 🎨 Estilos y Diseño

### Responsive Design
- **Desktop (>768px)**: Calendario + listado lado a lado
- **Tablet/Mobile (<768px)**: Calendario arriba, listado abajo

### Calendario
- **Grid de días**: 7 columnas (L-D)
- **Día actual**: Fondo morado, texto blanco
- **Día con eventos**: Badge o punto indicador
- **Hover**: Efecto de elevación

### Tarjetas de Eventos
- **Diseño horizontal**: Hora a la izquierda, contenido a la derecha
- **Separador visual**: Línea entre eventos
- **Badge de tipo**: Color según tipo de evento
- **Sombra suave**: Box-shadow en hover

### Colores
- **Día actual**: Morado (#8b5cf6)
- **Día con eventos**: Punto morado
- **Taller**: Verde (#10b981)
- **Conferencia**: Azul (#3b82f6)
- **Manifestación**: Rojo (#ef4444)
- **Actividad**: Amarillo (#f59e0b)

## ♿ Accesibilidad

### WCAG 2.2 AA
- ✅ **Navegación por teclado**: Tab, Enter, flechas
- ✅ **Lectores de pantalla**: aria-labels descriptivos
- ✅ **Contraste de color**: Mínimo 4.5:1
- ✅ **Roles semánticos**: article, section, time
- ✅ **Focus visible**: Indicadores claros

### Características Específicas
- **Vídeos signados**: Disponibles para todos los eventos
- **Formato de fecha**: Localizado según idioma
- **Navegación por teclado**: Calendario navegable con flechas

## 🌐 Internacionalización

### Textos Traducibles
```json
{
  "agenda.title": "Agenda",
  "agenda.today": "Hoy",
  "agenda.noEvents": "No hay eventos programados",
  "agenda.eventTypes.taller": "Taller",
  "agenda.eventTypes.conferencia": "Conferencia",
  "agenda.eventTypes.manifestacion": "Manifestación",
  "agenda.eventTypes.actividad": "Actividad"
}
```

### Contenido Multilingüe
Todos los títulos, descripciones, lugares y direcciones están disponibles en 6 idiomas.

## 📱 Funcionalidades Móviles

- **Calendario táctil**: Swipe para cambiar de mes
- **Scroll suave**: Al hacer click en día del calendario
- **Optimización**: Carga solo eventos futuros
- **Formato de fecha**: Adaptado a pantallas pequeñas

## 🔗 Navegación

### Desde esta página
- Click en evento → Detalle del evento (futuro)
- Click en día del calendario → Scroll a eventos de ese día

### Hacia esta página
- Menú superior → "Agenda"
- Home → Tarjeta "Agenda"

## 📈 Datos de Ejemplo

La página incluye 4 eventos de ejemplo:
1. **Taller de Feminismo Interseccional** (15 Sep 2025)
2. **Manifestación 8 de Marzo** (8 Mar 2025)
3. **Conferencia: Historia del Feminismo** (20 Oct 2025)
4. **Actividad: Círculo de Sororidad** (25 Sep 2025)

## 🔄 Estados de la Página

### Estado de Carga
- Muestra skeleton screens para calendario y eventos
- Componente: `SkeletonScreenComponent`

### Estado de Error
- Muestra mensaje de error si falla la carga
- Botón de reintentar
- Componente: `ErrorStateComponent`

### Estado Sin Eventos
- Mensaje cuando no hay eventos programados
- Sugerencia para volver más tarde

## 🧪 Testing

### Casos de Prueba
- ✅ Navegación entre meses funciona
- ✅ Botón "Hoy" vuelve al mes actual
- ✅ Días con eventos se marcan correctamente
- ✅ Click en día hace scroll a eventos
- ✅ Eventos se ordenan por fecha y hora
- ✅ Solo se muestran eventos futuros
- ✅ Cambio de idioma actualiza contenido
- ✅ Formato de fecha se localiza correctamente

## 🚀 Mejoras Futuras

- [ ] Integración con Google Calendar
- [ ] Exportar eventos a .ics
- [ ] Recordatorios por email/notificación
- [ ] Filtrado por tipo de evento
- [ ] Vista de lista vs vista de calendario
- [ ] Búsqueda de eventos
- [ ] Mapa de ubicaciones de eventos
- [ ] Inscripción a eventos
