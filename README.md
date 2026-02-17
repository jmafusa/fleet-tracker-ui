# Fleet Tracker UI

---

## 🧰 Stack Tecnológico

- Core: React 19 + Vite
- Routing: React Router 7
- Data Fetching & Cache: TanStack Query v5 (React Query)
- Tablas: TanStack Table v8
- Formularios y Validación: React Hook Form + Zod
- UI & Estilos: Tailwind CSS v4 + Shadcn/UI
- Mock API: JSON Server 0.17

---

## 🧱 Arquitectura

El proyecto utiliza una arquitectura basada en features, donde la lógica, servicios y componentes se organizan por dominio funcional.

Este enfoque permite:

- Escalabilidad progresiva del código
- Separación clara de responsabilidades
- Mantenimiento sencillo y predecible
- Reutilización de componentes de UI compartidos

La navegación y el estado de los datos se gestionan de forma centralizada para asegurar consistencia en toda la aplicación.

---

## 🚀 Instalación y Ejecución

Para ejecutar el proyecto localmente es necesario mantener dos procesos activos en terminales separadas.

### 1. Clonar e instalar dependencias

git clone <https://github.com/jmafusa/fleet-tracker-ui>  
cd fleet-tracker-ui  
npm install

### 2. Iniciar el servidor de datos

npm run server

API disponible en: http://localhost:3000  
Fuente de datos: data/db.json

### 3. Iniciar el frontend

npm run dev

La aplicación estará disponible en: http://localhost:5173
