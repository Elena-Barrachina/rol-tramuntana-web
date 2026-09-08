import Link from "next/link";

export default function QuiSomPage() {
  return (
    <main>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Rol Tramuntana, inici"><span className="wordmark-mark" aria-hidden="true">R</span><span>Rol Tramuntana</span></Link>
        <nav aria-label="Navegació principal"><a href="/qui-som" aria-current="page">Qui som</a><a href="/trobades">Trobades</a><a href="/contacte">Contacte</a></nav>
      </header>
      <section className="inner-page" aria-labelledby="page-title"><p className="eyebrow">Rol Tramuntana</p><h1 id="page-title">Qui som</h1><p>Aquí explicarem el projecte, les persones i els valors que fan possible Rol Tramuntana.</p></section>
    </main>
  );
}
