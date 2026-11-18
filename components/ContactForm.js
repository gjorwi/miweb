"use client";

import { ArrowUpRight, LoaderCircle, Send } from "lucide-react";
import { useState } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/+$/, "");
const CONTACT_EMAIL = "jgjg.0503@gmail.com";

function createMailtoUrl({ name, email, message }) {
  const subject = encodeURIComponent(`Contacto desde el portafolio de ${name}`);
  const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\n${message}`);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export default function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
    };

    if (payload.website) return;

    setIsSending(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        form.reset();
        setStatus({ type: "success", message: "¡Gracias! Tu mensaje quedó guardado. Me pondré en contacto contigo." });
        return;
      }

      if (response.status >= 500) {
        window.location.href = createMailtoUrl(payload);
        setStatus({
          type: "info",
          message: "No pudimos guardar el mensaje en este momento. Abrimos tu aplicación de correo como alternativa.",
        });
        return;
      }

      setStatus({ type: "error", message: result.message || "No se pudo enviar el mensaje. Revisa los datos e inténtalo de nuevo." });
    } catch {
      window.location.href = createMailtoUrl(payload);
      setStatus({
        type: "info",
        message: "No pudimos conectar con el formulario. Abrimos tu aplicación de correo con el mensaje preparado.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="form-field">
          <span>Tu nombre</span>
          <input name="name" type="text" autoComplete="name" placeholder="¿Cómo te llamas?" maxLength={100} required />
        </label>
        <label className="form-field">
          <span>Correo electrónico</span>
          <input name="email" type="email" autoComplete="email" placeholder="tu@correo.com" maxLength={254} required />
        </label>
      </div>

      <label className="form-field">
        <span>Cuéntame sobre tu proyecto</span>
        <textarea name="message" rows={5} placeholder="¿Qué tienes en mente?" minLength={10} maxLength={4000} required />
      </label>

      <label className="form-honeypot" aria-hidden="true">
        Sitio web
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="form-submit-row">
        <p>Al enviar, aceptas que te contacte para responder tu consulta.</p>
        <button className="button-primary form-submit" type="submit" disabled={isSending}>
          {isSending ? <LoaderCircle className="spinner" size={17} /> : <Send size={16} />}
          {isSending ? "Enviando" : "Enviar mensaje"}
          {!isSending && <ArrowUpRight size={16} />}
        </button>
      </div>

      {status && <p className={`form-status form-status-${status.type}`} role="status">{status.message}</p>}
    </form>
  );
}
