import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

// 環境変数から認証情報を取得
const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
const calendarId = process.env.CALENDAR_ID;

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
export const getEventListFromGoogleCalendar = async (timeMin: string, timeMax: string, maxResults: number) => {
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
      timeZone: "Asia/Tokyo",
    });

    if (!res.data.items) throw new Error("couldn't fetch events.");

    return res.data.items;
  } catch (err) {
    console.log("error occured while fetching events from the calendar", err);
  }
};
