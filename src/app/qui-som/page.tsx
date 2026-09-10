import { TopNav } from "../top-nav";

export default function QuiSomPage() {
  return (
    <main className="main-surface">
      <TopNav current="qui-som" />
      <section className="inner-page" aria-labelledby="page-title">
        <div className="window-title">roltramuntana.cat :: qui som</div>
        <p className="eyebrow">Rol Tramuntana</p>
        <h1 id="page-title">Qui som</h1>
        <p>Aquí explicarem el projecte, les persones i els valors que fan possible Rol Tramuntana.</p>
      </section>
    </main>
  );
}
