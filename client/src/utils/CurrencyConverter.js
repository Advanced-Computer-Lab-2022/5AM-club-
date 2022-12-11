import rates from "./rates.json";
import countries from "./Countries.json";
export default async function convert(value, from, to) {
  try {
    const valueInFrom = value / rates[countries[from]];
    return Math.floor(valueInFrom * rates[countries[to]] + 0.5) - 0.01;
  } catch (e) {
    return Math.floor(value);
  }
}
