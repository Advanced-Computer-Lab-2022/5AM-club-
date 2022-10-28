const CountryToCurrency = require("country-to-currency");
const EasyCurrencies = require("easy-currencies");

async function convert(value, from, to) {
  return EasyCurrencies.Convert(value).from(CountryToCurrency[from]).to(to);
}
module.exports = { convert: convert };
