import HomePage from "../pages/User/Homepage";
import CompanyPage from "../pages/User/Company/CompanyPage";
import LoginPage from "../pages/Common/Authentication/LoginPage";
import SignUpPage from "@/pages/Common/Authentication/SignUpPage";
import JobDetail from "@/pages/User/Job/JobDetail";

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
import VipFeature from "@/pages/User/VipFeature";
import JobPage from "@/pages/User/Job/JobPage";

import UserProfileLayout from "@/components/layout/UserProfileLayout";
import PersonalInformation2 from "@/components/User/UserProfile/PersonalInformation";
import ChangePassword from "@/components/User/UserProfile/ChangePassword";
import AdvancedSetting from "@/components/User/UserProfile/AdvancedSetting";
import YourApplication from "@/components/User/UserProfile/YourApplication";

import AdminLayout from "@/components/layout/adminLayout";
import ManageTypeJob from "@/components/Admin/components/ManageTypeJob";
import Dashboard from "@/components/Admin/components/Dashboard";
import ManageSkill from "@/components/Admin/components/ManageSkill";
import ManageLevel from "@/components/Admin/components/ManageLevel";
import ManageWorkForm from "@/components/Admin/components/ManageWorkForm";

import ManagePackages from "@/components/Admin/components/ManagePackages";
import CreateJobPost from "@/components/Company/components/CreateJobPost";
import ManageCompanyAdmin from "@/components/Admin/components/ManageCompany";
import ManagePostAdmin from "@/components/Admin/components/ManagePost";
import CompanyInfo from "@/components/Company/components/CompanyProfile/profile";
import DashboardCompany from "@/components/Company/components/DashboardCompany";
import CandidateDetail from "@/components/Company/components/CandidateDetail";
import SignUpCompany from "@/components/Common/Authentication/SignUpCompany";
import CompanyProfileLayout from "@/components/layout/CompanyProfileLayout";
import AccountInfo from "@/components/Company/components/CompanyProfile/AccountInfo";

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
      { path: "/vip", element: <VipFeature /> },
      { path: "/job-detail/:id", element: <JobDetail /> },
      { path: "/jobs", element: <JobPage /> },

      { path: "/companypage", element: <CompanyPage /> },
      { path: "/companydetail/:id", element: <CompanyDetail /> },
    ],
  },
  // Routes using CompanyLayout
  {
    path: "/company",
    element: <CompanyLayout />,
    children: [
      { path: "dashboard", element: <DashboardCompany /> },
      { path: "jobPost", element: <ManageJobPost /> },
      { path: "manageCompany", element: <ManageCompany /> },
      { path: "candidate", element: <FindCandidate /> },
      { path: "transaction", element: <TransactionHistory /> },
      { path: "createJobPost", element: <CreateJobPost /> },
      {
        path: "candidateDetail/:userId/:allowCv",
        element: <CandidateDetail />,
      },
    ],
  },

  {
    path: "/companyProfile",
    element: <CompanyProfileLayout />,
    children: [
      { path: "profile", element: <CompanyInfo /> },
      { path: "accountInfo", element: <AccountInfo /> },
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
  {
    path: "/userProfile",
    element: <UserProfileLayout />,
    children: [
      { path: "personalInfo", element: <PersonalInformation2 /> },
      { path: "changePassword", element: <ChangePassword /> },
      { path: "advancedSetting", element: <AdvancedSetting /> },
      { path: "viewApplication", element: <YourApplication /> },
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
      { path: "package", element: <ManagePackages /> },
      { path: "company", element: <ManageCompanyAdmin /> },
      { path: "post", element: <ManagePostAdmin /> },
    ],
  },
  {
    path: "signupCompany",
    element: <SignUpCompany />,
  },
];

export default routes;
