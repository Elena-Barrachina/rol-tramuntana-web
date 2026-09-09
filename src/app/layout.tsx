import type { Metadata } from "next";
import { arimo, atkinson } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rol Tramuntana",
    template: "%s | Rol Tramuntana",
  },
  description: "Associació Cultural de Rol Tramuntana - Lleida",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ca"
      className={`${atkinson.variable} ${arimo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
