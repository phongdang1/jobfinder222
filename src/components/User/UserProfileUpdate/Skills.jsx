import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CloseOutlined } from "@mui/icons-material";
import Paginition from "./Common/Paginition";
import { getUsersById, handleSetDataUserDetail } from "@/fetchData/User";
import { getAllCodeByType } from "@/fetchData/AllCode";
import { getAllSkillByCategory } from "@/fetchData/Skill";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SaveIcon } from "lucide-react";
import toast from "react-hot-toast";

function Skills() {
  const navigate = useNavigate();
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [data, setData] = useState([]);
  const [cateJobCode, setCateJobCode] = useState("");

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
            (skill) => !selectedSkills.some((s) => s.id === skill.id)
          );

          setSuggestedSkills(filteredSkills);
          console.log('data',response.data.data);
        } catch (error) {
          console.log("Error fetching skills");
        }
      }
    };
    fetchSkill();
  }, [cateJobCode]);

  const handleBadgeClick = (skill) => {
    setSuggestedSkills(suggestedSkills.filter((s) => s.id !== skill.id));
    setSelectedSkills([...selectedSkills, skill]);
  };

  const handleRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s.id !== skill.id));
    setSuggestedSkills([...suggestedSkills, skill]);
  };

  const userId = localStorage.getItem("user_id");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillIds = selectedSkills.map((skill) => skill.id);

    try {
      const dataSent = {
        userId: userId,
        data: { listSkills: skillIds },
      };

      const response = await handleSetDataUserDetail(dataSent);
      console.log(dataSent);

      if (response) {
        setTimeout(() => {
          toast.success("Successfully updated your profile!");
        }, 2000);
        navigate("/");
        console.log("Profile updated successfully");
      } else {
        console.log("Profile update failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full block">
      <form onSubmit={handleSubmit}>
        <div className="lg:h-[460px] 2xl:h-[600px] lg:mx-40 md:mx-10 px-2 my-10 bg-white shadow-xl rounded-2xl">
          <p className="text-center pt-8 text-xl font-semibold">
            Add your skill set to attract more employers
          </p>

          <ScrollArea className="h-4/5">
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
                <Label htmlFor="skills">Your skill</Label>

                <div className="flex flex-wrap h-auto items-center w-full rounded-lg border border-input bg-background text-sm ring-offset-background ">
                  {selectedSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-secondary hover:cursor-pointer border-2 flex flex-shrink-0 items-center mx-1 my-1"
                    >
                      <span>{skill.name}</span>
                      <CloseOutlined
                        className="text-gray-400 hover:text-red-400 p-1"
                        onClick={() => handleRemove(skill)}
                      />
                    </Badge>
                  ))}

                  <Input
                    placeholder="Choose Skill"
                    disabled
                    className="h-10 w-28 border-none flex-grow"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center h-full w-fit max-w-4xl">
                <p className="text-center text-base font-medium">
                  Choose a suggested skill below
                </p>

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
        </div>
        <div className="h-16 lg:mx-40 md:mx-10 my-10 bg-white shadow-xl rounded-2xl flex justify-between items-center">
          <Link
            className="flex gap-2 pl-4 hover:bg-primary cursor-pointer rounded-2xl items-center h-full transition-all duration-300 pr-4"
            to={"/profileUpdate/information"}
          >
            <div className="flex gap-1">
              <ArrowBackIcon />
              <p>Back</p>
            </div>
          </Link>
          <button
            type="submit"
            className="flex gap-2 pl-4 hover:bg-primary cursor-pointer rounded-2xl items-center h-full transition-all duration-300 pr-4"
            to={"/profileUpdate/information"}
          >
            <div className="flex gap-2">
              <p>Update </p>
              <SaveIcon />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Skills;
