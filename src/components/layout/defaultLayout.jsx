import Header from "../User/Common/Header";
import Footer from "../User/Common/Footer";
import { Outlet } from "react-router-dom";
import ChatBox from "../ChatBox/ChatBox";

function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-l from-primary/35 to-primary/5">
      <Header />
      <div className="flex-grow">
        <Outlet />
        <div className={`relative  bottom-24 right-24`}>
          <ChatBox />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
