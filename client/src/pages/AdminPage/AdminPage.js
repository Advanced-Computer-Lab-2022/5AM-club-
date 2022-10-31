import { useNavigate } from "react-router-dom";
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
        add User
      </button>
      <SelectCountry type="admin" id="635e98ca99ecb836d834f7fc"></SelectCountry>
    </div>
  );
}
export default AdminPage;
