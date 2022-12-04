const rates = require("./rates.json");
const countries = require("./Countries.json");
async function convert(value, from, to) {
  try {
    const valueInFrom = value / rates[countries[from]];
    return valueInFrom * rates[countries[to]];
  } catch (e) {
    return value;
  }
}
module.exports = { convert };
