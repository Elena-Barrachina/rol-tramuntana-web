import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT = "roltramuntana@gmail.com";
const DNI_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);
const NAME_PATTERN = /^(?=.*\p{L})[\p{L}\p{M}\s'-]+$/u;

function readText(value: FormDataEntryValue | null, maxLength: number) {
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

function isValidDniNie(value: string) {
  const document = value.toUpperCase().replace(/[\s-]/g, "");
  const dni = document.match(/^(\d{8})([A-Z])$/);
  const nie = document.match(/^([XYZ])(\d{7})([A-Z])$/);

  if (dni) return DNI_LETTERS[Number(dni[1]) % 23] === dni[2];
  if (!nie) return false;

  const prefix = { X: "0", Y: "1", Z: "2" }[nie[1]];
  return DNI_LETTERS[Number(`${prefix}${nie[2]}`) % 23] === nie[3];
}

function isValidName(value: string) {
  return NAME_PATTERN.test(value);
}

function normalisePhone(value: string) {
  return value.replace(/[\s().-]/g, "");
}

function isValidPhoneNumber(prefix: string, phone: string) {
  if (!/^\+\d{1,3}$/.test(prefix)) return false;

  const digits = normalisePhone(phone);
  if (!/^\d+$/.test(digits)) return false;
  if (prefix === "+34") return /^[6789]\d{8}$/.test(digits);

  return digits.length >= 4 && digits.length <= 15 - (prefix.length - 1);
}

function isValidBirthDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00`);
  const [year, month, day] = value.split("-").map(Number);
  return (
    !Number.isNaN(date.getTime()) &&
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date <= new Date()
  );
}

function isUnderFourteen(value: string) {
  const birthDate = new Date(`${value}T00:00:00`);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasHadBirthday) age -= 1;
  return age < 14;
}

function requiresParentalAuthorisation(value: string) {
  const birthDate = new Date(`${value}T00:00:00`);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasHadBirthday) age -= 1;
  return age >= 14 && age < 18;
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
    return NextResponse.json({ message: "Format de petició no vàlid." }, { status: 415 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "Format de petició no vàlid." }, { status: 400 });
  }

  const name = readText(formData.get("name"), 100);
  const surnames = readText(formData.get("surnames"), 150);
  const dniNie = readText(formData.get("dniNie"), 12);
  const birthDate = readText(formData.get("birthDate"), 10);
  const email = readText(formData.get("email"), 254);
  const phonePrefix = readText(formData.get("phonePrefix"), 4);
  const phone = readText(formData.get("phone"), 30);
  const honeypot = readText(formData.get("website"), 100);

  if (honeypot) return NextResponse.json({ message: "Inscripció enviada." });

  if (!name || !surnames || !dniNie || !birthDate || !email || !phonePrefix || !phone) {
    return NextResponse.json({ message: "Omple tots els camps obligatoris." }, { status: 400 });
  }
  if (!isValidName(name) || !isValidName(surnames)) {
    return NextResponse.json(
      { message: "El nom i els cognoms només poden contenir lletres, espais, apòstrofs i guionets." },
      { status: 400 },
    );
  }
  if (!isValidDniNie(dniNie)) {
    return NextResponse.json({ message: "El DNI o NIE no és vàlid." }, { status: 400 });
  }
  if (!isValidBirthDate(birthDate)) {
    return NextResponse.json({ message: "La data de naixement no és vàlida." }, { status: 400 });
  }
  if (isUnderFourteen(birthDate)) {
    return NextResponse.json({ message: "Per inscriure't has de tenir com a mínim 14 anys." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ message: "L'adreça electrònica no és vàlida." }, { status: 400 });
  }
  if (!isValidPhoneNumber(phonePrefix, phone)) {
    return NextResponse.json({ message: "El número de telèfon no és vàlid." }, { status: 400 });
  }

  const needsAuthorisation = requiresParentalAuthorisation(birthDate);
  const authorisation = formData.get("parentalAuthorisation");
  const attachment = authorisation instanceof File && authorisation.size > 0 ? authorisation : undefined;

  if (needsAuthorisation && !attachment) {
    return NextResponse.json(
      { message: "Cal adjuntar l'autorització dels tutors legals per a persones de 14 a 17 anys." },
      { status: 400 },
    );
  }
  if (attachment && (!ALLOWED_FILE_TYPES.has(attachment.type) || attachment.size > MAX_FILE_SIZE)) {
    return NextResponse.json(
      { message: "L'autorització dels tutors legals ha de ser un PDF, JPG o PNG de màxim 10 MB." },
      { status: 400 },
    );
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!gmailUser || !gmailAppPassword) {
    console.error("The registration form email service is not configured.");
    return NextResponse.json({ message: "El servei de correu no està disponible ara mateix." }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  const text = [
    `Nom: ${name}`,
    `Cognoms: ${surnames}`,
    `DNI/NIE: ${dniNie.toUpperCase()}`,
    `Data de naixement: ${birthDate}`,
    `Correu electrònic: ${email}`,
    `Telèfon de contacte: ${phonePrefix} ${normalisePhone(phone)}`,
    attachment ? `Autorització de tutors legals adjunta: ${attachment.name}` : "Autorització de tutors legals: no requerida",
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `Rol Tramuntana <${gmailUser}>`,
      to: [RECIPIENT],
      replyTo: email,
      subject: `Nova inscripció: ${name} ${surnames}`,
      text,
      html: text.split("\n").map((line) => `<p>${escapeHtml(line)}</p>`).join(""),
      attachments: attachment
        ? [{ filename: attachment.name.replace(/[^a-zA-Z0-9._-]/g, "_"), content: Buffer.from(await attachment.arrayBuffer()) }]
        : [],
    });
  } catch (error) {
    console.error("Gmail SMTP rejected the registration form message.", error);
    return NextResponse.json({ message: "No s'ha pogut enviar la inscripció. Torna-ho a provar més tard." }, { status: 502 });
  }

  try {
    await transporter.sendMail({
      from: `Rol Tramuntana <${gmailUser}>`,
      to: [email],
      subject: "Hem rebut la teva inscripció a Rol Tramuntana",
      text: `Hola, ${name}!

Benvingut/da a Rol Tramuntana!

Hem rebut la teva sol·licitud per inscriure't a l'associació. Ens fa molta il·lusió que vulguis formar part de la comunitat; la revisarem i ens posarem en contacte amb tu tan aviat com puguem.

La quota anual de soci és de 12 € i inclou:
- accés als canals de WhatsApp i Discord de l'associació;
- la samarreta de Rol Tramuntana;
- la possibilitat de reservar espais per muntar les teves partides.

Fins ben aviat!

L'equip de Rol Tramuntana`,
      html: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0;padding:24px 12px;background:#e3d6a1;font-family:Arial,Helvetica,sans-serif;color:#1c1c1c"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;border:2px solid #1c1c1c;background:#fffafb"><tr><td style="padding:12px 20px;background:#066666;border-bottom:2px solid #1c1c1c;color:#fffafb;font-family:'Courier New',monospace;font-size:13px;font-weight:bold">roltramuntana.cat :: inscripció</td></tr><tr><td style="padding:30px 28px"><p style="margin:0 0 8px;color:#066666;font-size:12px;font-weight:bold;letter-spacing:1.5px">ROL TRAMUNTANA</p><h1 style="margin:0 0 22px;font-size:30px;line-height:1.1">Benvingut/da!</h1><p style="margin:0 0 16px;font-size:16px;line-height:1.55">Hola, ${escapeHtml(name)}!</p><p style="margin:0 0 16px;font-size:16px;line-height:1.55">Hem rebut la teva sol·licitud per inscriure&apos;t a l&apos;associació. Ens fa molta il·lusió que vulguis formar part de la comunitat; la revisarem i ens posarem en contacte amb tu tan aviat com puguem.</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0;border:2px solid #1c1c1c;background:#e3d6a1"><tr><td style="padding:14px 16px;font-size:16px;line-height:1.45"><p style="margin:0 0 8px"><strong>Quota anual de soci: 12 €</strong></p><p style="margin:0 0 6px">Amb ella tindràs:</p><ul style="margin:0;padding-left:20px"><li style="margin:0 0 4px">Accés als canals de WhatsApp i Discord de l&apos;associació.</li><li style="margin:0 0 4px">La samarreta de Rol Tramuntana.</li><li style="margin:0">La possibilitat de reservar espais per muntar les teves partides.</li></ul></td></tr></table><p style="margin:0;font-size:16px;line-height:1.55">Fins ben aviat!</p><p style="margin:18px 0 0;font-size:16px;line-height:1.55"><strong>L&apos;equip de Rol Tramuntana</strong></p></td></tr></table></td></tr></table>`,
    });
  } catch (error) {
    console.error("Gmail SMTP rejected the registration confirmation email.", error);
    return NextResponse.json({
      message: "Inscripció enviada. No s'ha pogut enviar el correu de confirmació, però ens posarem en contacte amb tu.",
    });
  }

  return NextResponse.json({
    message: "Inscripció enviada. Rebràs un correu de confirmació en uns instants.",
  });
}
