/**
 * Date utilities — all dates use America/Mexico_City timezone.
 * Update MX_TIMEZONE if your project is in a different timezone.
 */

const MX_TIMEZONE = "America/Mexico_City";

/** Returns today's date as YYYY-MM-DD in Mexico City timezone. */
export function getTodayMX(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: MX_TIMEZONE });
}

/** Returns current hour (0-23) in Mexico City timezone. */
export function getCurrentHourMX(): number {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: MX_TIMEZONE,
      hour: "numeric",
      hour12: false,
    }).format(new Date())
  );
}

/** Formats a Date to YYYY-MM-DD in Mexico City timezone. */
export function formatDateMX(date: Date): string {
  return date.toLocaleDateString("en-CA", { timeZone: MX_TIMEZONE });
}

/** Returns the first day of a month as YYYY-MM-DD in Mexico City timezone. */
export function getFirstDayOfMonthMX(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: MX_TIMEZONE,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(date);
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  return `${year}-${month}-01`;
}

/**
 * Converts a naive datetime string (assumed Mexico City) to a UTC ISO string.
 * Use for filtering timestamptz columns in Supabase.
 */
export function localMXToUTC(naiveDatetime: string): string {
  const [datePart, timePart = "00:00:00"] = naiveDatetime.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);

  const probe = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: MX_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(probe);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  const mxAtProbe = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second")
  );
  const offsetMs = probe.getTime() - mxAtProbe;
  const targetUTC =
    Date.UTC(year, month - 1, day, hour, minute, second) + offsetMs;
  return new Date(targetUTC).toISOString();
}

/**
 * Returns UTC ISO boundaries for a given date in Mexico City timezone.
 * Use for filtering timestamptz columns by a local date range.
 */
export function getDateRangeMX(date: string): { start: string; end: string } {
  return {
    start: localMXToUTC(`${date}T00:00:00`),
    end: localMXToUTC(`${date}T23:59:59`),
  };
}
