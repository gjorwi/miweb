"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#servicios", label: "Servicios" },
  { href: "#portafolio", label: "Portafolio" },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="section-shell site-header-inner">
        <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Jorwi Garcia, inicio">
          <span className="brand-mark">jg<span>.</span></span>
          <span className="brand-copy">
            <strong>JORWI GARCIA</strong>
            <small>INGENIERO · FULL STACK</small>
          </span>
        </a>

        <nav id="main-navigation" className={`site-nav${isOpen ? " is-open" : ""}`} aria-label="Navegación principal">
          {links.map((link) => (
            <a href={link.href} key={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a className="nav-contact-link" href="#contacto" onClick={closeMenu}>
            Hablemos <ArrowUpRight size={15} strokeWidth={1.8} />
          </a>
        </nav>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
