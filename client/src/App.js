import { BrowserRouter, Route, Routes } from "react-router-dom";
import { memo } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Instructor from "./pages/InstructorMyCourses/InstructorMyCourses";
import MainPage from "./pages/MainPage/MainPage";
import InstructorProfile from "./pages/InstructorProfile/InstructorProfile";
import InstructorCreateCourse from "./pages/InstructorCreateCourse/InstructorCreateCourse";
import ViewDetailedCourse from "./pages/ViewDetailedCourse/ViewDetailedCourse";
import ViewCourses from "./pages/ViewCourses/ViewCourses";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import TraineeProfile from "./pages/TraineeProfile/TraineeProfile";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminAddUser from "./pages/AdminAddUser/AdminAddUser";
import { useDispatch } from "react-redux";
import { set } from "./utils/TokenSlice";

function App() {
  const dispatch = useDispatch();
  if (localStorage.getItem("token")) {
    dispatch(set(localStorage.getItem("token")));
  }
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/admin/add-user" element={<AdminAddUser />}></Route>
          <Route path="/instructor/my-courses" element={<Instructor />}></Route>
          <Route
            path="/instructor/create-course"
            element={<InstructorCreateCourse />}
          ></Route>
          <Route
            path="/individual-trainee/courses/view-course"
            element={<ViewDetailedCourse />}
          ></Route>
          <Route
            path="/corporate-trainee/courses/view-course"
            element={<ViewDetailedCourse />}
          ></Route>
          <Route
            path="/individual-trainee/courses"
            element={<ViewCourses />}
          ></Route>
          <Route
            path="/corporate-trainee/courses"
            element={<ViewCourses />}
          ></Route>
          <Route
            path="/instructor/courses/view-course"
            element={<ViewDetailedCourse />}
          ></Route>
          <Route path="/instructor/courses" element={<ViewCourses />}></Route>
          <Route
            path="/admin/courses/view-course"
            element={<ViewDetailedCourse />}
          ></Route>
          <Route path="/admin/courses" element={<ViewCourses />}></Route>
          <Route path="/courses" element={<ViewCourses />}></Route>
          <Route
            path="/courses/view-course"
            element={<ViewDetailedCourse />}
          ></Route>
          <Route path="/instructor" element={<InstructorProfile />}></Route>
          <Route
            path="/individual-trainee"
            element={<TraineeProfile />}
          ></Route>
          <Route path="/corporate-trainee" element={<TraineeProfile />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/" element={<MainPage />}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default memo(App);
