function conv2DOW(num: number) {
  switch (num) {
    case 0:
      return "月";
    case 1:
      return "火";
    case 2:
      return "水";
    case 3:
      return "木";
    case 4:
      return "金";
    case 5:
      return "土";
    case 6:
      return "日";
    default:
      return "";
  }
}

export function format_event_date(start_date: string | null | undefined, end_date: string | null | undefined): string {
  if (!start_date) {
    return "";
  }

  const sd = new Date(start_date);
  const month = sd.getMonth() + 1; // 月は0始まりなので1を加算
  const day = sd.getDate();
  const dayOfWeek = sd.getDay();
  const startHour = sd.getHours();
  const startMin = sd.getMinutes();

  const formattedMonth = month.toString().padStart(2, " ");
  const formattedDay = day.toString().padStart(2, " ");
  const formattedDOW = conv2DOW(dayOfWeek);
  const formattedStartHour = startHour.toString().padStart(2, " ");

  var formatted = `${formattedMonth}月${formattedDay}日（${formattedDOW}） ${formattedStartHour}時 - `;

  if (!end_date) {
    return formatted + `（終了時刻未定）`;
  }

  const ed = new Date(end_date);
  const endHour = ed.getHours();
  const endMin = ed.getMinutes();

  const formattedEndHour = endHour.toString().padStart(2, " ");

  formatted = `${formattedMonth}月${formattedDay}日（${formattedDOW}） ${formattedStartHour}時 - ${formattedEndHour}時`;

  // フォーマットされた日付文字列を返す
  return formatted;
}
