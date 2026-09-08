import Link from "next/link";

export default function TrobadesPage() {
  return (
    <main>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Rol Tramuntana, inici"><span className="wordmark-mark" aria-hidden="true">R</span><span>Rol Tramuntana</span></Link>
        <nav aria-label="Navegació principal"><a href="/qui-som">Qui som</a><a href="/trobades" aria-current="page">Trobades</a><a href="/contacte">Contacte</a></nav>
      </header>
      <section className="inner-page" aria-labelledby="page-title"><p className="eyebrow">Rol Tramuntana</p><h1 id="page-title">Trobades</h1><p>Aquí hi trobaràs les properes partides, jornades i activitats de l&apos;associació.</p></section>
    </main>
  );
}
