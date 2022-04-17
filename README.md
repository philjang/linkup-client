# A Day in the Life

A day in the life is a MERN stack application. Link to server repository https://github.com/danieldenton/day-in-life-server

Link to deployed version: https://gregarious-starlight-3d969a.netlify.app/

# What is it?

Do you ever miss the early days of social media? When each application focused more on user needs and less on pumping out a fancy new feature to keep up with their competition? A Day in the Life is a website that aims to make casual photo sharing more engaging again. This app shows you a feed of different users, with a slideshow of their posts, rather than an endless scroll of advertisements and sponsored posts designed to maximize your screen time past what you originally intended. This is based off the idea of engaging with the profile of specific users, to get a more in depth view of what is going on in a day in the life of the individual person. Once clicking on their profile, you will be given a list of all the photo's they've shared. All of these images will be clickable, allowing you to view the picture and share your thoughts!

# Product screenshot
![visual of product](./assets/productScreenShot.png)

# Technologies used

The technologies used to create this project were MongoDB, Mongoose, Express, Node.js, React.js, HTML, CSS, Postman, and Cloudinary API. 

# Approach taken

The first thing we did when starting this project was taking time to learn everyone's vison for the project. Then, we wrote out the user stories to think how someone using our app would want it to feel like. Next, as a group, we drew our wireframs and ERD's to make sure it flowed. The next task was to set up the server routes using Postman, and establish the basic functionality of the back end. The next step was to set up the corresponding front end views using React. After creating the basic layout of the front end, we then implemented Cloudinary on the back end for users to upload a photo. We then stubbed out the forms on the front end to allow the user to upload a photo.
After all of the website was fully functional, we moved onto adding style to the page. We all agreed on a simple and darker color scheme with an accent of purple. We went through each page and styled them to match with the theme. We added animations to the page to make everything pop visually. 


# Installation instructions -- front-end

1. Fork and clone repo
2. Install repo onto local client
3. ``` npm i ``` to install all dependencies
4. Create a .env.local file inside the root directory of the project
5. Inside the .env.local file type ``` REACT_APP_SERVER_URL=http://127.0.0.1:<portOfYourChoosing> ``` 
6. npm start 

<details>
<summary>Dependencies</summary>

1. axios
2. jsonwebtoken
3. react-router-dom
4. jwt-decode
</details>

# Installation instructions -- back-end
1. Fork and clone server repo (at the top of the page)
2. Install repo onto local client
3. ``` npm i ``` to install all dependencies 
4. Create a .env file inside the root directory of the project
5. Inside the .env file add
 ``` 
  PORT=<portUsedInFrontEnd>
  MONGODB_URI=mongodb://127.0.0.1/<dataBaseNameOfYourChoosing>
  JWT_SECRET='<StringOfYourChoosing>'
  CLOUDINARY_URL=cloudinary://<APIkey>:<APIsecret>@<cloudName> 
  ```
6. nodemon

# Restful Routing Chart - back-end

| **CRUD** | **URL**                  | **DESCRIPTION**                                    |
| -------- | ----------------------   | -------------------------------------------------- |
| POST     | /api-v1/users/register   | Adds a new user to database                        |
| POST     | /api-v1/users/login      | Logs in the user, sends back a token               |
| GET      | /api-v1/users            | Reads all user documents with picture subdocs      |
| GET      | /api-v1/users/:id        | Reading user document corresponding to ID          |
| PUT      | /api-v1/users/:id        | Updates user document with profile pic public_id   |
| DELETE   | /api-v1/users/:id        | Deletes user document corresponding to ID          |
| POST     | /api-v1/pictures         | Creates picture subdoc in current user document    |
| POST     | /api-v1/pictures/preview | Uploads picture and sends back src url for preview |
| GET      | /api-v1/pictures/:id     | Read picture document corresponding to ID          |
| PUT      | /api-v1/pictures/:id     | Updates picture caption corresponding to ID        |
| DELETE   | /api-v1/pictures/:id     | Delete individul picture post corresponding to ID  |
| POST     | /api-v1/comments         | Add comments to an individual picture              |
| PUT      | /api-v1/comments/:id     | Updates comment corresponding to ID                |
| DELETE   | /api-v1/comments/:id     | Deletes comment corresponding to ID                |

# Restful Routing Chart - front-end

| **CRUD** | **URL**                | **DESCRIPTION**                                                        |
| -------- | ---------------------- | ---------------------------------------------------------------------- |
| GET      | /                      | Renders a landing page that displays information about the app         |
| GET      | /login                 | Renders a login form for existing users to sign in                     |
| GET      | /register              | Renders a register form for new users to create an account             |
| GET      | /about                 | Renders an About page with bio components                              |
| GET      | /feed                  | Renders all users with slideshow component of their pictures           |
| GET      | /profiles/:id          | Renders specific user with all corresponding photo components          |
| GET      | /pictures/:id          | Renders photo details page with all corresponding comments components  |
| GET      | /new                   | Renders a photo upload form                                            |
| GET      | /uploadprofilepic/:id  | Renders a profile picture upload form                                  |



# Wireframes

<details>
<summary>Click to show</summary>

- About us page
  ![About us page](./assets/AboutUs.png)
- Sign up page
  ![Sign up page](./assets/SignUp.png)
- Login page
  ![Sign in page](./assets/Login.png)
- Public landing page
  ![Public landing page](./assets/PublicLanding.png)
- Public feed page
  ![Public feed page](./assets/PublicFeed.png)
- Profile page
  ![Profile page](./assets/Profile.png)
- Details page
  ![Details page](./assets/Details.png)

</details>

# ERD

![ERD](./assets/ERD.png)

# User Stories

- As a user without an account, I would like to register with my name, email, and password.
- As a user without an account, I would like to see a page that explains what a day in the life is, and how it would be useful.
- As a user who finished registration, I would like to be able to sign into my created account.
- As a user who is signed in, I would like to be able to sign out of my account.
- As a user I want to post photos to my profile, so I can see and share them later.
- As a user I would like to edit any post I have already made.
- As a user I would like to delete any post I have already made.
- As a user I want to be the only one who can edit or delete my post.
- As a user I want to click on others profiles, so I can see the posts they've made.
- As a user I want to click on an individual picture of another user to see more information.
- As a user I would like to comment on a individual picture to share my thoughts.
- As a user I would like to be able to delete a comment I wrote.
- As a user I would like to be able to edit a comment I wrote.

# MVP goals

- [x] Sign up and sign in functionality.
- [x] User authentication with encrpyted passwords.
- [x] CRUD functionality for a users post
- [x] User authorization for post update and delete.
- [x] Layout for signed in user home page showing all users with a slideshow of their pictures.
- [x] Layout for unregistered user home page showing the concept of the app, and how it would be useful.

# Stretch Goals

- [x] Have the layout of the signed in user resemble a polaroid.
- [x] CRUD for comments on posts.
- [x] User authorization for comment update and delete.
- [ ] Add ability to favorite a user
- [ ] Add private profiles
- [ ] Add private photos
- [ ] Change password

# Post project reflection
In the future, we would like to implement the stretch goals we didnt have time to get to. Adding the ability to make a profile or photo private in the future will allow further customizability for the users. A challenge that helped our team grow was utilizing group git work flow. It felt very unfamiliar at first, however, in the end it deepened our understanding of how version control and git is beneficial for software engineering. Our team was deliberate with communication and deligation of tasks in order to maintain higher efficiency in productivity. 
