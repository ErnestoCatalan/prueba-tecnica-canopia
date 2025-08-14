# Prueba Técnica Canopia - Fullstack

Aplicación completa con autenticación JWT y CRUD de productos, desarrollada con:
- **Backend**: Node.js + Express + MySQL
- **Frontend**: Angular 19 + PrimeNG
- **Autenticación**: JWT (5 minutos de expiración)

## Requisitos Previos

- Node.js v18+
- Angular CLI v19
- MySQL 8.0+
- Git

## Instalación, descargar o clonar repositorio
git clone https://github.com/ErnestoCatalan/prueba-tecnica-canopia.git
```bash
cd prueba-tecnica-canopia
```

### 1. Configuración de la Base de Datos

```bash
mysql -u root -p < scripts/database.sql
```

### 2. Configuración del Backend

```bash
cd backend
cp .env.example .env
# Editar las variables en .env según tu configuración
npm install
npm run dev
```

### 3. Configuración del Frontend (en una nueva terminal)

```bash
cd frontend
npm install
ng serve
```

## Variables de Entorno

Crea un archivo `.env` en la carpeta `backend` basado en `.env.example`:

```ini
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu-contraseña
DB_NAME=BDPruebaTecnicaCanopia
JWT_SECRET=tu-secreto-seguro
```

## Estructura del Proyecto

```
prueba-tecnica-canopia/
├── backend/          # API Node.js
├── frontend/         # Aplicación Angular
└── scripts/          # Scripts SQL

## Endpoints API

- `POST /api/auth/login` - Autenticación de usuarios
- `POST /api/auth/register` - Registro de usuarios
- `GET /api/products` - Listar productos
- `POST /api/products/:id` - Actualizar un producto
- `DELETE /api/products/:id` - Eliminar un producto

## Uso

1. Iniciar el Backend (API) 
    cd backend
    npm run dev
1. Iniciar el Frontend (Aplicación)
    cd frontend
    ng serve
La interfaz estará disponible en: http://localhost:4200
2. Regístrate e inicia sesión
3. Navega a la sección de productos para gestionar el inventario
4. Crea, edita o elimina productos según tus necesidades