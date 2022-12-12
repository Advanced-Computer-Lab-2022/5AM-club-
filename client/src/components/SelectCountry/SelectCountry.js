import app from "../../utils/AxiosConfigs.js";
import { memo } from "react";
import DropDown from "react-dropdown";
import "react-dropdown/style.css";
import countries from "../../utils/Countries.json";
function SelectCountry() {
  function changeCountry(e) {
    if (localStorage.getItem("type")) {
      app.put(
        "/" +
          (localStorage.getItem("type") === "corporate" ||
          localStorage.getItem("type") === "individual"
            ? "trainee"
            : localStorage.getItem("type")) +
          "/set-country",
        {
          country: e.value,
        },
        {
          headers: {
            type: localStorage.getItem("type"),
          },
        }
      );
    }
    localStorage.setItem("country", e.value);
  }
  return (
    <DropDown
      onChange={changeCountry}
      options={Object.keys(countries).sort()}
      placeholder={localStorage.getItem("country")}
    ></DropDown>
  );
}

export default memo(SelectCountry);
