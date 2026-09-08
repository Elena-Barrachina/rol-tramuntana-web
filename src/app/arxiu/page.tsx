import { TopNav } from "../top-nav";

export default function ArxiuPage() {
  return (
    <main className="main-surface">
      <TopNav current="arxiu" />
      <section className="inner-page" aria-labelledby="page-title">
        <p className="eyebrow">Rol Tramuntana</p>
        <h1 id="page-title">Arxiu</h1>
        <p>Aquí trobaràs recursos, propostes de joc i memòria de les activitats de l&apos;associació.</p>
      </section>
    </main>
  );
}
