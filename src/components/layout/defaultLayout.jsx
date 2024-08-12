import Header from "../User/Homepage/Header";
import Footer from "../User/Homepage/Footer";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-slate-100 to-purple-100">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
