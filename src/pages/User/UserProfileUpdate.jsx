import { useState } from "react";
import Experience from "@/components/User/UserProfileUpdate/Experience";
import PersonalInformation from "@/components/User/UserProfileUpdate/PersonalInformation";
import Skills from "@/components/User/UserProfileUpdate/Skills";
import Paginition from "@/components/User/UserProfileUpdate/Common/Paginition";

function UserProfileUpdate() {
  return (
    <div className="w-full h-full block">
      <Experience />
      <Paginition back="" next="/profileUpdate/information" />
    </div>
  );
}

export default UserProfileUpdate;
