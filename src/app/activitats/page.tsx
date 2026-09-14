import { TopNav } from "../top-nav";

const calendarIds = (process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_IDS ?? "")
  .split(",")
  .map((calendarId) => calendarId.trim())
  .filter(Boolean);

function calendarEmbedUrl(calendars: string[], mode: "MONTH" | "AGENDA") {
  const query = new URLSearchParams({
    ctz: "Europe/Madrid",
    mode,
    showTitle: "0",
    showPrint: "0",
    showTabs: "0",
    showCalendars: "0",
  });

  calendars.forEach((calendarId) => query.append("src", calendarId));

  return `https://calendar.google.com/calendar/embed?${query.toString()}`;
}

export default function ActivitatsPage() {
  return (
    <main className="main-surface">
      <TopNav current="activitats" />
      <div className="window-title">roltramuntana.cat :: activitats</div>
      <section className="inner-page" aria-labelledby="page-title">
        <p className="eyebrow">Rol Tramuntana</p>
        <h1 id="page-title">Activitats</h1>
        <p>Aquí hi trobaràs les properes partides, jornades i activitats de l&apos;associació.</p>
        {calendarIds.length > 0 ? (
          <section className="activities-calendar" aria-labelledby="calendar-title">
            <h2 id="calendar-title">Properes activitats</h2>
            <iframe
              className="google-calendar google-calendar--month"
              title="Calendari d&apos;activitats de Rol Tramuntana"
              src={calendarEmbedUrl(calendarIds, "MONTH")}
              loading="lazy"
            />
            <iframe
              className="google-calendar google-calendar--agenda"
              title="Agenda d&apos;activitats de Rol Tramuntana"
              src={calendarEmbedUrl(calendarIds, "AGENDA")}
              loading="lazy"
            />
          </section>
        ) : (
          <p className="calendar-empty">El calendari d&apos;activitats estarà disponible ben aviat.</p>
        )}
      </section>
    </main>
  );
}
