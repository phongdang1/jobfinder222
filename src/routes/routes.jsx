import HomePage from "../pages/User/Homepage";
import CompanyPage from "../pages/User/Company/CompanyPage";
import LoginPage from "../pages/Common/Authentication/LoginPage";
import SignUpPage from "@/pages/Common/Authentication/SignUpPage";
import JobDetail from "@/pages/User/Job/JobDetail";
import Jobspage from "@/pages/User/Jobspage";
import CompanyDetail from "@/pages/User/Company/CompanyDetail";
import UserProfilePage from "@/pages/User/UserProfilePage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/companypage", element: <CompanyPage /> },
  { path: "/companydetail", element: <CompanyDetail /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/job-detail", element: <JobDetail /> },
  { path: "/jobs", element: <Jobspage /> },
  { path: "/profile", element: <UserProfilePage /> },
];

export default routes;
