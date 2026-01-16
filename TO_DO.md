# Tareas Pendientes de Desarrollo

## 📊 Estado del Proyecto

### ✅ Historias de Usuario Implementadas (8/28)
- [x] **US-001**: Multiidioma y gestión de traducciones
- [x] **US-002**: Vídeos en lengua de signos (LSE/LSC)
- [x] **US-003**: Búsqueda y filtrado de contenidos
- [x] **US-004**: Modelo de datos común y gestión de hashtags
- [x] **US-005**: Modelos de recursos y ayudas
- [x] **US-006**: Pantalla principal con secciones y grid
- [x] **US-008**: Página /conceptos y fichas de conceptos
- [x] **US-023**: Métricas avanzadas de interacción y búsqueda

### 🔄 Historias de Usuario Pendientes (20/28)

## 📋 Páginas y Secciones Principales

### US-007: Página /historia y fichas de historia
**Prioridad**: Alta  
**Descripción**: Implementar página /historia con layout lateral izquierdo (buscador + índice por años y hashtags) y contenido central con fichas de hechos históricos del feminismo.

**Tareas**:
- [ ] Crear componente HistoriaComponent con layout de dos columnas
- [ ] Implementar índice por años en el sidebar
- [ ] Implementar fichas de historia con año, descripción y vídeo signado
- [ ] Integrar filtrado por año, hashtag y búsqueda de texto
- [ ] Implementar ordenamiento por año o título
- [ ] Añadir datos de ejemplo de eventos históricos
- [ ] Crear documentación en `docs/paginas/historia.md`

---

### US-009: Página /violencia y fichas de violencia
**Prioridad**: Alta  
**Descripción**: Implementar página /violencia con fichas sobre tipos de violencia, señales de alerta y recursos de ayuda.

**Tareas**:
- [ ] Crear componente ViolenciaComponent con layout de dos columnas
- [ ] Implementar índice de términos relacionados con violencia
- [ ] Implementar fichas con señales de alerta
- [ ] Añadir enlaces destacados a recursos de ayuda inmediata (016, etc.)
- [ ] Integrar filtrado y búsqueda
- [ ] Añadir datos de ejemplo de tipos de violencia
- [ ] Crear documentación en `docs/paginas/violencia.md`

---

### US-010: Sección /recursos y subpáginas
**Prioridad**: Alta  
**Descripción**: Implementar página /recursos con grid de 3 tarjetas (Libros, Películas/Series, Documentales) y sus subpáginas correspondientes.

**Tareas**:
- [ ] Crear componente RecursosComponent con grid de 3 tarjetas
- [ ] Crear subpágina /recursos/libros con filtrado por autor/año
- [ ] Crear subpágina /recursos/peliculas-y-series
- [ ] Crear subpágina /recursos/documentales
- [ ] Implementar fichas de recursos con sinopsis en lectura fácil
- [ ] Integrar ResourceService (ya implementado en US-005)
- [ ] Añadir datos de ejemplo de recursos
- [ ] Crear documentación en `docs/paginas/recursos.md`

---

### US-011: Sección /recursos-ayuda, testimonios e instituciones
**Prioridad**: Alta  
**Descripción**: Implementar página /recursos-ayuda con dos tarjetas: Testimonios de mujeres sordas e Instituciones de ayuda.

**Tareas**:
- [ ] Crear componente RecursosAyudaComponent con 2 tarjetas
- [ ] Crear subpágina /ayuda/testimonios-mujeres-sordas
- [ ] Crear subpágina /ayuda/instituciones-aplicaciones-ayuda
- [ ] Implementar fichas de testimonios (anonimizados, con consentimiento RGPD)
- [ ] Implementar listado de instituciones (016, teléfonos, emails, webs)
- [ ] Añadir aviso de tratamiento respetuoso de contenido sensible
- [ ] Integrar ResourceService (ya implementado en US-005)
- [ ] Crear documentación en `docs/paginas/ayuda.md`

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
**Descripción**: Implementar panel de administración con roles, flujo de publicación y editor multiidioma.

**Tareas**:
- [ ] Crear componente AdminComponent (ya existe parcialmente)
- [ ] Implementar sistema de autenticación
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
**Descripción**: Implementar estados de carga con skeleton screens y mensajes de error claros.

**Tareas**:
- [ ] Crear componente SkeletonComponent reutilizable
- [ ] Implementar skeleton screens para cada tipo de contenido
- [ ] Crear componente ErrorMessageComponent
- [ ] Implementar mensajes de error con opción "Reintentar"
- [ ] Implementar estado "sin resultados" en búsquedas
- [ ] Implementar ARIA live regions para anunciar estados
- [ ] Crear documentación en `docs/componentes/estados.md`

---

## 🌐 Compartir y Difusión

### US-028: Compartir en redes sociales
**Prioridad**: Baja  
**Descripción**: Implementar botones de compartir en fichas de contenido.

**Tareas**:
- [ ] Crear componente ShareButtonsComponent
- [ ] Implementar botón compartir Twitter/X
- [ ] Implementar botón compartir Facebook
- [ ] Implementar botón compartir WhatsApp
- [ ] Implementar botón compartir Telegram
- [ ] Implementar botón copiar enlace
- [ ] Verificar Open Graph tags (US-015)
- [ ] Hacer accesible por teclado
- [ ] Crear documentación en `docs/componentes/share-buttons.md`

---

## 🔮 Funcionalidades Futuras (Baja Prioridad)

### US-024: Búsqueda avanzada con sinónimos (futuro)
**Descripción**: Ampliar búsqueda con diccionario de sinónimos avanzado y búsqueda semántica.

### US-025: PWA básica y acceso offline (futuro)
**Descripción**: Implementar Progressive Web App con service worker y caché offline.

### US-026: Blog y foro (futuro)
**Descripción**: Implementar sección de blog/foro con artículos y comentarios moderados.

### US-027: Agenda de eventos (futuro)
**Descripción**: Implementar sección de agenda/calendario con eventos y talleres.

---

## 📊 Resumen de Prioridades

### 🔴 Alta Prioridad (11 tareas)
1. US-007: Página /historia
2. US-009: Página /violencia
3. US-010: Sección /recursos
4. US-011: Sección /recursos-ayuda
5. US-012: Cabecera y lateral (mejoras)
6. US-014: Accesibilidad WCAG 2.2 AA completa
7. US-017: Cookies y consentimiento (mejoras)
8. US-018: Seguridad y cabeceras
9. US-022: Principios de lectura fácil

### 🟡 Media Prioridad (7 tareas)
10. US-013: Pie de página y políticas
11. US-015: SEO y sitemap
12. US-016: Optimización de rendimiento
13. US-019: Panel de administración
14. US-020: Estados de carga y errores
15. US-021: Botón volver arriba y atajos

### 🟢 Baja Prioridad (1 tarea)
16. US-028: Compartir en redes sociales

### 🔮 Futuras (4 tareas)
17. US-024: Búsqueda avanzada con sinónimos
18. US-025: PWA y acceso offline
19. US-026: Blog y foro
20. US-027: Agenda de eventos

---

## 📝 Notas

- Las tareas están ordenadas por prioridad y dependencias
- Se recomienda completar primero las páginas principales (US-007, US-009, US-010, US-011)
- La accesibilidad (US-014) y seguridad (US-018) son críticas antes de producción
- El panel de administración (US-019) puede desarrollarse en paralelo
- Las funcionalidades futuras (US-024 a US-027) son opcionales para MVP

---

**Última actualización**: 2026-01-16
