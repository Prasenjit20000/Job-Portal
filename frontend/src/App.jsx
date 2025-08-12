import Navbar from "./components/shared/Navbar"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Home from "./components/Home"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import CreateCompany from "./components/admin/CreateCompany"
import CompanySetup from "./components/admin/CompanySetup"
import AdminJobs from "./components/admin/AdminJobs"
import PostJob from "./components/admin/PostJob"
import Applicants from "./components/admin/Applicants"
import ProtectedRoute from "./components/admin/ProtectedRoute"
import UpdateJob from "./components/admin/UpdateJob"

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },

  // admit routes
  {
    path : '/admin/companies',
    // element : <ProtectedRoute><Companies/></ProtectedRoute>
    element : <Companies/>
  },
  {
    path : '/admin/companies/create',
    element : <CreateCompany/>
  },
  {
    path : '/admin/companies/:id',
    element : <CompanySetup/>
  },
  {
    path : '/admin/jobs',
    element : <AdminJobs/>
  },
  {
    path : '/admin/job/create',
    element : <PostJob/>
  },
  {
    path : '/admin/job/:id/applicants',
    element : <Applicants/>
  },
  {
    path : '/admin/job/update/:id',
    element : <UpdateJob/>
  }
])


function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App