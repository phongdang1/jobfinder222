import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getValueByCode } from "@/fetchData/AllCode";
import { getUsersById } from "@/fetchData/User";
import {
  AddCircleOutline,
  AttachMoneyRounded,
  CasesRounded,
  LocationOnRounded,
} from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Image } from "@nextui-org/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { getAllPostsInactive, getDetailPostById } from "@/fetchData/Post";
import { getCompanyById } from "@/fetchData/Company";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TooltipBox from "@/components/User/Homepage/Common/TooltipBox";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { handleInviteApplyJob } from "@/fetchData/CvPost";
import toast from "react-hot-toast";

function CandidateDetail() {
  const [candidate, setCandidate] = useState({});
  const [candidateValues, setCandidateValues] = useState({
    jobLevel: "Not updated",
    experience: "Not updated",
    salary: "Not updated",
    address: "Not updated",
    category: "Not updated",
    gender: "Not updated",
    workType: "Not updated",
  });

  const { userId, allowCv } = useParams();

  useEffect(() => {
    const fetchCandidateAndValues = async () => {
      try {
        // Fetch candidate data by userId
        const response = await getUsersById(userId);
        const candidateData = response.data.data;
        setCandidate(candidateData);

        // Fetch values by codes
        const [
          jobLevelValue,
          experienceJobValue,
          salaryJobValue,
          addressValue,
          categoryValue,
          genderValue,
          workTypeValue,
        ] = await Promise.all([
          getValueByCode(candidateData.UserDetailData.jobLevelCode),
          getValueByCode(candidateData.UserDetailData.experienceJobCode),
          getValueByCode(candidateData.UserDetailData.salaryJobCode),
          getValueByCode(candidateData.UserDetailData.addressCode),
          getValueByCode(candidateData.UserDetailData.categoryJobCode),
          getValueByCode(candidateData.UserDetailData.genderCode),
          getValueByCode(candidateData.UserDetailData.workTypeCode),
        ]);

        setCandidateValues({
          jobLevel: jobLevelValue?.data?.data?.value ?? "Not updated",
          experience: experienceJobValue?.data?.data?.value ?? "Not updated",
          salary: salaryJobValue?.data?.data?.value ?? "Not updated",
          address: addressValue?.data?.data?.value ?? "Not updated",
          category: categoryValue?.data?.data?.value ?? "Not updated",
          gender: genderValue?.data?.data?.value ?? "Not updated",
          workType: workTypeValue?.data?.data?.value ?? "Not updated",
        });
        console.log("cv", candidateData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCandidateAndValues();
  }, [userId]);

  const [allJobs, setAllJobs] = useState([]);
  const companyId = localStorage.getItem("companyId");

  const fetchAllPost = async () => {
    const response = await getCompanyById(companyId);
    setAllJobs(response.data.data);
    console.log("All Jobs", response);
  };

  useEffect(() => {
    fetchAllPost();
  }, []);

  const [closeDialog, setCloseDialog] = useState(false);
  const handleInvite = async (postId) => {
    const data = { userId: userId, companyId: companyId, postId: postId };
    const response = await handleInviteApplyJob(data);
    if (response.data.errCode === 0) {
      toast.success("Invitation sent!");
      setCloseDialog(false);
    }
    console.log("invite", response.data);
  };

  return (
    <>
      <div className="mx-10 flex flex-col gap-4 my-6">
        <div className="grid grid-cols-7 bg-white gap-4 px-2 py-8 items-center border border-gray-200 rounded-lg">
          <div className="flex justify-center">
            <Image
              alt="logo"
              className="object-cover rounded-lg col-span-1"
              height={120}
              shadow="md"
              src={candidate?.image}
              width={120}
            />
          </div>
          <div className="space-y-3 col-span-5">
            <div className="flex gap-2 items-center">
              <p className="text-primary text-xl font-medium cursor-pointer">
                {candidate.firstName} {candidate.lastName}
              </p>
              <Badge className="bg-white border border-primary hover:text-primary hover:bg-white">
                Active
              </Badge>
            </div>
            <div className="flex gap-2">
              <div className="text-primary font-semibold flex gap-2 items-center">
                <p className="text-black">Desired Position:</p>{" "}
                {candidateValues.jobLevel || "Not updated"}
              </div>
              <p className="text-primary font-semibold"></p>
            </div>
            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <CasesRounded className="text-primary" />
                <p>{candidateValues.experience || "Not updated"}</p>
              </div>
              <div>|</div>
              <div className="flex gap-2 items-center">
                <AttachMoneyRounded className="text-primary" />
                <p>{candidateValues.salary || "Not updated"}</p>
              </div>
              <div>|</div>
              <div className="flex gap-2 items-center">
                <LocationOnRounded className="text-primary" />
                <p>{candidateValues.address || "Not updated"}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 col-span-1 relative right-20">
            <p className="text-primary font-medium">
              You have {allowCv} CV views left
            </p>
            <Dialog open={closeDialog} onOpenChange={setCloseDialog}>
              <DialogTrigger>
                <Button
                  variant="outline"
                  className="border border-primary text-primary hover:text-white hover:bg-primary"
                  onClick={() => {
                    setCloseDialog(true);
                  }}
                >
                  Send Invitation
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-2xl max-h-screen h-5/6">
                <ScrollArea className="h-4/5">
                  <DialogHeader>
                    <DialogTitle className="flex flex-col gap-4 ">
                      <p>Pick the post you want to invite this candidate</p>
                    </DialogTitle>
                    <DialogDescription>
                      <div className="px-6 pt-4 shadow-xl rounded-b-lg pb-4 overflow-y-auto bg-white space-y-10">
                        <div className="flex flex-col gap-4">
                          {allJobs?.postData?.length > 0 ? (
                            allJobs.postData.map((post, index) => (
                              <Card
                                key={index}
                                className={`border-none w-full rounded-lg hover:bg-[#E6E6FA]/50 group hover:outline-2 hover:outline-primary cursor-pointer ${
                                  post?.isHot === 1
                                    ? "bg-primary/20 hover:bg-violet-200"
                                    : "bg-white"
                                }`}
                                shadow=""
                              >
                                {post?.isHot === 1 && (
                                  <span className="absolute top-2 right-0 bg-orange-600 text-white text-sm font-semibold px-2 py-1 rounded-tl-md rounded-bl-md">
                                    <WhatshotIcon className="text-[#ffdd85] mr-2" />
                                    SUPER HOT
                                    <span className="absolute bottom-0 right-0 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-orange-600 transform rotate-90 translate-x-1 translate-y-1"></span>
                                  </span>
                                )}
                                <CardBody>
                                  <div className="flex gap-8 items-center justify-start w-full">
                                    <div
                                      // onClick={() => handleNavigate(allJobs.id)}
                                      className="relative bg-transparent shrink-0"
                                    >
                                      <Image
                                        alt="Album cover"
                                        className="object-cover rounded-lg"
                                        height={90}
                                        shadow="md"
                                        src="https://nextui.org/images/album-cover.png"
                                        width={90}
                                      />
                                    </div>

                                    <div className="flex flex-col w-full">
                                      <p
                                        onClick={() => handleInvite(post.id)}
                                        className="text-base font-medium group-hover:text-primary w-fit hover:underline hover:underline-offset-2"
                                      >
                                        {post?.postDetailData?.name}
                                      </p>

                                      <p className="font-normal text-base text-gray-500">
                                        {allJobs.name}
                                      </p>
                                      <div className="flex mt-2 -ml-1 items-center relative w-full space-x-2">
                                        <Badge
                                          variant="outline"
                                          className="bg-white w-fit text-nowrap rounded-lg"
                                        >
                                          {
                                            post?.postDetailData
                                              ?.salaryTypePostData?.value
                                          }
                                        </Badge>
                                        <Badge
                                          variant="outline"
                                          className="bg-white w-fit text-nowrap rounded-lg"
                                        >
                                          {
                                            post?.postDetailData
                                              ?.provincePostData?.value
                                          }
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </CardBody>
                              </Card>
                            ))
                          ) : (
                            <p className="italic">
                              This company has not posted any jobs yet
                            </p>
                          )}
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* cv */}
        <div className="grid grid-cols-2 bg-white gap-4 px-2 py-8 border border-gray-200 rounded-lg">
          <div className="ml-12 text-primary text-xl font-semibold">
            <p>Candidate Information</p>
            <Separator className="my-4" />
            <Table>
              <TableBody className="space-x-1">
                <TableRow className="border-none  hover:bg-transparent">
                  <TableCell className="font-medium text-black">
                    Email
                  </TableCell>
                  <TableCell className="text-black font-normal">
                    {candidate.email}
                  </TableCell>
                </TableRow>

                <TableRow className="border-none  hover:bg-transparent">
                  <TableCell className="font-medium text-black">
                    Phone Number
                  </TableCell>
                  <TableCell className="text-black font-normal">
                    {candidate.phoneNumber}
                  </TableCell>
                </TableRow>

                <TableRow className="border-none  hover:bg-transparent">
                  <TableCell className="font-medium text-black">
                    Job Level
                  </TableCell>
                  <TableCell className="text-black font-normal">
                    {candidateValues.jobLevel}
                  </TableCell>
                </TableRow>

                <TableRow className="border-none  hover:bg-transparent">
                  <TableCell className="font-medium text-black">
                    Category
                  </TableCell>
                  <TableCell className="text-black font-normal">
                    {candidateValues.category}
                  </TableCell>
                </TableRow>

                <TableRow className="border-none  hover:bg-transparent">
                  <TableCell className="font-medium text-black">
                    Salary
                  </TableCell>
                  <TableCell className="text-black font-normal">
                    {candidateValues.salary}
                  </TableCell>
                </TableRow>

                <TableRow className="border-none  hover:bg-transparent">
                  <TableCell className="font-medium text-black">
                    Date of Birth
                  </TableCell>
                  <TableCell className="text-black font-normal">
                    {new Date(candidate.dob).toLocaleDateString()}
                  </TableCell>
                </TableRow>

                <TableRow className="border-none  hover:bg-transparent">
                  <TableCell className="font-medium text-black">
                    Gender
                  </TableCell>
                  <TableCell className="text-black font-normal">
                    {candidateValues.gender}
                  </TableCell>
                </TableRow>

                <TableRow className="border-none  hover:bg-transparent">
                  <TableCell className="font-medium text-black">
                    Address
                  </TableCell>
                  <TableCell className="text-black font-normal">
                    {candidate.address}
                  </TableCell>
                </TableRow>

                <TableRow className="border-none  hover:bg-transparent">
                  <TableCell className="font-medium text-black">
                    Desired Work Address
                  </TableCell>
                  <TableCell className="text-black font-normal">
                    {candidateValues.address}
                  </TableCell>
                </TableRow>
                <TableRow className="border-none hover:bg-transparent w-full">
                  <TableCell className="font-medium text-black ">
                    Skills
                  </TableCell>
                  <TableCell className="text-black font-normal flex gap-2 ">
                    {candidate?.listSkill?.map((skill, index) => (
                      <>
                        <div className="flex-wrap">
                          <Badge
                            key={index}
                            className="bg-white text-primary border border-primary hover:bg-primary hover:text-white w-fit h-fit text-nowrap"
                          >
                            <div>{skill?.skillData?.name}</div>
                          </Badge>
                        </div>
                      </>
                    ))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="mr-12 text-primary text-xl font-semibold">
            <p>Candidate CV</p>
            <Separator className="my-4" />
            <iframe
              width={"100%"}
              height={"900px"}
              src={candidate?.UserDetailData?.file}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateDetail;
