"use client";

import { FormEvent, useState } from "react";

type FormStatus =
  | { type: "idle" }
  | { type: "sending" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({ type: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      const result: { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "No s'ha pogut enviar el missatge.");
      }

      form.reset();
      setStatus({
        type: "success",
        message: result.message ?? "Missatge enviat. Gràcies per escriure'ns!",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "No s'ha pogut enviar el missatge. Torna-ho a provar més tard.",
      });
    }
  }

  const isSending = status.type === "sending";

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="contact-name">Nom</label>
        <input id="contact-name" name="name" autoComplete="name" required maxLength={100} />
      </div>

      <div className="form-field">
        <label htmlFor="contact-email">Adreça electrònica</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
        />
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">Missatge</label>
        <textarea id="contact-message" name="message" rows={8} required maxLength={5_000} />
      </div>

      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">No omplis aquest camp</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={isSending}>
        {isSending ? "Enviant..." : "Envia el missatge"}
      </button>

      {status.type !== "idle" && status.type !== "sending" ? (
        <p
          className={`form-status form-status--${status.type}`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
