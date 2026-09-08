import Link from "next/link";

export default function ContactePage() {
  return (
    <main>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Rol Tramuntana, inici"><span className="wordmark-mark" aria-hidden="true">R</span><span>Rol Tramuntana</span></Link>
        <nav aria-label="Navegació principal"><a href="/qui-som">Qui som</a><a href="/trobades">Trobades</a><a href="/contacte" aria-current="page">Contacte</a></nav>
      </header>
      <section className="inner-page" aria-labelledby="page-title"><p className="eyebrow">Rol Tramuntana</p><h1 id="page-title">Contacte</h1><p>Aquí hi haurà les vies per posar-se en contacte amb l&apos;associació.</p></section>
    </main>
  );
}
