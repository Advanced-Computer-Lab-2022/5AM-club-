const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  let time = "";
  if (hours !== 0) time += hours + "hr ";
  if (minutes !== 0) time += minutes + "m";
  return time;
};

const displayNames = (instructors) => {
  if (instructors?.length > 0) {
    let result = instructors[0].username;
    for (let i = 1; i < instructors.length; i++) {
      result += ", " + instructors[i].username;
    }
    return result;
  } else {
    return "";
  }
};

const displayValues = (items) => {
  if (items?.length > 0) {
    let result = items[0];
    for (let i = 1; i < items.length; i++) {
      result += ", " + items[i];
    }
    return result;
  } else {
    return "";
  }
};

const hasEmptyString = (obj) => {
  for (let key in obj) {
    if (obj[key] === "") return true;
  }
  return false;
};

module.exports = { hasEmptyString, displayValues, displayNames, formatTime };
