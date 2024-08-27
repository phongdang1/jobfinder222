import HomePage from "../pages/User/Homepage";
import CompanyPage from "../pages/Company/CompanyPage";
import LoginPage from "../pages/Common/Authentication/LoginPage";
import SignUpPage from "@/pages/Common/Authentication/SignUpPage";
import Jobspage from "@/pages/User/Jobspage";
import CompanyDetail from "@/pages/Company/CompanyDetail";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/companypage", element: <CompanyPage /> },
  { path: "/companydetail", element: <CompanyDetail /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/jobs", element: <Jobspage /> },
];

export default routes;
