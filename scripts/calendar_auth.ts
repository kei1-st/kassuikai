import { getRequestContext } from "@cloudflare/next-on-pages";

export type CalendarEvent = {
  id?: string;
  summary?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
  organizer?: { displayName?: string };
  location?: string;
};

type Secrets = {
  clientId?: string;
  clientSecret?: string;
  refreshToken?: string;
  calendarShinkanId?: string;
  calendarLessonId?: string;
};

function maskString(value: string | undefined, visibleChars: number = 4): string {
  if (!value) return "<undefined>";
  if (value.length <= visibleChars) return `${value} (len=${value.length})`;
  const head = value.slice(0, visibleChars);
  const tail = value.slice(-visibleChars);
  return `${head}…${tail} (len=${value.length})`;
}

function readSecrets(): Secrets {
  let cfEnv: Record<string, string | undefined> = {};
  try {
    const { env } = getRequestContext();
    cfEnv = env as Record<string, string | undefined>;
  } catch (err) {
    // getRequestContext が無い環境はそのまま process.env を使う
    console.warn("getRequestContext() failed, falling back to process.env", err);
  }
  return {
    clientId: cfEnv["GOOGLE_OAUTH_CLIENT_ID"] ?? process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: cfEnv["GOOGLE_OAUTH_CLIENT_SECRET"] ?? process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    refreshToken: cfEnv["GOOGLE_OAUTH_REFRESH_TOKEN"] ?? process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    calendarShinkanId: cfEnv["CALENDAR_SHINKAN_ID"] ?? process.env.CALENDAR_SHINKAN_ID,
    calendarLessonId: cfEnv["CALENDAR_LESSON_ID"] ?? process.env.CALENDAR_LESSON_ID,
  };
}

async function getAccessToken({ clientId, clientSecret, refreshToken }: Secrets): Promise<string> {
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google OAuth env vars are missing");
  }

  console.log("[calendar] getAccessToken: starting refresh", {
    clientId: maskString(clientId),
    clientSecretPresent: Boolean(clientSecret),
    refreshTokenPresent: Boolean(refreshToken),
  });

  const params = new URLSearchParams();
  params.set("client_id", clientId);
  params.set("client_secret", clientSecret);
  params.set("refresh_token", refreshToken);
  params.set("grant_type", "refresh_token");

  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`failed to refresh token: ${resp.status} ${text}`);
  }

  const json = (await resp.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("no access token in response");
  console.log("[calendar] getAccessToken: token fetched successfully");
  return json.access_token;
}

/**
 * @param timeMin new Date().toISOString() etc...
 * @param timeMax new Date().toISOString() etc...
 */
export const getEventListFromGoogleCalendar = async (
  timeMin: string,
  timeMax: string,
  maxResults: number,
  calendarId: string | undefined,
): Promise<CalendarEvent[] | undefined> => {
  try {
    if (!calendarId) throw new Error("calendarId is missing");
    console.log("[calendar] getEventListFromGoogleCalendar: start", {
      calendarId: maskString(calendarId),
      timeMin,
      timeMax,
      maxResults,
    });
    const accessToken = await getAccessToken(readSecrets());

    const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`);
    url.searchParams.set("timeMin", timeMin);
    url.searchParams.set("timeMax", timeMax);
    url.searchParams.set("maxResults", String(maxResults));
    url.searchParams.set("singleEvents", "true");
    url.searchParams.set("orderBy", "startTime");
    url.searchParams.set("timeZone", "Asia/Tokyo");

    const resp = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`calendar api error: ${resp.status} ${text}`);
    }

    const data = (await resp.json()) as { items?: CalendarEvent[] };
    if (!data.items) throw new Error("couldn't fetch events.");
    console.log("[calendar] getEventListFromGoogleCalendar: success", {
      calendarId: maskString(calendarId),
      count: data.items?.length ?? 0,
    });
    return data.items;
  } catch (err) {
    console.error("[calendar] getEventListFromGoogleCalendar: error", {
      calendarId: maskString(calendarId),
      error: err,
    });
  }
};

function sortEvents(events: CalendarEvent[]) {
  events.sort((a, b) => {
    const dateA = new Date(a.start?.dateTime || a.start?.date || "");
    const dateB = new Date(b.start?.dateTime || b.start?.date || "");
    return dateA.getTime() - dateB.getTime();
  });
}

export async function fetchEvents() {
  const timeMin = new Date().toISOString();
  // １ヶ月先の予定までをフェッチする
  const timeMax = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  try {
    console.log("[calendar] fetchEvents: start", { timeMin, timeMax });
    const { calendarShinkanId, calendarLessonId } = readSecrets();
    console.log("[calendar] fetchEvents: calendar IDs", {
      calendarShinkanId: maskString(calendarShinkanId),
      calendarLessonId: maskString(calendarLessonId),
      shinkanPresent: Boolean(calendarShinkanId),
      lessonPresent: Boolean(calendarLessonId),
    });
    const shinkanEvent: CalendarEvent[] =
      (await getEventListFromGoogleCalendar(timeMin, timeMax, 10, calendarShinkanId)) || [];
    const lessonEvent: CalendarEvent[] =
      (await getEventListFromGoogleCalendar(timeMin, timeMax, 10, calendarLessonId)) || [];
    const events = [...shinkanEvent.slice(0, 5), ...lessonEvent.slice(0, 8)];
    // sortEvents(events);
    console.log("[calendar] fetchEvents: fetched", {
      shinkanCount: shinkanEvent.length,
      lessonCount: lessonEvent.length,
      combinedCount: events.length,
    });
    return events;
  } catch (error) {
    console.error("[calendar] fetchEvents: error", error);
    return null;
  }
}
