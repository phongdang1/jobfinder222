import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getValueByCode } from "@/fetchData/AllCode";
import { getUsersById } from "@/fetchData/User";
import {
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

  return (
    <>
      <div className="mx-10 flex flex-col gap-4 my-6">
        <div className="grid grid-cols-7 bg-white gap-4 px-2 py-8 items-center border border-gray-200 rounded-lg">
          <div className="bg-gray-100  h-32 w-32 mx-auto col-span-1 rounded-full cursor-pointer items-center">
            <img src="" />
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
            <Button
              variant="outline"
              className="border border-primary text-primary hover:text-white hover:bg-primary"
            >
              Send Invitation
            </Button>
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
