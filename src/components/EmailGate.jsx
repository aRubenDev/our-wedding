// src/components/EmailGate.jsx
import { useState } from "react";

const cornerText =
  "font-sans font-medium text-label text-[clamp(0.7rem,3.2vw,1.05rem)] tracking-[0.12em]";

export default function EmailGate({ code, webhookUrl, onDone }) {
  const [email, setEmail] = useState("");
  // 'idle' | 'sending' | 'error'
  const [state, setState] = useState("idle");

  const handleSubmit = (event) => {
    event.preventDefault();
    setState("sending");

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, email }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("register-failed");
        onDone();
      })
      .catch(() => setState("error"));
  };

  return (
    <div className="fixed inset-0 bg-paper flex items-center justify-center px-[clamp(1.5rem,8vw,4rem)]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[26rem] flex flex-col items-center gap-[clamp(1rem,4vw,1.5rem)] text-center"
      >
        <p className={cornerText}>SAVE THE DATE</p>
        <p className="font-sans text-label text-[clamp(0.85rem,3.5vw,1.05rem)] leading-relaxed">
          Este enlace es nuevo para nosotros — déjanos tu email para guardarte un hueco.
        </p>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@email.com"
          disabled={state === "sending"}
          className="w-full bg-transparent border-0 border-b border-label/40 text-center py-2
                     font-sans text-label text-[clamp(0.85rem,3.5vw,1.05rem)] tracking-[0.04em]
                     outline-none focus:border-label placeholder:text-label/40"
        />
        {state === "error" && (
          <p className="font-sans text-[clamp(0.7rem,2.8vw,0.85rem)] text-label/80">
            Algo ha fallado — inténtalo de nuevo.
          </p>
        )}
        <button
          type="submit"
          disabled={state === "sending"}
          className="font-sans text-label tracking-[0.12em] text-[clamp(0.75rem,3vw,0.95rem)]
                     border border-label/60 rounded-full px-[clamp(1.5rem,6vw,2.5rem)] py-2
                     hover:bg-label hover:text-paper transition-colors disabled:opacity-50 cursor-pointer"
        >
          {state === "sending" ? "Enviando…" : "Confirmar"}
        </button>
      </form>
    </div>
  );
}