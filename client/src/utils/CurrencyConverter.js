import rates from "./Rates.json";
import countries from "./Countries.json";
export default async function convert(value, from, to) {
  try {
    const valueInFrom = value / rates[countries[from]];
    return valueInFrom * rates[countries[to]];
  } catch (e) {
    return value;
  }
}
