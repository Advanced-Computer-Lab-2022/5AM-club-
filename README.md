# 5AM-club-

## Canadian Chamber of Commerce Learning Platform
Canadian Chamber of Commerce Learning Platform is an online learning and teaching platform meant to allow both students
and instructors to be in one simple to use and convenient platform for learning.

## Motivation
As students, we created this project simply because we needed something like it, a place where
quality learning can be found with the touch a button. Also as Computer Science students we needed 
to practice/learn web development, as it is the most popular form of Software development in recent years, so this project
was a great entry and got us familiar with the technologies used in that particular field.
It is also part of our curriculum CSEN 704.

## Build Status
The project is complete as of January 2023. Unit tests could be added for stress testing.
## Code Style
The project was built with the standard react functional component coding style along with node and express. The client side was divided into page and component folders housing each react component along with the styling. The server side was divided into routes, controllers, and middlewares to serve all the client requests. Prettier was used for formatting all the files. Most of the code was written in camelCase except for react components which were declared using PascalCase. Server routes were written using kebab-case.

## Screenshots
<details>
  <summary>Guest</summary>

![1](https://user-images.githubusercontent.com/99425163/210193774-5f68ebc4-3466-484f-a95b-d969d1b07ce4.png)
![2](https://user-images.githubusercontent.com/99425163/210193778-609b0213-b8ef-42ec-9111-e6d97c4f376a.png)
![3](https://user-images.githubusercontent.com/99425163/210193779-6d6909e1-88cd-43b2-b446-b5e6d6264be8.png)
![4](https://user-images.githubusercontent.com/99425163/210193781-011142f1-b634-4f59-9418-23fdeb4d0250.png)
![5](https://user-images.githubusercontent.com/99425163/210193782-ec2d4bfd-8c72-40b9-bf0e-67787fc0b595.png)
![6](https://user-images.githubusercontent.com/99425163/210193783-b451918a-9dfc-4d1a-bfc8-07e157049cd5.png)
![7](https://user-images.githubusercontent.com/99425163/210193785-f213f060-ece9-45e3-b6f6-77d1bee80aac.png)
  
</details>

<details>
  <summary>Trainee</summary>


![1](https://user-images.githubusercontent.com/99425163/210193797-950c1248-c6a8-4f05-9263-425d1af4a61e.png)
![2](https://user-images.githubusercontent.com/99425163/210193799-dc9550ab-af32-4885-baf5-193e36840ce5.png)
![3](https://user-images.githubusercontent.com/99425163/210193800-b85eb765-307d-491d-be4a-4754da20ae7a.png)
![4](https://user-images.githubusercontent.com/99425163/210193801-7502bddb-2524-4157-b3e1-5fd4abf35436.png)
![5](https://user-images.githubusercontent.com/99425163/210193805-23a6d3da-1ace-4993-b3c7-3db193c612ff.png)
![6](https://user-images.githubusercontent.com/99425163/210193808-48d5faaf-b988-4bf4-bdd7-831a845e2751.png)
![7](https://user-images.githubusercontent.com/99425163/210193811-15d2e799-5b26-4252-8381-b15ace769630.png)
![8](https://user-images.githubusercontent.com/99425163/210193813-b26f80e8-16ed-482f-8485-5944161a70ff.png)
</details>

<details>
  <summary>Instructor</summary>


![1](https://user-images.githubusercontent.com/99425163/210193870-714ea212-24ce-4396-a820-0aac7061aa66.png)
![2](https://user-images.githubusercontent.com/99425163/210193873-b961b84d-b63f-477e-9dfa-c34a0ac2656a.png)
![3](https://user-images.githubusercontent.com/99425163/210193874-38ab3bba-6c80-491a-8ba0-736f9f3ff95e.png)
![4](https://user-images.githubusercontent.com/99425163/210193876-2b9b8777-974c-4985-8cae-4ae46f2f8d3c.png)
![5](https://user-images.githubusercontent.com/99425163/210193877-8dd7dbc3-f60e-4135-9c27-accdfafdb63e.png)
![6](https://user-images.githubusercontent.com/99425163/210193879-e7cc41f1-c5d5-4fda-9c88-4f07cff429ec.png)
![7](https://user-images.githubusercontent.com/99425163/210193880-a1668316-4450-4e77-907e-e651cff77058.png)
![8](https://user-images.githubusercontent.com/99425163/210193881-012c528e-ce0f-41b5-8f39-aec11fcdddfc.png)
![9](https://user-images.githubusercontent.com/99425163/210193882-0538c5c8-5f67-42f7-8590-86c308762d23.png)
![10](https://user-images.githubusercontent.com/99425163/210193883-2b661031-357d-414d-b8c8-bd596bdb89e3.png)
</details>

<details>
  <summary>Admin</summary>

![1](https://user-images.githubusercontent.com/99425163/210193842-5c4ecdcc-5f4d-4d25-8db9-cd09b81d69c9.png)
![2](https://user-images.githubusercontent.com/99425163/210193843-9d2d2d6b-eb73-46f8-b218-b17d20711646.png)
![3](https://user-images.githubusercontent.com/99425163/210193844-1ecfe60e-4663-49a3-9773-9239b5a4d718.png)
![4](https://user-images.githubusercontent.com/99425163/210193845-6f2c90e1-f381-45b7-b97f-c988482978c6.png)
![5](https://user-images.githubusercontent.com/99425163/210193846-798005d5-2503-4c6e-8d17-164a04f74ea5.png)
![6](https://user-images.githubusercontent.com/99425163/210193847-1a65aa1b-77f2-46ba-8765-14fca7f59616.png)
![7](https://user-images.githubusercontent.com/99425163/210193848-838061a7-b9af-4d3c-a59f-cb9f37dee30d.png)

</details>

## Tech Stack
**Client:** React, Axios 

**Server:** Node, Express

**Database:** MongoDB

## Features
- Cross Platform
- Attractive design
- Responsive
- Very streamlined and intuitive
- Efficient and bug free

## Code Examples
<details>
<summary>Server</summary>
Our backend is composed of routes that connect to controllers where all the logic is handled.

This is an example of one of the routers:

```javascript
const express = require("express");
const router = express.Router();
const ReviewController = require("../../controllers/ReviewController");
router.get("/my-reviews", ReviewController.getMyReviews);
router.get(
  "/my-courses/:id/get-my-reviews",
  ReviewController.getTraineeReviews
);
router.post(
  "/my-courses/:id/instructors/:id/add-review",
  ReviewController.addInstructorReview
);
router.post("/my-courses/:id/add-review", ReviewController.addCourseReview);
router.put(
  "/my-courses/:id/instructors/:id/edit-review",
  ReviewController.editInstructorReview
);
router.put("/my-courses/:id/edit-review", ReviewController.editCourseReview);
router.delete(
  "/my-courses/:id/delete-review",
  ReviewController.deleteCourseReview
);
router.delete(
  "/my-courses/:id/instructors/:id/delete-review",
  ReviewController.deleteInstructorReview
);

module.exports = router;
```
Here is an example of a controller function:
```javascript
const getTraineeReviews = async (req, res) => {
  const id = req.user.id;
  const courseId = req.params.id;
  const reviews = {};
  const course = await Course.findById(courseId).select({
    userReviews: { $elemMatch: { user: id } },
  });
  const courseInstructors = await Course.findById(courseId).populate(
    "instructor"
  );
  reviews.instructorReview = [];
  let i = 0;
  for (const instructor of courseInstructors.instructor) {
    reviews.instructorReview[i] = instructor.userReviews.find(
      (review) => review.user.toString() === id
    );
    !reviews.instructorReview[i] && (reviews.instructorReview[i] = {});
    i++;
  }
  reviews.courseReview = course.userReviews ? course.userReviews[0] : {};
  res.send(reviews);
};
```
All our routers pass through an authentication middleware for logged in users:
```javascript
const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  if (req.cookies?.jwt && req.cookies?.accessToken) {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.jwt;
    let validAccess = false,
      validRefresh = false;
    let data;
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // Wrong or expired access token
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        validAccess = true;
        data = decoded;
      }
    });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          // Wrong or expired refresh token
          return res
            .status(401)
            .json({ message: "Unauthorized,expired refresh" });
        } else {
          validRefresh = true;
        }
      }
    );

    if (validAccess && validRefresh) {
      req.user = data;
      const now = Math.floor(new Date().getTime() / 1000);
      const newAccessToken = jwt.sign(
        { ...data, exp: now + 60 * 30 * 4 },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.cookie("accessToken", `${newAccessToken}`);
      return next();
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized, some cookies are expired" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized, some cookies are missing" });
  }
};
module.exports = authenticateToken;
```
</details>

<details>
<summary>Client</summary>
  
The client side is composed of a main router component responsible for resolving user routes to react components. The router works by using a custom PrivateRoute component that redirects unauthorized users to thier respective home pages.

Here is a sample from the router:
```javascript
                {/* Admin */}
                <Route
                    path="/admin/reports"
                    element={
                      <PrivateRoute type={"admin"}>
                        <ReportsPage />
                      </PrivateRoute>
                    }
                  ></Route>
                {/* Individual */}
                  <Route
                    path="/individual-trainee"
                    element={
                      <PrivateRoute type={"individual"}>
                        <TraineeHomePage />
                      </PrivateRoute>
                    }
                  ></Route>
```
This is the PrivateRoute component:
```javascript
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ type, children }) {
  if (
    localStorage.getItem("type") === type ||
    (!localStorage.getItem("type") && type === "guest")
  ) {
    return <> {children} </>;
  }
  return (
    <Navigate
      to={
        localStorage.getItem("type")
          ? localStorage.getItem("type") === "individual" ||
            localStorage.getItem("type") === "corporate"
            ? "/" + localStorage.getItem("type") + "-trainee"
            : "/" + localStorage.getItem("type")
          : "/"
      }
    />
  );
}

export default PrivateRoute;

```
Here is an example of a react page:
```javascript
import app from "../../utils/AxiosConfig.js";
import "./ViewMyCourses.css";
import { useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import MyFiltersContainer from "../../components/ViewMyCourses/MyFiltersContainer";
import MyCoursesContainer from "../../components/ViewMyCourses/MyCoursesContainer";
import { useSearchParams } from "react-router-dom";

function ViewMyCourses() {
  const location = useLocation();

  const [courses, setCourses] = useState([]);
  const [noCourses, setNoCourses] = useState(false);
  const [filter, setFilter] = useState({
    searchItem:
      location.state?.searchItem !== null &&
      location.state?.searchItem !== undefined
        ? location.state?.searchItem
        : null,
  });
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("added");
  useEffect(() => {
    async function insideEffect() {
      //handle somethingggg
      if (token != null) {
        await app.post("add-course-to-individual", { token }).then((res) => {});
      }
      setCourses([]);
      await app
        .get(
          localStorage.getItem("type")
            ? localStorage.getItem("type") === "corporate" ||
              localStorage.getItem("type") === "individual"
              ? "/trainee/my-populated-courses"
              : "/" + localStorage.getItem("type") + "/my-populated-courses"
            : "/my-populated-courses",
          {
            headers: {
              type: localStorage.getItem("type"),
              country: localStorage.getItem("country"),
            },
            params: { ...filter },
          }
        )
        .then((response) => {
          if (response.data.length === 0) setNoCourses(true);
          else {
            setNoCourses(false);
            setCourses(response.data);
          }
        });
    }
    insideEffect();
    //eslint-disable-next-line
  }, [filter]);

  return (
    <div className="view-courses-wrapper">
      {localStorage.getItem("type") === "instructor" && (
        <MyFiltersContainer
          setFilter={setFilter}
          setNoCourses={setNoCourses}
        ></MyFiltersContainer>
      )}
      <div className="main-content">
        <MyCoursesContainer
          courses={courses}
          noCourses={noCourses}
        ></MyCoursesContainer>
      </div>
    </div>
  );
}

export default memo(ViewMyCourses);

```
Here is the MyCoursesContainer nested within the page:
```javascript
import { memo } from "react";
import { Spinner } from "loading-animations-react";
import noCourses from "../../assets/ViewCourses/noCourses.svg";
import Pagination from "../../layouts/Pagination/Pagination";

function MyCoursesContainer(props) {
  return (
    <>
      {props.noCourses ? (
        <>
          <div
            style={{
              marginBottom: "200px",
              width: "100%",
              height: "100%",
              flexGrow: "1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={noCourses}
              alt="noCourses"
              style={{ width: "200px", height: "200px" }}
            ></img>
            <p
              style={{ fontSize: "25px", fontWeight: "700", marginTop: "50px" }}
            >
              You have no courses yet.
            </p>
          </div>
        </>
      ) : props.courses.length === 0 ? (
        <div
          style={{
            marginBottom: "300px",
            width: "100%",
            height: "100%",
            flexGrow: "1",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "200px", height: "200px" }}>
            <Spinner
              color1="#96cea8"
              color2="#96cea8"
              textColor="rgba(0,0,0, 0.5)"
            />
          </div>
        </div>
      ) : (
        <>
          <Pagination items={props.courses} itemsPerPage={12} my={true} />
        </>
      )}
    </>
  );
}
export default memo(MyCoursesContainer);
```
This component employs pagination for a better user experience while also rendering the loading animations while the course data is loading. If no courses are found, an alert is rendered instead.
</details>


## Installation
1) Clone the repository       
```bash
  git clone https://github.com/Advanced-Computer-Lab-2022/5AM-club-.git
```
2) Install NPM packages in both client and server
```bash
  cd 5AM-club-/client
  npm install --force
  cd ../server
  npm install --force
  ```
  
## API Reference

The API routes are divided into 4 groups.

Note: All endpoints were tested using postman to ensure correct response bodies were returned.

<details>
<summary> Website</summary>

**This endpoint fetches the contract from the database**

```http
GET/contract
```


Parameters: None.

**Accessible by:** Instructors

Response
```json
{"content":"This is a contract", "type":"contract"}
```

**This endpoint fetches the terms of service from the database**


```http
GET/terms-of-service
```

Parameters: None.

**Accessible by:**  Guests, Individual Trainees, Corporate Trainees, Instructors

Response
```json
{"content":"These are the terms of service", "type":"tos"}
```
</details>

<details>
<summary>User Data</summary>

**Fetches a user using his id**

```http
GET/get-user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `type` | `string` | **Required**. Specifies the type of user to be fetched.|

**Accessible by:** Individual Trainees, Corporate Trainees, Instructors, Admins

Response
```json
{"username":"corporate","password":"$2a$08$NZlSVgrj/hjKcWOKuazxB.0vA.777qDpiuPvwt3jotgnhMVEf2YXK","type":"corporate","firstName":"","lastName":"","gender":"","country":"United States","walletMoney":"0","courses":[]}
```

**Fetches all users' data**
```http
GET/get-users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `type` | `string` | **Required**. Specifies the type of users to be fetched.|

**Accessible by:** Individual Trainees, Corporate Trainees, Instructors, Admins

Response
```json
[
{"username":"corporate","password":"$2a$08$NZlSVgrj/hjKcWOKuazxB.0vA.777qDpiuPvwt3jotgnhMVEf2YXK","type":"corporate","firstName":"","lastName":"","gender":"","country":"United States","walletMoney":"0","courses":[]},{"username":"corporate2","password":"$2a$08$Ijewzx9FAKDikvHRWB.Vden4j1OAJAsNpjXf4drMT7DliStn2ggT.","type":"corporate","firstName":"Amr","lastName":"Mohamed","gender":"male","country":"United States","walletMoney":"0","courses":["63b34f81d21f21568822c23a"],"email":"amrmohamedyonis@gmail.com"}]
```
**Fetches the trainee's data associated with a specific course**
```http
GET/get-trainee-course
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `courseid` | `string` | **Required**. Specifies the course.|

**Accessible by:** Individual Trainees, Corporate Trainees

Response
```json
{"courseId":"63b41b88a4407253aa5951ab","traineeId":"63b35175d21f21568822c464","progress":[false],"answers":[["-1","-1","-1","-1"]],"notes":[[]],"lastSection":"0","grades":["0"],"purchasingCost":"999.99","sent":false,"createdAt":"1672748088649","updatedAt":"1672748088649"}
```
**Fetches the instructor of a course**
```http
GET/get-course-instructor
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseid` | `string` | **Required**. Specifies the course.|

**Accessible by:** Guests, Individual Trainees, Corporate Trainees, Instructors

Response
```json
{"username":"instructor2","password":"$2a$08$y62vIAnkebL467eUJaSW6OQOeeizU5ZgAiV6U31xdH5tjOkdBTmmC","email":"amr.younis@student.guc.edu.eg","country":"United States","rating":"0","biography":"This is my biography","courses":["63b34f81d21f21568822c23a"],"money_owed":[{"year":"2023","month":"1","amount":"599.98"}],"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"instructor review","rating":"5"}]}
```
**Fetches the type a user using his Id**

```http
GET/get-user-type
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userid` | `string` | **Required**. Specifies the user.|

**Accessible by:** Guests

Response
```
"Instructor"
```
**Checks if a profile is complete for a user created by the admin**
```http
GET/complete-profile
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|


**Accessible by:** Corporate Trainees, Instuctors

Response
``` 
"true"
```
**Adds an admin user to the database**  
```http
POST/add-admin
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Admins

Request Body
```json
{"username":"admin","password":"$2a$08$tdURlKJUGvi9QyaTl7q3Yexc6wD.H6JNx4wQhxYxMyObnLZGPaDKy"}
```
Response
```
"Admin added successfully!"
```

**Adds an instructor user to the database**
```http
POST/add-instructor
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Admins

Request Body
```json
{"username":"instructor","password":"$2a$08$tdURlKJUGvi9QyaTl7q3Yexc6wD.H6JNx4wQhxYxMyObnLZGPaDKy"}
```
Response
```
"Instructor added successfully!"
```
**Adds a corporate trainee user to the database**
```http
POST/add-corporate-trainee
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Admins

Request Body
```json
{"username":"corporate","password":"Corporate-@2001"}
```
Response
```
"Trainee added successfully!"
```
**Adds an individual trainee user to the database**
```http
POST/signUp
```
Parameters: None.

**Accessible by:** Guests

Request Body
```json
{"username":"admin","password":"Admin-@2001","email":"amrmohamedyonis@gmail.com","gender":"male","firstName":"Amr","lastName":"Mohamed"}
```
Response
```
"Trainee added successfully!"
```
**Allow the user to access the main home page**
```http
POST/login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Guests

Request Body
```json
{"username":"admin","password":"Admin-@2001"}
```
Response
```json
{
      "type":"admin",
      "username": "admin",
      "country":"United States",
    }
```

**Logs out a user from the site**
```http
GET/logout
```
Parameters: None.

**Accessible by:** Individual Trainees, Corporate Trainees, Instructors, Admins

Response
```
"logging out!!"
```
**Changes the country of a user to the selected country**
```http
PUT/set-country
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | Holds the token for authorization.|

**Accessible by:** Guests, Individual Trainees, Corporate Trainees, Instructors, Admins

Request Body
```json
{"country":"egypt"}
```
**Changes the personal information of an instructor in the database**
```http
PUT/edit-personal-info
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Instructors

Request Body
```json
{"email":"amrmohamedyonis2@gmail.com","biography":"This is my biography2"}
```
Response
```json
{"username":"instructor2","password":"$2a$08$y62vIAnkebL467eUJaSW6OQOeeizU5ZgAiV6U31xdH5tjOkdBTmmC","email":"amrmohamedyonis2@gmail.com","country":"United States","rating":"0","biography":"This is my biography2","courses":["63b34f81d21f21568822c23a"],"money_owed":[{"year":"2023","month":"1","amount":"599.98"}],"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"instructor review","rating":"5"}]}
```
**Updates the data of a trainee for a specific course**
```http
PUT/edit-trainee-course
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `traineeId` | `string` | **Required**. Specifies the trainee.|
| `courseId` | `string` | **Required**. Specifies the course.|

**Accessible by:** Individual Trainees, Corporate Trainees.

Request Body
```json 
{"progress":[true],"answers":[["-1","-1","-1","-1"]],"notes":[[]],"lastSection":"0","grades":["0"]}

```
Response
```
{"courseId":"63b41b88a4407253aa5951ab","63b35175d21f21568822c464","progress":[true],"answers":[["-1","-1","-1","-1"]],"notes":[[]],"lastSection":"0","grades":["0"],"purchasingCost":"999.99","sent":false,"createdAt":"1672748088649","updatedAt":"1672748088649"}
```
**Sends an email to a user to change his/her password**
```http
PUT/change-password-email
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. The user's email.|

**Accessible by:** Individual Trainees, Coporate Trainees, Instructors

Response
```
"email sent"
```
**Submits a report from a user**
```http
POST/report-problem
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|


**Accessible by:** Individual Trainees, Coporate Trainees, Instructors

Request Body
```json
{
"courseName":"Test Course",
"problemType":"technical",
"problem":"This is a problem"}
```

Response
```
"Problem reported successfully!"
```

**Fetches all the submitted problems by a user**
```http
GET/view-problems
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Individual Trainees, Corporate Trainees, Instructors

Response 
```json
  [{"userId":"63b35175d21f21568822c464","username":"individual","courseName":"Test Course","problemType":"financial","problem":"This is a problem 2","status":"unseen","comments":[],"createdAt":"1672696255786","updatedAt":"1672696255786"}]  
```

**Adds a follow up to the report**
```http
PUT/follow-up
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Specifies the report.|

**Accessible by:** Individual Trainees, Corporate Trainees, Instructors

Request Body
```json
{"description":"Follow up",
"createdAt":"2023-01-03T12:00:00.947Z"}  
```
  
Response 
```
"comment added successfully" 
```
**Sets the problem status**  
```http
PUT/set-problem-status
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Specifies the report.|

**Accessible by:** Admins

Request Body
```json
  {"status":"resolved"}
```
  
Response 
```json
["userId":"63b41653a4407253aa594b8e","username":"hadwa.hassan","courseName":"Test Course","problemType":"technical","problem":"can't refund","status":"resolved","comments":[{"description":"Follow up","createdAt":"2023-01-03T12:00:00.947Z"}],"createdAt":"1672747084528","updatedAt":"1672747227527"},{"userId":"63b34ec7d21f21568822c219","username":"instructor2","courseName":"Test Course","problemType":"technical","problem":"This is a problem","status":"unseen","comments":[],"createdAt":"1672695695111","updatedAt":"1672695695111"}]
```
**Sends a certificate to the trainees by email upon finishing a course**
```http
PUT/send-certificate
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseId` | `string` | **Required**. Specifies the course.|
| `traineeId` | `string` | **Required**. Specifies the trainee.|


**Accessible by:** Individual Trainees, Corporate Trainees

Response
```
"email sent"
```
**Changes the password for a user** 
```http
PUT/change-password
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Individual Trainees, Corporate Trainees, Instructors
  
Request Body
```json
  {"password":"new password"}
```

Response
```
  "Password changed successfully"
```
  
**Changes the password of a user that forgot the old password**
```http
PUT/change-forgotten-password
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Specifies the user.|
| `type` | `string` | **Required**. Specifies the type of the user.|
  
**Accessible by:** Guests
  
Request Body
```json
  {"password":"new password"}
```

Response
```
  "Password changed successfully"
```
  
**Fetches the amount of money in the wallet of the trainee**
```http
GET/wallet-money
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
  
**Accessible by:** Individual Trainees
  
Response
```
"2000"
```
**Pays for a course**
```http
POST/pay
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|


**Accessible by:** Individual Trainees

Request Body
```json
{"courseId":"63b34f81d21f21568822c23a","coursePrice":"1300","courseName":"Test Course"}
```

Response
```json
{"url":"http://localhost:3000/individual-trainee/my-courses?added=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cmFpbmVlSWQiOiI2M2IzNTE3NWQyMWYyMTU2ODgyMmM0NjQiLCJjb3Vyc2VJZCI6IjYzYjM0ZjgxZDIxZjIxNTY4ODIyYzIzYSIsInBhaWRGcm9tV2FsbGV0IjotOTk5Ljk5LCJpYXQiOjE2NzMwMzY0MjcsImV4cCI6MTY3NDMzMjQyN30.bN5dWSOvprZEbWep-Cb0VdvhXl5PVBP3lEj5jwHEK4c"}
```

**Requests a refund**
```http
PUT/refund
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|


**Accessible by:** Individual Trainees

Request Body
```json
{"courseId":"63b34f81d21f21568822c23a"}
```

Response
```json
"refunded successfully"
```
**Adds a course to an individual trainee**
```http
POST/add-course-to-individual
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Individual Trainees

Request Body
```json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cmFpbmVlSWQiOiI2M2IzNTE3NWQyMWYyMTU2ODgyMmM0NjQiLCJjb3Vyc2VJZCI6IjYzYjM0ZjgxZDIxZjIxNTY4ODIyYzIzYSIsInBhaWRGcm9tV2FsbGV0IjotOTk5Ljk5LCJpYXQiOjE2NzMwMzY0MjcsImV4cCI6MTY3NDMzMjQyN30.bN5dWSOvprZEbWep-Cb0VdvhXl5PVBP3lEj5jwHEK4c"}
```

Response
```
"bought successfully"
```
**Updates a user's profile**
```http
PUT/update-profile
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Corporate Trainees, Instructors
  
Request Body
```json
  {"password":"new password","email":"amrmohamedyoniss@gmail.com","firstName":"Amr","lastName":"Mohamed"}
```

Response
```json
 {"username":"corporate2","password":"$2a$08$Ijewzx9FAKDikvHRWB.Vden4j1OAJAsNpjXf4drMT7DliStn2ggT.","type":"corporate","firstName":"Amr","lastName":"Mohamed","gender":"male","country":"United States","walletMoney":"0","courses":["63b34f81d21f21568822c23a"],"email":"amrmohamedyoniss@gmail.com"}

```
**Updates a user's profile**
```http
PUT/update-profile
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Corporate Trainees, Instructors
  
Request Body
```json
  {"password":"new password","email":"amrmohamedyoniss@gmail.com","firstName":"Amr","lastName":"Mohamed"}
```

Response
```json
 {"username":"corporate2","password":"$2a$08$Ijewzx9FAKDikvHRWB.Vden4j1OAJAsNpjXf4drMT7DliStn2ggT.","type":"corporate","firstName":"Amr","lastName":"Mohamed","gender":"male","country":"United States","walletMoney":"0","courses":["63b34f81d21f21568822c23a"],"email":"amrmohamedyoniss@gmail.com"}

```


</details>

<details>
<summary> Reviews</summary>
  
**Fetches the reviews of an instructor**
```http
GET/my-reviews
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Instructors

Response
```JSON
[{
"user":"63b41b22a4407253aa59501d",
"review":"instructor review",
"rating":"5",
}]
```
**Fetches a trainee's reviews for a specific course and its instructors**
```http
GET/my-courses/${id}/get-my-reviews
``` 
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `id`  | `string`  |  **Required**. Specifies the course |


**Accessible by:** Individual Trainees, Corporate Trainees

Response
```JSON
[{"user":"63b41b22a4407253aa59501d",
"review":"instructor review",
"rating":"5"}]
```

**Adds a review and rating for one of the instructors**
```http
POST/my-courses/${id}/instructors/${id}/add-review
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `id`  | `string`  |  **Required**. Specifies the Instructor|

**Accessible by:** Individual Trainees, Corporate Trainees


Request Body
```JSON
 {
 "review": "Great Great job",
 "rating": "5",
 }
```

Response 
```JSON
"Review added successfully"
```


**Adds a review and rating for an owned course**
```http
POST/my-courses/${id}/add-review
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `id`  | `string`  |  **Required**. Specifies the course|

**Accessible by:** Individual Trainees, Corporate Trainees

Request Body
```JSON
{
 "review": "Average course",
 "rating": "2",
 }
```

Response 
```JSON
"Review added successfully"
```

**Edits a review and rating for one of the instructors** 
```http
PUT/my-courses/${id}/instructors/${id}/edit-review
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `id`  | `string`  |  **Required**. Specifies the instructor|

**Accessible by:** Individual Trainees, Corporate Trainees

Request Body
```JSON
{
 "review": " not useful",
 "rating": "5",
 }
```
Response
```JSON
"Review edited successfully"
```

**Edits a review and rating for an owned course**

```http
PUT/my-courses/${id}/edit-review
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `id`  | `string`  |  **Required**. Specifies the course |

**Accessible by:** Individual Trainees, Corporate Trainees

Request Body
```JSON
{
 "review": " Above-average course",
 "rating": "4",
}
```



Response
```JSON
"Review edited successfully"
```



**Deletes a review and rating for an owned course**
``` http
DELETE/my-courses/${id}/delete-review
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `id`  | `string`  |  **Required**. Specifies the course |

**Accessible by:** Corporate Trainees, Individual Trainees

Response
```JSON
"Review deleted successfully"
```

**Deletes a review and rating for one of the instructors** 
```http
DELETE/my-courses/${id}/instructors/${id}/delete-review
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `id`  | `string`  |  **Required**. Specifies the instructor |

**Accessible by:** Corporate Trainees, Individual Trainees

Response
```JSON
"Review deleted successfully"
```

</details>

  <details>
<summary> Courses</summary>
  
**Fetches the user's courses**
```http
GET/my-courses
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Corporate Trainees, Instructors
  
Request Body
```json
  {"password":"new password","email":"amrmohamedyoniss@gmail.com","firstName":"Amr","lastName":"Mohamed"}
```

Response
```json
 {"username":"corporate2","password":"$2a$08$Ijewzx9FAKDikvHRWB.Vden4j1OAJAsNpjXf4drMT7DliStn2ggT.","type":"corporate","firstName":"Amr","lastName":"Mohamed","gender":"male","country":"United States","walletMoney":"0","courses":["63b34f81d21f21568822c23a"],"email":"amrmohamedyoniss@gmail.com"}

```

**Fetches all published courses**
```http
GET/courses
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `min` | `string` | **Required**. Specifies the minimum course price.|
| `max` | `string` | **Required**. Specifies the maximum course price.|
| `subject` | `string` | **Required**. Specifies the subjects of the course.|
| `rating` | `string` | **Required**. Specifies the minimum rating of the course.|
| `searchItem` | `string` | **Required**. Specifies the search query used to search for the course..|

**Accessible by:** Guests, Individual Trainees, Corporate Trainees, Instructors

Response
```json
[{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"10","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":["63b35175d21f21568822c464","63b34ed7d21f21568822c21c","63b41653a4407253aa594b8e","63b41922a4407253aa594dfd","63b41b22a4407253aa59501d"],"published":true,"closed":false,"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"course review","rating":"5",}],"accepted":[{"trainee":"63b34ed7d21f21568822c21c","date":"1672696364291"},{"trainee":"63b41922a4407253aa594dfd","date":"1672747649513"},{"trainee":"63b41b22a4407253aa59501d","date":"1672747842457"}],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[{"title":"Test Excercise 1","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]},},},{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}}]},{"title":"Test Subtitle 2","description":"Subtitle 2 Description","sections":[{"title":"Test Video 2","minutes":"0","description":"Video 2 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}}]}}],"createdAt":"1672695681007","updatedAt":"1672748201914","promotion":{"percentage":"100","startDate":"1672748123000","endDate":"1672838363000","type":"admin"}}]
```

**Fetches the data of owned courses with any data associated with it (like instructors data, owners data ...etc)**

```http
GET/my-populated-courses
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `min` | `string` | **Required**. Specifies the minimum course price.|
| `max` | `string` | **Required**. Specifies the maximum course price.|
| `subject` | `string` | **Required**. Specifies the subjects of the course.|
| `rating` | `string` | **Required**. Specifies the minimum rating of the course.|
| `searchItem` | `string` | **Required**. Specifies the search query used to search for the course..|

**Accessible by:** Individual Trainees, Corporate Trainees, Instructors

Response
```json
[{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"10","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":[object],"owners":[object,object,object,object,object],"published":true,"closed":false,"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"course review","rating":"5",}],"accepted":[{"trainee":"63b34ed7d21f21568822c21c","date":"1672696364291"},{"trainee":"63b41922a4407253aa594dfd","date":"1672747649513"},{"trainee":"63b41b22a4407253aa59501d","date":"1672747842457"}],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[{"title":"Test Excercise 1","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]},},},{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}]},{"title":"Test Subtitle 2","description":"Subtitle 2 Description","sections":[{"title":"Test Video 2","minutes":"0","description":"Video 2 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}}]}}],"createdAt":"1672695681007","updatedAt":"1672748201914","promotion":{"percentage":"100","startDate":"1672748123000","endDate":"1672838363000","type":"admin"}}]
```
**Fetches the data of all courses with any data associated with it (like instructors data, owners data ...etc)**
```http
GET/populated-courses
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `min` | `string` | **Required**. Specifies the minimum course price.|
| `max` | `string` | **Required**. Specifies the maximum course price.|
| `subject` | `string` | **Required**. Specifies the subjects of the course.|
| `rating` | `string` | **Required**. Specifies the minimum rating of the course.|
| `searchItem` | `string` | **Required**. Specifies the search query used to search for the course..|

**Accessible by:** Guests, Individual Trainees, Corporate Trainees, Instructors

Response
```json
[{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"10","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":[object],"owners":[object,object,object,object,object],"published":true,"closed":false,"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"course review","rating":"5",}],"accepted":[{"trainee":"63b34ed7d21f21568822c21c","date":"1672696364291"},{"trainee":"63b41922a4407253aa594dfd","date":"1672747649513"},{"trainee":"63b41b22a4407253aa59501d","date":"1672747842457"}],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[{"title":"Test Excercise 1","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]},},},{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}}]},{"title":"Test Subtitle 2","description":"Subtitle 2 Description","sections":[{"title":"Test Video 2","minutes":"0","description":"Video 2 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}}]}}],"createdAt":"1672695681007","updatedAt":"1672748201914","promotion":{"percentage":"100","startDate":"1672748123000","endDate":"1672838363000","type":"admin"}}]
```
**Fetches the maximum and minimum price of owned courses**
```http
GET/my-courses/my-course-max-min
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `min` | `string` | **Required**. Specifies the minimum course price.|
| `max` | `string` | **Required**. Specifies the maximum course price.|
| `subject` | `string` | **Required**. Specifies the subjects of the course.|
| `rating` | `string` | **Required**. Specifies the minimum rating of the course.|
| `searchItem` | `string` | **Required**. Specifies the search query used to search for the course..|

**Accessible by:** Individual Trainees, Corporate Trainees, Instructors

Response
```json
{"min":"200","max":"500"}
```
**Fetches the maximum and minimum price of all courses**
```http
GET/courses/course-max-min
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `min` | `string` | **Required**. Specifies the minimum course price.|
| `max` | `string` | **Required**. Specifies the maximum course price.|
| `subject` | `string` | **Required**. Specifies the subjects of the course.|
| `rating` | `string` | **Required**. Specifies the minimum rating of the course.|
| `searchItem` | `string` | **Required**. Specifies the search query used to search for the course..|

**Accessible by:** Guests, Individual Trainees, Corporate Trainees, Instructors

Response
```json
{"min":"100","max":"550"}
```
**Fetches the subjects of owned courses**
```http
GET/courses/my-course-subjects
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `min` | `string` | **Required**. Specifies the minimum course price.|
| `max` | `string` | **Required**. Specifies the maximum course price.|
| `subject` | `string` | **Required**. Specifies the subjects of the course.|
| `rating` | `string` | **Required**. Specifies the minimum rating of the course.|
| `searchItem` | `string` | **Required**. Specifies the search query used to search for the course..|

**Accessible by:** Individual Trainees, Corporate Trainees, Instructors

Response
```json
["subject 1","test subject"]
```
**Fetches the subjects of all courses**
```http
GET/courses/course-subjects
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `min` | `string` | **Required**. Specifies the minimum course price.|
| `max` | `string` | **Required**. Specifies the maximum course price.|
| `subject` | `string` | **Required**. Specifies the subjects of the course.|
| `rating` | `string` | **Required**. Specifies the minimum rating of the course.|
| `searchItem` | `string` | **Required**. Specifies the search query used to search for the course..|

**Accessible by:** Guests, Individual Trainees, Corporate Trainees, Instructors

Response
```json
["subject 1","test subject","sub","sub2"]
```
**Increment the number of views for a course**

```http
PUT/my-courses/increment-views${id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Specifies the course.|

**Accessible by:** Guests, Individual Trainees, Corporate Trainees, Instructors

Response
```json
[{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"10","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":[object],"owners":[object,object,object,object,object],"published":true,"closed":false,"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"course review","rating":"5",}],"accepted":[{"trainee":"63b34ed7d21f21568822c21c","date":"1672696364291"},{"trainee":"63b41922a4407253aa594dfd","date":"1672747649513"},{"trainee":"63b41b22a4407253aa59501d","date":"1672747842457"}],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[{"title":"Test Excercise 1","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]},},},{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}}]},{"title":"Test Subtitle 2","description":"Subtitle 2 Description","sections":[{"title":"Test Video 2","minutes":"0","description":"Video 2 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}}]}}],"createdAt":"1672695681007","updatedAt":"1672748201914","promotion":{"percentage":"100","startDate":"1672748123000","endDate":"1672838363000","type":"admin"}}]
```

**Fetches a specific course**
```http
GET/courses/${courseId}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `min` | `string` | **Required**. Specifies the minimum course price.|
| `max` | `string` | **Required**. Specifies the maximum course price.|
| `subject` | `string` | **Required**. Specifies the subjects of the course.|
| `rating` | `string` | **Required**. Specifies the minimum rating of the course.|
| `searchItem` | `string` | **Required**. Specifies the search query used to search for the course..|

**Accessible by:** Guests, Individual Trainees, Corporate Trainees, Instructors

Response
```json
{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"10","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":["63b35175d21f21568822c464","63b34ed7d21f21568822c21c","63b41653a4407253aa594b8e","63b41922a4407253aa594dfd","63b41b22a4407253aa59501d"],"published":true,"closed":false,"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"course review","rating":"5",}],"accepted":[{"trainee":"63b34ed7d21f21568822c21c","date":"1672696364291"},{"trainee":"63b41922a4407253aa594dfd","date":"1672747649513"},{"trainee":"63b41b22a4407253aa59501d","date":"1672747842457"}],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[{"title":"Test Excercise 1","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]},},},{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}}]},{"title":"Test Subtitle 2","description":"Subtitle 2 Description","sections":[{"title":"Test Video 2","minutes":"0","description":"Video 2 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}}]}}],"createdAt":"1672695681007","updatedAt":"1672748201914","promotion":{"percentage":"100","startDate":"1672748123000","endDate":"1672838363000","type":"admin"}}
```
**Fetches a specific course with any data associated with it (like instructors data, owners data ...etc)**
```http
GET/populated-courses/${courseId}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `min` | `string` | **Required**. Specifies the minimum course price.|
| `max` | `string` | **Required**. Specifies the maximum course price.|
| `subject` | `string` | **Required**. Specifies the subjects of the course.|
| `rating` | `string` | **Required**. Specifies the minimum rating of the course.|
| `searchItem` | `string` | **Required**. Specifies the search query used to search for the course..|

**Accessible by:** Guests, Individual Trainees, Corporate Trainees, Instructors

Response
```json
[{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"10","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":[object],"owners":[object,object,object,object,object],"published":true,"closed":false,"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"course review","rating":"5",}],"accepted":[{"trainee":"63b34ed7d21f21568822c21c","date":"1672696364291"},{"trainee":"63b41922a4407253aa594dfd","date":"1672747649513"},{"trainee":"63b41b22a4407253aa59501d","date":"1672747842457"}],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[{"title":"Test Excercise 1","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]},},},{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}}]},{"title":"Test Subtitle 2","description":"Subtitle 2 Description","sections":[{"title":"Test Video 2","minutes":"0","description":"Video 2 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}}]}}],"createdAt":"1672695681007","updatedAt":"1672748201914","promotion":{"percentage":"100","startDate":"1672748123000","endDate":"1672838363000","type":"admin"}}]
```
**Adds a corporate course request**
```http
PUT/courses/${courseId}/course-request
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `courseId` | `string` | **Required**. Specifies the course.|

**Accessible by:** Corporate Trainees

Response
```json
{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"10","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":["63b35175d21f21568822c464","63b34ed7d21f21568822c21c","63b41653a4407253aa594b8e","63b41922a4407253aa594dfd","63b41b22a4407253aa59501d"],"published":true,"closed":false,"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"course review","rating":"5",}],"accepted":[{"trainee":"63b34ed7d21f21568822c21c","date":"1672696364291"},{"trainee":"63b41922a4407253aa594dfd","date":"1672747649513"},{"trainee":"63b41b22a4407253aa59501d","date":"1672747842457"}],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[{"title":"Test Excercise 1","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]},},},{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}}]},{"title":"Test Subtitle 2","description":"Subtitle 2 Description","sections":[{"title":"Test Video 2","minutes":"0","description":"Video 2 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}}]}}],"createdAt":"1672695681007","updatedAt":"1672748201914","promotion":{"percentage":"100","startDate":"1672748123000","endDate":"1672838363000","type":"admin"}}
```
**Accepts a corporate course request**
```http
PUT/courses/${courseId}/accept-course-request
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `courseId` | `string` | **Required**. Specifies the course.|
| `traineeId` | `string` | **Required**. Specifies the trainee.|

**Accessible by:** Admins

Response
```json
{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"10","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":["63b35175d21f21568822c464","63b34ed7d21f21568822c21c","63b41653a4407253aa594b8e","63b41922a4407253aa594dfd","63b41b22a4407253aa59501d"],"published":true,"closed":false,"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"course review","rating":"5",}],"accepted":[{"trainee":"63b34ed7d21f21568822c21c","date":"1672696364291"},{"trainee":"63b41922a4407253aa594dfd","date":"1672747649513"},{"trainee":"63b41b22a4407253aa59501d","date":"1672747842457"}],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[{"title":"Test Excercise 1","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]},},},{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}}]},{"title":"Test Subtitle 2","description":"Subtitle 2 Description","sections":[{"title":"Test Video 2","minutes":"0","description":"Video 2 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}}]}}],"createdAt":"1672695681007","updatedAt":"1672748201914","promotion":{"percentage":"100","startDate":"1672748123000","endDate":"1672838363000","type":"admin"}}
```

**Rejects a corporate course request**
```http
PUT/courses/${courseId}/reject-course-request
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `courseId` | `string` | **Required**. Specifies the course.|
| `traineeId` | `string` | **Required**. Specifies the trainee.|

**Accessible by:** Admins

Response
```json
{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"10","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":["63b35175d21f21568822c464","63b34ed7d21f21568822c21c","63b41653a4407253aa594b8e","63b41922a4407253aa594dfd","63b41b22a4407253aa59501d"],"published":true,"closed":false,"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"course review","rating":"5",}],"accepted":[{"trainee":"63b34ed7d21f21568822c21c","date":"1672696364291"},{"trainee":"63b41922a4407253aa594dfd","date":"1672747649513"},{"trainee":"63b41b22a4407253aa59501d","date":"1672747842457"}],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[{"title":"Test Excercise 1","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]},},},{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}}]},{"title":"Test Subtitle 2","description":"Subtitle 2 Description","sections":[{"title":"Test Video 2","minutes":"0","description":"Video 2 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}}]}}],"createdAt":"1672695681007","updatedAt":"1672748201914","promotion":{"percentage":"100","startDate":"1672748123000","endDate":"1672838363000","type":"admin"}}
```
**Fetches all corporate requests for courses**
```http
GET/course-requests
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Admins

Response
```json
{"pending":[object],"accepted":[object,object,object,object,object],"rejected":[]}
```
**Fetches all reports issued by users**
```http
GET/reports
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Admins

Response
```json
  ["userId":"63b35175d21f21568822c464","username":"individual","courseName":"Test Course","problemType":"financial","problem":"This is a problem 2","status":"unseen","comments":[],"createdAt":"1672696255786","updatedAt":"1672696255786"},{"userId":"63b34ec7d21f21568822c219","username":"instructor2","courseName":"Test Course","problemType":"technical","problem":"This is a problem","status":"unseen","comments":[],"createdAt":"1672695695111","updatedAt":"1672695695111"}]
```
**Creates a new course**
```http
POST/create-course
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|

**Accessible by:** Instructors

Request Body
```json
{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description"}
```

Response
```json
{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"0","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":[],"published":true,"closed":false,"userReviews":[],"accepted":[],"pending":[],"rejected":[],"subtitles":[],"createdAt":"1672695681007","updatedAt":"1672695681007"}
```
**Deletes a specified course**  
```http
DELETE/my-courses/${courseId}/delete-course
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | **Required**. Holds the token for authorization.|
| `id` | `string` | **Required**. Specifies the course.|

**Accessible by:** Instructors

Response
```json
{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"0","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":[],"published":true,"closed":false,"userReviews":[],"accepted":[],"pending":[],"rejected":[],"subtitles":[],"createdAt":"1672695681007","updatedAt":"1672695681007"}
```

**Edits course details**
```http
PUT/my-courses/edit-course/${courseid}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseid` | `string` | **Required**. Specifies the course.|

**Accessible by:** Instructors

Request Body
```json
{"title":"Test Course 5","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"0","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":[],"published":true,"closed":false,"userReviews":[],"accepted":[],"pending":[],"rejected":[],"subtitles":[],"createdAt":"1672695681007","updatedAt":"1672695681007"}
```
Response
```json
{"title":"Test Course 5","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"0","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":[],"published":true,"closed":false,"userReviews":[],"accepted":[],"pending":[],"rejected":[],"subtitles":[],"createdAt":"1672695681007","updatedAt":"1672695681007"}
```
**Adds a section to a specified subtitle**
```http
PUT/my-courses/edit-course/${courseid}/${subtitleid}/add-section
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseid` | `string` | **Required**. Specifies the course.|
| `subtitleid` | `string` | **Required**. Specifies the subtitle.|

**Accessible by:** Instructors

Request Body
```json
{"title":"Test Excercise 1","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]}
```
Response
```json
{"title":"Test Course 5","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"0","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":[],"published":true,"closed":false,"userReviews":[],"accepted":[],"pending":[],"rejected":[],"subtitles":[],"createdAt":"1672695681007","updatedAt":"1672695681007"}
```

**Adds a subtitle to a specific course**
```http
PUT/my-courses/edit-course/${courseid}/add-subtitle
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseid` | `string` | **Required**. Specifies the course.|

**Accessible by:** Instructors

Request Body
```json
{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[{"title":"Test Excercise 1","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]},},},{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}}]}
```
Response
```json
{"title":"Test Course 5","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"0","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":[],"published":true,"closed":false,"userReviews":[],"accepted":[],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[],"createdAt":"1672695681007","updatedAt":"1672695681007"}
```

**Edits a specified subtitle to a specific course**
```http
PUT/my-courses/edit-course/${courseid}/edit-subtitle/${subtitleid}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseid` | `string` | **Required**. Specifies the course.|

**Accessible by:** Instructors

Request Body
```json
{"title":"Test Subtitle 5","description":"Subtitle 1 Description","sections":[{"title":"Test Excercise 1","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]},},},{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}}]}
```
Response
```json
{"title":"Test Course 5","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"0","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":[],"published":true,"closed":false,"userReviews":[],"accepted":[],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 5","description":"Subtitle 1 Description","sections":[],"createdAt":"1672695681007","updatedAt":"1672695681007"}
```
**Edits a specified section in a specific subtitle to a specific course**
```http
PUT/my-courses/edit-course/${courseid}/${subtitleid}/edit-section/${sectionid}
```  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseid` | `string` | **Required**. Specifies the course.|
| `subtitleid` | `string` | **Required**. Specifies the subtitle.|
| `sectionid` | `string` | **Required**. Specifies the section.|

**Accessible by:** Instructors

Request Body
```json
{"title":"Test Excercise 5","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]}
```
Response
```json
{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"10","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":["63b35175d21f21568822c464","63b34ed7d21f21568822c21c","63b41653a4407253aa594b8e","63b41922a4407253aa594dfd","63b41b22a4407253aa59501d"],"published":true,"closed":false,"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"course review","rating":"5",}],"accepted":[{"trainee":"63b34ed7d21f21568822c21c","date":"1672696364291"},{"trainee":"63b41922a4407253aa594dfd","date":"1672747649513"},{"trainee":"63b41b22a4407253aa59501d","date":"1672747842457"}],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[{"title":"Test Excercise 5","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]},},},{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}}]},{"title":"Test Subtitle 2","description":"Subtitle 2 Description","sections":[{"title":"Test Video 2","minutes":"0","description":"Video 2 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}}]}}],"createdAt":"1672695681007","updatedAt":"1672748201914","promotion":{"percentage":"100","startDate":"1672748123000","endDate":"1672838363000","type":"admin"}}
```




**Deletes a specified subtitle to a specific course**
```http
PUT/my-courses/edit-course/${courseid}/delete-subtitle/${subtitleid}/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseid` | `string` | **Required**. Specifies the course.|

**Accessible by:** Instructors

Response
```json
{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"10","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":["63b35175d21f21568822c464","63b34ed7d21f21568822c21c","63b41653a4407253aa594b8e","63b41922a4407253aa594dfd","63b41b22a4407253aa59501d"],"published":true,"closed":false,"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"course review","rating":"5",}],"accepted":[{"trainee":"63b34ed7d21f21568822c21c","date":"1672696364291"},{"trainee":"63b41922a4407253aa594dfd","date":"1672747649513"},{"trainee":"63b41b22a4407253aa59501d","date":"1672747842457"}],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[{"title":"Test Excercise 1","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]},},},{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}}]}],"createdAt":"1672695681007","updatedAt":"1672748201914","promotion":{"percentage":"100","startDate":"1672748123000","endDate":"1672838363000","type":"admin"}}
```
**Deletes a specified section in a specific subtitle to a specific course**
```http
PUT/my-courses/edit-course/${courseid}/${subtitleid}/delete-section/${sectionid}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseid` | `string` | **Required**. Specifies the course.|
| `subtitleid` | `string` | **Required**. Specifies the subtitle.|
| `sectionid` | `string` | **Required**. Specifies the section.|

**Accessible by:** Instructors


Response
```json
{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"10","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":["63b35175d21f21568822c464","63b34ed7d21f21568822c21c","63b41653a4407253aa594b8e","63b41922a4407253aa594dfd","63b41b22a4407253aa59501d"],"published":true,"closed":false,"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"course review","rating":"5",}],"accepted":[{"trainee":"63b34ed7d21f21568822c21c","date":"1672696364291"},{"trainee":"63b41922a4407253aa594dfd","date":"1672747649513"},{"trainee":"63b41b22a4407253aa59501d","date":"1672747842457"}],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}}]},{"title":"Test Subtitle 2","description":"Subtitle 2 Description","sections":[{"title":"Test Video 2","minutes":"0","description":"Video 2 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}}]}}],"createdAt":"1672695681007","updatedAt":"1672748201914","promotion":{"percentage":"100","startDate":"1672748123000","endDate":"1672838363000","type":"admin"}}
```

**Sets a promotion on a course**
```http
PUT/my-courses/${courseid}/set-promotion
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Specifies the course.|

**Accessible by:** Instructors

Request Body
```json
{
    "percentage": "100",
    "startDate": "2023-01-03T12:15:23.000+00:00",
    "endDate": "2023-01-04T13:19:23.000+00:00"
}
```
Response

```json
{"title":"Test Course","price":"299.99","subject":["Test Subject","Test Subject 2"],"views":"10","preview_video":"https://www.youtube.com/watch?v=C0DPdy98e4c","summary":"This is a description","instructor":["63b34ec7d21f21568822c219"],"owners":["63b35175d21f21568822c464","63b34ed7d21f21568822c21c","63b41653a4407253aa594b8e","63b41922a4407253aa594dfd","63b41b22a4407253aa59501d"],"published":true,"closed":false,"userReviews":[{"user":"63b41b22a4407253aa59501d","review":"course review","rating":"5",}],"accepted":[{"trainee":"63b34ed7d21f21568822c21c","date":"1672696364291"},{"trainee":"63b41922a4407253aa594dfd","date":"1672747649513"},{"trainee":"63b41b22a4407253aa59501d","date":"1672747842457"}],"pending":[],"rejected":[],"subtitles":[{"title":"Test Subtitle 1","description":"Subtitle 1 Description","sections":[{"title":"Test Excercise 1","minutes":"40","description":"Excercise 1 Description","content":{"exercise":{"questions":["Question 1","Question 2"],"choices":[{"c1":"Correct Answer","c2":"Wrong 1","c3":"Wrong 2","c4":"Wrong 3"},{"c1":"Wrong 1","c2":"Wrong 2","c3":"Correct Answer","c4":"Wrong 3"}],"answers":["1","3"]},},},{"title":"Test Video 1 ","minutes":"0","description":"Video 1 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}},{"title":"Test Exercise 2","minutes":"20"},"description":"Exercise 2 Description","content":{"exercise":{"questions":["Question 3"],"choices":[{"c1":"Wrong 1","c2":"Wrong 2","c3":"Wrong 3","c4":"Correct Answer"}],"answers":["4"]}}}]},{"title":"Test Subtitle 2","description":"Subtitle 2 Description","sections":[{"title":"Test Video 2","minutes":"0","description":"Video 2 Description","content":{"video":{"link":"https://www.youtube.com/watch?v=C0DPdy98e4c"}}}]}}],"createdAt":"1672695681007","updatedAt":"1672748201914","promotion":{"percentage":"100","startDate":"1672748123000","endDate":"1672838363000","type":"admin"}}
```
**Sets a promotion for multiple courses**
```http
PUT/set-multiple-promotions
```
Parameters: None.
  
**Accessible by:** Instructors

Request Body
```json
{
    "courses":["63b34f81d21f21568822c23a","63b419a4a4407253aa594e2c"]
    "percentage": "100",
    "startDate": "2023-01-03T12:15:23.000+00:00",
    "endDate": "2023-01-04T13:19:23.000+00:00"
}

```
Response

```json
"done"
```
  </details>
 
## Tests
Testing was done using postman. Check out the API References section above for all the endpoints.

## How to Use?
Run this command in the server folder
```bash
  node index
```
and this command in the client folder
```bash
  npm start
```
then you can proceed to use the website.
### For Trainees
After running the project, you can search and browse the available courses. You can then proceed to create an account to buy and take our courses. After signing up, you can purchase a course using your credit card information. Then the course is added to your catalog and you can view it at any time. You get a completion certificate for each course you finish. Happy Learning!
### For Instructors
After running the project, you can proceed to login with your information. You can then use our wizard to create and edit your courses. Once you are happy with the content, you can publish your course. Now all you need to do is wait for our userbase to start buying your course. You can check your profile to see the money owed for each month since you were first added to the site as a user.
### For Admins
After running the project, you can proceed to login with your information. You can select from the panels what action you want to perform. This includes add promotions to any course, adding new users, viewing and resolving user reports on courses, and accepting corporate requests for course access.

## Contribute
You can open an issue if you have any suggestions for us to implement or you can create a branch directly and submit a pull request with your changes. For any inquiries you can email us at 5amclubacl@gmail.com.

## Credits
- [Abdelraheman Khaled](https://github.com/abdelrahmankhaled2001)
- [Amr Esmaeel El-Said](https://github.com/AmrKollohm)
- [Amr Mohamed Abdelmonem](https://github.com/IrrationalInteger)
- [Mahmoud Bakheet Eldaly](https://github.com/Mahmoud-Eldaly)
- [Mahmoud Khaled](https://github.com/mahmouddkhaledd)

## License
[MIT](https://choosealicense.com/licenses/mit/)
