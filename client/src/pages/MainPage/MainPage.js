import { useNavigate } from "react-router-dom";
function MainPage() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/instructor");
        }}
      >
        Instructor Page
      </button>
      <button>Trainee Page</button>
      <button>Admin Page</button>
    </div>
  );
}
export default MainPage;
