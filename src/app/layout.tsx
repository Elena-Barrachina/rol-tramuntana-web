import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rol Tramuntana",
    template: "%s | Rol Tramuntana",
  },
  description: "Associació cultural de rol i jocs de taula de Lleida.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  );
}
