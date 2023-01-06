# 5AM-club-

# Canadian Chamber of Commerce Learning Platform
Canadian Chamber of Commerce Learning Platform is an online learning and teaching platform meant to allow both students
and instructors to be in one simple to use and convenient platform for learning.

## Motivation
As students, we created this project simply because we needed something like it, a place where
quality learning can be found with the touch a button. Also as Computer Science students we needed 
to practice/learn web development, as it is the most popular form of Software development in recent years, so this project
was a great entry and got us familiar with the technologies used in that particular field.
It is also part of our curriculum CSEN 704.

## Build Status
The project is complete as of January 2023

## Code Style
The project was built with the standard react functional component coding style along with node and express. The client side was divided into page and component folders housing each react component along with the styling. The server side was divided into routes, controllers, and middlewares to serve all the client requests. Prettier was used for formatting all the files.

## Screenshots

Guest:

![1](https://user-images.githubusercontent.com/99425163/210193774-5f68ebc4-3466-484f-a95b-d969d1b07ce4.png)
![2](https://user-images.githubusercontent.com/99425163/210193778-609b0213-b8ef-42ec-9111-e6d97c4f376a.png)
![3](https://user-images.githubusercontent.com/99425163/210193779-6d6909e1-88cd-43b2-b446-b5e6d6264be8.png)
![4](https://user-images.githubusercontent.com/99425163/210193781-011142f1-b634-4f59-9418-23fdeb4d0250.png)
![5](https://user-images.githubusercontent.com/99425163/210193782-ec2d4bfd-8c72-40b9-bf0e-67787fc0b595.png)
![6](https://user-images.githubusercontent.com/99425163/210193783-b451918a-9dfc-4d1a-bfc8-07e157049cd5.png)
![7](https://user-images.githubusercontent.com/99425163/210193785-f213f060-ece9-45e3-b6f6-77d1bee80aac.png)

Trainee:

![1](https://user-images.githubusercontent.com/99425163/210193797-950c1248-c6a8-4f05-9263-425d1af4a61e.png)
![2](https://user-images.githubusercontent.com/99425163/210193799-dc9550ab-af32-4885-baf5-193e36840ce5.png)
![3](https://user-images.githubusercontent.com/99425163/210193800-b85eb765-307d-491d-be4a-4754da20ae7a.png)
![4](https://user-images.githubusercontent.com/99425163/210193801-7502bddb-2524-4157-b3e1-5fd4abf35436.png)
![5](https://user-images.githubusercontent.com/99425163/210193805-23a6d3da-1ace-4993-b3c7-3db193c612ff.png)
![6](https://user-images.githubusercontent.com/99425163/210193808-48d5faaf-b988-4bf4-bdd7-831a845e2751.png)
![7](https://user-images.githubusercontent.com/99425163/210193811-15d2e799-5b26-4252-8381-b15ace769630.png)
![8](https://user-images.githubusercontent.com/99425163/210193813-b26f80e8-16ed-482f-8485-5944161a70ff.png)

Instructor:

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

Admin:

![1](https://user-images.githubusercontent.com/99425163/210193842-5c4ecdcc-5f4d-4d25-8db9-cd09b81d69c9.png)
![2](https://user-images.githubusercontent.com/99425163/210193843-9d2d2d6b-eb73-46f8-b218-b17d20711646.png)
![3](https://user-images.githubusercontent.com/99425163/210193844-1ecfe60e-4663-49a3-9773-9239b5a4d718.png)
![4](https://user-images.githubusercontent.com/99425163/210193845-6f2c90e1-f381-45b7-b97f-c988482978c6.png)
![5](https://user-images.githubusercontent.com/99425163/210193846-798005d5-2503-4c6e-8d17-164a04f74ea5.png)
![6](https://user-images.githubusercontent.com/99425163/210193847-1a65aa1b-77f2-46ba-8765-14fca7f59616.png)
![7](https://user-images.githubusercontent.com/99425163/210193848-838061a7-b9af-4d3c-a59f-cb9f37dee30d.png)

## Tech Stack
**Client:** React, Axios 

**Server:** Node, Express

**Database:** MongoDB

## Features
- Cross Platform
- Intuitive design
- Responsive
- Very streamlined and easy to learn
- Efficient and bug free

## Code Examples

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
```http
GET/contract
```
This API fetches the contract from the database and sends it.
```http
GET/terms-of-service
```
Fetches the most updated version of the tos in the database and sends it.
```http
GET/get-user
```
Fetches a user using his id 
```http
GET/get-users
```
gets users' data
```http
GET/get-trainee-course
```
Fetches the trainee's data of a specific course
```http
GET/get-course-instructor
```
Fetches the instructor of a course
```http
GET/get-user-type
```
Fetches the type a user using his Id
```http
GET/complete-profile
```
Completes the missing fields for a created user by the admin
```http
POST/add-admin
```
Adds an admin user to the database  
```http
POST/add-instructor
```
Adds an instructor user to the database
```http
POST/add-corporate-trainee
```
Adds a corporate trainee user to the database
```http
POST/signUp
```
Adds an individual trainee user to the database
```http
POST/login
```
Allow the user to access the main home page
```http
GET/logout
```
logs out a user from the page
```http
PUT/set-country
```
Changes the country of a user to the selected country
```http
PUT/edit-personal-info
```
Changes information of a instructor in the database
```http
PUT/edit-trainee-course
```
allows the instructor to change the 
```http
PUT/change-password-email
```
Allowes a user to change his/her password through an email
```http
POST/report-problem
```
allowes a user to report a problem
```http
GET/view-problems
```
allowes the admin to view the sent problems from the users
```http
PUT/follow-up
```
Adds a follow up to the report
```http
PUT/set-problem-status
```
allowes the admin to set the problem status 
```http
PUT/send-certificate
```
sends a certificate to the trainees upon finishing a course 
```http
PUT/change-password
```
allowes user to change the password 
```http
PUT/change-forgotten-password
```
allowes user to change password via email
```http
GET/wallet-money
```
gets the amount of money in the wallet of the trainee
```http
POST/pay
```
allowes trainees to pay for courses
```http
PUT/refund
```
Allows trainees to request a refund
```http
PUT/update-profile
```
Allows the user to update his profile
```http
POST/add-course-to-individual
```
Allows a course to be added to an individual courses
```http
GET/my-reviews
```
fetches the reviews of an instructor
```http
GET/my-courses/${id}/get-my-reviews
```
fetches a trainee reviews for a specific course and its instructors
```http
POST/my-courses/${id}/instructors/${id}/add-review
```
allows a trainee to add a review and rating for one of the instructors of his courses 
```http
POST/my-courses/${id}/add-review
```
allows a trainee to add a review and rating for an one of his courses
```http
PUT/my-courses/${id}/instructors/${id}/edit-review
```
allows a trainee to edit a review and rating for one of the instructors of his courses 
```http
PUT/my-courses/${id}/edit-review
```
allows a trainee to edit a review and rating for one of of his courses 
``` http
DELETE/my-courses/${id}/delete-review
```
allows a trainee to delete a review and rating for one of of his courses 
```http
DELETE/my-courses/${id}/instructors/${id}/delete-review
```
allows a trainee to delete a review and rating for one of the instructors of his courses 
```http
GET/my-courses
```
get the user courses (user can be Trainee(individual/corporate) or instructor)
```http
GET/my-courses${addCourse}
```
same as get/mycourses above but get a token as parameter to add a new course for individual trainee(this endPoint is dedicated for individual trainee users)
```http
GET/courses
```
gets all published courses
```http
GET/my-populated-courses
```
get the data of my courses (as authorized type) with any data associated to(like instructors data, owners data ...etc)
```http
GET/populated-courses
```
get all details of courses (not only related to users)
```http
GET/my-courses/my-course-max-min
```
get user courses with filter on price to be between max and min values provided
```http
GET/courses/course-max-min
```
get all courses with filter on price to be between max and min values provided
```http
GET/courses/course-subjects
```
get all courses with filter on their subjects
```http
PUT/my-courses/increament-views${courseId}
```
increament the number of view for course with id provided
```http
GET/courses/${courseId}
```
get the course with id provided 
```http
GET/populated-courses/${courseId}
```
get all data associated for the course with id provided
```http
GET/course-requests
```
the admin gets all requests done by corporate trainees on different courses
```http
GET/reports
```
admin all reports (problems) issued by different users
```http
PUT/my-courses/edit-course/${courseid}
```
instructor edit his own course content (edit the course with provided id)
```http
PUT/my-courses/${courseid}/set-promotion
```
instructor set a promotion (discount) for limited time on his course with id provided
```http
PUT/my-courses/edit-course/${courseid}/${subtitleid}/add-section
```
instructor add section to his course with id provided inside subtitle with provided id
```http
PUT/set-multiple-promotions
```
admin set discount on many courses at once
```http
PUT/my-courses/edit-course/${courseid}/add-subtitle
```
instructor add subtitle to his course with id provided 
```http
PUT/my-courses/edit-course/${courseid}/edit-subtitle/${subtitleid}
```
instructor edit the content of subtitle of id provided inside his course with provided id
```http
PUT/my-courses/edit-course/${courseid}/${subtitleid}/edit-section/${sectionid}
```
instructor edit the content of section with id provided inside subtitle of id provided inside his course with provided id
```http
PUT/my-courses/edit-course/${courseid}/delete-subtitle/${subtitleid}/
```
instructor delete a subtitle with id provided in his course with id provided
```http
PUT/my-courses/edit-course/${courseid}/${subtitleid}/delete-section/${sectionid}
```
instructor delete a section with id provided inside subtitle with id provided in his course with id provided
```http
PUT/courses/${courseId}/course-request
```
corporate trainee issue new request for a course with id provided
```http
PUT/courses/${courseId}/accept-course-request
```
admin accepts the request issued by corporate trainee
```http
PUT/courses/${courseId}/reject-course-request
```
admin rejects the request issued by corporate trainee
```http
POST/create-course
```
instructor creates new course defining its main structure
```http
DELETE/my-courses/${courseId}/delete-course
```
instructor deletes his own course with id provided

## Tests
Testing was done using postman. Check out the API Refrences section above for all the endpoints.

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

## Contribute
You can open an issue if you have any suggestions for us to implement or you can create a branch directly and submit a pull request with your changes.

## Credits
- [Abdelraheman Khaled](https://github.com/abdelrahmankhaled2001)
- [Amr Esmaeel El-Said](https://github.com/AmrKollohm)
- [Amr Mohamed Abdelmonem](https://github.com/IrrationalInteger)
- [Mahmoud Bakheet Eldaly](https://github.com/Mahmoud-Eldaly)
- [Mahmoud Khaled](https://github.com/mahmouddkhaledd)

## License
[MIT](https://choosealicense.com/licenses/mit/)
