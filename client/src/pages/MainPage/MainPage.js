import { useNavigate } from "react-router-dom";
import { memo } from "react";

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
        </>
    );
}
export default memo(MainPage);
