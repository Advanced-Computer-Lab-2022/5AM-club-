import axios from "axios";
import { memo } from "react";
import DropDown from "react-dropdown";
import "react-dropdown/style.css";
import countries from "../../utils/Countries.json";
import proxy from "../../utils/proxy.json";

function SelectCountry() {
  function changeCountry(e) {
    if (localStorage.getItem("type")) {
      axios.put(
        proxy.URL + "/" + localStorage.getItem("type") + "/set-country",
        {
          country: e.value,
        },
        {
          headers: {
            type: localStorage.getItem("type"),
            id: localStorage.getItem("id"),
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
