import axios from "axios";
import { useUpdateEffect } from "react-use";
import { useState } from "react";
import DropDown from "react-dropdown";
import "react-dropdown/style.css";
import countries from "../../utils/Countries.json";
function SelectCountry(props) {
  const [country, setCountry] = useState();
  useUpdateEffect(() => {
    if (!props.type) {
      localStorage.setItem("country", country);
      return;
    }
    axios
      .put(
        "http://localhost:4000/" + props.type + "/set-country",
        {
          country: country,
        },
        {
          headers: {
            type: props.type,
            id: props.id,
          },
        }
      )
      .then(() => {})
      .catch(() => {
        setCountry("United States");
      });
  }, [country]);
  return (
    <DropDown
      onChange={(e) => {
        setCountry(e.value);
      }}
      options={countries.values.map((e) => {
        return e.name;
      })}
      placeholder="Select your Country"
    ></DropDown>
  );
}

export default SelectCountry;
