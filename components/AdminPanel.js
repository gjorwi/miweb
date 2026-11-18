"use client";

import { ArrowUpRight, Inbox, LoaderCircle, LockKeyhole, LogOut, Mail, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

function formatDate(value) {
  if (!value) return "Fecha no disponible";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function getInitials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [total, setTotal] = useState(0);
  const [unread, setUnread] = useState(0);
  const [code, setCode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/messages?limit=100", { cache: "no-store" });
      const result = await response.json().catch(() => ({}));

      if (response.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (!response.ok) {
        setError(result.message || "No se pudieron cargar los mensajes.");
        return;
      }

      setAuthenticated(true);
      setMessages(Array.isArray(result.messages) ? result.messages : []);
      setTotal(Number(result.total) || 0);
      setUnread(Number(result.unread) || 0);
    } catch {
      setError("No se pudo conectar con el servicio. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  async function handleLogin(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(result.message || "No se pudo validar el código.");
        return;
      }

      setCode("");
      setAuthenticated(true);
      await loadMessages();
    } catch {
      setError("No se pudo conectar con el servicio. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
      setIsChecking(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    setAuthenticated(false);
    setMessages([]);
    setTotal(0);
    setUnread(0);
    setError("");
  }

  async function toggleRead(message) {
    setError("");
    try {
      const response = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: message._id, isRead: !message.isRead }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(result.message || "No se pudo actualizar el mensaje.");
        return;
      }
      await loadMessages();
    } catch {
      setError("No se pudo conectar con el servicio. Inténtalo de nuevo.");
    }
  }

  if (isChecking) {
    return (
      <main className="admin-screen">
        <div className="admin-checking"><LoaderCircle className="spinner" size={18} /> Verificando sesión…</div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="admin-screen">
        <div className="admin-login-wrap">
          <a className="admin-brand" href="/" aria-label="Volver al portafolio">
            <span className="brand-mark">jg<span>.</span></span>
            <span className="brand-copy"><strong>JORWI GARCIA</strong><small>ÁREA PRIVADA</small></span>
          </a>

          <section className="admin-login-card">
            <div className="admin-lock-icon"><LockKeyhole size={21} /></div>
            <p className="admin-eyebrow">ACCESO RESTRINGIDO</p>
            <h1>Panel privado</h1>
            <p className="admin-login-description">Ingresa tu código de acceso para consultar los mensajes recibidos.</p>

            <form className="admin-login-form" onSubmit={handleLogin}>
              <label htmlFor="admin-code">Código de acceso</label>
              <input
                id="admin-code"
                name="code"
                type="password"
                autoComplete="current-password"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Introduce tu código privado"
                minLength={8}
                maxLength={256}
                required
              />
              {error && <p className="admin-error" role="alert">{error}</p>}
              <button className="button-primary admin-login-button" type="submit" disabled={isLoading}>
                {isLoading ? <LoaderCircle className="spinner" size={16} /> : <LockKeyhole size={16} />}
                {isLoading ? "Validando…" : "Ingresar al panel"}
                {!isLoading && <ArrowUpRight size={16} />}
              </button>
            </form>
            <p className="admin-security-note">La sesión queda protegida en una cookie segura y expira automáticamente.</p>
          </section>
          <a className="admin-back-link" href="/">← Volver al portafolio</a>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-screen admin-dashboard-screen">
      <header className="admin-dashboard-header">
        <a className="admin-brand" href="/" aria-label="Volver al portafolio">
          <span className="brand-mark">jg<span>.</span></span>
          <span className="brand-copy"><strong>JORWI GARCIA</strong><small>MENSAJES PRIVADOS</small></span>
        </a>
        <div className="admin-header-actions">
          <a href="/" className="admin-view-site">Ver portafolio <ArrowUpRight size={14} /></a>
          <button className="admin-logout-button" type="button" onClick={handleLogout}><LogOut size={15} /> Salir</button>
        </div>
      </header>

      <section className="admin-dashboard-content">
        <div className="admin-title-row">
          <div>
            <p className="admin-eyebrow"><span /> BANDEJA PRIVADA</p>
            <h1>Mensajes recibidos</h1>
            <p className="admin-dashboard-description">Consultas enviadas desde el formulario de contacto de tu portafolio.</p>
          </div>
          <div className="admin-count-card"><strong>{total}</strong><span>TOTAL</span></div>
        </div>

        <div className="admin-list-toolbar">
          <div><Inbox size={16} /><span>{unread} sin leer</span><i /> <span>{messages.length} mostrados</span></div>
          <button type="button" onClick={loadMessages} disabled={isLoading} aria-label="Actualizar mensajes">
            <RefreshCw className={isLoading ? "spinner" : ""} size={15} /> Actualizar
          </button>
        </div>

        {error && <p className="admin-error admin-dashboard-error" role="alert">{error}</p>}

        {isLoading && messages.length === 0 ? (
          <div className="admin-empty-state"><LoaderCircle className="spinner" size={20} /><p>Cargando mensajes…</p></div>
        ) : messages.length === 0 ? (
          <div className="admin-empty-state"><Inbox size={25} /><h2>Aún no hay mensajes</h2><p>Cuando alguien complete el formulario, su consulta aparecerá aquí.</p></div>
        ) : (
          <div className="admin-message-list">
            {messages.map((message) => (
              <article className={`admin-message-card${message.isRead ? " is-read" : " is-unread"}`} key={message._id}>
                <div className="admin-message-heading">
                  <span className="admin-message-avatar">{getInitials(message.name || "JG")}</span>
                  <div className="admin-message-sender">
                    <h2>{message.name}</h2>
                    <a href={`mailto:${message.email}`}><Mail size={13} /> {message.email}</a>
                  </div>
                  <time dateTime={message.createdAt}>{formatDate(message.createdAt)}</time>
                  <button type="button" onClick={() => toggleRead(message)}>
                    {message.isRead ? "Marcar sin leer" : "Marcar leído"}
                  </button>
                </div>
                <p className="admin-message-body">{message.message}</p>
              </article>
            ))}
          </div>
        )}

        <p className="admin-retention-note">Se muestran hasta 100 mensajes, ordenados del más reciente al más antiguo.</p>
      </section>
    </main>
  );
}
