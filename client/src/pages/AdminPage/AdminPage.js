import { useNavigate } from "react-router-dom";
import { memo } from "react";
import SelectCountry from "../../components/SelectCountry/SelectCountry";
import updateToken from "../../utils/updateToken";
function AdminPage() {
    const navigate = useNavigate();
    //const user = window.localStorage.getItem("user");
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
