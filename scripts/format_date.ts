export function format_event_date(start_date: string | null | undefined, end_date: string | null | undefined): string {
  if (!start_date) {
    return "";
  }

  const sd = new Date(start_date);
  const month = sd.getMonth() + 1; // 月は0始まりなので1を加算
  const day = sd.getDate();
  const start_hour = sd.getHours();
  const start_min = sd.getMinutes();

  var formatted = `${month}月${day}日 ${start_hour}時 〜`;

  if (!end_date) {
    return formatted + `（終了時刻未定）`;
  }

  const ed = new Date(end_date);
  const end_hour = ed.getHours();
  const end_min = ed.getMinutes();

  formatted = `${month}月${day}日 ${start_hour}時 - ${end_hour}時`;

  // // 月と日を2桁に変換
  // const formattedMonth = month < 10 ? "0" + month : month.toString();
  // const formattedDay = day < 10 ? "0" + day : day.toString();

  // // 時間を0埋め
  // const formattedHour = hour < 10 ? "0" + hour : hour.toString();
  // const formattedMinute = minute < 10 ? "0" + minute : minute.toString();

  // フォーマットされた日付文字列を返す
  return formatted;
}
