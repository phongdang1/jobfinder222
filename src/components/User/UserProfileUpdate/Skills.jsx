import * as React from "react";
import { useState } from "react";
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
import { Close, CloseOutlined } from "@mui/icons-material";
import Paginition from "./Common/Paginition";

function Skills() {
  const [suggestedSkills, setSuggestedSkills] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "CSS",
    "HTML",
    "TypeScript",
    "Tailwind CSS",
  ]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleBadgeClick = (skill) => {
    setSuggestedSkills(suggestedSkills.filter((s) => s !== skill));
    setSelectedSkills([...selectedSkills, skill]);
  };

  const handleRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    setSuggestedSkills([...suggestedSkills, skill]);
  };

  return (
    <div className="w-full h-full block">
      <div className="h-[460px] lg:mx-40 md:mx-10 px-2 my-10 bg-white shadow-xl rounded-2xl">
        <p className="text-center pt-8 text-xl font-semibold">
          Add your skill set to attract more employers
        </p>
        <ScrollArea className="h-4/5">
          <div className="flex flex-col items-center mt-8 space-y-6">
            <div className="flex flex-col w-full max-w-lg gap-1.5">
              <Label htmlFor="cate">Category</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
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
                    <span>{skill}</span>
                    <CloseOutlined
                      className="text-gray-400 hover:text-red-400 p-1"
                      onClick={() => handleRemove(skill)}
                    />
                  </Badge>
                ))}

                <Input
                  placeholder="Add skill"
                  className="h-10 w-28 border-none flex-grow"
                />
              </div>
            </div>

            <div className="flex flex-col items-center h-full w-fit">
              <p className="text-center text-base font-medium">
                Choose a suggested skill below
              </p>

              <div className="flex flex-wrap space-x-2 mt-2">
                {suggestedSkills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-secondary hover:cursor-pointer border-2 hover:border-primary"
                    onClick={() => handleBadgeClick(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      <Paginition back="/profileUpdate/information" next="" />
    </div>
  );
}

export default Skills;
