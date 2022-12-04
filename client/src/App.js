import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import PrivateRoute from "./config/PrivateRoute";
import { memo, useState } from "react";
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
import SetCoursePromotion from "./pages/SetCoursePromotion/SetCoursePromotion";
import InstructorReviews from "./pages/InstructorReviews/InstructorReviews";
import InstructorPersonalInformation from "./pages/InstructorPersonalInformation/InstructorPersonalInformation";
import InstructorEditCourse from "./pages/InstructorEditCourse/InstructorEditCourse";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import TraineeTakeCourse from "./pages/TraineeTakeCourse/TraineeTakeCourse";
import ViewContract from "./pages/ViewContract/ViewContract";
import Error from "./pages/Error/Error.js";

function App() {
  const [error, setError] = useState(false);
  if (!localStorage.getItem("country"))
    localStorage.setItem("country", "United States");
  function fallBack({ resetErrorBoundary }) {
    resetErrorBoundary();
    return <Navigate to={"/error"} replace={true} />;
  }
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <ErrorBoundary
          FallbackComponent={fallBack}
          onReset={() => {
            setError(!error);
          }}
          resetKeys={[error]}
        >
          <Routes>
            <Route path='/error' element={<Error />}></Route>
            {/* Guest */}
            <Route
              path='/login'
              element={
                <PrivateRoute type={"guest"}>
                  <Login />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/signup'
              element={
                <PrivateRoute type={"guest"}>
                  <SignUp />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/'
              element={
                <PrivateRoute type={"guest"}>
                  <MainPage />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/courses'
              element={
                <PrivateRoute type={"guest"}>
                  <ViewCourses />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/courses/view-course'
              element={
                <PrivateRoute type={"guest"}>
                  <ViewDetailedCourse />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/courses/view-course/view-course-reviews'
              element={
                <PrivateRoute type={"guest"}>
                  <ViewCourseReviews />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/courses/view-course/view-instructor-reviews'
              element={
                <PrivateRoute type={"guest"}>
                  <InstructorReviews />
                </PrivateRoute>
              }
            ></Route>
            {/* Admin */}
            <Route
              path='/admin'
              element={
                <PrivateRoute type={"admin"}>
                  <AdminPage />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/admin/add-user'
              element={
                <PrivateRoute type={"admin"}>
                  <AdminAddUser />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/admin/courses'
              element={
                <PrivateRoute type={"admin"}>
                  <ViewCourses />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/admin/courses/view-course'
              element={
                <PrivateRoute type={"admin"}>
                  <ViewDetailedCourse />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/admin/courses/view-course/view-course-reviews'
              element={
                <PrivateRoute type={"admin"}>
                  <ViewCourseReviews />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/admin/courses/view-course/view-instructor-reviews'
              element={
                <PrivateRoute type={"admin"}>
                  <InstructorReviews />
                </PrivateRoute>
              }
            ></Route>
            {/* Individual */}
            <Route
              path='/individual-trainee/my-courses/view-course-details/view-instructor-reviews'
              element={
                <PrivateRoute type={"individual"}>
                  <InstructorReviews />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/individual-trainee/courses/view-course/view-instructor-reviews'
              element={
                <PrivateRoute type={"individual"}>
                  <InstructorReviews />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/individual-trainee/my-courses'
              element={
                <PrivateRoute type={"individual"}>
                  <TraineeMyCourses />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/individual-trainee/my-courses/view-course-details'
              element={
                <PrivateRoute type={"individual"}>
                  <TraineeMyCourseDetails />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/individual-trainee/my-courses/view-course-details/view-course-reviews'
              element={
                <PrivateRoute type={"individual"}>
                  <ViewCourseReviews />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/individual-trainee/courses/view-course/view-course-reviews'
              element={
                <PrivateRoute type={"individual"}>
                  <ViewCourseReviews />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/individual-trainee/courses/view-course'
              element={
                <PrivateRoute type={"individual"}>
                  <ViewDetailedCourse />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/individual-trainee/courses'
              element={
                <PrivateRoute type={"individual"}>
                  <ViewCourses />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/individual-trainee'
              element={
                <PrivateRoute type={"individual"}>
                  <TraineeProfile />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/individual-trainee/my-courses/view-course-details/take-course'
              element={
                <PrivateRoute type={"individual"}>
                  <TraineeTakeCourse />
                </PrivateRoute>
              }
            ></Route>
            {/* Corporate */}
            <Route
              path='/corporate-trainee/my-courses/view-course-details/view-instructor-reviews'
              element={
                <PrivateRoute type={"corporate"}>
                  <InstructorReviews />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/corporate-trainee/courses/view-course/view-instructor-reviews'
              element={
                <PrivateRoute type={"corporate"}>
                  <InstructorReviews />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/corporate-trainee/my-courses'
              element={
                <PrivateRoute type={"corporate"}>
                  <TraineeMyCourses />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/corporate-trainee/my-courses/view-course-details'
              element={
                <PrivateRoute type={"corporate"}>
                  <TraineeMyCourseDetails />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/corporate-trainee/my-courses/view-course-details/view-course-reviews'
              element={
                <PrivateRoute type={"corporate"}>
                  <ViewCourseReviews />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/corporate-trainee/courses/view-course/view-course-reviews'
              element={
                <PrivateRoute type={"corporate"}>
                  <ViewCourseReviews />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/corporate-trainee/courses/view-course'
              element={
                <PrivateRoute type={"corporate"}>
                  <ViewDetailedCourse />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/corporate-trainee/courses'
              element={
                <PrivateRoute type={"corporate"}>
                  <ViewCourses />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/corporate-trainee/my-courses/view-course-details/take-course'
              element={
                <PrivateRoute type={"corporate"}>
                  <TraineeTakeCourse />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/corporate-trainee'
              element={
                <PrivateRoute type={"corporate"}>
                  <TraineeProfile />
                </PrivateRoute>
              }
            ></Route>
            {/* Instructor */}
            <Route
              path='/instructor/my-personal-information'
              element={
                <PrivateRoute type={"instructor"}>
                  <InstructorPersonalInformation />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/instructor/my-courses'
              element={
                <PrivateRoute type={"instructor"}>
                  <Instructor />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/instructor/my-reviews'
              element={
                <PrivateRoute type={"instructor"}>
                  <InstructorReviews />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path='/instructor/my-courses/edit-course'
              element={
                <PrivateRoute type={"instructor"}>
                  <InstructorEditCourse />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/instructor/view-contract'
              element={
                <PrivateRoute type={"instructor"}>
                  <ViewContract />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/instructor/my-courses/view-course-reviews'
              element={
                <PrivateRoute type={"instructor"}>
                  <ViewCourseReviews />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path='/instructor/courses/view-course/view-course-reviews'
              element={
                <PrivateRoute type={"instructor"}>
                  <ViewCourseReviews />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/instructor/courses/view-course/view-instructor-reviews'
              element={
                <PrivateRoute type={"instructor"}>
                  <InstructorReviews />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/instructor/my-courses/set-course-promotion'
              element={
                <PrivateRoute type={"instructor"}>
                  <SetCoursePromotion />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/instructor/create-course'
              element={
                <PrivateRoute type={"instructor"}>
                  <InstructorCreateCourse />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/instructor/courses/view-course'
              element={
                <PrivateRoute type={"instructor"}>
                  <ViewDetailedCourse />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/instructor/courses'
              element={
                <PrivateRoute type={"instructor"}>
                  <ViewCourses />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path='/instructor'
              element={
                <PrivateRoute type={"instructor"}>
                  <InstructorProfile />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </ErrorBoundary>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default memo(App);
