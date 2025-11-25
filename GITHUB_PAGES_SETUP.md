# Configuración de GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages usando GitHub Actions.

## Configuración Inicial

### 1. Habilitar GitHub Pages en el repositorio

1. Ve a la configuración de tu repositorio en GitHub
2. Navega a **Settings** → **Pages**
3. En **Source**, selecciona **GitHub Actions** (no "Deploy from a branch")
4. Guarda los cambios

### 2. Configurar la base href (si es necesario)

Si tu repositorio no está en la raíz de GitHub (por ejemplo, está en `https://usuario.github.io/repositorio/`), necesitarás configurar el `baseHref` en Angular.

Edita `angular.json` y agrega `baseHref` en la configuración de producción:

```json
"configurations": {
  "production": {
    "baseHref": "/nombre-del-repositorio/",
    "budgets": [...]
  }
}
```

Si tu repositorio está en `https://usuario.github.io/` (sin subdirectorio), no necesitas configurar `baseHref`.

### 3. El workflow se ejecutará automáticamente

Cada vez que hagas push a las ramas `main` o `master`, el workflow:
1. Construirá la aplicación Angular
2. Creará un archivo `404.html` (copiado de `index.html`) para que las rutas de Angular funcionen correctamente
3. Desplegará el contenido de `/dist/app/browser` a GitHub Pages

## Estructura del Despliegue

- **Carpeta de build**: `app/dist/app/browser`
- **Workflow**: `.github/workflows/deploy-pages.yml`
- **Rama de despliegue**: Se usa GitHub Actions (no requiere rama `gh-pages`)

## Verificación

Después de hacer push, puedes ver el progreso del despliegue en:
- **Actions** → Selecciona el workflow "Deploy to GitHub Pages"
- Una vez completado, tu sitio estará disponible en la URL que aparece en la configuración de Pages

