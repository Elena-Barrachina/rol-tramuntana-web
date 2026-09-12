/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type Section = "home" | "qui-som" | "activitats" | "arxiu" | "contacte";

const sections: Array<{ href: string; label: string; id: Section }> = [
  { href: "/", label: "Inici", id: "home" },
  { href: "/qui-som", label: "Qui som", id: "qui-som" },
  { href: "/activitats", label: "Activitats", id: "activitats" },
  { href: "/arxiu", label: "Arxiu", id: "arxiu" },
  { href: "/contacte", label: "Contacte", id: "contacte" },
];

export function TopNav({ current }: { current?: Section }) {
  return (
    <header className="site-header">
      <div className="brand">
        <Link className="brand-mark" href="/" aria-label="Rol Tramuntana: inici">
          <img src="/brand/logo_w_trans.png" alt="" width="46" height="46" />
        </Link>
        <Link className="brand-name" href="/">
          <strong>ROL TRAMUNTANA</strong>
          <span>Associació cultural de rol i jocs de taula</span>
        </Link>
      </div>
      <nav className="site-nav" aria-label="Navegació principal">
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <Link href={section.href} aria-current={current === section.id ? "page" : undefined}>
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
