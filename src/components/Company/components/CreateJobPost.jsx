import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { getAllCodeByType, getValueByCode } from "@/fetchData/AllCode";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import axios from "../../../fetchData/axios";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
function CreateJobPost() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const currentYear = new Date().getFullYear();
  const [form, setForm] = useState({
    name: "",
    category: "",
    address: "",
    salary: "",
    amount: "",
    timeEnd: "",
    jobLevel: "",
    userId: "",
    workType: "",
    experience: "",
    gender: "",
    description: "",
    benefit: "",
    requirement: "",
    skillRequirement: "",
  });
  const [province, setProvince] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [jobLevel, setJobLevel] = useState([]);
  const [salary, setSalary] = useState([]);
  const [workType, setWorkType] = useState([]);
  const [gender, setGender] = useState([]);
  const [experience, setExperience] = useState([]);
  const [value , setValue] = useState('');
  const typeKey = [
    "PROVINCE",
    "JOBTYPE",
    "JOBLEVEL",
    "SALARYTYPE",
    "WORKTYPE",
    "GENDERPOST",
    "EXPTYPE",
  ];

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  // Function to scroll to the desired section
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    console.log("Updated requirement:", form.requirement);
  }, [form.requirement]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handleRequirementChange = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      requirement: value,
    }));
  };

  const handleSubmitForm = async () => {
    try {
      const res = await axios.post("/createNewPost", {
        name: form.name,
        categoryJobCode: form.category,
        addressCode: form.address,
        salaryJobCode: form.salary,
        amount: form.amount,
        timeEnd: form.timeEnd,
        jobLevelCode: form.jobLevel,
        userId: 17, // TODO: Replace with user id
        workTypeCode: form.workType,
        experienceJobCode: form.experience,
        genderPostCode: form.gender,
        description: form.description,
        benefit: form.benefit,
        requirement: form.requirement,
        skillRequirement: form.skillRequirement,
      });
      if (res.data.errCode === 0) {
        toast.success(res.data.errMessage);
        setForm({
          name: "",
          category: "",
          address: "",
          salary: "",
          amount: "",
          timeEnd: "",
          jobLevel: "",
          userId: "",
          workType: "",
          experience: "",
          gender: "",
          description: "",
          benefit: "",
          requirement: "",
          skillRequirement: "",
        });
        console.log(res.data);
      } else {
        toast.error(res.data.errMessage);
        console.error(res.data);
        console.log(form);
      }
    } catch (error) {
      console.error("loi roi", error);
    }
  };

  useEffect(() => {
    const fetchJobType = async () => {
      try {
        const response = typeKey.map((type) => getAllCodeByType(type));

        const results = await Promise.all(response);
        // put res in array of all results in Promise

        setProvince(results[0]?.data.data || []);
        setJobType(results[1]?.data.data || []);
        setJobLevel(results[2]?.data.data || []);
        setSalary(results[3]?.data.data || []);
        setWorkType(results[4]?.data.data || []);
        setGender(results[5]?.data.data || []);
        setExperience(results[6]?.data.data || []);

        // console.log(JSON.stringify(results[3], null, 2));
      } catch (error) {
        console.log("Error fetching job types");
      }
    };
    fetchJobType();
  }, []);
  return (
    <div className="flex flex-col lg:flex-row mx-4 lg:mx-20 xl:mx-32 gap-4">
      {/* Left Trigger Menu - Make it sticky */}
      <div className="lg:w-2/5 mx-auto mt-8 p-4 sticky top-[120px] self-start bg-white rounded-xl shadow-lg border-2 border-gray-200 mb-8">
        <ul className="space-y-3 text-center">
          <li className="flex items-center justify-between gap-4 hover:bg-primary py-1 rounded-lg hover:text-white cursor-pointer group xl:px-24">
            <button
              className="text-third group-hover:text-white"
              onClick={() => scrollToSection(section1Ref)}
            >
              Job Information
            </button>
            <CheckCircle className="text-default-300" />
          </li>
          <li className="flex items-center justify-between gap-4 hover:bg-primary py-1 rounded-lg hover:text-white cursor-pointer group xl:px-24">
            <button
              className="text-third group-hover:text-white"
              onClick={() => scrollToSection(section2Ref)}
            >
              Application Amount
            </button>
            <CheckCircle className="text-default-300" />
          </li>
          <li className="flex items-center justify-between gap-4 hover:bg-primary py-1 rounded-lg hover:text-white cursor-pointer group xl:px-24">
            <button
              className="text-third group-hover:text-white"
              onClick={() => scrollToSection(section3Ref)}
            >
              Job Requirements
            </button>
            <CheckCircle className="text-default-300" />
          </li>
          <li className="flex items-center justify-between gap-4 hover:bg-primary py-1 rounded-lg hover:text-white cursor-pointer group xl:px-24">
            <button
              className="text-third group-hover:text-white"
              onClick={() => scrollToSection(section4Ref)}
            >
              Additional Information
            </button>
            <CheckCircle className="text-default-300" />
          </li>
        </ul>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-4/5 p-4 mt-5 overflow-y-auto h-full">
        {/* Tên và description */}
        <div ref={section1Ref} className="bg-white rounded-xl shadow-lg mb-8">
          <h2 className="h-full text-xl text-white rounded-t-xl font-bold mb-4 bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 p-4">
            Job Information
          </h2>
          <div className="space-y-4 pb-4">
            {/* tên post */}
            <div className="px-4">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter the job title"
                className="rounded-lg"
                value={form.name}
                onChange={handleInputChange}
              />
            </div>
            {/* description */}
            <div className="px-4">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="Enter a detailed job description"
                className="rounded-lg"
                value={form.description}
                onChange={handleInputChange}
              />
            </div>
            {/* end time */}
            <div className="px-4 flex flex-col gap-y-2">
              <Label htmlFor="jobDescription">Application Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !form.timeEnd && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.timeEnd ? (
                      format(form.timeEnd, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={form.timeEnd}
                    onSelect={(selectedDate) => {
                      setForm({
                        ...form,
                        timeEnd: selectedDate,
                      });
                      console.log("time end", form);
                    }}
                    fromYear={currentYear}
                    toYear={currentYear}
                    className="text-black"
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    value={form.timeEnd}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div ref={section2Ref} className="bg-white rounded-xl shadow-lg mb-8">
          <h2 className="h-full w-full text-xl text-white rounded-t-xl font-bold mb-4 bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 p-4">
            Application Amount
          </h2>
          <div className="space-y-4 pb-4">
            {/* benefit */}
            <div className="px-4">
              <Label>Benefit</Label>
              <Input
                type="text"
                name="benefit"
                placeholder="Benefit..."
                className="rounded-lg"
                value={form.benefit}
                onChange={handleInputChange}
              />
            </div>
            {/* amount */}
            <div className="px-4">
              <Label>Amount</Label>
              <Input
                type="url"
                name="amount"
                placeholder="Amount..."
                className="rounded-lg"
                value={form.amount}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div ref={section3Ref} className="bg-white rounded-xl shadow-lg mb-8">
          <h2 className="h-full w-full text-xl text-white rounded-t-xl font-bold mb-4 bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 p-4">
            Job Requirement
          </h2>
          <div className="space-y-4 pb-4">
            {/* requirement */}
            <div className="px-4">
              <Label>Requirement</Label>
              <ReactQuill
                type="text"
                name="requirement"
                placeholder="Requirement..."
                className="rounded-lg"
                modules={modules}
                formats={formats}
                value={form.requirement}
                onChange={handleRequirementChange}
              />
            </div>
            {/* skill requirement */}
            <div className="px-4">
              <Label>Skill Requirement</Label>
              <Input
                type="text"
                name="skillRequirement"
                placeholder="Skill Requirement..."
                className="rounded-lg"
                value={form.skillRequirement}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* select mấy cái job code */}
        <div ref={section4Ref} className="bg-white rounded-xl shadow-lg mb-8">
          <h2 className="h-full w-full text-xl text-white rounded-t-xl font-bold mb-4 bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 p-4">
            Additional Information
          </h2>
          <div className="space-y-4 pb-4">
            {/* address */}
            <div className="px-4">
              <Label>Work Location</Label>
              <Select
                value={form.address}
                onValueChange={(value) => {
                  setForm({ ...form, address: value });
                }}
                className="flex items-center"
              >
                <SelectTrigger className="w-full shrink basis-1/4 ">
                  <SelectValue placeholder="Choose a location..." />
                </SelectTrigger>
                <SelectContent>
                  {Array.isArray(province) &&
                    province.map((data, index) => (
                      <SelectItem key={index} value={data.code}>
                        {data.value}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* job type */}
            <div className="px-4">
              <Label htmlFor="qualifications">Job Type</Label>
              <Select
                className="flex items-center"
                value={form.category}
                onValueChange={(value) => setForm({ ...form, category: value })}
              >
                <SelectTrigger className="w-full shrink basis-1/4 ">
                  <SelectValue placeholder="Choose a category..." />
                </SelectTrigger>
                <SelectContent>
                  {Array.isArray(jobType) &&
                    jobType.map((data, index) => (
                      <SelectItem key={index} value={data.code}>
                        {data.value}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* job level */}
            <div className="px-4">
              <Label htmlFor="skillsRequired">Job Level</Label>
              <Select
                className="flex items-center"
                value={form.jobLevel}
                onValueChange={(value) => setForm({ ...form, jobLevel: value })}
              >
                <SelectTrigger className="w-full shrink basis-1/4 ">
                  <SelectValue placeholder="Choose a job level..." />
                </SelectTrigger>
                <SelectContent>
                  {Array.isArray(jobLevel) &&
                    jobLevel.map((data, index) => (
                      <SelectItem key={index} value={data.code}>
                        {data.value}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* salary */}
            <div className="px-4">
              <Label htmlFor="skillsRequired">Salary</Label>
              <Select
                className="flex items-center"
                value={form.salary}
                onValueChange={(value) => setForm({ ...form, salary: value })}
              >
                <SelectTrigger className="w-full shrink basis-1/4 ">
                  <SelectValue placeholder="Choose a salary range..." />
                </SelectTrigger>
                <SelectContent>
                  {Array.isArray(salary) &&
                    salary.map((data, index) => (
                      <SelectItem key={index} value={data.code}>
                        {data.value}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* work type */}
            <div className="px-4">
              <Label htmlFor="skillsRequired">Employment Type</Label>
              <Select
                className="flex items-center"
                value={form.workType}
                onValueChange={(value) => setForm({ ...form, workType: value })}
              >
                <SelectTrigger className="w-full shrink basis-1/4 ">
                  <SelectValue placeholder="Choose a salary range..." />
                </SelectTrigger>
                <SelectContent>
                  {Array.isArray(workType) &&
                    workType.map((data, index) => (
                      <SelectItem key={index} value={data.code}>
                        {data.value}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* gender type */}
            <div className="px-4">
              <Label htmlFor="skillsRequired">Gender</Label>
              <Select
                className="flex items-center"
                value={form.gender}
                onValueChange={(value) => setForm({ ...form, gender: value })}
              >
                <SelectTrigger className="w-full shrink basis-1/4 ">
                  <SelectValue placeholder="Choose a gender..." />
                </SelectTrigger>
                <SelectContent>
                  {Array.isArray(gender) &&
                    gender.map((data, index) => (
                      <SelectItem key={index} value={data.code}>
                        {data.value}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* experience type */}
            <div className="px-4">
              <Label htmlFor="skillsRequired">Experience</Label>
              <Select
                className="flex items-center"
                value={form.experience}
                onValueChange={(value) =>
                  setForm({ ...form, experience: value })
                }
              >
                <SelectTrigger className="w-full shrink basis-1/4 ">
                  <SelectValue placeholder="Choose a experience..." />
                </SelectTrigger>
                <SelectContent>
                  {Array.isArray(experience) &&
                    experience.map((data, index) => (
                      <SelectItem key={index} value={data.code}>
                        {data.value}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {/* submit button */}
        <div className="flex justify-end">
          <Button
            className="hover:bg-white border hover:border-primary hover:text-primary bg-primary text-white rounded-md px-4 py-2"
            type="submit"
            onClick={handleSubmitForm}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateJobPost;
