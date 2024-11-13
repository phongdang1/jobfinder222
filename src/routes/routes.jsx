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
import ProductPage from "@/components/Company/components/ProductPage";
import ProductCart from "@/components/Company/components/ProductCart";

import PaymentLayout from "./../components/layout/PaymentLayout";
import PaymentSuccess from "@/components/Company/components/Payment/CvPayment/PaymentSuccess";
import ProtectedRoute from "./ProtectedRoutes";
import { Navigate } from "react-router-dom";
import RedirectBasedOnRole from "./RedirectBasedOnRole";

import JobsComparison from "@/components/User/Common/JobCompare/JobsComparison";

import PostPaymentSuccess from "@/components/Company/components/Payment/HotPostPayment/PostPaymentSuccess";
import VipPaymentSuccess from "@/pages/User/VipPaymentSuccess";
import PostPaymentCancel from "@/components/Company/components/Payment/HotPostPayment/PostPaymentCancel";
import ManageUser from "@/components/Admin/components/ManageUser";
import ManageReport from "@/components/Admin/components/ManageReport";

const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <RedirectBasedOnRole component={<HomePage />} /> },
      {
        path: "/login",
        element: <RedirectBasedOnRole component={<LoginPage />} />,
      },
      {
        path: "/signup",
        element: <RedirectBasedOnRole component={<SignUpPage />} />,
      },
      // { path: "/otp", element: <OTPPage /> },
      {
        path: "/vip",
        element: <RedirectBasedOnRole component={<VipFeature />} />,
      },
      {
        path: "/job-detail/:id",
        element: <RedirectBasedOnRole component={<JobDetail />} />,
      },
      {
        path: "/jobs",
        element: <RedirectBasedOnRole component={<JobPage />} />,
      },
      {
        path: "/companypage",
        element: <RedirectBasedOnRole component={<CompanyPage />} />,
      },
      {
        path: "/companydetail/:id",
        element: <RedirectBasedOnRole component={<CompanyDetail />} />,
      },
      {
        path: "/jobsComparison/:id",
        element: <RedirectBasedOnRole component={<JobsComparison />} />,
      },
    ],
  },
  // Routes using DefaultLayout
  {
    path: "/",
    element: (
      <ProtectedRoute
        element={<DefaultLayout />}
        allowedRoles={"USER"}
        redirectPath="/"
      />
    ),
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
    element: (
      <ProtectedRoute element={<CompanyLayout />} allowedRoles={"COMPANY"} />
    ),
    children: [
      { path: "dashboard", element: <DashboardCompany /> },
      { path: "jobPost", element: <ManageJobPost /> },
      { path: "manageCompany", element: <ManageCompany /> },
      { path: "candidate", element: <FindCandidate /> },
      { path: "transaction", element: <TransactionHistory /> },
      { path: "product", element: <ProductPage /> },
      { path: "createJobPost", element: <CreateJobPost /> },
      { path: "cart", element: <ProductCart /> },
      {
        path: "candidateDetail/:userId/:allowCv",
        element: <CandidateDetail />,
      },
    ],
  },

  {
    path: "/companyProfile",
    element: (
      <ProtectedRoute
        element={<CompanyProfileLayout />}
        allowedRoles={"COMPANY"}
      />
    ),
    children: [
      { path: "profile", element: <CompanyInfo /> },
      { path: "accountInfo", element: <AccountInfo /> },
    ],
  },

  {
    path: "/profileUpdate",
    element: (
      <ProtectedRoute
        element={<UserProfileUpdateLayout />}
        allowedRoles={"USER"}
      />
    ),
    children: [
      {
        path: "experience",
        element: <RedirectBasedOnRole component={<UserProfileUpdate />} />,
      },
      {
        path: "information",
        element: <RedirectBasedOnRole component={<PersonalInformation />} />,
      },
      {
        path: "skills",
        element: <RedirectBasedOnRole component={<Skills />} />,
      },
    ],
  },
  {
    path: "/userProfile",
    element: (
      <ProtectedRoute element={<UserProfileLayout />} allowedRoles={"USER"} />
    ),
    children: [
      {
        path: "personalInfo",
        element: <RedirectBasedOnRole component={<PersonalInformation2 />} />,
      },
      {
        path: "changePassword",
        element: <RedirectBasedOnRole component={<ChangePassword />} />,
      },
      {
        path: "advancedSetting",
        element: <RedirectBasedOnRole component={<AdvancedSetting />} />,
      },
      {
        path: "viewApplication",
        element: <RedirectBasedOnRole component={<YourApplication />} />,
      },
    ],
  },
  // Routes using AdminLayout
  {
    path: "/admin",
    element: (
      <ProtectedRoute element={<AdminLayout />} allowedRoles={"ADMIN"} />
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "jobType", element: <ManageTypeJob /> },
      { path: "skill", element: <ManageSkill /> },
      { path: "level", element: <ManageLevel /> },
      { path: "workForm", element: <ManageWorkForm /> },
      { path: "package", element: <ManagePackages /> },
      { path: "company", element: <ManageCompanyAdmin /> },
      { path: "post", element: <ManagePostAdmin /> },
      { path: "user", element: <ManageUser /> },
      { path: "report", element: <ManageReport /> },
    ],
  },
  {
    path: "signupCompany",
    element: (
      <ProtectedRoute element={<SignUpCompany />} allowedRoles={"COMPANY"} />
    ),
  },
  {
    path: "/",
    element: <PaymentLayout />,

    children: [
      { path: "paymentViewCV/success", element: <PaymentSuccess /> },
      { path: "paymentHotPost/success", element: <PostPaymentSuccess /> },
      { path: "paymentVip/success", element: <VipPaymentSuccess /> },
      { path: "paymentViewCV/cancel", element: <PostPaymentCancel /> },
      { path: "paymentHotPost/cancel", element: <PostPaymentCancel /> },
      { path: "paymentVip/cancel", element: <PostPaymentCancel /> },
    ],
  },
];

export default routes;
