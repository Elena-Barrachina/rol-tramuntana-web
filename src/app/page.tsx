import Image from "next/image";
import Link from "next/link";
import { TopNav } from "./top-nav";

export default function Home() {
  return (
    <main className="main-surface">
      <a className="skip-link" href="#contingut">Salta al contingut principal</a>
      <TopNav current="home" />
      <section className="home-panel" id="contingut" aria-labelledby="landing-title">
        <div className="window-title">roltramuntana.cat :: pàgina principal</div>
        <div className="home-content">
          <div className="home-logo">
            <Image src="/brand/logo_b_trans.svg" alt="Logotip de Rol Tramuntana" width={260} height={282} priority />
          </div>
          <div className="home-copy">
            <h1 id="landing-title">Associació Cultural de Rol Tramuntana - Lleida</h1>
            <p>Impulsem els jocs de rol i de taula com una manera de compartir el lleure: per imaginar, cooperar, pensar i fer comunitat.</p>
            <Link className="membership-cta home-membership-cta" href="/inscripcio">
              Inscriu-te a Rol Tramuntana!
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
