import Header from "../User/Homepage/Header";
import Footer from "../User/Homepage/Footer";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
