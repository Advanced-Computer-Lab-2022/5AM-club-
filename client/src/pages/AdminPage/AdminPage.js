import { useNavigate } from "react-router-dom";

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
    </div>
  );
}
export default AdminPage;
