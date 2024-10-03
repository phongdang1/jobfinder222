import HomePage from "../pages/User/Homepage";
import CompanyPage from "../pages/User/Company/CompanyPage";
import LoginPage from "../pages/Common/Authentication/LoginPage";
import SignUpPage from "@/pages/Common/Authentication/SignUpPage";
import JobDetail from "@/pages/User/Job/JobDetail";
import JobPage from "@/pages/User/Job/JobPage";
import CompanyDetail from "@/pages/User/Company/CompanyDetail";
import CompanyLayout from "@/components/layout/companyLayout";
import DefaultLayout from "@/components/layout/defaultLayout";
import ManageJobPost from "@/components/Company/components/ManageJobPost";
import ManageCompany from "@/components/Company/components/ManageCompany";
import FindCandidate from "@/components/Company/components/FindCandidate";
import TransactionHistory from "@/components/Company/components/TransactionHistory";

import UserProfilePage from "@/pages/User/UserProfilePage";
import OTPPage from "@/components/Common/Authentication/OTP";
import UserProfileUpdate from "@/pages/User/UserProfileUpdate";
import UserProfileUpdateLayout from "@/components/layout/userProfileUpdateLayout";
import Skills from "@/components/User/UserProfileUpdate/Skills";
import PersonalInformation from "@/components/User/UserProfileUpdate/PersonalInformation";

import AdminLayout from "@/components/layout/adminLayout";
import ManageTypeJob from "@/components/Admin/components/ManageTypeJob";
import Dashboard from "@/components/Admin/components/Dashboard";
import ManageSkill from "@/components/Admin/components/ManageSkill";
import ManageLevel from "@/components/Admin/components/ManageLevel";
import ManageWorkForm from "@/components/Admin/components/ManageWorkForm";
const routes = [
  // Routes using DefaultLayout
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/otp", element: <OTPPage /> },
      { path: "/job-detail/:id", element: <JobDetail /> },
      { path: "/jobs", element: <JobPage /> },

      { path: "/companypage", element: <CompanyPage /> },
      { path: "/companydetail/:id", element: <CompanyDetail /> },
      { path: "/profile", element: <UserProfilePage /> },
    ],
  },
  // Routes using CompanyLayout
  {
    path: "/company",
    element: <CompanyLayout />,
    children: [
      { path: "jobPost", element: <ManageJobPost /> },
      { path: "manageCompany", element: <ManageCompany /> },
      { path: "candidate", element: <FindCandidate /> },
      { path: "transaction", element: <TransactionHistory /> },
    ],
  },
  {
    path: "/profileUpdate",
    element: <UserProfileUpdateLayout />,
    children: [
      { path: "experience", element: <UserProfileUpdate /> },
      { path: "information", element: <PersonalInformation /> },
      { path: "skills", element: <Skills /> },
    ],
  },
  // Routes using AdminLayout
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "jobType", element: <ManageTypeJob /> },
      { path: "skill", element: <ManageSkill /> },
      { path: "level", element: <ManageLevel /> },
      { path: "workForm", element: <ManageWorkForm /> },
    ],
  },
];

export default routes;
