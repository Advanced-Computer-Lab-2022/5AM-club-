import { BrowserRouter, Route, Routes } from "react-router-dom";
import { memo } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Instructor from "./pages/InstructorMyCourses/InstructorMyCourses";
import TraineeMyCourses from "./pages/TraineeMyCourses/TraineeMyCourses";
import MainPage from "./pages/MainPage/MainPage";
import InstructorProfile from "./pages/InstructorProfile/InstructorProfile";
import InstructorCreateCourse from "./pages/InstructorCreateCourse/InstructorCreateCourse";
import ViewDetailedCourse from "./pages/ViewDetailedCourse/ViewDetailedCourse";
import TraineeMyCourseDetails from "./pages/TraineeMyCourseDetails/TraineeMyCourseDetails";
import ViewCourses from "./pages/ViewCourses/ViewCourses";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import TraineeProfile from "./pages/TraineeProfile/TraineeProfile";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminAddUser from "./pages/AdminAddUser/AdminAddUser";
import ViewCourseReviews from "./pages/ViewCourseReviews/ViewCourseReviews";
import TraineeViewCourseReviews from "./pages/TraineeViewCourseReviews/TraineeViewCourseReviews";
import SetCoursePromotion from "./pages/SetCoursePromotion/SetCoursePromotion";
import InstructorReviews from "./pages/InstructorReviews/InstructorReviews";
import InstructorPersonalInformation from "./pages/InstructorPersonalInformation/InstructorPersonalInformation";
import { useDispatch } from "react-redux";
import { set } from "./utils/TokenSlice";
import InstructorEditCourse from "./pages/InstructorEditCourse/InstructorEditCourse";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import TraineeTakeCourse from "./pages/TraineeTakeCourse/TraineeTakeCourse";
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
          <Route
            path="/instructor/my-personal-information"
            element={<InstructorPersonalInformation />}
          ></Route>
          <Route
            path="/individual-trainee/my-courses"
            element={<TraineeMyCourses />}
          ></Route>
          <Route
            path="/corporate-trainee/my-courses"
            element={<TraineeMyCourses />}
          ></Route>
          <Route
            path="/individual-trainee/my-courses/view-course-details"
            element={<TraineeMyCourseDetails />}
          ></Route>
          <Route
            path="/corporate-trainee/my-courses/view-course-details"
            element={<TraineeMyCourseDetails />}
          ></Route>
          <Route
            path="/individual-trainee/my-courses/view-course-details/view-course-reviews"
            element={<TraineeViewCourseReviews />}
          ></Route>
          <Route
            path="/corporate-trainee/my-courses/view-course-details/view-course-reviews"
            element={<TraineeViewCourseReviews />}
          ></Route>
          <Route path="/instructor/my-courses" element={<Instructor />}></Route>
          <Route
            path="/instructor/my-reviews"
            element={<InstructorReviews />}
          ></Route>
          <Route
            path="/instructor/my-courses/edit-course"
            element={<InstructorEditCourse />}
          ></Route>
          <Route
            path="/instructor/my-courses/view-course-reviews"
            element={<ViewCourseReviews />}
          ></Route>
          <Route
            path="/instructor/my-courses/set-course-promotion"
            element={<SetCoursePromotion />}
          ></Route>
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
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/" element={<MainPage />}></Route>
          <Route
            path="/individual-trainee/take-course"
            element={<TraineeTakeCourse />}
          ></Route>
          <Route
            path="/corporate-trainee/take-course"
            element={<TraineeTakeCourse />}
          ></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default memo(App);
