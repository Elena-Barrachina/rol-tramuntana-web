import { Arimo, Atkinson_Hyperlegible } from "next/font/google";

export const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
  variable: "--font-atkinson",
  display: "swap",
});

export const arimo = Arimo({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal"],
  variable: "--font-arial",
  display: "swap",
});