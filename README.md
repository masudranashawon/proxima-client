# Proxima: Project Management Web Application

Proxima is a project management application built using the MERN stack. The application allows users to create, update, and delete their own projects with ease. Proxima is designed with high-level security in mind, featuring strong JWT authentication and front-end route protection to ensure the safety and privacy of user data.

## Features

Proxima is a feature-rich project management application, offering users a wide range of useful tools and functions, including:

- **Effortlessly manage your projects:** With Proxima's intuitive interface, you can create, update, and delete projects quickly and easily. All project-related information is centralized, allowing you to stay organized and focused.
- **State-of-the-Art Security Measures:** Proxima prioritizes the safety and security of your data with its highly robust security features. The app uses JWT authentication and frontend route protection to provide a secure platform for your project management needs, giving you peace of mind that your data is always protected.
- **Personalized Project Views:** User-specific project views, so each user can only see the projects they have created. This ensures that project information is kept private and secure, while also giving users the flexibility to manage their projects according to their unique needs.
- **Project Timeline Management:** Users with a powerful timeline management tool, allowing them to track the creation date of a project, as well as its last update date. With this feature, users can easily monitor the progress of their projects and ensure that they are staying on schedule. This helps teams to optimize their workflows, allocate resources efficiently, and meet project deadlines.
- **Intuitive and Streamlined UI:** User interface is designed to be both intuitive and streamlined, making project management a breeze. The clean and modern design of the interface allows users to easily navigate the app's many features, while also providing a visually pleasing and enjoyable user experience.

## Tools

Proxima is built using the MERN stack, featuring the following powerful tools:

- **MongoDB:** A highly flexible NoSQL database, ideal for managing large and complex data sets.
- **Express:** A popular and highly flexible backend web application framework for Node.js.
- **React:** A powerful and popular frontend JavaScript library, ideal for building user interfaces.
- **Node.js:** A powerful and popular server-side JavaScript runtime environment.
- **Tailwind CSS:** A highly customizable CSS framework, designed to make building sleek and intuitive user interfaces a breeze.

## Installation

To install Proxima, Follow the simple steps below:

> **Note**
> **You must have Node.js and MongoDB installed on your system!**
1. Clone the `client` repository using

```
 git clone https://github.com/masudranashawon/proxima-client.git`
```

2. Clone the `server` repository using

```
git clone https://github.com/masudranashawon/proxima-server.git
```

3. Install the required dependencies in both the `client` and `server` directories by running

```
npm install
```

**Or**

```
npm i
```

4. Create a `.env` file in the root directory of `server` and add the following variables:

- `MONGO_URI`: the MongoDB connection string
- `SECRET`: a secret string for JWT authentication

5. Create a `.env` file in the root directory of `client` and add the following variable:
   - `REACT_APP_BASE_URL`: for example `http://localhost:5000`
6. Start the backend `server` by running

```
npm start
```

7. Start the `frontend` by running

```
npm start
```

## Links

- [Live Demo](https://proxima-application.netlify.app)
- [Front-End Repository](https://github.com/masudranashawon/proxima-client)
- [Back-End Repository](https://github.com/masudranashawon/proxima-server)

## Thanks for visiting this repository!
