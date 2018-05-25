//get Date and formating: Wed May 23 2018 10:56am
export function dateNow() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let getDate = new Date();
  let dayName = days[getDate.getDay()];
  let ampm = "am";
  let h = getDate.getHours();
  if (h >= 12) {
    if (h === 12) {
      h = 12;
    } else {
      h -= 12;
    }
    ampm = "pm";
  }
  let m = getDate.getMinutes();
  if (m < 10) {
    m = "0" + m;
  }
  let s = getDate.getSeconds();
  if (s < 10) {
    s = "0" + s;
  }
  let now =
    dayName +
    ", " +
    (getDate.getMonth() + 1) +
    "/" +
    getDate.getDay() +
    "/" +
    getDate.getFullYear() +
    ", " +
    h +
    ":" +
    m +
    ":" +
    s +
    " " +
    ampm;
  return now;
}

export function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
