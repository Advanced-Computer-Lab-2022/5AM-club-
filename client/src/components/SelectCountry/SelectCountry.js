import axios from "axios";
import { memo } from "react";
import DropDown from "react-dropdown";
import "react-dropdown/style.css";
import countries from "../../utils/Countries.json";
import proxy from "../../utils/proxy.json";

function SelectCountry() {
  function changeCountry(e) {
    if (true) {
      // TODO : Change to check on token
      localStorage.setItem("country", e.value);
      return;
    }
    axios.put(
      proxy.URL + "" + "/set-country", // TODO : Fill empty string with type from token
      {
        country: e.target.value,
      },
      {
        headers: {
          type: "", // TODO : Fill empty string with type from token
          id: "", // TODO : Fill empty string with id from token
        },
      }
    );
  }

  return (
    <DropDown
      onChange={changeCountry}
      options={Object.keys(countries).sort()}
      placeholder="" // TODO : Fill empty string with country from token, or localstorage
    ></DropDown>
  );
}

export default memo(SelectCountry);
