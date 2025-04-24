Blog Application
A modern blog application built with Next.js, React, and Redux Toolkit. The application allows users to create, read, update, and delete blog posts and comments, with additional features like post filtering, pagination, and confirmation modals for enhanced user experience.

###Features

CRUD Operations: Create, read, update, and delete blog posts and comments.
Comment Deletion: Users can delete comments associated with posts.
Post Filtering: Filter posts based on their creation date (newest first).
Pagination: Navigate through posts with client-side pagination.
Modal Windows:
Confirmation modals for deleting entities (posts or comments).
A modal prompting users to save unsaved changes when attempting to leave a page.


Form Validation: Powered by react-hook-form and zod for robust form handling.
State Management: Managed with Redux Toolkit and next-redux-wrapper.
Responsive Design: Styled with Tailwind CSS for a modern and responsive UI.

Prerequisites
Before running the application, ensure you have the following installed:

Node.js: Version 18 or higher
npm: Version 9 or higher
Backend Server: The application requires a backend API running at http://localhost:3001.

Setup Instructions
Follow these steps to set up and run the application locally:
1. Clone the Repository
git clone https://github.com/PaninDmytro/blog.git
cd blog

2. Install Dependencies
Install the required dependencies using npm:
npm install

3. Configure Environment Variables
Create a .env.local file in the root of the project and add the following environment variable:
NEXT_PUBLIC_API_URL=http://localhost:3001

This variable points to the backend API server. Ensure the backend server is running on http://localhost:3001 before starting the application.
4. Run the Backend Server
Ensure the backend API server is running on http://localhost:3001. Refer to the backend's documentation for setup instructions.
5. Run the Application
Start the development server:
npm run dev

The application will be available at http://localhost:3000.
6. Build for Production
To create a production build:
npm run build

To start the production server:
npm start

7. Linting
Run the linter to check for code quality issues:
npm run lint

Assumptions

The backend API is fully compatible with the frontend and provides endpoints for posts and comments CRUD operations.
The backend server is running locally on http://localhost:3001.
Users have a basic understanding of Next.js and Redux for further customization.

Important Notes

Environment Variables: Ensure the NEXT_PUBLIC_API_URL is correctly set in .env.local. Incorrect configuration may result in API request failures.
Modal Behavior: The unsaved changes modal will only appear if there are pending changes in forms managed by react-hook-form.
Pagination: The pagination is client-side and depends on the number of posts fetched from the API.
Error Handling: Basic error handling is implemented for API requests. Enhance as needed for production use.

Project Structure

pages/: Next.js pages for routing.
components/: Reusable React components for UI.
store/: Redux Toolkit setup for state management.
styles/: Tailwind CSS configuration and global styles.
public/: Static assets like images.

Dependencies

Next.js: Framework for server-side rendering and static site generation.
React & React DOM: Core libraries for building the UI.
Redux Toolkit & React-Redux: State management.
React Hook Form & Zod: Form handling and validation.
Tailwind CSS: Utility-first CSS framework for styling.
Classnames: Utility for conditionally joining class names.

For a full list of dependencies, refer to package.json.
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
License
This project is licensed under the MIT License.
