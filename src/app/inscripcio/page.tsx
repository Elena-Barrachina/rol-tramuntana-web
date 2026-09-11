import { TopNav } from "../top-nav";
import { RegistrationForm } from "./registration-form";

export default function InscripcioPage() {
  return (
    <main className="main-surface">
      <TopNav />
      <section className="inner-page" aria-labelledby="page-title">
        <div className="window-title">roltramuntana.cat :: contacte :: inscripció</div>
        <p className="eyebrow">Rol Tramuntana</p>
        <h1 id="page-title">Inscriu-te</h1>
        <div className="membership-benefits">
          <p>Fer-te soci o sòcia t&apos;apropa encara més a la comunitat de Rol Tramuntana.</p>
          <h2>Amb la quota anual de 12 € tindràs:</h2>
          <ul className="membership-benefits-list">
            <li>Accés als canals de WhatsApp i Discord de l&apos;associació.</li>
            <li>La samarreta de Rol Tramuntana.</li>
            <li>La possibilitat de reservar espais per muntar les teves partides.</li>
          </ul>
        </div>
        <RegistrationForm />
      </section>
    </main>
  );
}
