# Angular Countries App

Aplicación web desarrollada con **Angular 14** que permite explorar información de todos los países del mundo, buscar por nombre, filtrar por región, gestionar una lista de favoritos personalizada y configurar preferencias de usuario.

## Características

- **Autenticación** — Login con guard de rutas (`canActivate`) para proteger páginas privadas
- **Dashboard** — Estadísticas globales: total de países, favoritos, regiones y el país más poblado
- **Buscador** — Filtro por nombre en tiempo real + chips de región con paginación configurable
- **Favoritos** — Agrega o elimina países de tu lista personal, persistida en `localStorage`
- **Perfil y Configuración** — Gestiona preferencias de usuario persistidas en `localStorage`
- **Banderas** — Muestra la bandera oficial de cada país con fallback a SVG si el PNG falla
- **Información completa** — Capital, región, subregión, moneda e idioma de cada país
- **Layout con sidebar** — Navegación lateral responsive con topbar y menú mobile
- **Proxy de desarrollo** — Evita errores CORS redirigiendo llamadas a la API a través del dev server

## Stack tecnológico

| Tecnología | Versión |
|---|---|
| Angular | 14 |
| Tailwind CSS | 3 |
| TypeScript | 4.7 |
| REST Countries API | v3.1 |

## Requisitos previos

- **Node.js** 16 o superior
- **Angular CLI** 14 (`npm install -g @angular/cli@14`)

## Instalación y ejecución

```bash
git clone git@github.com:Lualvarad0/Angular-countries.git
cd Angular-countries
npm install
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

> El proxy de desarrollo está configurado en `proxy.conf.json` y se carga automáticamente con `ng serve`. No se requiere configuración adicional.

## Credenciales de acceso

| Campo | Valor |
|---|---|
| Usuario | `admin` |
| Contraseña | `admin` |

## Estructura del proyecto

```
src/
├── app/
│   ├── models/
│   │   └── country.interface.ts       # Interfaz tipada del modelo País (API v3.1)
│   ├── Services/
│   │   └── country.service.ts         # Servicio HTTP — REST Countries API (vía proxy)
│   ├── layout/
│   │   └── layout.component.*         # Shell con sidebar + topbar (rutas protegidas)
│   ├── login/                         # Pantalla de autenticación
│   ├── pages/
│   │   ├── dashboard/                 # Estadísticas globales y acciones rápidas
│   │   ├── busqueda/                  # Buscador con filtros y paginación
│   │   ├── favoritos/                 # Galería de países favoritos (grid de tarjetas)
│   │   └── perfil/                    # Perfil de usuario y configuración de preferencias
│   ├── auth.guard.ts                  # Guard canActivate para rutas protegidas
│   └── auth.service.ts                # Servicio de autenticación con localStorage
├── styles.css                         # Estilos globales + utilidades compartidas
├── proxy.conf.json                    # Proxy del dev server → restcountries.com
└── tailwind.config.js                 # Configuración de Tailwind CSS
```

## Rutas

| Ruta | Componente | Protegida |
|---|---|---|
| `/login` | LoginComponent | No |
| `/dashboard` | DashboardComponent | Sí |
| `/busqueda` | BusquedaComponent | Sí |
| `/favoritos` | FavoritosComponent | Sí |
| `/perfil` | PerfilComponent | Sí |

## Configuración del proxy (CORS)

En desarrollo, las peticiones a la API se enrutan a través del dev server de Angular para evitar bloqueos CORS del navegador:

```
Navegador → localhost:4200/api/... → dev server (proxy) → restcountries.com
```

La configuración se encuentra en `proxy.conf.json` y está referenciada en `angular.json` dentro de `serve.options.proxyConfig`.
