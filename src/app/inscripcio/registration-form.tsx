"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type FormStatus =
  | { type: "idle" }
  | { type: "sending" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const DNI_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";

function isValidDniNie(value: string) {
  const document = value.toUpperCase().replace(/[\s-]/g, "");
  const dni = document.match(/^(\d{8})([A-Z])$/);
  const nie = document.match(/^([XYZ])(\d{7})([A-Z])$/);

  if (dni) {
    return DNI_LETTERS[Number(dni[1]) % 23] === dni[2];
  }

  if (nie) {
    const prefix = { X: "0", Y: "1", Z: "2" }[nie[1]];
    return DNI_LETTERS[Number(`${prefix}${nie[2]}`) % 23] === nie[3];
  }

  return false;
}

function getAge(dateValue: string) {
  if (!dateValue) return undefined;

  const birthDate = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return undefined;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasHadBirthday) age -= 1;
  return age;
}

function normalisePhone(value: string) {
  return value.replace(/[\s().-]/g, "");
}

function isValidPhoneNumber(phone: string) {
  return /^[6789]\d{8}$/.test(normalisePhone(phone));
}

export function RegistrationForm() {
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });
  const [requiresParentalAuthorisation, setRequiresParentalAuthorisation] = useState(false);
  const [dniError, setDniError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  function handleBirthDateValue(value: string) {
    const age = getAge(value);
    const isTooYoung = age !== undefined && age < 14;

    setBirthDateError(isTooYoung ? "Per inscriure't has de tenir com a mínim 14 anys." : "");
    setRequiresParentalAuthorisation(age !== undefined && age >= 14 && age < 18);
  }

  function handleDniBlur(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.trim();
    setDniError(value && !isValidDniNie(value) ? "Introdueix un DNI o NIE espanyol vàlid." : "");
  }

  function validatePhone(phone: string) {
    setPhoneError(phone && !isValidPhoneNumber(phone) ? "Introdueix un número espanyol vàlid de 9 xifres." : "");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const dni = formData.get("dniNie");
    const birthDate = formData.get("birthDate");
    const phone = formData.get("phone");
    const age = typeof birthDate === "string" ? getAge(birthDate) : undefined;

    if (typeof dni !== "string" || !isValidDniNie(dni)) {
      setDniError("Introdueix un DNI o NIE espanyol vàlid.");
      return;
    }

    if (age !== undefined && age < 14) {
      setBirthDateError("Per inscriure't has de tenir com a mínim 14 anys.");
      return;
    }

    if (
      typeof phone !== "string" ||
      !isValidPhoneNumber(phone)
    ) {
      setPhoneError("Introdueix un número espanyol vàlid de 9 xifres.");
      return;
    }

    setDniError("");
    setBirthDateError("");
    setPhoneError("");
    setStatus({ type: "sending" });

    try {
      const response = await fetch("/api/inscripcio", { method: "POST", body: new FormData(form) });
      const result: { message?: string } = await response.json();

      if (!response.ok) throw new Error(result.message ?? "No s'ha pogut enviar la inscripció.");

      form.reset();
      setRequiresParentalAuthorisation(false);
      setStatus({ type: "success", message: result.message ?? "Inscripció enviada. Gràcies!" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "No s'ha pogut enviar la inscripció.",
      });
    }
  }

  const isSending = status.type === "sending";

  return (
    <form className="contact-form registration-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-field">
        <label htmlFor="registration-name">Nom</label>
        <input
          id="registration-name"
          name="name"
          autoComplete="given-name"
          required
          maxLength={100}
          pattern="[\p{L}\p{M}\s'-]+"
          title="Utilitza només lletres, espais, apòstrofs i guionets."
        />
      </div>
      <div className="form-field">
        <label htmlFor="registration-surnames">Cognoms</label>
        <input
          id="registration-surnames"
          name="surnames"
          autoComplete="family-name"
          required
          maxLength={150}
          pattern="[\p{L}\p{M}\s'-]+"
          title="Utilitza només lletres, espais, apòstrofs i guionets."
        />
      </div>
      <div className="form-field">
        <label htmlFor="registration-dni">DNI/NIE</label>
        <input
          id="registration-dni"
          name="dniNie"
          autoComplete="off"
          required
          maxLength={12}
          aria-describedby={dniError ? "registration-dni-error" : undefined}
          aria-invalid={Boolean(dniError)}
          onBlur={handleDniBlur}
        />
        {dniError ? <p className="field-error" id="registration-dni-error">{dniError}</p> : null}
      </div>
      <div className="form-field">
        <label htmlFor="registration-birth-date">Data de naixement</label>
        <input
          id="registration-birth-date"
          name="birthDate"
          type="date"
          autoComplete="bday"
          max={today}
          required
          aria-describedby={
            birthDateError
              ? "registration-birth-date-error"
              : requiresParentalAuthorisation
                ? "registration-birth-date-warning"
                : undefined
          }
          aria-invalid={Boolean(birthDateError)}
          onInput={(event) => handleBirthDateValue(event.currentTarget.value)}
          onChange={(event) => handleBirthDateValue(event.currentTarget.value)}
        />
        {birthDateError ? <p className="field-warning" id="registration-birth-date-error">{birthDateError}</p> : null}
        {requiresParentalAuthorisation && !birthDateError ? (
          <p className="field-warning" id="registration-birth-date-warning">
            Els menors d&apos;edat necessiten autorització dels seus tutors legals per a inscriure&apos;s.
          </p>
        ) : null}
      </div>
      {requiresParentalAuthorisation ? (
        <div className="form-field">
          <label htmlFor="registration-parental-authorisation">Autorització de tutors legals</label>
          <input
            id="registration-parental-authorisation"
            name="parentalAuthorisation"
            type="file"
            accept="application/pdf,image/jpeg,image/png"
            required
          />
          <p className="field-hint">Adjunta l&apos;autorització signada pels tutors legals en PDF, JPG o PNG (màxim 10 MB).</p>
        </div>
      ) : null}
      <div className="form-field">
        <label htmlFor="registration-email">Correu electrònic</label>
        <input id="registration-email" name="email" type="email" autoComplete="email" required maxLength={254} />
      </div>
      <div className="form-field">
        <label htmlFor="registration-phone">Telèfon de contacte</label>
        <input
          id="registration-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required
          maxLength={20}
          pattern="[\d\s().-]+"
          title="Introdueix un número espanyol de 9 xifres."
          aria-describedby={phoneError ? "registration-phone-error" : undefined}
          aria-invalid={Boolean(phoneError)}
          onBlur={(event) => validatePhone(event.currentTarget.value)}
        />
      </div>
      {phoneError ? <p className="field-error" id="registration-phone-error">{phoneError}</p> : null}
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="registration-website">No omplis aquest camp</label>
        <input id="registration-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" disabled={isSending}>{isSending ? "Enviant..." : "Envia la inscripció"}</button>
      {status.type !== "idle" && status.type !== "sending" ? (
        <p className={`form-status form-status--${status.type}`} role="status" aria-live="polite">{status.message}</p>
      ) : null}
    </form>
  );
}
