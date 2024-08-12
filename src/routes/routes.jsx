import HomePage from "../pages/User/Homepage";
import CompanyPage from "../pages/Company/CompanyPage";
import LoginPage from "../pages/Common/Authentication/LoginPage";
import SignUpPage from "@/pages/Common/Authentication/SignUpPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/companypage", element: <CompanyPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
];

export default routes;
