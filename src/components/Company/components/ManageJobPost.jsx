import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "../../../fetchData/axios";
import { Badge } from "@/components/ui/badge";
import {
  handleCreateInterviewSchedule,
  handleRejectCvPost,
} from "@/fetchData/CvPost";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
const ManageJobPost = () => {
  const [company, setCompany] = useState([]);
  const [post, setPost] = useState([]);
  const [userCVs, setUserCVs] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [openSchedule, setOpenSchedule] = useState(null);
  const currentYear = new Date().getFullYear();
  const [scheduleForm, setScheduleForm] = useState({
    interviewDate: "",
    interviewLocation: "",
    interviewNote: "",
    cvPostId: "",
    companyId: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setScheduleForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const fetchCompanyData = async () => {
    try {
      const res = await axios.get(`/getCompanyById?id=${1}`);
      if (res.data.errCode === 0) {
        setCompany(res.data.data);
        setPost(res.data.data.postData);

        // Fetch user CV data for each post
        const userCvData = {};
        const userDetailsData = {};

        for (let i = 0; i < res.data.data.postData.length; i++) {
          const cvEntry = res.data.data.postData[i];
          const id = cvEntry.id;
          const resUserCV = await axios.get(`/getAllListCvByPost?postId=${id}`);
          userCvData[id] = resUserCV.data.data || [];

          // Fetch user details for each user in the userCV list
          for (const userCv of resUserCV.data.data) {
            const userId = userCv.userId;
            if (!userDetailsData[userId]) {
              const resUserDetail = await axios.get(
                `/getUserById?id=${userId}`
              );
              userDetailsData[userId] = resUserDetail.data.data;
              console.log("detail cua user", resUserDetail.data.data);
            }
          }
        }
        setUserCVs(userCvData);
        setUserDetails(userDetailsData);
        console.log("User CVs by Post ID: userCvs", userCvData);
        console.log("User Details: userDetails", userDetailsData);
      } else {
        console.log("Error: ", res.data.errMessage);
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const handleSubmitForm = async () => {
    try {
      const res = await axios.post(`/createInterviewSchedule`, {
        interviewDate: scheduleForm.interviewDate,
        interviewLocation: scheduleForm.interviewLocation,
        interviewNote: scheduleForm.interviewNote,
        cvPostId: scheduleForm.cvPostId,
        companyId: scheduleForm.companyId,
      });
      if (res.data.errCode === 0) {
        console.log("form ne", res);
        setOpenSchedule(null);
        toast.success("Set interview schedule successfully !!!");
        fetchCompanyData();
      } else {
        toast.error(res.data.errMessage);
        console.log("loi roi", res);
      }
    } catch (error) {
      console.log("error j j day", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await handleRejectCvPost(id);
      if (res.data.errCode === 0) {
        console.log("CV Rejected !!!", res);
        toast.success("CV Rejected !!");
        fetchCompanyData();
      } else {
        console.log("loi rejected");
      }
    } catch (error) {
      console.log("error reject", error);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  return (
    <div className="mt-8 my-60">
      <h1 className="text-3xl font-semibold my-4">
        Total Post ({post.length})
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {post.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">
                {post.postDetailData.name}
              </TableCell>
              <TableCell className="w-3/5 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis">
                {post.postDetailData.description}
              </TableCell>
              <TableCell className="text-right flex items-end justify-start">
                {/* mở cái dialog user  */}
                <Dialog>
                  <DialogTrigger>
                    <div className="flex items-center px-4 py-2 text-primary bg-white hover:bg-primary hover:text-white border border-primary rounded font-semibold">
                      <AiOutlineEye className="w-5 h-5 mr-2" />
                      View CV
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[1500px] h-3/4 overflow-auto">
                    <DialogHeader>
                      <DialogTitle>{post.postDetailData.name}</DialogTitle>
                      <DialogDescription>
                        User CV Details for this post.
                      </DialogDescription>
                    </DialogHeader>
                    {/* table CV pending */}
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>PENDING</AccordionTrigger>
                        <AccordionContent>
                          {/* table pending */}
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>

                                <TableHead>Status</TableHead>
                                <TableHead>Percentage Match</TableHead>
                                <TableHead className="text-left">
                                  Description
                                </TableHead>
                                <TableHead>CV</TableHead>
                                <TableHead>Action</TableHead>
                              </TableRow>
                            </TableHeader>

                            <TableBody>
                              {userCVs[post.id]?.some(
                                (userCv) => userCv.statusCode === "PENDING"
                              ) ? (
                                userCVs[post.id].map((userCv, index) =>
                                  userCv.statusCode === "PENDING" ? (
                                    <TableRow key={index}>
                                      <TableCell className="font-medium">
                                        <img
                                          className="rounded-full w-14 h-14"
                                          src={
                                            userDetails[userCv.userId]?.image
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        {userDetails[userCv.userId]?.firstName}{" "}
                                        {userDetails[userCv.userId]?.lastName}
                                      </TableCell>
                                      <TableCell>
                                        <span
                                          className={`
                px-2 py-1 rounded font-semibold
                ${
                  userCv.statusCode === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : ""
                }
                ${
                  userCv.statusCode === "INACTIVE"
                    ? "bg-yellow-100 text-yellow-700"
                    : ""
                }
                ${
                  userCv.statusCode === "BANNED"
                    ? "bg-red-100 text-red-700"
                    : ""
                }
                ${
                  userCv.statusCode === "PENDING"
                    ? "bg-slate-200 text-black"
                    : ""
                }
              `}
                                        >
                                          {userCv.statusCode}
                                        </span>
                                      </TableCell>
                                      <TableCell>
                                        <span
                                          className={`
                ${parseInt(userCv.file) < 25 ? "text-red-500" : ""}
                ${parseInt(userCv.file) < 50 ? "text-orange-500" : ""}
                ${
                  parseInt(userCv.file) < 75
                    ? "text-yellow-500"
                    : "text-green-500"
                }
                font-semibold
              `}
                                        >
                                          {userCv.file}
                                        </span>
                                      </TableCell>
                                      <TableCell className="max-w-[300px] break-words whitespace-normal">
                                        {userCv.description}
                                      </TableCell>
                                      <TableCell>
                                        <Dialog className="w-[1500px]">
                                          <DialogTrigger>
                                            <AiOutlineEye className="w-5 h-5 mr-2 text-primary bg-white hover:text-primary/50 border border-none rounded font-semibold" />
                                          </DialogTrigger>
                                          <DialogContent className="max-w-[1000px]">
                                            <div>
                                              <h1 className="border-b-2 font-semibold text-xl">
                                                User Detail
                                              </h1>
                                              <div className="flex gap-2">
                                                <h1 className="font-semibold">
                                                  Address:{" "}
                                                </h1>
                                                <span>
                                                  {
                                                    userDetails[userCv.userId]
                                                      ?.address
                                                  }
                                                </span>
                                              </div>
                                              <div className="flex gap-2">
                                                <h1 className="font-semibold">
                                                  Phone Number:{" "}
                                                </h1>
                                                <span>
                                                  {
                                                    userDetails[userCv.userId]
                                                      ?.phoneNumber
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                            <h1 className="border-b-2 font-semibold text-xl">
                                              User CV
                                            </h1>
                                            <iframe
                                              width="100%"
                                              height="700px"
                                              src={
                                                userDetails[userCv.userId]
                                                  ?.UserDetailData?.file
                                              }
                                            ></iframe>
                                          </DialogContent>
                                        </Dialog>
                                      </TableCell>
                                      <TableCell className="flex gap-4">
                                        <Popover
                                          key={userCv.id}
                                          open={openSchedule === userCv.id}
                                          onOpenChange={(isOpen) =>
                                            setOpenSchedule(
                                              isOpen ? userCv.id : null
                                            )
                                          }
                                        >
                                          <PopoverTrigger
                                            onClick={() => {
                                              setOpenSchedule(userCv.id);
                                              setScheduleForm({
                                                ...scheduleForm,
                                                cvPostId: userCv.id,
                                                companyId: company.id,
                                              });
                                            }}
                                            className="bg-white text-primary border border-primary hover:bg-primary hover:text-white rounded-md font-medium transition px-3"
                                          >
                                            Set Schedule
                                          </PopoverTrigger>
                                          <PopoverContent className="w-[500px] flex flex-col gap-6">
                                            <div className="flex flex-col gap-y-3">
                                              <Label>Interview Date</Label>
                                              <Popover>
                                                <PopoverTrigger asChild>
                                                  <Button
                                                    variant="outline"
                                                    className={`justify-start text-left font-normal ${
                                                      !scheduleForm.interviewDate &&
                                                      "text-muted-foreground"
                                                    }`}
                                                  >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {scheduleForm.interviewDate ? (
                                                      format(
                                                        scheduleForm.interviewDate,
                                                        "PPP"
                                                      )
                                                    ) : (
                                                      <span>Pick a date</span>
                                                    )}
                                                  </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                  align="start"
                                                  className="w-full p-0"
                                                >
                                                  <Calendar
                                                    mode="single"
                                                    captionLayout="dropdown-buttons"
                                                    selected={
                                                      scheduleForm.timeEnd
                                                    }
                                                    onSelect={(
                                                      selectedDate
                                                    ) => {
                                                      const datetime = new Date(
                                                        selectedDate
                                                      );
                                                      const formattedDateTime =
                                                        format(
                                                          datetime,
                                                          "yyyy-MM-dd HH:mm:ss"
                                                        );
                                                      setScheduleForm({
                                                        ...scheduleForm,
                                                        interviewDate:
                                                          formattedDateTime,
                                                      });
                                                    }}
                                                    fromYear={1960}
                                                    toYear={currentYear}
                                                    className="text-black w-full"
                                                    disabled={(date) =>
                                                      date < new Date() ||
                                                      date <
                                                        new Date("1900-01-01")
                                                    }
                                                    value={
                                                      scheduleForm.interviewDate
                                                    }
                                                  />
                                                </PopoverContent>
                                              </Popover>
                                            </div>
                                            <div>
                                              <Label>Interview Location</Label>
                                              <Input
                                                type="text"
                                                name="interviewLocation"
                                                placeholder="Give the meeting position..."
                                                className="rounded-lg border border-slate-200 my-3"
                                                value={
                                                  scheduleForm.interviewLocation
                                                }
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                            <div className="flex flex-col">
                                              <Label>Interview Note</Label>
                                              <textarea
                                                type="text"
                                                name="interviewNote"
                                                placeholder="Give some notes for candidate..."
                                                className="rounded-lg border border-slate-200 my-3 p-2"
                                                value={
                                                  scheduleForm.interviewNote
                                                }
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                            <div className="flex justify-between">
                                              <Button
                                                className="bg-white border border-black text-black hover:bg-slate-200"
                                                onClick={() => {
                                                  setOpenSchedule(null);
                                                  setScheduleForm({
                                                    interviewDate: "",
                                                    interviewLocation: "",
                                                    interviewNote: "",
                                                    companyId: "",
                                                    cvPostId: "",
                                                  });
                                                }}
                                              >
                                                Close
                                              </Button>
                                              <Button
                                                onClick={handleSubmitForm}
                                                className="bg-white border border-primary hover:text-white"
                                              >
                                                Set Schedule
                                              </Button>
                                            </div>
                                          </PopoverContent>
                                        </Popover>
                                        <Button
                                          onClick={() =>
                                            handleReject(userCv.id)
                                          }
                                          className="bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white"
                                        >
                                          Reject
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ) : null
                                )
                              ) : (
                                <TableRow>
                                  <TableCell
                                    colSpan={7}
                                    className="text-center font-medium"
                                  >
                                    No CV here !!!
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* table interview */}
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-blue-700">
                          INTERVIEW
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Interview Date</TableHead>
                                <TableHead>Interview Location</TableHead>
                                <TableHead>Note</TableHead>
                                <TableHead>Action</TableHead>
                              </TableRow>
                            </TableHeader>

                            <TableBody>
                              {userCVs[post.id]?.some(
                                (userCv) => userCv.statusCode === "INTERVIEW"
                              ) ? (
                                userCVs[post.id].map((userCv, index) =>
                                  userCv.statusCode === "INTERVIEW" ? (
                                    <TableRow key={index}>
                                      <TableCell className="font-medium">
                                        <img
                                          className="rounded-full w-14 h-14"
                                          src={
                                            userDetails[userCv.userId]?.image
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        {userDetails[userCv.userId]?.firstName}{" "}
                                        {userDetails[userCv.userId]?.lastName}
                                      </TableCell>
                                      <TableCell>
                                        <span
                                          className={`
                px-2 py-1 rounded font-semibold
                ${
                  userCv.statusCode === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : ""
                }
                ${
                  userCv.statusCode === "INTERVIEW"
                    ? "bg-blue-100 text-blue-700"
                    : ""
                }
                ${
                  userCv.statusCode === "REJECTED"
                    ? "bg-red-100 text-red-700"
                    : ""
                }
                ${
                  userCv.statusCode === "PENDING"
                    ? "bg-slate-200 text-black"
                    : ""
                }
              `}
                                        >
                                          {userCv.statusCode}
                                        </span>
                                      </TableCell>
                                      <TableCell>
                                        <span
                                          className={`
                ${parseInt(userCv.file) < 25 ? "text-red-500" : ""}
                ${parseInt(userCv.file) < 50 ? "text-orange-500" : ""}
                ${
                  parseInt(userCv.file) < 75
                    ? "text-yellow-500"
                    : "text-green-500"
                }
                font-semibold
              `}
                                        >
                                          {userCv.file}
                                        </span>
                                      </TableCell>
                                      <TableCell className="max-w-[300px] break-words whitespace-normal">
                                        {userCv.description}
                                      </TableCell>
                                      <TableCell>
                                        <Dialog className="w-[1500px]">
                                          <DialogTrigger>
                                            <AiOutlineEye className="w-5 h-5 mr-2 text-primary bg-white hover:text-primary/50 border border-none rounded font-semibold" />
                                          </DialogTrigger>
                                          <DialogContent className="max-w-[1000px]">
                                            <div>
                                              <h1 className="border-b-2 font-semibold text-xl">
                                                User Detail
                                              </h1>
                                              <div className="flex gap-2">
                                                <h1 className="font-semibold">
                                                  Address:{" "}
                                                </h1>
                                                <span>
                                                  {
                                                    userDetails[userCv.userId]
                                                      ?.address
                                                  }
                                                </span>
                                              </div>
                                              <div className="flex gap-2">
                                                <h1 className="font-semibold">
                                                  Phone Number:{" "}
                                                </h1>
                                                <span>
                                                  {
                                                    userDetails[userCv.userId]
                                                      ?.phoneNumber
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                            <h1 className="border-b-2 font-semibold text-xl">
                                              User CV
                                            </h1>
                                            <iframe
                                              width="100%"
                                              height="700px"
                                              src={
                                                userDetails[userCv.userId]
                                                  ?.UserDetailData?.file
                                              }
                                            ></iframe>
                                          </DialogContent>
                                        </Dialog>
                                      </TableCell>
                                      <TableCell className="flex gap-4">
                                        <Popover
                                          key={userCv.id}
                                          open={openSchedule === userCv.id}
                                          onOpenChange={(isOpen) =>
                                            setOpenSchedule(
                                              isOpen ? userCv.id : null
                                            )
                                          }
                                        >
                                          <PopoverTrigger
                                            onClick={() => {
                                              setOpenSchedule(userCv.id);
                                              setScheduleForm({
                                                ...scheduleForm,
                                                cvPostId: userCv.id,
                                                companyId: company.id,
                                              });
                                            }}
                                            className="bg-white text-primary border border-primary hover:bg-primary hover:text-white rounded-md font-medium transition px-3"
                                          >
                                            Approve
                                          </PopoverTrigger>
                                          <PopoverContent className="w-[500px] flex flex-col gap-6">
                                            <div className="flex flex-col gap-y-3">
                                              <Label>Interview Date</Label>
                                              <Popover>
                                                <PopoverTrigger asChild>
                                                  <Button
                                                    variant="outline"
                                                    className={`justify-start text-left font-normal ${
                                                      !scheduleForm.interviewDate &&
                                                      "text-muted-foreground"
                                                    }`}
                                                  >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {scheduleForm.interviewDate ? (
                                                      format(
                                                        scheduleForm.interviewDate,
                                                        "PPP"
                                                      )
                                                    ) : (
                                                      <span>Pick a date</span>
                                                    )}
                                                  </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                  align="start"
                                                  className="w-full p-0"
                                                >
                                                  <Calendar
                                                    mode="single"
                                                    captionLayout="dropdown-buttons"
                                                    selected={
                                                      scheduleForm.timeEnd
                                                    }
                                                    onSelect={(
                                                      selectedDate
                                                    ) => {
                                                      const datetime = new Date(
                                                        selectedDate
                                                      );
                                                      const formattedDateTime =
                                                        format(
                                                          datetime,
                                                          "yyyy-MM-dd HH:mm:ss"
                                                        );
                                                      setScheduleForm({
                                                        ...scheduleForm,
                                                        interviewDate:
                                                          formattedDateTime,
                                                      });
                                                    }}
                                                    fromYear={1960}
                                                    toYear={currentYear}
                                                    className="text-black w-full"
                                                    disabled={(date) =>
                                                      date < new Date() ||
                                                      date <
                                                        new Date("1900-01-01")
                                                    }
                                                    value={
                                                      scheduleForm.interviewDate
                                                    }
                                                  />
                                                </PopoverContent>
                                              </Popover>
                                            </div>
                                            <div>
                                              <Label>Interview Location</Label>
                                              <Input
                                                type="text"
                                                name="interviewLocation"
                                                placeholder="Give the meeting position..."
                                                className="rounded-lg border border-slate-200 my-3"
                                                value={
                                                  scheduleForm.interviewLocation
                                                }
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                            <div className="flex flex-col">
                                              <Label>Interview Note</Label>
                                              <textarea
                                                type="text"
                                                name="interviewNote"
                                                placeholder="Give some notes for candidate..."
                                                className="rounded-lg border border-slate-200 my-3 p-2"
                                                value={
                                                  scheduleForm.interviewNote
                                                }
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                            <div className="flex justify-between">
                                              <Button
                                                className="bg-white border border-black text-black hover:bg-slate-200"
                                                onClick={() => {
                                                  setOpenSchedule(null);
                                                  setScheduleForm({
                                                    interviewDate: "",
                                                    interviewLocation: "",
                                                    interviewNote: "",
                                                    companyId: "",
                                                    cvPostId: "",
                                                  });
                                                }}
                                              >
                                                Close
                                              </Button>
                                              <Button
                                                onClick={handleSubmitForm}
                                                className="bg-white border border-primary hover:text-white"
                                              >
                                                Set Schedule
                                              </Button>
                                            </div>
                                          </PopoverContent>
                                        </Popover>
                                        <Button className="bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white">
                                          Reject
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ) : null
                                )
                              ) : (
                                <TableRow>
                                  <TableCell
                                    colSpan={6}
                                    className="text-center font-medium"
                                  >
                                    No CV here !!!
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    {/* table reject */}
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-red-700">
                          REJECTED
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>

                                <TableHead>Status</TableHead>
                                <TableHead>Percentage Match</TableHead>
                                <TableHead className="text-left">
                                  Description
                                </TableHead>
                                <TableHead>CV</TableHead>
                                <TableHead>Action</TableHead>
                              </TableRow>
                            </TableHeader>

                            <TableBody>
                              {userCVs[post.id]?.some(
                                (userCv) => userCv.statusCode === "REJECTED"
                              ) ? (
                                userCVs[post.id].map((userCv, index) =>
                                  userCv.statusCode === "REJECTED" ? (
                                    <TableRow key={index}>
                                      <TableCell className="font-medium">
                                        <img
                                          className="rounded-full w-14 h-14"
                                          src={
                                            userDetails[userCv.userId]?.image
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        {userDetails[userCv.userId]?.firstName}{" "}
                                        {userDetails[userCv.userId]?.lastName}
                                      </TableCell>
                                      <TableCell>
                                        <span
                                          className={`
                px-2 py-1 rounded font-semibold
                ${
                  userCv.statusCode === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : ""
                }
                ${
                  userCv.statusCode === "INACTIVE"
                    ? "bg-yellow-100 text-yellow-700"
                    : ""
                }
                ${
                  userCv.statusCode === "REJECTED"
                    ? "bg-red-100 text-red-700"
                    : ""
                }
                ${
                  userCv.statusCode === "PENDING"
                    ? "bg-slate-200 text-black"
                    : ""
                }
              `}
                                        >
                                          {userCv.statusCode}
                                        </span>
                                      </TableCell>
                                      <TableCell>
                                        <span
                                          className={`
                ${parseInt(userCv.file) < 25 ? "text-red-500" : ""}
                ${parseInt(userCv.file) < 50 ? "text-orange-500" : ""}
                ${
                  parseInt(userCv.file) < 75
                    ? "text-yellow-500"
                    : "text-green-500"
                }
                font-semibold
              `}
                                        >
                                          {userCv.file}
                                        </span>
                                      </TableCell>
                                      <TableCell className="max-w-[300px] break-words whitespace-normal">
                                        {userCv.description}
                                      </TableCell>
                                      <TableCell>
                                        <Dialog className="w-[1500px]">
                                          <DialogTrigger>
                                            <AiOutlineEye className="w-5 h-5 mr-2 text-primary bg-white hover:text-primary/50 border border-none rounded font-semibold" />
                                          </DialogTrigger>
                                          <DialogContent className="max-w-[1000px]">
                                            <div>
                                              <h1 className="border-b-2 font-semibold text-xl">
                                                User Detail
                                              </h1>
                                              <div className="flex gap-2">
                                                <h1 className="font-semibold">
                                                  Address:{" "}
                                                </h1>
                                                <span>
                                                  {
                                                    userDetails[userCv.userId]
                                                      ?.address
                                                  }
                                                </span>
                                              </div>
                                              <div className="flex gap-2">
                                                <h1 className="font-semibold">
                                                  Phone Number:{" "}
                                                </h1>
                                                <span>
                                                  {
                                                    userDetails[userCv.userId]
                                                      ?.phoneNumber
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                            <h1 className="border-b-2 font-semibold text-xl">
                                              User CV
                                            </h1>
                                            <iframe
                                              width="100%"
                                              height="700px"
                                              src={
                                                userDetails[userCv.userId]
                                                  ?.UserDetailData?.file
                                              }
                                            ></iframe>
                                          </DialogContent>
                                        </Dialog>
                                      </TableCell>
                                    </TableRow>
                                  ) : null
                                )
                              ) : (
                                <TableRow>
                                  <TableCell
                                    colSpan={7}
                                    className="text-center font-medium"
                                  >
                                    No CV here !!!
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                {userCVs[post.id]?.length || 0}/{post.postDetailData.amount}
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={`
                        px-2 py-1 rounded font-semibold
                        ${
                          post.statusCode === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : ""
                        }
                        ${
                          post.statusCode === "INACTIVE"
                            ? "bg-yellow-100 text-yellow-700"
                            : ""
                        }
                        ${
                          post.statusCode === "BANNED"
                            ? "bg-red-100 text-red-700"
                            : ""
                        }
                      `}
                >
                  {post.statusCode}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageJobPost;
