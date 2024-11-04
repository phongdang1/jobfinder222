import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AdminPanelSettingsRounded,
  BusinessRounded,
  ExpandMore,
} from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

function CompanyProfilePage() {
  const [click, setClick] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="col-span-2 mt-4 space-y-4">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="bg-white rounded-lg shadow-md px-4 py-2 mx-4"
      >
        <CollapsibleTrigger className="flex items-center gap-4 my-4">
          <AdminPanelSettingsRounded className="text-primary" />
          <p>Account Management</p>
          <ExpandMore />
        </CollapsibleTrigger>

        <div className="space-y-4">
          <CollapsibleContent
            className={`pl-10 hover:bg-primary p-2 rounded-md hover:text-white cursor-pointer ${
              click === "AccountInfo" ? "bg-primary text-white" : ""
            }`}
          >
            <Link to="accountInfo" onClick={() => setClick("AccountInfo")}>
              <p>Account Information</p>
            </Link>
          </CollapsibleContent>
        </div>
      </Collapsible>

      <Collapsible className="bg-white rounded-lg shadow-md px-4 py-2 mx-4">
        <CollapsibleTrigger className="flex items-center gap-4 my-4">
          <BusinessRounded className="text-primary" />
          <p>Company Detail</p>
          <ExpandMore />
        </CollapsibleTrigger>
        <div className="space-y-4">
          <CollapsibleContent
            className={`pl-10 hover:bg-primary p-2 rounded-md hover:text-white cursor-pointer ${
              click === "CompanyDetail" ? "bg-primary text-white" : ""
            }`}
          >
            <Link to="profile" onClick={() => setClick("CompanyDetail")}>
              <p>Company Detail</p>
            </Link>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}

export default CompanyProfilePage;
