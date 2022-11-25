const rates = require("./rates.json");
const countries = require("./Countries.json");
async function convert(value, from, to) {
  try {
    valueInFrom = value / rates[countries[from]];
    return valueInFrom * rates[countries[to]];
  } catch (e) {
    console.log(rates[countries[from]]);
    return value;
  }
}
module.exports = { convert };
