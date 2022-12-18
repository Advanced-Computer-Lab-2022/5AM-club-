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

const hasNull = (arr) => {
  if (!arr) return true;
  if (arr.length === 0) return true;

  for (let e of arr) {
    if (e === null || e === undefined) return true;
  }
  return false;
};

const replaceAt = (arr, index, value) => {
  const ret = arr.slice(0);
  ret[index] = value;
  return ret;
};

// count percentage of true values in an array
const getProgress = (arr) => {
  let count = 0;
  if (!arr || arr.length === 0) return 0;
  for (let e of arr) {
    if (e) count++;
  }
  return count / arr.length;
};

const convertISO8601ToMs = (duration) => {
  var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  var hours = 0,
    minutes = 0,
    seconds = 0,
    totalseconds;

  if (reptms.test(duration)) {
    var matches = reptms.exec(duration);
    if (matches[1]) hours = Number(matches[1]);
    if (matches[2]) minutes = Number(matches[2]);
    if (matches[3]) seconds = Number(matches[3]);
    totalseconds = hours * 3600 + minutes * 60 + seconds;
  }
  return totalseconds;
};

const getSectionCount = (subtitles) => {
  let count = 0;
  for (let subtitle of subtitles) {
    count += subtitle.sections.length;
  }
  return count;
};

const getSubjectValues = (subjects) => {
  let subjectValues = [];
  for (let subject of subjects) {
    subjectValues.push(subject.value);
  }
  return subjectValues;
};

module.exports = {
  getSubjectValues,
  getSectionCount,
  replaceAt,
  hasEmptyString,
  displayValues,
  displayNames,
  formatTime,
  hasNull,
  getProgress,
  convertISO8601ToMs,
};
