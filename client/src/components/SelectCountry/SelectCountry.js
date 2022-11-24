import axios from "axios";
import { memo } from "react";
import DropDown from "react-dropdown";
import "react-dropdown/style.css";
import countries from "../../utils/Countries.json";
import proxy from "../../utils/proxy.json";
import { useSelector } from "react-redux";

function SelectCountry() {
  const token = useSelector((state) => state.token.value);
  function changeCountry(e) {
    if (!token) {
      localStorage.setItem("country", e.value);
      return;
    }
    axios.put(
      proxy.URL + "/" + token.type + "/set-country",
      {
        country: e.value,
      },
      {
        headers: {
          type: token.type,
          id: token.id,
        },
      }
    );
  }

  return (
    <DropDown
      onChange={changeCountry}
      options={Object.keys(countries).sort()}
      placeholder={token ? token.country : localStorage.getItem("country")}
    ></DropDown>
  );
}

export default memo(SelectCountry);
