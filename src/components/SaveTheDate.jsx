// src/components/SaveTheDate.jsx
import imagen from "../assets/Save the Date R+E web whiter.jpg";
import pdfFile from "../assets/Save the Date R+E for web.pdf";

/* ------------------------------------------------------------------ *
 *  CONFIG — textos, imagen y PDF. Colores/fuentes en src/index.css.   *
 * ------------------------------------------------------------------ */
const countdownDate = new Date("2026-10-10T00:00:00"); // Fecha del evento (10 de octubre de 2026)

const CONFIG = {
  topLeft: "SAVE THE DATE",
  // countdown en formato días, horas y minutos hasta la fecha del evento. Si la fecha ya pasó, muestra 0 días.
  topCenter: (() => {
    const now = new Date();
    const diff = countdownDate - now;
    if (diff <= 0) return "0 DÍAS";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days} DÍAS ${hours} HRS ${minutes} MIN`;
  })(),
  topRight: "MADRID, ESPAÑA",
  bottomLeft: "10 OCTUBRE 2026",
  download: "Descargar",

  image: imagen,            // imagen única (sustitúyela en src/assets/imagen.png)
  imageAlt: "Save the date",

  pdf: pdfFile,             // PDF del proyecto que descarga el botón
  pdfFilename: "save-the-date.pdf",
};

// Margen de las esquinas: más ajustado en móvil, mayor en pantallas grandes.
const inset = "[--m:clamp(0.8rem,4vw,2.75rem)]";
// Solo tipografía -- el posicionamiento ahora lo lleva el contenedor flex de abajo,
// no cada span por separado (eso era justo lo que causaba el choque).
const cornerText = "font-sans font-medium text-label " +
  "text-[clamp(0.7rem,3.2vw,1.05rem)] tracking-[0.12em]";

export default function SaveTheDate() {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = CONFIG.pdf;
    a.download = CONFIG.pdfFilename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    // Ocupa toda la pantalla, sin scroll ni franjas. fondo en rosa pálido (bg-paper) y overflow-hidden para que no se vea nada fuera de la pantalla.
    <div className={`fixed inset-0 bg-paper overflow-hidden ${inset}`}>
      {/* Imagen única, completa (object-contain no recorta) con margen inferior pb-0 y posicionada ligeramente mas a la derecha utilizando la propiedad px; desde sm conserva margen inferior. */}
      <div className="absolute inset-0 flex items-end justify-center px-[clamp(0,3.5vw,3rem)] pt-[clamp(2.25rem,8vw,4.5rem)] pb-0 sm:justify-center sm:items-center translate-x-[10vw] sm:translate-x-0 origin-bottom scale-[1.2  ] sm:scale-100">
        <img
          src={CONFIG.image}
          alt={CONFIG.imageAlt}
          className="max-w-full max-h-full w-auto h-auto object-contain object-bottom"
        />
      </div>

      {/* Fila superior: SAVE THE DATE / MADRID, ESPAÑA siempre en la misma
          linea. El contador, en movil, se fuerza a su propia linea de abajo
          (con w-full, que no cabe junto a los otros dos y salta solo); desde
          sm hacia arriba, vuelve a la misma linea, en medio de los otros dos,
          repartiendose el espacio sobrante con flex-1. */}
      <div className="absolute z-10 top-[var(--m)] left-[var(--m)] right-[var(--m)] flex flex-wrap items-start justify-between gap-x-[2vw] gap-y-[clamp(0.3rem,1.5vw,0.6rem)]">
        <span className={`${cornerText} flex-shrink-0 whitespace-nowrap order-1`}>
          {CONFIG.topLeft}
        </span>
        <span className={`${cornerText} flex-shrink-0 whitespace-nowrap text-right order-2 sm:order-3`}>
          {CONFIG.topRight}
        </span>
        <span className={`${cornerText} w-full text-center order-3 sm:order-2 sm:w-auto sm:flex-1 sm:min-w-0`}>
          {CONFIG.topCenter}
        </span>
      </div>

      <span className={`absolute z-10 ${cornerText} bottom-[var(--m)] left-[var(--m)]`}>
        {CONFIG.bottomLeft}
      </span>

      {/* Descarga = símbolo (icono). aria-label mantiene la accesibilidad. */}
      <button
        onClick={handleDownload}
        aria-label={CONFIG.download}
        title={CONFIG.download}
        className="absolute z-10 bottom-[var(--m)] right-[var(--m)] text-label cursor-pointer bg-transparent border-0 p-1 -m-1 hover:opacity-60 focus-visible:opacity-60 outline-none transition-opacity"
      >
        <svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          className="w-[clamp(1.15rem,5.5vw,1.6rem)] h-[clamp(1.15rem,5.5vw,1.6rem)] block"
        >
          <path d="M12 3v12" />
          <path d="m7 11 5 5 5-5" />
          <path d="M5 20h14" />
        </svg>
      </button>
    </div>
  );
}