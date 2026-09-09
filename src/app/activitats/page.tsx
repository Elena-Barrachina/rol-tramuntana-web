import { TopNav } from "../top-nav";

export default function ActivitatsPage() {
  return (
    <main className="main-surface">
      <TopNav current="activitats" />
      <section className="inner-page" aria-labelledby="page-title">
        <p className="eyebrow">Rol Tramuntana</p>
        <h1 id="page-title">Activitats</h1>
        <p>Aquí hi trobaràs les properes partides, jornades i activitats de l&apos;associació.</p>
      </section>
    </main>
  );
}
