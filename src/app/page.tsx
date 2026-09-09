/* Versioned direct paths keep manually replaced dice artwork out of stale image caches. */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { TopNav } from "./top-nav";

export default function Home() {
  return (
    <>
      <main className="main-surface">
        <a className="skip-link" href="#contingut">Salta al contingut principal</a>
        <TopNav current="home" />

        <section className="landing" id="contingut" aria-labelledby="landing-title">
        <div className="crooked-shadow crooked-shadow-left-under" aria-hidden="true"></div>
        <div className="crooked-paper crooked-paper-left crooked-paper-left-under" aria-hidden="true"></div>
        <div className="crooked-shadow crooked-shadow-left" aria-hidden="true"></div>
        <div className="crooked-shadow crooked-shadow-right" aria-hidden="true"></div>
        <div className="crooked-paper crooked-paper-left" aria-hidden="true"></div>
        <div className="crooked-paper crooked-paper-right" aria-hidden="true"></div>
        <div className="landing-copy">
          <h1 id="landing-title">Rol <em>Tramuntana</em></h1>
          <p className="intro">Impulsem els jocs de rol i de taula com una manera de compartir el lleure: per imaginar, cooperar, pensar i fer comunitat.</p>
          <Link className="button" href="/qui-som">Coneix Rol Tramuntana<span aria-hidden="true">→</span></Link>
        </div>

        <div className="table-scene" role="img" aria-label="Logotip de Rol Tramuntana sobre papers de joc i daus polièdrics">
          <div className="logo-disc"><Image src="/brand/logo_b_trans.svg" alt="Logotip de Rol Tramuntana" width={833} height={901} priority /></div>
          <div className="poly-die die-d20"><div className="die-art d20-art"><img src="/coloured_d20.png?rev=3" alt="d20" className="d20-image" /><span className="d20-number" aria-hidden="true">20</span></div></div>
          <div className="poly-die die-d10"><div className="die-art d10-art"><img src="/coloured_d10.png?rev=3" alt="d10" className="d10-image" /><span className="d10-number" aria-hidden="true">10</span></div></div>
        </div>
        </section>
      </main>
    </>
  );
}
