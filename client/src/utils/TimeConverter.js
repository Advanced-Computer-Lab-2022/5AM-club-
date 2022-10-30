const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  let time = "";
  if (hours !== 0) time += hours + " hr";
  if (minutes !== 0) time += minutes + "m";
  return time;
};

module.exports = formatTime;
