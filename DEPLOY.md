# Guía de Despliegue Rápido

Este proyecto ha sido corregido y optimizado para un despliegue sencillo.

## Requisitos
- Node.js 18+
- MySQL (opcional, el sistema tiene fallback si no se configura)

## Instalación Local
1. Instalar dependencias: `npm install`
2. Configurar variables en `.env` (puedes copiar `.env.example`)
3. Iniciar desarrollo: `npm run dev`

## Despliegue en Producción
1. Construir el proyecto: `npm run build`
2. Iniciar el servidor: `npm start`

El comando `npm run build` generará una carpeta `dist` que contiene tanto el servidor como el cliente (en `dist/public`).

## Optimizaciones Realizadas
- Corregidos errores de importación en componentes UI.
- Corregidos errores de tipos en páginas principales.
- Implementados procedimientos de tRPC faltantes en el backend.
- Optimizada la configuración de Vite para producción.
- Simplificado el servidor Express para manejar correctamente el routing de SPA.
- Añadidos componentes UI faltantes (Badge, CardTitle, etc).
