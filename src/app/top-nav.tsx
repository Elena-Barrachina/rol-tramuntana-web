import Link from "next/link";
import { Fragment } from "react";

type Section = "home" | "qui-som" | "activitats" | "arxiu" | "contacte";

const sections: Array<{ href: string; label: string; id: Section }> = [
  { href: "/", label: "Rol Tramuntana", id: "home" },
  { href: "/qui-som", label: "Qui Som", id: "qui-som" },
  { href: "/activitats", label: "Activitats", id: "activitats" },
  { href: "/arxiu", label: "Arxiu", id: "arxiu" },
  { href: "/contacte", label: "Contacte", id: "contacte" },
];

export function TopNav({ current }: { current?: Section }) {
  return (
    <nav className="top-nav" aria-label="Navegació principal">
      {sections.map((section, index) => (
        <Fragment key={section.id}>
          {index > 0 && <span className="top-nav-separator" aria-hidden="true">·</span>}
          <Link href={section.href} aria-current={current === section.id ? "page" : undefined}>
            {section.label}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
