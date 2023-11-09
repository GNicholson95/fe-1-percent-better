const getDayOfWeek = (date) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfWeek[date.getDay()];
};

const formatDate = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear() % 100; // Get last 2 digits of the year
  return `${padNumber(month)}/${padNumber(day)}/${padNumber(year)}`;
};

const formatTime = (date) => {
  const hours = padNumber(date.getHours());
  const minutes = padNumber(date.getMinutes());
  const seconds = padNumber(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
};

const padNumber = (number) => {
  return number.toString().padStart(2, "0");
};

export { getDayOfWeek, formatDate, formatTime };
