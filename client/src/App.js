import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Instructor from "./pages/Instructor/Instructor";
import MainPage from "./pages/MainPage/MainPage";
import InstructorProfile from "./pages/InstructorProfile/InstructorProfile";
import InstructorCreateCourse from "./pages/InstructorCreateCourse/InstructorCreateCourse";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/instructor/courses" element={<Instructor />}></Route>
        <Route path="/instructor" element={<InstructorProfile />}></Route>
        <Route
          path="/instructor/create-course"
          element={<InstructorCreateCourse />}
        ></Route>
        <Route path="/" element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
