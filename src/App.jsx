// src/App.jsx
import { useEffect, useState } from "react";
import SaveTheDate from "./components/SaveTheDate.jsx";
import EmailGate from "./components/EmailGate.jsx";

// URLs de los dos workflows de n8n -- sustituye por las reales una vez
// creados (ver la guia aparte). El de verificacion es GET, con el codigo
// como query param; el de alta es POST, con { code, email } como body.
const VERIFY_WEBHOOK_URL = "https://n8n.appixblend.com/webhook/wedding-verify-code";
const REGISTER_WEBHOOK_URL = "https://n8n.appixblend.com/webhook/wedding-add-guest";

export default function App() {
  const code = new URLSearchParams(window.location.search).get("code");
  // 'loading' | 'verified' | 'needs-email' | 'error'. Sin codigo no hay
  // nada que verificar, asi que arranca ya en "verified" -- evita un
  // render de mas solo para volver a poner el mismo estado.
  const [status, setStatus] = useState(() => (code ? "loading" : "verified"));

  useEffect(() => {
    if (!code) return;

    const controller = new AbortController();
    fetch(`${VERIFY_WEBHOOK_URL}?code=${encodeURIComponent(code)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`verify-failed: HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setStatus(data.exists ? "verified" : "needs-email"))
      .catch((err) => {
        if (err.name === "AbortError") return;
        // Antes esto fallaba en silencio -- sin este log, un fallo de red
        // o de CORS es indistinguible de una verificacion real desde
        // fuera, porque "error" tambien muestra la pagina (ver mas abajo).
        console.error("Fallo verificando el codigo:", err);
        setStatus("error");
      });

    return () => controller.abort();
  }, [code]);

  if (status === "loading") {
    return (
      <div className="fixed inset-0 bg-paper flex items-center justify-center font-sans text-label text-[clamp(0.8rem,3vw,1rem)] tracking-[0.08em]">
        Cargando…
      </div>
    );
  }

  if (status === "needs-email") {
    return (
      <EmailGate
        code={code}
        webhookUrl={REGISTER_WEBHOOK_URL}
        onDone={() => setStatus("verified")}
      />
    );
  }

  // "error" tambien cae aqui a proposito: si el webhook de verificacion
  // falla (red caida, n8n reiniciandose), preferimos mostrar la pagina
  // igualmente antes que dejar a un invitado real bloqueado por un fallo
  // nuestro. Si prefieres lo contrario -- bloquear cuando no se puede
  // verificar -- dimelo y lo cambio.
  return <SaveTheDate />;
}