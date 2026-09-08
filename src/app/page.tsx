"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function D20Die() {
  return (
    <svg className="die-svg" viewBox="0 0 180 180" aria-hidden="true">
      <polygon className="d20-face-one" points="50.8,156.9 50.8,70.8 10,88" />
      <polygon className="d20-face-two" points="50.8,156.9 50.8,70.8 121.6,121.5" />
      <polygon className="d20-face-three" points="50.8,156.9 124.5,170 121.6,121.5" />
      <polygon className="d20-face-four" points="129.2,23.1 55.5,10 124.5,30.7" />
      <polygon className="d20-face-five" points="129.2,23.1 124.5,30.7 170,92" />
      <polygon className="d20-face-six" points="50.8,70.8 55.5,10 124.5,30.7" />
      <polygon className="d20-face-seven" points="50.8,70.8 55.5,10 10,88" />
      <polygon className="d20-face-eight" points="50.8,70.8 124.5,30.7 121.6,121.5" />
      <polygon className="d20-face-nine" points="124.5,170 170,92 121.6,121.5" />
      <polygon className="d20-face-ten" points="124.5,30.7 170,92 121.6,121.5" />
      <text x="99" y="76" textAnchor="middle" transform="rotate(35 99 76)">20</text>
    </svg>
  );
}

function D10Die() {
  return (
    <svg className="die-svg" viewBox="0 0 180 180" aria-hidden="true">
      <polygon className="d10-face-one" points="10,128.2 143.7,115.1 165.1,54.1 94.5,37.1" />
      <polygon className="d10-face-two" points="170,51.8 165.1,54.1 94.5,37.1 85.5,10" />
      <polygon className="d10-face-three" points="10,128.2 94.5,37.1 85.5,10 14.9,43.7" />
      <polygon className="d10-face-four" points="10,128.2 94.5,170 165.1,136.3 143.7,115.1" />
      <polygon className="d10-face-five" points="170,51.8 165.1,136.3 143.7,115.1 165.1,54.1" />
      <text x="107" y="86" textAnchor="middle" transform="rotate(-15 107 86)">10</text>
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="main-surface">
      <a className="skip-link" href="#contingut">Salta al contingut principal</a>

      <button className="menu-trigger" type="button" aria-expanded={menuOpen} aria-controls="main-menu" onClick={() => setMenuOpen((open) => !open)}>
        <span className="menu-logo"><Image src="/logo_b_trans.png" alt="" width={833} height={901} priority /></span>
        <span>Rol Tramuntana</span>
      </button>

      <nav className={`side-menu ${menuOpen ? "is-open" : ""}`} id="main-menu" aria-label="Navegació principal">
        <div className="side-menu-content">
          <p>Explora</p>
          <Link href="/" onClick={() => setMenuOpen(false)}>Inici</Link>
          <Link href="/qui-som" onClick={() => setMenuOpen(false)}>Qui som</Link>
          <Link href="/trobades" onClick={() => setMenuOpen(false)}>Trobades</Link>
          <Link href="/contacte" onClick={() => setMenuOpen(false)}>Contacte</Link>
        </div>
      </nav>

      <section className="landing" id="contingut" aria-labelledby="landing-title">
        <div className="crooked-shadow crooked-shadow-left-under" aria-hidden="true"></div>
        <div className="crooked-paper crooked-paper-left crooked-paper-left-under" aria-hidden="true"></div>
        <div className="crooked-shadow crooked-shadow-left" aria-hidden="true"></div>
        <div className="crooked-shadow crooked-shadow-right" aria-hidden="true"></div>
        <div className="crooked-paper crooked-paper-left" aria-hidden="true"></div>
        <div className="crooked-paper crooked-paper-right" aria-hidden="true"></div>
        <div className="landing-copy">
          <p className="eyebrow"><span aria-hidden="true">✦</span> Associació cultural de rol i jocs de taula</p>
          <h1 id="landing-title">Rol<br /><em>Tramuntana</em></h1>
          <p className="intro">Impulsem els jocs de rol i de taula com una manera de compartir el lleure: per imaginar, cooperar, pensar i fer comunitat.</p>
          <Link className="button" href="/qui-som">Coneix el projecte <span aria-hidden="true">→</span></Link>
        </div>

        <div className="table-scene" role="img" aria-label="Logotip de Rol Tramuntana sobre papers de joc i daus polièdrics">
          <div className="logo-disc"><Image src="/logo_b_trans.png" alt="" width={833} height={901} priority /></div>
          <div className="poly-die die-d20"><D20Die /></div>
          <div className="poly-die die-d10"><D10Die /></div>
        </div>
      </section>

      <footer>
        <p>Rol Tramuntana · Associació cultural</p>
        <p>© {new Date().getFullYear()} Rol Tramuntana</p>
      </footer>
    </main>
  );
}
