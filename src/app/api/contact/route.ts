import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT = "roltramuntana@gmail.com";
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ message: "Format de petició no vàlid." }, { status: 415 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Format de petició no vàlid." }, { status: 400 });
  }

  if (!isRecord(payload)) {
    return NextResponse.json({ message: "Format de petició no vàlid." }, { status: 400 });
  }

  const name = readText(payload.name, MAX_NAME_LENGTH);
  const email = readText(payload.email, MAX_EMAIL_LENGTH);
  const message = readText(payload.message, MAX_MESSAGE_LENGTH);
  const honeypot = readText(payload.website, MAX_NAME_LENGTH);

  if (honeypot) {
    return NextResponse.json({ message: "Missatge enviat." });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Omple el nom, l'adreça electrònica i el missatge." },
      { status: 400 },
    );
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ message: "L'adreça electrònica no és vàlida." }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");

  if (!gmailUser || !gmailAppPassword) {
    console.error("The contact form email service is not configured.");
    return NextResponse.json(
      { message: "El servei de correu no està disponible ara mateix." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: `Rol Tramuntana <${gmailUser}>`,
      to: [RECIPIENT],
      replyTo: email,
      subject: `Nou missatge del web de ${name}`,
      text: `Nom: ${name}\nAdreça electrònica: ${email}\n\nMissatge:\n${message}`,
      html: `<p><strong>Nom:</strong> ${escapeHtml(name)}</p><p><strong>Adreça electrònica:</strong> ${escapeHtml(email)}</p><p><strong>Missatge:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });
  } catch (error) {
    console.error("Gmail SMTP rejected the contact form message.", error);
    return NextResponse.json(
      { message: "No s'ha pogut enviar el missatge. Torna-ho a provar més tard." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Missatge enviat. Gràcies per escriure'ns!" });
}
