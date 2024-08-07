import HomePage from "../pages/User/Homepage";
import CompanyPage from "../pages/Company/CompanyPage";
import LoginPage from "../pages/Common/Authentication/LoginPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/companypage", element: <CompanyPage /> },
  { path: "/login", element: <LoginPage /> },
];

export default routes;
