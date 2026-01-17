# Página de Ayuda

## 📋 Información General

**Ruta**: `/ayuda`  
**Componente**: `AyudaComponent`  
**Historia de Usuario**: US-032  
**Estado**: ✅ Completada

## 🎯 Objetivo

Página de recursos de ayuda que proporciona información de contacto de teléfonos de emergencia y entidades de apoyo en temas de accesibilidad y feminismo. Diseñada para acceso rápido en situaciones de necesidad.

## 🏗️ Estructura

### Layout Principal
```
┌─────────────────────────────────────┐
│         Ayuda                       │
│                                     │
│  📞 Teléfonos de Ayuda             │
│  ┌─────────────────────────────┐   │
│  │ 016 - Violencia de Género   │   │
│  │ 112 - Emergencias           │   │
│  │ ...                         │   │
│  └─────────────────────────────┘   │
│                                     │
│  ♿ Entidades de Accesibilidad      │
│  ┌─────────────────────────────┐   │
│  │ CNSE                        │   │
│  │ ONCE                        │   │
│  │ ...                         │   │
│  └─────────────────────────────┘   │
│                                     │
│  💜 Entidades Feministas           │
│  ┌─────────────────────────────┐   │
│  │ Instituto de la Mujer       │   │
│  │ Federación Mujeres          │   │
│  │ ...                         │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

## 🎨 Componentes Principales

### 1. Sección de Teléfonos de Ayuda
Lista de teléfonos de emergencia y ayuda:
- **016**: Violencia de género (24h, gratuito, no deja rastro)
- **112**: Emergencias generales
- **024**: Salud mental y prevención del suicidio
- Otros teléfonos específicos

```typescript
telephones = [
  {
    numero: '016',
    nombre: 'Violencia de Género',
    descripcion: 'Atención 24h, gratuito, no deja rastro en factura',
    disponibilidad: '24/7',
    gratuito: true,
    idiomas: ['es', 'en', 'fr', 'ar', 'ro', 'ru']
  },
  {
    numero: '112',
    nombre: 'Emergencias',
    descripcion: 'Número único de emergencias europeo',
    disponibilidad: '24/7',
    gratuito: true
  },
  // ...más teléfonos
];
```

### 2. Sección de Entidades de Accesibilidad
Lista de organizaciones de apoyo en accesibilidad:
- **CNSE**: Confederación Estatal de Personas Sordas
- **ONCE**: Organización Nacional de Ciegos Españoles
- **CERMI**: Comité Español de Representantes de Personas con Discapacidad
- Otras entidades

```typescript
accessibilityEntities = [
  {
    nombre: 'CNSE',
    nombreCompleto: 'Confederación Estatal de Personas Sordas',
    descripcion: 'Organización de personas sordas en España',
    web: 'https://www.cnse.es',
    telefono: '915 565 832',
    email: 'cnse@cnse.es',
    servicios: ['Intérpretes LSE', 'Asesoramiento', 'Formación']
  },
  // ...más entidades
];
```

### 3. Sección de Entidades Feministas
Lista de organizaciones feministas:
- **Instituto de la Mujer**: Organismo oficial
- **Federación de Mujeres Progresistas**
- **Fundación Mujeres**
- Otras organizaciones

```typescript
feminismEntities = [
  {
    nombre: 'Instituto de la Mujer',
    descripcion: 'Organismo autónomo del Ministerio de Igualdad',
    web: 'https://www.inmujeres.gob.es',
    telefono: '900 191 010',
    email: 'inmujer@inmujeres.es',
    servicios: ['Información', 'Asesoramiento jurídico', 'Recursos']
  },
  // ...más entidades
];
```

### 4. Tarjetas de Información
Cada entidad/teléfono se presenta en una tarjeta con:
- **Nombre destacado**: Grande y legible
- **Descripción**: Breve explicación del servicio
- **Información de contacto**: Teléfono, email, web
- **Servicios**: Lista de servicios ofrecidos
- **Disponibilidad**: Horarios de atención
- **Idiomas**: Idiomas disponibles (si aplica)
- **Botones de acción**: Llamar, visitar web, enviar email

```html
<section class="help-section">
  <h2>📞 Teléfonos de Ayuda</h2>
  
  @for (tel of telephones; track tel.numero) {
    <article class="help-card urgent">
      <div class="card-header">
        <h3 class="phone-number">{{ tel.numero }}</h3>
        <span class="phone-name">{{ tel.nombre }}</span>
      </div>
      
      <p class="card-description">{{ tel.descripcion }}</p>
      
      <div class="card-info">
        <span class="availability">⏰ {{ tel.disponibilidad }}</span>
        @if (tel.gratuito) {
          <span class="free-badge">✓ Gratuito</span>
        }
      </div>
      
      @if (tel.idiomas) {
        <div class="languages">
          <strong>Idiomas:</strong>
          <span>{{ tel.idiomas.join(', ') }}</span>
        </div>
      }
      
      <a [href]="'tel:' + tel.numero" class="btn-call">
        📞 Llamar ahora
      </a>
    </article>
  }
</section>
```

## 📊 Modelo de Datos

### Telephone
```typescript
interface Telephone {
  numero: string;
  nombre: string;
  descripcion: string;
  disponibilidad: string;  // "24/7", "L-V 9-18h", etc.
  gratuito: boolean;
  idiomas?: string[];
  notas?: string;  // Información adicional importante
}
```

### Entity
```typescript
interface Entity {
  nombre: string;
  nombreCompleto?: string;
  descripcion: string;
  web: string;
  telefono?: string;
  email?: string;
  servicios: string[];
  horario?: string;
  direccion?: string;
  ambito?: 'nacional' | 'autonomico' | 'local';
}
```

## 🔧 Servicios Utilizados

### TranslateService
- **instant()**: Traduce textos de la interfaz

## 🎨 Estilos y Diseño

### Responsive Design
- **Desktop (>1024px)**: Grid de 2-3 columnas
- **Tablet (768-1024px)**: Grid de 2 columnas
- **Mobile (<768px)**: Grid de 1 columna

### Tarjetas de Teléfonos
- **Destacadas**: Fondo rojo/naranja para urgencias
- **Número grande**: Muy visible y legible
- **Botón de llamar**: Grande y prominente
- **Información clara**: Disponibilidad y gratuidad

### Tarjetas de Entidades
- **Diseño limpio**: Información organizada
- **Iconos**: Representan tipo de servicio
- **Enlaces**: Claramente identificables
- **Hover**: Efecto de elevación

### Colores
- **Teléfonos urgentes**: Fondo rojo claro (#fee2e2), borde rojo (#dc2626)
- **Teléfonos normales**: Fondo blanco, borde gris
- **Entidades**: Fondo blanco, borde morado claro
- **Botón llamar**: Rojo (#dc2626) para urgencias
- **Enlaces**: Morado (#8b5cf6)

## ♿ Accesibilidad

### WCAG 2.2 AA
- ✅ **Navegación por teclado**: Tab, Enter
- ✅ **Lectores de pantalla**: aria-labels descriptivos
- ✅ **Contraste de color**: Mínimo 4.5:1
- ✅ **Roles semánticos**: article, section
- ✅ **Focus visible**: Indicadores claros
- ✅ **Enlaces tel:**: Funcionan en móviles

### Características Específicas
- **Números grandes**: Fácil lectura
- **Botones grandes**: Touch targets >44px
- **Información crítica destacada**: Disponibilidad 24/7
- **Acceso rápido**: Sin necesidad de scroll excesivo

## 🌐 Internacionalización

### Textos Traducibles
```json
{
  "ayuda.title": "Ayuda",
  "ayuda.telephones.title": "Teléfonos de Ayuda",
  "ayuda.accessibility.title": "Entidades de Accesibilidad",
  "ayuda.feminism.title": "Entidades Feministas",
  "ayuda.call": "Llamar ahora",
  "ayuda.visit": "Visitar web",
  "ayuda.email": "Enviar email",
  "ayuda.free": "Gratuito",
  "ayuda.24h": "Disponible 24/7",
  "ayuda.languages": "Idiomas disponibles"
}
```

### Contenido Multilingüe
Todos los textos están disponibles en 6 idiomas.

## 📱 Funcionalidades Móviles

- **Enlaces tel:**: Click para llamar directamente
- **Enlaces mailto:**: Abre app de email
- **Botones grandes**: Fácil toque en móvil
- **Scroll suave**: Entre secciones
- **Optimización**: Carga rápida

## 🔗 Navegación

### Desde esta página
- Click en teléfono → Inicia llamada (móvil)
- Click en web → Abre sitio externo
- Click en email → Abre cliente de email

### Hacia esta página
- Menú superior → "Ayuda"
- Home → Tarjeta "Ayuda"
- Footer → Enlace permanente
- Página de violencia → Enlace directo

## 📈 Información Incluida

### Teléfonos de Ayuda
- **016**: Violencia de género
- **112**: Emergencias
- **024**: Salud mental
- Otros teléfonos específicos

### Entidades de Accesibilidad
- **CNSE**: Personas sordas
- **ONCE**: Personas ciegas
- **CERMI**: Personas con discapacidad
- Otras organizaciones

### Entidades Feministas
- **Instituto de la Mujer**
- **Federación de Mujeres Progresistas**
- **Fundación Mujeres**
- Otras organizaciones

## 🛡️ Consideraciones de Seguridad

### Privacidad
- **No tracking**: No se registran llamadas ni visitas
- **Información pública**: Solo datos públicos de entidades
- **Sin formularios**: No se recopilan datos personales

### Urgencias
- **016 destacado**: Primer teléfono visible
- **No deja rastro**: Información clara sobre privacidad
- **Acceso rápido**: Sin barreras de navegación

## 🧪 Testing

### Casos de Prueba
- ✅ Teléfonos se muestran correctamente
- ✅ Enlaces tel: funcionan en móvil
- ✅ Enlaces web abren en nueva pestaña
- ✅ Información de disponibilidad es clara
- ✅ Badges de gratuito se muestran
- ✅ Cambio de idioma actualiza textos
- ✅ Responsive en diferentes dispositivos
- ✅ Accesibilidad por teclado funciona

## 🚀 Mejoras Futuras

- [ ] Geolocalización para recursos locales
- [ ] Chat en vivo con especialistas
- [ ] Recursos descargables (guías, folletos)
- [ ] Integración con apps de mensajería
- [ ] Modo de salida rápida
- [ ] Recursos en lengua de signos
- [ ] Testimonios de ayuda recibida
- [ ] Actualización automática de datos
- [ ] Filtrado por comunidad autónoma
- [ ] Valoraciones de servicios

## 💡 Notas Importantes

### Actualización de Datos
- Los teléfonos y entidades deben revisarse periódicamente
- Verificar disponibilidad de servicios
- Actualizar enlaces rotos
- Añadir nuevos recursos

### Diseño Sensible
- Evitar imágenes impactantes
- Lenguaje claro y directo
- Información verificada y oficial
- Respeto a la privacidad del usuario

### Acceso Prioritario
- Esta página debe ser de fácil acceso desde cualquier parte de la web
- Considerar enlace permanente en header/footer
- Optimizar para carga rápida
- Sin publicidad ni distracciones
