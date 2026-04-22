# Angular Countries App

Aplicación web desarrollada con **Angular 14** que permite explorar información de todos los países del mundo, buscar por nombre, filtrar por región y gestionar una lista de favoritos personalizada.

## Características

- **Autenticación** — Login con guard de rutas (`canActivate`) para proteger páginas privadas
- **Dashboard** — Estadísticas globales: total de países, favoritos, regiones y el país más poblado
- **Buscador** — Filtro por nombre en tiempo real + chips de región con paginación (20 países por página)
- **Favoritos** — Agrega o elimina países de tu lista personal, persistida en `localStorage`
- **Banderas** — Muestra la bandera oficial de cada país
- **Información completa** — Capital, región, subregión, moneda e idioma de cada país
- **Layout con sidebar** — Navegación lateral responsive con topbar y menú mobile
- **Diseño responsive** — Compatible con escritorio y dispositivos móviles

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
│   │   └── country.service.ts         # Servicio HTTP — REST Countries API
│   ├── layout/
│   │   └── layout.component.*         # Shell con sidebar + topbar (rutas protegidas)
│   ├── login/                         # Pantalla de autenticación
│   ├── pages/
│   │   ├── dashboard/                 # Estadísticas globales y acciones rápidas
│   │   ├── busqueda/                  # Buscador con filtros y paginación
│   │   └── favoritos/                 # Galería de países favoritos (grid de tarjetas)
│   ├── auth.guard.ts                  # Guard canActivate para rutas protegidas
│   └── auth.service.ts                # Servicio de autenticación con localStorage
├── styles.css                         # Estilos globales + utilidades compartidas
└── tailwind.config.js                 # Configuración de Tailwind CSS
```

## Rutas

| Ruta | Componente | Protegida |
|---|---|---|
| `/login` | LoginComponent | No |
| `/dashboard` | DashboardComponent | Sí |
| `/busqueda` | BusquedaComponent | Sí |
| `/favoritos` | FavoritosComponent | Sí |
