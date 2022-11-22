import { useNavigate } from "react-router-dom";
import { memo } from "react";
import SelectCountry from "../../components/SelectCountry/SelectCountry";
function AdminPage() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("add-user");
        }}
      >
        Add User
      </button>
      <SelectCountry></SelectCountry>
    </div>
  );
}
export default memo(AdminPage);
