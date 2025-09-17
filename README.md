# Generador de Facturas MX (Frontend)

Stack: **React + Vite + TypeScript**, **CSS BEM**, **GSAP** (solo para una animación de entrada).  
Inspirado en el generador de Zoho, pero adaptado a **facturación en México** (SAT).

## Características
- Alta y edición de **Emisor** y **Receptor** (RFC, Régimen, Uso CFDI).
- **Conceptos** con clave ProdServ SAT, clave de unidad, cantidad, precio y **IVA** (0%, 8%, 16% o exento).
- Cálculo automático de **subtotal, IVA y total**.
- **Persistencia** en `localStorage`.
- **Descarga** como PDF (print) o **JSON** (estructura de la factura).
- Estilos con **BEM** y look oscuro moderno.

> Nota: Los catálogos del SAT incluidos son **mínimos** para demo. En producción, consume los catálogos oficiales.

## Estructura
```
src/
  features/invoice/
    components/
    sat-catalogs.ts   # catálogos mínimos
    money.ts          # utilidades de totales
    state.ts          # estado con localStorage
    types.ts
    invoice.css
  styles/index.css
  App.tsx
  main.tsx
```

## Ejecutar en local
```bash
npm install
npm run dev
```
Abre `http://localhost:5173`

## Build
```bash
npm run build
npm run preview
```

## BEM
- `invoice-app`, `invoice-app__sidebar`, `invoice-app__panel`, `invoice-app__main`
- `items`, `items__toolbar`, `items__table-wrapper`
- `summary`, `summary__totals`, `summary__actions`
- Utilidades: `btn`, `btn--primary`, `btn--danger`, `card`, `input`, `label`, `table`
