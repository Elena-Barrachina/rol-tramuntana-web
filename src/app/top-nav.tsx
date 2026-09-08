import Link from "next/link";

type Section = "home" | "qui-som" | "arxiu" | "contacte";

const sections: Array<{ href: string; label: string; id: Section }> = [
  { href: "/", label: "Rol Tramuntana", id: "home" },
  { href: "/qui-som", label: "Qui Som", id: "qui-som" },
  { href: "/arxiu", label: "Arxiu", id: "arxiu" },
  { href: "/contacte", label: "Contacte", id: "contacte" },
];

export function TopNav({ current }: { current?: Section }) {
  return (
    <nav className="top-nav" aria-label="Navegació principal">
      {sections.map((section, index) => (
        <span className="top-nav-item" key={section.id}>
          {index > 0 && <span className="top-nav-separator" aria-hidden="true">·</span>}
          <Link href={section.href} aria-current={current === section.id ? "page" : undefined}>
            {section.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
