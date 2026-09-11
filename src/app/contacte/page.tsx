import { TopNav } from "../top-nav";
import { ContactForm } from "./contact-form";

export default function ContactePage() {
  return (
    <main className="main-surface">
      <TopNav current="contacte" />
      <section className="inner-page" aria-labelledby="page-title">
        <div className="window-title">roltramuntana.cat :: contacte</div>
        <p className="eyebrow">Rol Tramuntana</p>
        <h1 id="page-title">Contacte</h1>
        <p>Escriu-nos i et respondrem tan aviat com puguem.</p>
        <ContactForm />
      </section>
    </main>
  );
}
