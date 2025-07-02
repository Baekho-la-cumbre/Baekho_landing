📘 Documentación del Proyecto Frontend — ClonAI Mini Front
🎯 Objetivo
Este proyecto es una interfaz frontend construida con React + Vite, diseñada bajo una estructura modular y con una arquitectura pensada para crecer usando buenas prácticas.

Está pensado como base para una plataforma donde solo se tiene una vista principal, con posibles componentes reutilizables.

🧱 Estructura de Carpetas
bash
Copiar
Editar
├── README.md                  # Documentación del proyecto
├── eslint.config.js           # Reglas personalizadas de ESLint
├── index.html                 # HTML principal (Vite lo usa como base)
├── package.json               # Dependencias y scripts
├── package-lock.json          # Lockfile para versiones exactas
├── postcss.config.cjs         # Configuración de PostCSS
├── project-for-ai-minifiedFront.json  # Archivo de análisis
├── prueba.js                  # Archivo temporal de prueba
├── public/
│   └── vite.svg               # Imagen usada por defecto (logo Vite)
├── src/
│   ├── App.css                # Estilos específicos para `App.tsx`
│   ├── App.tsx                # Componente raíz principal
│   ├── api/
│   │   └── apiClient.ts       # Cliente Axios para peticiones HTTP
│   ├── core/
│   │   ├── layouts/           # (Futuro) Layouts globales como PublicLayout o AdminLayout
│   │   ├── router/            # Manejo de rutas (AppRouter.tsx, etc.)
│   │   └── styles/            # Estilos globales centralizados
│   ├── index.css              # Estilos base con Tailwind
│   ├── main.tsx               # Punto de entrada de la aplicación (ReactDOM)
│   ├── pages/                 # Vistas principales (landing, panel, etc.)
│   ├── sections/
│   │   ├── Contacto/          # Sección "Contacto"
│   │   ├── Filosofia/         # Sección "Filosofía"
│   │   ├── Historia/          # Sección "Historia"
│   │   ├── Inicio/            # Sección de inicio o bienvenida
│   │   └── Logros/            # Sección de logros del dojo
│   ├── shared/
│   │   ├── assets/            # Imágenes, íconos, logos, videos
│   │   ├── components/        # Componentes reutilizables (Button, Modal, Header, etc.)
│   │   ├── constants/         # Constantes globales (ej. textos, rutas, enums)
│   │   ├── lib/               # Hooks reutilizables y funciones utilitarias
│   │   └── types/             # Tipado compartido en TypeScript
│   └── vite-env.d.ts          # Tipado de entorno para Vite
├── tailwind.config.js         # Configuración de TailwindCSS
├── tsconfig.json              # Configuración general de TypeScript
├── tsconfig.app.json          # Config TS para el frontend
├── tsconfig.node.json         # Config TS para scripts y archivos Node
└── vite.config.ts             # Configuración de Vite (plugins, rutas alias, etc.)