import HomePage from "../pages/User/Homepage";
import CompanyPage from "../pages/Company/CompanyPage";
import LoginPage from "../pages/Common/Authentication/LoginPage";
import SignUpPage from "@/pages/Common/Authentication/SignUpPage";
import JobDetail from "@/pages/User/Job/JobDetail";
import Jobspage from "@/pages/User/Jobspage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/companypage", element: <CompanyPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/job-detail", element: <JobDetail /> },
  { path: "/jobs", element: <Jobspage /> },
];

export default routes;
