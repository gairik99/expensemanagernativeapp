export const formatteDate = (date) => {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${date.getFullYear()} - ${month} - ${day}`;
};
