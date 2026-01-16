# Sensibilización Feminista - Aplicación Web Accesible

Aplicación web de sensibilización feminista con enfoque en accesibilidad, incluyendo soporte para lengua de signos (LSE/LSC), multiidioma y lectura fácil.

## 📚 Documentación

La documentación completa del proyecto está disponible en la carpeta [`docs/`](./docs/):

- **[Índice de Documentación](./docs/README.md)** - Punto de entrada principal
- **Páginas**: Documentación de cada página de la aplicación
- **Técnico**: Modelos de datos, servicios y analytics
- **Accesibilidad**: Guías de cumplimiento WCAG 2.2 AA y lengua de signos

## 🚀 Inicio Rápido

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 📖 Documentación del Proyecto

### Estructura de Documentación

```
docs/
├── README.md                    # Índice general
├── paginas/                     # Documentación por páginas
│   ├── home.md                 # Página principal
│   └── conceptos.md            # Página de conceptos
├── tecnico/                     # Documentación técnica
│   ├── modelo-datos.md         # Modelo de datos común
│   ├── servicios.md            # Servicios core
│   └── analytics.md            # Sistema de métricas
└── accesibilidad/              # Accesibilidad
    ├── guia.md                 # Guía WCAG 2.2 AA
    └── lengua-signos.md        # Integración LSE/LSC
```

### Historias de Usuario Implementadas

- ✅ **US-001**: Multiidioma (6 idiomas)
- ✅ **US-002**: Reproductor de vídeo en lengua de signos
- ✅ **US-003**: Búsqueda y filtrado
- ✅ **US-004**: Modelo de datos común y hashtags
- ✅ **US-005**: Recursos y ayudas
- ✅ **US-006**: Pantalla principal con snap scroll
- ✅ **US-008**: Página de conceptos
- ✅ **US-023**: Métricas avanzadas de analytics

## ♿ Accesibilidad

Esta aplicación cumple con **WCAG 2.2 nivel AA**:
- ✅ Navegación completa por teclado
- ✅ Vídeos en lengua de signos (LSE/LSC)
- ✅ Lectura fácil en todos los contenidos
- ✅ Contraste AA en textos
- ✅ Compatible con lectores de pantalla

## 🌍 Multiidioma

Idiomas soportados:
- 🇪🇸 Español
- 🇬🇧 English
- 🇪🇸 Català
- 🇪🇸 Valencià
- 🇪🇸 Galego
- 🇪🇸 Euskara

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

Para documentación del proyecto, consulta la carpeta [`docs/`](./docs/).
