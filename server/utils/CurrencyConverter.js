async function convert(value, from, to) {
  if (value === 0) return 0;
  try {
    valueInFrom = value / rates[Countries[from]];
    return valueInFrom * rates[Countries[to]];
  } catch (e) {
    return value;
  }
}
module.exports = { convert };
