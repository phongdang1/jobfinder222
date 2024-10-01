import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddCircleOutline, EditNoteOutlined } from "@mui/icons-material";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CloseOutlined } from "@mui/icons-material";
import { getUsersById, handleSetDataUserDetail } from "@/fetchData/User";
import { getAllCodeByType } from "@/fetchData/AllCode";
import { getAllSkillByCategory } from "@/fetchData/Skill";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

import toast from "react-hot-toast";

function AdvancedSetting() {
  const navigate = useNavigate();
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [data, setData] = useState([]);
  const [cateJobCode, setCateJobCode] = useState("");
  const [userSkill, setUserSkill] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});

  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getAllCodeByType("JOBTYPE");
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log("Error fetching job categories");
      }
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchSkill = async () => {
      if (cateJobCode) {
        try {
          const response = await getAllSkillByCategory(cateJobCode);
          const fetchedSkills = response.data.data;
          const filteredSkills = fetchedSkills.filter(
            (skill) =>
              !selectedSkills.some((s) => s.id === skill.id) &&
              !userSkill.listSkill.some((us) => us.skillId === skill.id)
          );

          setSuggestedSkills(filteredSkills);
          console.log(response.data.data);
        } catch (error) {
          console.log("Error fetching skills");
        }
      }
    };
    fetchSkill();
  }, [cateJobCode]);

  useEffect(() => {
    const fetchUserSkill = async () => {
      try {
        const response = await getUsersById(1);
        setUserSkill(response.data.data);
        console.log(JSON.stringify(response.data.data, null, 2));
      } catch (error) {
        console.log("Error fetching job categories");
      }
    };

    fetchUserSkill();
  }, []);

  const handleBadgeClick = (skill) => {
    setSuggestedSkills(suggestedSkills.filter((s) => s.id !== skill.id));
    setSelectedSkills([...selectedSkills, skill]);
  };

  const handleRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s.id !== skill.id));
    setSuggestedSkills([...suggestedSkills, skill]);
  };

  const handleRemoveUserSkill = (skillToRemove) => {
    const updatedUserSkills = userSkill.listSkill.filter(
      (us) => us.skillId !== skillToRemove.skillId
    );

    setUserSkill((prevUserSkill) => ({
      ...prevUserSkill,
      listSkill: updatedUserSkills,
    }));

    setSuggestedSkills([...suggestedSkills, skillToRemove]);
  };

  // const userId = localStorage.getItem("user_id");

  const handleSkill = async (e) => {
    e.preventDefault();

    const skillIds = [
      ...selectedSkills.map((skill) => skill.id),
      ...userSkill.listSkill.map((uskill) => uskill.skillId),
    ];

    try {
      const dataSent = {
        userId: 1,
        data: { listSkills: skillIds },
      };

      const response = await handleSetDataUserDetail(dataSent);
      console.log(dataSent);

      if (response) {
        setTimeout(() => {
          toast.success("Successfully updated your profile!");
        }, 2000);
        setOpen(false);
        console.log("Profile updated successfully");
      } else {
        console.log("Profile update failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full space-y-4 flex-grow">
      <div className="bg-white h-fit rounded-lg font-poppins text-xl md:text-2xl font-medium">
        Hello, User
      </div>
      <div className="bg-white h-fit rounded-lg font-poppins text-xl md:text-2xl font-medium py-2">
        <p className="ml-4 mb-2">Skills</p>

        <div>
          <div className="text-sm ml-4 mb-2 italic text-gray-400 font-normal">
            In this section, you should list the skills that are relevant to the
            position or career field you are interested in.
          </div>
          <form onSubmit={handleSkill}>
            <Dialog onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <div className="flex gap-2 items-center cursor-pointer text-base text-primary ml-4">
                  <AddCircleOutline fontSize="small" className="text-lg" />
                  <p className="hover:underline">Update Skills</p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-screen-sm h-full max-h-svh">
                <DialogHeader>
                  <DialogTitle>Update Skills</DialogTitle>
                </DialogHeader>

                <ScrollArea className="w-full h-4/5">
                  <div className="flex flex-col items-center mt-8 space-y-6">
                    <div className="flex flex-col w-full max-w-lg gap-1.5">
                      <Label htmlFor={"cate"}>Category</Label>
                      <Select onValueChange={(value) => setCateJobCode(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.isArray(data) &&
                            data.map((cate, index) => (
                              <SelectItem key={index} value={cate.code}>
                                {cate.value}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col w-full max-w-lg gap-1.5">
                      <div className="space-x-2">
                        <p className="text-sm mb-1">Chosen skills: </p>
                        {Array.isArray(userSkill.listSkill) &&
                          userSkill.listSkill.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-secondary hover:cursor-pointer border-2 hover:border-primary my-1"
                              // onClick={() => handleBadgeClick(skill)}
                            >
                              {skill.skillData.name}
                              <CloseOutlined
                                className="text-gray-400 hover:text-red-400 p-1"
                                onClick={() => handleRemoveUserSkill(skill)}
                              />
                            </Badge>
                          ))}
                        <p className="text-sm my-1">New skills added: </p>
                        {selectedSkills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-secondary hover:cursor-pointer border-2  mx-1 my-1"
                          >
                            <span>{skill.name}</span>
                            <CloseOutlined
                              className="text-gray-400 hover:text-red-400 p-1"
                              onClick={() => handleRemove(skill)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-center h-full w-fit max-w-4xl">
                      {suggestedSkills.length > 0 ? (
                        <p className="text-center text-base font-medium">
                          Choose a suggested skill below
                        </p>
                      ) : (
                        <p className="text-center text-base font-medium">
                          You have choose all skills from this category
                        </p>
                      )}

                      <div className="flex flex-wrap space-x-4  mt-2">
                        {Array.isArray(suggestedSkills) &&
                          suggestedSkills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-secondary hover:cursor-pointer border-2 hover:border-primary my-1"
                              onClick={() => handleBadgeClick(skill)}
                            >
                              {skill.name}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="hover:bg-primary hover:text-white"
                    onClick={handleSkill}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        </div>

        {/* userSkill */}

        <div className="ml-4 mt-2 space-x-2">
          {Array.isArray(userSkill.listSkill) &&
            userSkill.listSkill.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-secondary hover:cursor-pointer border-2 hover:border-primary py-1 rounded-md"
                // onClick={() => handleBadgeClick(skill)}
              >
                {skill.skillData.name}
              </Badge>
            ))}
        </div>
      </div>

      {/* dream job */}

      <div className="bg-white h-fit rounded-lg font-poppins text-xl md:text-2xl font-medium py-2">
        <div className="flex justify-between items-center">
          <p className="ml-4 mb-2">Dream Job</p>

          <form>
            <Dialog onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <EditNoteOutlined className="hover:text-primary mr-4 cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="max-w-screen-sm max-h-svh">
                <DialogHeader>
                  <DialogTitle>Dream Job</DialogTitle>
                </DialogHeader>

                <ScrollArea className="w-full h-4/5">
                  <div className="">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className={`${
                          errorMessage.lastName
                            ? "border-red-500"
                            : "focus:border-primary"
                        } rounded-lg`}
                      />
                      {errorMessage.lastName && (
                        <p className="text-red-500">{errorMessage.lastName}</p>
                      )}
                    </div>
                  </div>
                </ScrollArea>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="hover:bg-primary hover:text-white"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        </div>
        {/* info of dream job */}
        <div className="text-sm ml-4 mb-2 italic text-gray-400 font-normal">
          <p>Set up your dream job here.</p>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSetting;
