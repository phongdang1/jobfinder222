import HomePage from "../pages/User/Homepage";
import CompanyPage from "../pages/User/Company/CompanyPage";
import LoginPage from "../pages/Common/Authentication/LoginPage";
import SignUpPage from "@/pages/Common/Authentication/SignUpPage";
import JobDetail from "@/pages/User/Job/JobDetail";
import Jobspage from "@/pages/User/Jobspage";
import CompanyDetail from "@/pages/User/Company/CompanyDetail";
import CompanyLayout from "@/components/layout/companyLayout";
import DefaultLayout from "@/components/layout/defaultLayout";
import ManageJobPost from "@/components/Company/components/ManageJobPost";
import ManageCompany from "@/components/Company/components/ManageCompany";
import FindCandidate from "@/components/Company/components/FindCandidate";
import TransactionHistory from "@/components/Company/components/TransactionHistory";

import UserProfilePage from "@/pages/User/UserProfilePage";
import UserProfileUpdate from "@/pages/User/UserProfileUpdate";
import UserProfileUpdateLayout from "@/components/layout/userProfileUpdateLayout";
import PersonalInformation from "@/components/User/UserProfileUpdate/PersonalInformation";
import Skills from "@/components/User/UserProfileUpdate/Skills";

const routes = [
  // Routes using DefaultLayout
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/job-detail", element: <JobDetail /> },
      { path: "/jobs", element: <Jobspage /> },
      { path: "/companypage", element: <CompanyPage /> },
      { path: "/companydetail", element: <CompanyDetail /> },
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
];

export default routes;
