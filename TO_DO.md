# Tareas Pendientes de Desarrollo

## 📊 Estado del Proyecto

### ✅ Historias de Usuario Implementadas (14/28)
- [x] **US-001**: Multiidioma y gestión de traducciones
- [x] **US-002**: Vídeos en lengua de signos (LSE/LSC)
- [x] **US-003**: Búsqueda y filtrado de contenidos
- [x] **US-004**: Modelo de datos común y gestión de hashtags
- [x] **US-005**: Modelos de recursos y ayudas
- [x] **US-006**: Pantalla principal con secciones y grid
- [x] **US-007**: Página /historia y fichas de historia
- [x] **US-008**: Página /conceptos y fichas de conceptos
- [x] **US-009**: Página /violencia y fichas de violencia
- [x] **US-010**: Sección /recursos y subpáginas
- [x] **US-011**: Sección /recursos-ayuda, testimonios e instituciones
- [x] **US-023**: Métricas avanzadas de interacción y búsqueda
- [x] **US-026**: Blog y foro (implementado)
- [x] **US-027**: Agenda de eventos (implementada)

### 🔄 Historias de Usuario Pendientes (14/28)

## 📋 Páginas y Secciones Principales

### ✅ US-007: Página /historia y fichas de historia
**Prioridad**: Alta  
**Estado**: ✅ **COMPLETADA**  
**Descripción**: Página /historia con layout lateral izquierdo (buscador + índice por años y hashtags) y contenido central con fichas de hechos históricos del feminismo.

**Tareas completadas**:
- [x] Crear componente HistoriaComponent con layout de dos columnas
- [x] Implementar índice por años en el sidebar
- [x] Implementar fichas de historia con año, descripción y vídeo signado
- [x] Integrar filtrado por año, hashtag y búsqueda de texto
- [x] Implementar ordenamiento por año o título
- [x] Añadir datos de ejemplo de eventos históricos (5 eventos)
- [x] Crear documentación en `docs/paginas/historia.md`
- [x] Implementar navegación a detalle por slug
- [x] Integrar componente de compartir en redes sociales
- [x] Implementar responsive design

---

### ✅ US-009: Página /violencia y fichas de violencia
**Prioridad**: Alta  
**Estado**: ✅ **COMPLETADA**  
**Descripción**: Página /violencia con fichas sobre tipos de violencia, señales de alerta y recursos de ayuda.

**Tareas completadas**:
- [x] Crear componente ViolenciaComponent con layout de dos columnas
- [x] Implementar índice de términos relacionados con violencia
- [x] Implementar fichas con señales de alerta
- [x] Añadir enlaces destacados a recursos de ayuda inmediata (016, etc.)
- [x] Integrar filtrado y búsqueda (SearchFilterService)
- [x] Añadir datos de ejemplo de tipos de violencia (6 tipos)
- [x] Implementar estados de carga y error (SkeletonScreen, ErrorState)
- [x] Integrar soporte offline
- [x] Crear documentación en `docs/paginas/violencia.md`

---

### ✅ US-010: Sección /recursos y subpáginas
**Prioridad**: Alta  
**Estado**: ✅ **COMPLETADA**  
**Descripción**: Página /recursos con grid de 3 tarjetas (Libros, Películas/Series, Documentales) y sus subpáginas correspondientes.

**Tareas completadas**:
- [x] Crear componente RecursosComponent con grid de 3 tarjetas
- [x] Crear subpágina /recursos/libros con filtrado por autor/año
- [x] Crear subpágina /recursos/peliculas-y-series
- [x] Crear subpágina /recursos/documentales
- [x] Implementar fichas de recursos con sinopsis en lectura fácil
- [x] Integrar ResourceService (ya implementado en US-005)
- [x] Añadir datos de ejemplo de recursos
- [x] Implementar estados de carga y error
- [x] Integrar barra de búsqueda (SearchBarComponent)
- [x] Crear documentación en `docs/paginas/recursos.md`

---

### ✅ US-011: Sección /recursos-ayuda, testimonios e instituciones
**Prioridad**: Alta  
**Estado**: ✅ **COMPLETADA**  
**Descripción**: Página /recursos-ayuda con dos tarjetas: Testimonios de mujeres sordas e Instituciones de ayuda.

**Tareas completadas**:
- [x] Crear componente RecursosAyudaComponent con 2 tarjetas
- [x] Crear página /ayuda con teléfonos y entidades de ayuda
- [x] Implementar listado de instituciones (016, teléfonos, emails, webs)
- [x] Implementar listado de entidades de accesibilidad
- [x] Implementar listado de entidades de feminismo
- [x] Integrar datos de ayuda (ayuda.data.ts)
- [x] Crear documentación en `docs/paginas/recursos-ayuda.md`
- [x] Crear documentación en `docs/paginas/ayuda.md`

**Pendiente**:
- [ ] Crear subpágina /ayuda/testimonios-mujeres-sordas
  - [ ] Crear componente TestimoniosComponent
  - [ ] Configurar ruta en app.routes.ts
  - [ ] Implementar fichas de testimonios (anonimizados, con consentimiento RGPD)
  - [ ] Añadir aviso de tratamiento respetuoso de contenido sensible
  - [ ] Implementar filtrado por temática
  - [ ] Añadir vídeos en LSE con transcripciones
  - [ ] Integrar estados de carga y error
  - [ ] Crear datos de ejemplo (mínimo 3 testimonios)
- [ ] Crear subpágina /ayuda/instituciones-aplicaciones-ayuda
  - [ ] Crear componente InstitucionesComponent
  - [ ] Configurar ruta en app.routes.ts
  - [ ] Implementar listado de instituciones con filtros
  - [ ] Implementar catálogo de aplicaciones de ayuda
  - [ ] Añadir información de contacto (teléfono, email, web)
  - [ ] Implementar filtrado por tipo y ubicación
  - [ ] Integrar estados de carga y error
  - [ ] Crear datos de ejemplo (mínimo 5 instituciones, 3 apps)

---

## 🎨 Componentes Compartidos

### US-012: Cabecera fija y lateral izquierdo reutilizable
**Prioridad**: Alta  
**Descripción**: Mejorar componente de cabecera fija y lateral izquierdo reutilizable.

**Tareas**:
- [ ] Revisar HeaderComponent existente
- [ ] Implementar menú hamburguesa en móvil (<768px)
- [ ] Mejorar responsive del sidebar (ya existe ContentSidebarComponent)
- [ ] Añadir botón claro para plegar/desplegar sidebar en móvil
- [ ] Verificar navegación por teclado completa
- [ ] Verificar landmarks ARIA correctos
- [ ] Actualizar documentación en `docs/componentes/header-sidebar.md`

---

### US-013: Pie de página y políticas legales
**Prioridad**: Media  
**Descripción**: Implementar componente de pie de página con licencias, contacto, RRSS y políticas legales.

**Tareas**:
- [ ] Crear componente FooterComponent
- [ ] Añadir información de licencias (Creative Commons)
- [ ] Añadir información de contacto
- [ ] Añadir enlaces a RRSS (opcional)
- [ ] Crear página /aviso-legal
- [ ] Crear página /politica-privacidad
- [ ] Crear página /politica-cookies
- [ ] Integrar footer en todas las páginas
- [ ] Crear documentación en `docs/componentes/footer.md`

---

## ♿ Accesibilidad y UX

### US-014: Accesibilidad WCAG 2.2 AA y validación automática
**Prioridad**: Alta  
**Descripción**: Asegurar cumplimiento completo WCAG 2.2 AA e integrar herramientas automáticas de testing.

**Tareas**:
- [ ] Auditoría completa con Lighthouse
- [ ] Auditoría completa con axe DevTools
- [ ] Auditoría completa con WAVE
- [ ] Testing con lectores de pantalla (NVDA, JAWS, VoiceOver)
- [ ] Integrar axe-core en tests automatizados
- [ ] Configurar CI/CD con validación de accesibilidad
- [ ] Documentar resultados de auditoría
- [ ] Corregir issues encontrados

---

### US-021: Botón volver arriba y atajos de teclado
**Prioridad**: Media  
**Descripción**: Implementar botón 'Volver arriba' y atajos de teclado documentados.

**Tareas**:
- [ ] Crear componente BackToTopComponent
- [ ] Implementar lógica de visibilidad al hacer scroll
- [ ] Implementar atajo "Skip to main content"
- [ ] Implementar atajo para abrir/cerrar lateral
- [ ] Implementar atajo para acceder al selector de idioma
- [ ] Implementar atajo para acceder al buscador
- [ ] Crear página /atajos-teclado con documentación
- [ ] Añadir enlace a atajos en footer
- [ ] Actualizar `docs/accesibilidad/guia.md` con atajos

---

### US-022: Principios de lectura fácil
**Prioridad**: Alta  
**Descripción**: Revisar y asegurar que toda la web sigue principios de lectura fácil.

**Tareas**:
- [ ] Auditoría de textos de interfaz (frases cortas, vocabulario claro)
- [ ] Auditoría de contenidos (párrafos breves, sin tecnicismos)
- [ ] Revisar tipografía (sans-serif, tamaño apropiado)
- [ ] Revisar espaciado entre elementos
- [ ] Revisar iconos (claros y representativos)
- [ ] Revisar diseños (limpios, sin sobrecarga visual)
- [ ] Crear guía de estilo de lectura fácil
- [ ] Documentar en `docs/accesibilidad/lectura-facil.md`

---

## 🚀 SEO y Rendimiento

### US-015: SEO, sitemap y URLs legibles
**Prioridad**: Media  
**Descripción**: Implementar etiquetas meta SEO, Open Graph, JSON-LD, sitemap.xml y robots.txt.

**Tareas**:
- [ ] Implementar meta tags por idioma en todas las páginas
- [ ] Implementar Open Graph tags
- [ ] Implementar JSON-LD schema.org (Article, CreativeWork)
- [ ] Implementar hreflang para idiomas alternativos
- [ ] Generar sitemap.xml dinámico
- [ ] Crear robots.txt apropiado
- [ ] Verificar canonical URLs
- [ ] Integrar con SeoService (ya existe)
- [ ] Crear documentación en `docs/tecnico/seo.md`

---

### US-016: Optimización de rendimiento (imágenes y vídeos)
**Prioridad**: Media  
**Descripción**: Implementar optimizaciones de rendimiento: imágenes responsivas, lazy-load, compresión, cacheo.

**Tareas**:
- [ ] Implementar srcset en imágenes
- [ ] Implementar lazy-load en imágenes y vídeos
- [ ] Configurar compresión HTTP (gzip/brotli)
- [ ] Configurar headers de cacheo
- [ ] Optimizar CSS crítico (inline)
- [ ] Optimizar JS crítico (async/defer)
- [ ] Medir LCP, FID, CLS (Core Web Vitals)
- [ ] Optimizar para LCP < 2.5s
- [ ] Crear documentación en `docs/tecnico/rendimiento.md`

---

## 🔒 Seguridad y Privacidad

### US-017: Cookies, consentimiento y métricas de uso
**Prioridad**: Alta  
**Descripción**: Mejorar banner de consentimiento de cookies y sistema de analítica (parcialmente implementado).

**Tareas**:
- [ ] Revisar CookieService existente
- [ ] Implementar banner de cookies visual (componente UI)
- [ ] Implementar opción de configurar preferencias
- [ ] Crear página /politica-cookies detallada
- [ ] Verificar que no se ejecuta tracking sin consentimiento
- [ ] Testing de flujo completo de consentimiento
- [ ] Documentar en `docs/tecnico/cookies.md`

---

### US-018: Seguridad y cabeceras HTTPS/CSP
**Prioridad**: Alta  
**Descripción**: Implementar configuración de seguridad con HTTPS, CSP, HSTS, SRI.

**Tareas**:
- [ ] Configurar HTTPS en producción
- [ ] Configurar header HSTS
- [ ] Configurar header CSP (Content Security Policy)
- [ ] Configurar X-Content-Type-Options: nosniff
- [ ] Configurar X-Frame-Options: DENY/SAMEORIGIN
- [ ] Configurar Referrer-Policy
- [ ] Implementar SRI en scripts externos
- [ ] Implementar sanitización de entradas
- [ ] Documentar en SECURITY.md (ya existe, revisar)

---

## 🛠️ Panel de Administración

### US-019: Panel de administración de contenidos
**Prioridad**: Media  
**Estado**: 🔄 **EN PROGRESO** (parcialmente implementado)  
**Descripción**: Implementar panel de administración con roles, flujo de publicación y editor multiidioma.

**Tareas completadas**:
- [x] Crear componente AdminComponent (estructura básica)
- [x] Crear componente AdminLoginComponent
- [x] Implementar guard de autenticación (authGuard)
- [x] Configurar rutas protegidas

**Tareas pendientes**:
- [ ] Implementar sistema de autenticación completo
- [ ] Implementar roles (editor, revisor)
- [ ] Implementar flujo de estados (Borrador -> Revisado -> Publicado)
- [ ] Crear editor multiidioma con pestañas por idioma
- [ ] Implementar soporte de markdown con preview
- [ ] Implementar subida/vinculación de vídeos
- [ ] Implementar gestión de hashtags (autocompletado)
- [ ] Implementar gestión de referencias
- [ ] Crear documentación en `docs/paginas/admin.md`

---

## 🎯 Estados y Feedback

### US-020: Estados de carga, errores y offline
**Prioridad**: Media  
**Estado**: 🔄 **EN PROGRESO** (parcialmente implementado)  
**Descripción**: Implementar estados de carga con skeleton screens y mensajes de error claros.

**Tareas completadas**:
- [x] Crear componente SkeletonScreenComponent reutilizable
- [x] Crear componente ErrorStateComponent
- [x] Implementar mensajes de error con opción "Reintentar"
- [x] Implementar estado "sin resultados" en búsquedas
- [x] Integrar OfflineService para detección de estado offline
- [x] Implementar en páginas: violencia, recursos, libros, blog, agenda

**Tareas pendientes**:
- [ ] Implementar skeleton screens para cada tipo de contenido específico
- [ ] Implementar ARIA live regions para anunciar estados
- [ ] Extender a todas las páginas restantes
- [ ] Crear documentación en `docs/componentes/estados.md`

---

## 🌐 Compartir y Difusión

### US-028: Compartir en redes sociales
**Prioridad**: Baja  
**Estado**: 🔄 **EN PROGRESO** (parcialmente implementado)  
**Descripción**: Implementar botones de compartir en fichas de contenido.

**Tareas completadas**:
- [x] Crear componente SocialShareComponent
- [x] Integrar en página de historia

**Tareas pendientes**:
- [ ] Implementar botón compartir Twitter/X
- [ ] Implementar botón compartir Facebook
- [ ] Implementar botón compartir WhatsApp
- [ ] Implementar botón compartir Telegram
- [ ] Implementar botón copiar enlace
- [ ] Verificar Open Graph tags (US-015)
- [ ] Hacer accesible por teclado
- [ ] Extender a todas las páginas de contenido
- [ ] Crear documentación en `docs/componentes/share-buttons.md`

---

## 🔮 Funcionalidades Futuras (Baja Prioridad)

### US-024: Búsqueda avanzada con sinónimos (futuro)
**Descripción**: Ampliar búsqueda con diccionario de sinónimos avanzado y búsqueda semántica.

### US-025: PWA básica y acceso offline (futuro)
**Descripción**: Implementar Progressive Web App con service worker y caché offline.

### ✅ US-026: Blog y foro
**Estado**: ✅ **IMPLEMENTADO**  
**Descripción**: Sección de blog con artículos y comentarios moderados.

**Tareas completadas**:
- [x] Crear componente BlogComponent
- [x] Implementar listado de artículos
- [x] Implementar vista de detalle por slug
- [x] Implementar sistema de comentarios moderados
- [x] Implementar categorías y etiquetas
- [x] Añadir 3 artículos de ejemplo
- [x] Integrar estados de carga y error
- [x] Implementar lectura fácil en artículos

**Pendiente**:
- [ ] Crear documentación en `docs/paginas/blog.md` (NO REQUERIDA - excluida por el usuario)

### ✅ US-027: Agenda de eventos
**Estado**: ✅ **COMPLETADA**  
**Descripción**: Sección de agenda/calendario con eventos y talleres.

**Tareas completadas**:
- [x] Crear componente AgendaComponent
- [x] Implementar calendario visual
- [x] Implementar navegación entre meses
- [x] Implementar agrupación de eventos por fecha
- [x] Añadir 4 eventos de ejemplo
- [x] Integrar vídeos signados
- [x] Implementar estados de carga y error
- [x] Implementar filtrado de eventos futuros
- [x] Crear documentación en `docs/paginas/agenda.md`

---

## 📊 Resumen de Prioridades

### 🔴 Alta Prioridad (5 tareas pendientes)
1. ✅ ~~US-007: Página /historia~~ → **COMPLETADA**
2. ✅ ~~US-009: Página /violencia~~ → **COMPLETADA**
3. ✅ ~~US-010: Sección /recursos~~ → **COMPLETADA**
4. ✅ ~~US-011: Sección /recursos-ayuda~~ → **COMPLETADA**
5. US-012: Cabecera y lateral (mejoras)
6. US-014: Accesibilidad WCAG 2.2 AA completa
7. US-017: Cookies y consentimiento (mejoras)
8. US-018: Seguridad y cabeceras
9. US-022: Principios de lectura fácil

### 🟡 Media Prioridad (7 tareas)
10. US-013: Pie de página y políticas
11. US-015: SEO y sitemap
12. US-016: Optimización de rendimiento
13. 🔄 US-019: Panel de administración (en progreso)
14. 🔄 US-020: Estados de carga y errores (en progreso)
15. US-021: Botón volver arriba y atajos

### 🟢 Baja Prioridad (1 tarea)
16. 🔄 US-028: Compartir en redes sociales (en progreso)

### 🔮 Futuras (2 tareas)
17. US-024: Búsqueda avanzada con sinónimos
18. US-025: PWA y acceso offline
19. ✅ ~~US-026: Blog y foro~~ → **IMPLEMENTADO**
20. ✅ ~~US-027: Agenda de eventos~~ → **IMPLEMENTADA**

---

## 📝 Notas

- Las tareas están ordenadas por prioridad y dependencias
- Se recomienda completar primero las páginas principales (US-007, US-009, US-010, US-011)
- La accesibilidad (US-014) y seguridad (US-018) son críticas antes de producción
- El panel de administración (US-019) puede desarrollarse en paralelo
- Las funcionalidades futuras (US-024 a US-027) son opcionales para MVP

---

## 📈 Progreso General

**Historias completadas**: 14/28 (50%)  
**Historias en progreso**: 3/28 (11%)  
**Historias pendientes**: 11/28 (39%)

### Páginas principales implementadas:
- ✅ Home (US-006) - Documentada en `docs/paginas/home.md`
- ✅ Historia (US-007) - Documentada en `docs/paginas/historia.md`
- ✅ Conceptos (US-008) - Documentada en `docs/paginas/conceptos.md`
- ✅ Violencia (US-009) - Documentada en `docs/paginas/violencia.md`
- ✅ Recursos (US-010) - Documentada en `docs/paginas/recursos.md`
  - ✅ Subpágina /recursos/libros (US-029)
  - ✅ Subpágina /recursos/peliculas-y-series (US-030)
  - ✅ Subpágina /recursos/documentales (US-031)
- ✅ Recursos de Ayuda (US-011) - Documentada en `docs/paginas/recursos-ayuda.md`
- ✅ Ayuda (US-032) - Documentada en `docs/paginas/ayuda.md`
- ✅ Blog (US-026) - Documentación NO requerida
- ✅ Agenda (US-027) - Documentada en `docs/paginas/agenda.md`
- 🔄 Admin (US-019) - Parcial, documentación NO requerida

### Componentes compartidos implementados:
- ✅ ContentSidebarComponent (filtrado y búsqueda)
- ✅ SocialShareComponent (compartir en redes)
- ✅ SkeletonScreenComponent (estados de carga)
- ✅ ErrorStateComponent (estados de error)
- ✅ SearchBarComponent (barra de búsqueda)

### Servicios implementados:
- ✅ SearchFilterService (búsqueda y filtrado)
- ✅ LanguageService (multiidioma)
- ✅ ResourceService (gestión de recursos)
- ✅ AnalyticsService (métricas)
- ✅ OfflineService (detección offline)

---

---

## 📝 Resumen de Documentación de Páginas

### ✅ Páginas Documentadas (9/11)
1. ✅ **Home** (`docs/paginas/home.md`) - Página principal con 4 secciones y snap scroll
2. ✅ **Historia** (`docs/paginas/historia.md`) - Eventos históricos del feminismo con filtrado
3. ✅ **Conceptos** (`docs/paginas/conceptos.md`) - Glosario alfabético de conceptos feministas
4. ✅ **Violencia** (`docs/paginas/violencia.md`) - Tipos de violencia con recursos de ayuda
5. ✅ **Recursos** (`docs/paginas/recursos.md`) - Hub de navegación a libros, películas y documentales
6. ✅ **Recursos de Ayuda** (`docs/paginas/recursos-ayuda.md`) - Índice de testimonios e instituciones
7. ✅ **Ayuda** (`docs/paginas/ayuda.md`) - Teléfonos y entidades de ayuda
8. ✅ **Agenda** (`docs/paginas/agenda.md`) - Calendario de eventos feministas
9. ✅ **README** (`docs/paginas/README.md`) - Índice general de documentación

### ⚠️ Páginas NO Documentadas (2/11) - Excluidas por el usuario
10. ❌ **Blog** - Documentación NO requerida según instrucciones del usuario
11. ❌ **Admin** - Documentación NO requerida según instrucciones del usuario

### 📊 Estado de Subpáginas

#### ✅ Subpáginas de Recursos (3/3 implementadas)
- ✅ `/recursos/libros` - Implementada (US-029)
  - Componente: `LibrosComponent`
  - Búsqueda y filtrado funcional
  - 5 libros de ejemplo
- ✅ `/recursos/peliculas-y-series` - Implementada (US-030)
  - Componente: `PeliculasYSeriesComponent`
  - Búsqueda y filtrado funcional
  - 5 películas/series de ejemplo
- ✅ `/recursos/documentales` - Implementada (US-031)
  - Componente: `DocumentalesComponent`
  - Búsqueda y filtrado funcional
  - 5 documentales de ejemplo

#### ⏳ Subpáginas de Ayuda (0/2 implementadas)
- ❌ `/ayuda/testimonios-mujeres-sordas` - **NO IMPLEMENTADA**
  - Estado: Ruta definida en RecursosAyudaComponent pero sin componente
  - Falta: Componente, ruta en app.routes.ts, lógica y datos
- ❌ `/ayuda/instituciones-aplicaciones-ayuda` - **NO IMPLEMENTADA**
  - Estado: Ruta definida en RecursosAyudaComponent pero sin componente
  - Falta: Componente, ruta en app.routes.ts, lógica y datos

---

**Última actualización**: 2026-01-18
