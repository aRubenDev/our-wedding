# Save the Date — React + Vite + Tailwind v4

Invitación "Save the Date" como componente React, fiel a la maqueta:
posiciones, **capas Z**, colores y tipografías replicadas. Responsive por
escalado proporcional (el póster mantiene su composición a cualquier ancho).

## Requisitos
- Node.js 18+ (recomendado 20+)

## Arrancar
```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
```

## Otros comandos
```bash
npm run build    # build de producción en /dist
npm run preview  # sirve el build de producción
```

## Estructura
```
save-the-date/
├── index.html
├── package.json
├── vite.config.js          # plugins: react + @tailwindcss/vite
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css           # @import tailwind + @theme (colores y fuentes)
│   └── components/
│       └── SaveTheDate.jsx # el componente
```

## Personalizar
- **Textos e imágenes**: objeto `CONFIG` arriba de `src/components/SaveTheDate.jsx`.
  Rellena `coupleImage` / `namesImage` con una URL para sustituir los placeholders grises.
- **Colores y fuentes**: tokens en `@theme` dentro de `src/index.css`
  (`--color-numbers`, `--color-label`, `--font-display`…). Se usan como clases
  Tailwind: `text-numbers`, `bg-img-front`, `font-display`, etc.
- **Posiciones y capas Z**: clases Tailwind en el componente
  (`left-[396px]`, `top-[50px]`, `z-10`, `z-20`…). El orden Z de atrás a delante es:
  `10/10` (z-0) → imagen de fondo (z-10) → imagen frontal (z-20) → textos (z-30)
  → marco (z-40) → botón Descargar (z-50).

## Notas
- El escalado usa `transform: scale()` calculado en runtime (inline), por eso ese
  único valor no es una clase Tailwind.
- El botón **Descargar** carga `html2canvas` desde CDN bajo demanda y exporta un PNG.
