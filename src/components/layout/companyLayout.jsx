import CompanyHeader from '../Company/common/CompanyHeader';
import Sidebar from '../Company/common/Sidebar';
import { Outlet } from 'react-router-dom';

function CompanyLayout() {
  return (
    <div className=" flex flex-row min-h-screen bg-white ">
     
   
        <Sidebar />
         <CompanyHeader />
        {/* <div className="flex-grow">
          <Outlet />
        </div> */}
    
    </div>
  );
}

export default CompanyLayout;
