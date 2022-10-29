import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Instructor from "./pages/Instructor/Instructor";
import MainPage from "./pages/MainPage/MainPage";
import InstructorProfile from "./pages/InstructorProfile/InstructorProfile";
import InstructorCreateCourse from "./pages/InstructorCreateCourse/InstructorCreateCourse";
import ViewDetailedCourse from "./pages/ViewDetailedCourse/ViewDetailedCourse";
import ViewCourses from "./components/ViewCourses/ViewCourses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/instructor/courses' element={<Instructor />}></Route>
        <Route path='/instructor' element={<InstructorProfile />}></Route>
        <Route
          path='/instructor/create-course'
          element={<InstructorCreateCourse />}
        ></Route>
        <Route path='/course' element={<ViewDetailedCourse />}></Route>
        <Route path='/' element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
