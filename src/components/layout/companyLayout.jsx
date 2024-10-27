import CompanyHeader from '../Company/common/CompanyHeader';
import Sidebar from '../Company/common/Sidebar';
import { Outlet } from 'react-router-dom';
import CompanyFooter from './../Company/common/CompanyFooter';

function CompanyLayout() {
  return (

    <div className=" flex flex-col bg-[#E6E6FA]/50 ">
      {/* <Sidebar /> */}
      <CompanyHeader />
      <div className="flex-grow mx-36">
        <Outlet />
      </div>
      <CompanyFooter />

    </div>
  );
}

export default CompanyLayout;
