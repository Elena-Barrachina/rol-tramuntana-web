import Link from "next/link";
import { TopNav } from "../top-nav";
import { ContactForm } from "./contact-form";

export default function ContactePage() {
  return (
    <main className="main-surface">
      <TopNav current="contacte" />
      <div className="window-title">roltramuntana.cat :: contacte</div>
      <section className="inner-page" aria-labelledby="page-title">
        <p className="eyebrow">Rol Tramuntana</p>
        <h1 id="page-title">Contacte</h1>
        <Link className="membership-cta" href="/inscripcio">
          Inscriu-te a Rol Tramuntana!
        </Link>
        <ContactForm />
      </section>
    </main>
  );
}
