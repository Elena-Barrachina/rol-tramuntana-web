import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rol Tramuntana",
    template: "%s | Rol Tramuntana",
  },
  description: "Associació cultural de rol i jocs de taula de Lleida.",
  icons: {
    icon: [{ url: "/icons/logo_b_trans.svg", type: "image/svg+xml" }],
    shortcut: ["/icons/logo_b_trans.svg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  );
}
