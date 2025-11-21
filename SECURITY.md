# Configuración de Seguridad - US-018

Este documento describe la implementación de las medidas de seguridad relacionadas con HTTPS, HSTS y CSP (Content Security Policy) para la aplicación.

## Resumen

La aplicación implementa las siguientes medidas de seguridad:

1. **Content Security Policy (CSP)**: Configurada en el `index.html` para prevenir ataques XSS y otras vulnerabilidades
2. **HSTS (HTTP Strict Transport Security)**: Configurado en el servidor web para forzar conexiones HTTPS
3. **Redirección HTTPS**: Configurada para redirigir automáticamente todas las conexiones HTTP a HTTPS

## Implementación

### 1. Content Security Policy (CSP)

La CSP está configurada en el archivo `src/index.html` mediante una meta tag. Esta política:

- Permite recursos solo desde el mismo origen (`'self'`)
- Permite scripts inline y eval (necesario para Angular en desarrollo)
- Permite estilos inline (necesario para Angular)
- Permite imágenes desde data URIs y blob URIs
- Permite conexiones HTTPS a recursos externos
- Bloquea objetos embebidos (`object-src 'none'`)
- Fuerza la actualización de recursos inseguros (`upgrade-insecure-requests`)

**Nota**: En producción, se recomienda usar nonces o hashes para los scripts en lugar de `'unsafe-inline'` y `'unsafe-eval'` para una mayor seguridad.

### 2. Configuración del Servidor Web

#### Para Nginx

1. Copia el archivo `nginx.conf.example` a tu configuración de nginx
2. Actualiza las siguientes variables:
   - `server_name`: Tu dominio
   - `ssl_certificate`: Ruta a tu certificado SSL
   - `ssl_certificate_key`: Ruta a tu clave privada SSL
   - `root`: Ruta al directorio `dist/app/browser` después del build
   - Rutas de logs según tu configuración

3. Verifica la configuración:
   ```bash
   sudo nginx -t
   ```

4. Recarga nginx:
   ```bash
   sudo systemctl reload nginx
   ```

#### Para Apache

1. Copia el archivo `.htaccess.example` como `.htaccess` en el directorio raíz del sitio
2. Asegúrate de que los módulos necesarios estén habilitados:
   ```bash
   sudo a2enmod rewrite
   sudo a2enmod headers
   sudo a2enmod ssl
   ```

3. Configura SSL en tu virtual host Apache
4. Reinicia Apache:
   ```bash
   sudo systemctl restart apache2
   ```

### 3. Certificados SSL

Para habilitar HTTPS, necesitas un certificado SSL válido. Opciones recomendadas:

#### Let's Encrypt (Gratuito)

```bash
# Instalar certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx  # Para Nginx
# o
sudo apt-get install certbot python3-certbot-apache  # Para Apache

# Obtener certificado
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
# o
sudo certbot --apache -d tu-dominio.com -d www.tu-dominio.com

# Renovación automática (se configura automáticamente)
sudo certbot renew --dry-run
```

#### Certificados Comerciales

Si usas un certificado comercial, asegúrate de:
- Instalar el certificado completo (incluyendo la cadena de certificados)
- Configurar la renovación antes de la expiración
- Verificar que el certificado incluya todos los dominios necesarios

## Verificación

### Verificar HTTPS

1. Accede a tu sitio usando `https://tu-dominio.com`
2. Verifica que el navegador muestre el candado de seguridad
3. Verifica que las conexiones HTTP redirijan a HTTPS

### Verificar HSTS

1. Abre las herramientas de desarrollo del navegador (F12)
2. Ve a la pestaña "Network" o "Red"
3. Recarga la página
4. Selecciona cualquier petición y verifica en "Headers" o "Encabezados" que exista:
   ```
   Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
   ```

### Verificar CSP

1. Abre las herramientas de desarrollo del navegador (F12)
2. Ve a la consola
3. Si hay violaciones de CSP, aparecerán mensajes de error
4. También puedes verificar en las herramientas de desarrollo → Security → Content Security Policy

### Herramientas Online

- [SSL Labs SSL Test](https://www.ssllabs.com/ssltest/): Verifica la configuración SSL
- [Security Headers](https://securityheaders.com/): Verifica las cabeceras de seguridad
- [Mozilla Observatory](https://observatory.mozilla.org/): Análisis completo de seguridad

## Configuración de HSTS Preload

Si deseas incluir tu dominio en la lista HSTS preload de los navegadores:

1. Asegúrate de que tu configuración HSTS incluya `preload`
2. Verifica que tu sitio cumpla con los requisitos: https://hstspreload.org/requirements/
3. Envía tu dominio a: https://hstspreload.org/

**Importante**: Una vez incluido en la lista preload, será difícil revertirlo. Asegúrate de que tu sitio siempre soporte HTTPS.

## Mejoras Futuras

Para mejorar aún más la seguridad, considera:

1. **CSP más estricta**: Usar nonces o hashes en lugar de `'unsafe-inline'` y `'unsafe-eval'`
2. **Subresource Integrity (SRI)**: Para recursos externos si se añaden en el futuro
3. **Certificate Pinning**: Para aplicaciones móviles si se desarrollan
4. **TLS 1.3 exclusivo**: Una vez que el soporte sea universal
5. **OCSP Stapling**: Para mejorar el rendimiento de la validación de certificados

## Troubleshooting

### Problema: Redirección infinita

**Causa**: El servidor está configurado para redirigir a HTTPS pero no tiene SSL configurado correctamente.

**Solución**: Verifica que:
- El certificado SSL esté instalado correctamente
- El servidor esté escuchando en el puerto 443
- Los certificados no hayan expirado

### Problema: CSP bloquea recursos necesarios

**Causa**: La política CSP es demasiado restrictiva para algún recurso necesario.

**Solución**: 
1. Revisa la consola del navegador para ver qué recursos están siendo bloqueados
2. Ajusta la política CSP en `index.html` y en la configuración del servidor
3. Asegúrate de que ambas configuraciones coincidan

### Problema: HSTS no aparece en las cabeceras

**Causa**: El módulo de headers no está habilitado o la configuración no se aplicó correctamente.

**Solución**:
- Para Nginx: Verifica que `add_header` esté dentro del bloque `server` correcto
- Para Apache: Verifica que `mod_headers` esté habilitado (`sudo a2enmod headers`)

## Referencias

- [MDN: Content Security Policy](https://developer.mozilla.org/es/docs/Web/HTTP/CSP)
- [MDN: HTTP Strict Transport Security](https://developer.mozilla.org/es/docs/Web/HTTP/Headers/Strict-Transport-Security)
- [OWASP: Security Headers](https://owasp.org/www-project-secure-headers/)
- [Let's Encrypt](https://letsencrypt.org/)
- [HSTS Preload](https://hstspreload.org/)

