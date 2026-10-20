# Calculadora de diluciones

Aplicación web estática que calcula el volumen de solución concentrada (V₁) necesario para preparar una dilución, con la fórmula C₁V₁ = C₂V₂. Se desarrolló para el Reto 2 "Prepara y lanza tu aplicación web" (UVEG).

## Estructura del proyecto

- `index.html`: página principal minificada.
- `css/styles.css`: estilos minificados.
- `js/app.js`: lógica de cálculo minificada.
- `img/laboratorio.jpg`: imagen optimizada (600 px de ancho).
- `src/`: código fuente sin minificar (`index.html`, `css/styles.css` y `js/app.js`).
- `originales/`: imagen original pesada; no se sube al repositorio (está en `.gitignore`).

## Proceso realizado

### 1. Optimización

Se instalaron con npm las herramientas `sharp-cli`, `clean-css-cli`, `terser` y `html-minifier-terser`, y se ejecutó lo siguiente desde PowerShell en Windows 11:

- Imagen: `npx sharp -i originales/laboratorio-general.jpg -o img -q 75 resize 600`
- CSS: `npx cleancss -o css/styles.css src/css/styles.css`
- JS: `npx terser src/js/app.js --compress --mangle -o js/app.js`
- HTML: `npx html-minifier-terser --collapse-whitespace --remove-comments -o index.html src/index.html`

| Archivo | Antes (bytes) | Después (bytes) |
|---|---|---|
| Imagen | 269967 | 80718 |
| CSS | 1303 | 896 |
| JS | 937 | 668 |
| HTML | 1175 | 1000 |

### 2. Empaquetado

El paquete se generó con `Compress-Archive -Path index.html, css, js, img -DestinationPath miapp.zip` y pesa 82386 bytes. Su contenido se verificó con `tar -tf miapp.zip`. El `.zip` no se sube al repositorio.

### 3. Versionamiento

El historial se organizó en commits por etapa, con prefijos `chore`, `feat`, `perf`, `build`, `docs` y `fix`. Para no exponer el correo personal se usó el correo noreply de GitHub.

### 4. Despliegue en Apache

El paquete se descomprimió con `Expand-Archive -Path miapp.zip -DestinationPath C:\xampp\sites\miapp` y se sirve con el Apache de XAMPP (2.4.58) en el puerto 8090, desde la ruta simulada `http://localhost:8090/miapp/`.

- En `C:\xampp\apache\conf\httpd.conf` se activó la línea `Include conf/extra/httpd-vhosts.conf`.
- En `C:\xampp\apache\conf\extra\httpd-vhosts.conf` se definió el Virtual Host con el puerto y el mapeo de directorios (`Alias /miapp` hacia `C:/xampp/sites/miapp`):

```apache
Listen 8090
<VirtualHost *:8090>
    ServerName localhost
    DocumentRoot "C:/xampp/htdocs"
    Alias /miapp "C:/xampp/sites/miapp"
    <Directory "C:/xampp/sites/miapp">
        Options -Indexes
        AllowOverride None
        Require all granted
    </Directory>
    ErrorLog "logs/miapp-error.log"
    CustomLog "logs/miapp-access.log" common
</VirtualHost>
```

### 5. Validación

- Sintaxis: `httpd.exe -t` devolvió `Syntax OK`.
- Puerto: `netstat -ano | findstr :8090` mostró Apache escuchando (`LISTENING`).
- Respuestas HTTP: `curl.exe -I http://localhost:8090/miapp/` devolvió `200 OK`, y la página, `css/styles.css`, `js/app.js` e `img/laboratorio.jpg` respondieron `200`.
- Funcionamiento: se probó la calculadora en el navegador en `http://localhost:8090/miapp/`.
