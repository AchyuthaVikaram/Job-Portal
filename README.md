# JobHunt

JobHunt is a responsive, MERN-based web application designed to connect students and recruiters. It allows recruiters to post job listings and manage applicants, while students can search and apply for jobs. The app follows an MVC architecture where the backend is built using Node.js and Express, and the frontend is entirely handled by React.

## Features

### For Students (Applicants)
- **Account Registration and Login:** Students can create an account and log in.
- **Profile Management:** Students can manage their profile, including updating personal details.
- **Job Browsing and Filtering:** Students can browse job listings and filter jobs by location, industry, and salary (filtering available only on larger screens).
- **Job Application:** Students can apply for jobs and track the status of their applications.
  
### For Recruiters
- **Account Registration and Login:** Recruiters can create an account and log in.
- **Company Registration:** Recruiters can register their company information.
- **Job Posting:** Recruiters can post job listings, including job details like position, location, and salary.
- **Applicant Management:** Recruiters can view applicants for their job postings, and accept or reject applications.

## Technologies Used

### Frontend
- **React:** For building the user interface.
- **Redux:** For state management (managing job filters, job listings, user authentication, etc.).
- **Material UI (MUI):** For responsive UI components.
- **Axios:** For handling HTTP requests to the backend.
- **TailWind CSS:** For Styling the components
- **Redux:** Managing global state, particularly for job filtering and application status tracking.

### Backend
- **Node.js & Express.js:** Server-side logic and API routes.
- **MongoDB:** Database for storing user information, job listings, applications, etc.
- **Mongoose:** For object data modeling (ODM).
- **JWT & Bcrypt:** For authentication and authorization.

### Architecture
- **MVC (Model-View-Controller):** 
  - **Model:** MongoDB with Mongoose schemas for users, jobs, and applications.
  - **View:** Entirely managed by React on the client-side.
  - **Controller:** Express.js handles API routes, authentication, and business logic.
### Collaborations
  Any suggestions or pull requests can be made.
  
    
