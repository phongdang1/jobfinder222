import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Paginition from "./Common/Paginition";
import { useState } from "react";

function PersonalInformation() {
  const [date, setDate] = useState();

  return (
    <div className="w-full h-full block">
      <form>
        <div className="h-[460px] 2xl:h-[600px] lg:mx-40 md:mx-10 my-10 bg-white shadow-xl rounded-2xl">
          <p className="text-center pt-8 text-xl font-semibold">
            Personal Information
          </p>
          <ScrollArea className="h-4/5">
            <div className="flex flex-col items-center mt-8 space-y-6">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="name"
                  id="name"
                  placeholder="Name"
                  className="rounded-lg"
                />
              </div>
              <div className="flex gap-4 w-full max-w-sm items-center">
                <div className="block ">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <div className="w-full max-w-md">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className=" w-auto p-0">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          selected={date}
                          onSelect={setDate}
                          fromYear={1960}
                          toYear={2030}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex flex-col gap-5 justify-center">
                  <Label htmlFor="gender">Gender</Label>
                  <RadioGroup className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="r1" />
                      <Label htmlFor="r1">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="r2" />
                      <Label htmlFor="r2">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="flex flex-col w-full max-w-sm gap-1.5">
                <Label htmlFor="Phone Number">Phone Number</Label>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="+84" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    type="Phone Number"
                    id="Phone Number"
                    placeholder="Phone Number"
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">City</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Current Address</Label>
                <Input
                  type="name"
                  id="name"
                  placeholder="Current Address"
                  className="rounded-lg"
                />
              </div>
            </div>
          </ScrollArea>
        </div>
        <Paginition
          back="/profileUpdate/experience"
          next="/profileUpdate/skills"
        />
      </form>
    </div>
  );
}

export default PersonalInformation;
