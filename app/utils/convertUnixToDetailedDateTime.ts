export function convertUnixToDetailedDateTime(unixTime: number) {
  // convert seconds to milliseconds
  const date = new Date(unixTime * 1000);

  const hour = date.getHours();

  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Extracting components
  const dayOfWeek = formattedDate.split(",")[0];
  const monthAndDate = formattedDate.split(",")[1];
  const year = formattedDate.split(",")[2].trim();
  const time = formattedDate.split(" at ")[1];

  return {
    dayOfWeek,
    monthAndDate,
    year,
    time,
    hour,
    date,
  };
}
