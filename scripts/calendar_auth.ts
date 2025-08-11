export type CalendarEvent = {
  id?: string;
  summary?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
  organizer?: { displayName?: string };
  location?: string;
};

// 環境変数から認証情報を取得
const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
const calendarShinkanId = process.env.CALENDAR_SHINKAN_ID;
const calendarLessonId = process.env.CALENDAR_LESSON_ID;

async function getAccessToken(): Promise<string> {
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google OAuth env vars are missing");
  }

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
    const accessToken = await getAccessToken();

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
    return data.items;
  } catch (err) {
    console.log("error occured while fetching events from the calendar", err);
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
    const shinkanEvent: CalendarEvent[] =
      (await getEventListFromGoogleCalendar(timeMin, timeMax, 10, calendarShinkanId)) || [];
    const lessonEvent: CalendarEvent[] =
      (await getEventListFromGoogleCalendar(timeMin, timeMax, 10, calendarLessonId)) || [];
    const events = [...shinkanEvent.slice(0, 5), ...lessonEvent.slice(0, 8)];
    // sortEvents(events);
    return events;
  } catch (error) {
    console.error("error occured while fetching events. Error details: ", error);
    return null;
  }
}
