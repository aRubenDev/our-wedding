// src/components/SaveTheDate.jsx
import imagen from "../assets/Save the Date R+E web whiter.jpg";
import pdfFile from "../assets/Save the Date R+E for web.pdf";

/* ------------------------------------------------------------------ *
 *  CONFIG — textos, imagen y PDF. Colores/fuentes en src/index.css.   *
 * ------------------------------------------------------------------ */
const CONFIG = {
  topLeft: "SAVE THE DATE",
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
const corner = "absolute z-10 font-sans font-medium text-label " +
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
    // Ocupa toda la pantalla, sin scroll ni franjas.
    <div className={`fixed inset-0 bg-paper overflow-hidden ${inset}`}>
      {/* Imagen única, completa (object-contain no recorta) con margen inferior pb-0 y posicionada ligeramente mas a la derecha utilizando la propiedad px; desde sm conserva margen inferior. */}
      <div className="absolute inset-0 flex items-end justify-center px-[clamp(0,3.5vw,3rem)] pt-[clamp(2.25rem,8vw,4.5rem)] pb-0 sm:justify-center sm:items-center translate-x-[10vw] sm:translate-x-0 origin-bottom scale-[1.2  ] sm:scale-100">
        <img
          src={CONFIG.image}
          alt={CONFIG.imageAlt}
          className="max-w-full max-h-full w-auto h-auto object-contain object-bottom"
        />
      </div>

      {/* Tres textos en las esquinas */}
      <span className={`${corner} top-[var(--m)] left-[var(--m)]`}>
        {CONFIG.topLeft}
      </span>
      <span className={`${corner} top-[var(--m)] right-[var(--m)] text-right`}>
        {CONFIG.topRight}
      </span>
      <span className={`${corner} bottom-[var(--m)] left-[var(--m)]`}>
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