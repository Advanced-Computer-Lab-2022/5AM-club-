import { useNavigate } from "react-router-dom";
import { memo } from "react";

import SelectCountry from "../../components/SelectCountry/SelectCountry";

function MainPage() {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate("courses");
        }}
      >
        View Courses
      </button>
      <SelectCountry></SelectCountry>
    </>
  );
}
export default memo(MainPage);
