const CountryToCurrency = require("country-to-currency");
const EasyCurrencies = require("easy-currencies");
const countries = require("./Countries.json");

async function convert(value, from, to) {
  return EasyCurrencies.Convert(value)
    .from(CountryToCurrency[countries.values.find((e) => e.name === from).code])
    .to(to);
}
module.exports = { convert: convert };
