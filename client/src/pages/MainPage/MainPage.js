import { useNavigate } from "react-router-dom";
import PageWrapper from "../../layouts/PageWrapper/PageWrapper";
function MainPage() {
  const navigate = useNavigate();
  return (
    <PageWrapper>
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
    </PageWrapper>
  );
}
export default MainPage;
