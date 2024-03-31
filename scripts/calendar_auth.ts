import dotenv from "dotenv";
import { google } from "googleapis";
import { calendar_v3 } from "googleapis";

dotenv.config();

// 環境変数から認証情報を取得
const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
const calendarShinkanId = process.env.CALENDAR_SHINKAN_ID;
const calendarLessonId = process.env.CALENDAR_LESSON_ID;

// 認証のための関数
const getGoogleOAuth = async () => {
  const googleOAuth = new google.auth.OAuth2(clientId, clientSecret, "http://localhost");

  // 毎回のリクエスト時に新しいアクセストークンを取得
  googleOAuth.setCredentials({
    refresh_token: refreshToken,
  });

  try {
    const accessTokenResponse = await googleOAuth.getAccessToken();

    const accessToken = accessTokenResponse.token;

    if (!accessToken) throw new Error("couldn't fetch valid access tokens");

    googleOAuth.setCredentials({
      access_token: accessToken,
    });

    return googleOAuth;
  } catch (err) {
    console.log("error details: ", err);
    throw new Error("error occured while fetching access tokens.");
  }
};

/**
 * @param timeMin new Date().toISOString() etc...
 * @param timeMax new Date().toISOString() etc...
 */
export const getEventListFromGoogleCalendar = async (
  timeMin: string,
  timeMax: string,
  maxResults: number,
  calendarId: string | undefined,
) => {
  try {
    // 認証
    const googleOAuth = await getGoogleOAuth();

    const calendar = google.calendar({ version: "v3", auth: googleOAuth });

    const res = await calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      maxResults,
      singleEvents: true,
      orderBy: "startTime",
      timeZone: "Asia/Tokyo",
    });

    console.log("calendar list : " + calendar.calendarList);

    if (!res.data.items) throw new Error("couldn't fetch events.");

    return res.data.items;
  } catch (err) {
    console.log("error occured while fetching events from the calendar", err);
  }
};

function sortEvents(events: calendar_v3.Schema$Event[]) {
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
    const shinkanEvent: calendar_v3.Schema$Event[] =
      (await getEventListFromGoogleCalendar(timeMin, timeMax, 10, calendarShinkanId)) || [];
    const lessonEvent: calendar_v3.Schema$Event[] =
      (await getEventListFromGoogleCalendar(timeMin, timeMax, 10, calendarLessonId)) || [];
    const events = [...shinkanEvent, ...lessonEvent];
    sortEvents(events);
    console.log(events);
    return events;
  } catch (error) {
    console.error("error occured while fetching events. Error details: ", error);
    return null;
  }
}
