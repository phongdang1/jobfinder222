import Header from "../User/Common/Header";
import Footer from "../User/Common/Footer";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-l from-primary/35 to-primary/5">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
