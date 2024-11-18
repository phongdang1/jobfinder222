import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getAllPostsInactive, getDetailPostById } from "@/fetchData/Post";
import { AddCircleOutline, CloseOutlined } from "@mui/icons-material";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@nextui-org/card";
import { Badge } from "@/components/ui/badge";

function JobsComparison() {
  const [job1, setJob1] = useState({});
  const [job2, setJob2] = useState({});
  const [allJobs, setAllJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchJob1 = async () => {
    const response = await getDetailPostById(id);
    setJob1(response.data.data);
    console.log("job1", response.data.data);
  };

  useEffect(() => {
    fetchJob1();
  }, []);

  const fetchAllPost = async () => {
    const response = await getAllPostsInactive(searchTerm);
    setAllJobs(response.data.data);
    console.log("All Jobs", response.data.data);
  };

  useEffect(() => {
    fetchAllPost();
  }, []);

  const handleGetId = async (id2) => {
    console.log("Selected Job ID:", id2); // Check if the ID is passed correctly
    const response = await getDetailPostById(id2);
    setJob2(response.data.data);
    console.log("Job 2 data:", response.data.data);
  };

  const handleRemoveJob2 = () => {
    setJob2({});
  };

  return (
    <div className="mx-60 bg-white rounded-lg p-4 shadow-lg my-4">
      <Table>
        <TableBody>
          <TableRow className="grid grid-cols-3 items-center shadow-inner">
            <TableCell className="font-medium text-xl h-full ">
              <p>Compare</p>
              <p className="text-primary">{job1.postDetailData?.name}</p>
              <p>vs</p>
              <p className="text-primary">{job2.postDetailData?.name}</p>
            </TableCell>
            <TableCell className="flex flex-col gap-3">
              <div className="relative bg-transparent shrink-0">
                <Image
                  alt="Album cover"
                  clasName="object-cover rounded-lg"
                  height={90}
                  shadow="md"
                  src={
                    job1.userPostData?.userCompanyData?.thumbnail
                      ? job1.userPostData?.userCompanyData?.thumbnail
                      : "https://nextui.org/images/album-cover.png"
                  }
                  width={90}
                />
              </div>
              <div className="text-xl text-primary font-semibold">
                {job1.postDetailData?.name}
              </div>
              <div className="font-semibold">{job1.companyData?.name}</div>
            </TableCell>

            <TableCell className="flex flex-col gap-2 text-large text-start items-start">
              {Object.keys(job2).length ? (
                <div className="flex flex-col gap-3">
                  <div
                    className="absolute top-2 right-8 cursor-pointer"
                    onClick={handleRemoveJob2}
                  >
                    <CloseOutlined className="text-gray-500 hover:text-red-600" />
                  </div>
                  <div className="relative bg-transparent shrink-0">
                    <Image
                      alt="Album cover"
                      clasName="object-cover rounded-lg"
                      height={90}
                      shadow="md"
                      src={
                        job2.userPostData?.userCompanyData?.thumbnail
                          ? job2.userPostData?.userCompanyData?.thumbnail
                          : "https://nextui.org/images/album-cover.png"
                      }
                      width={90}
                    />
                  </div>
                  <div className="text-xl text-primary font-semibold">
                    {job2.postDetailData?.name}
                  </div>
                  <div className="font-semibold text-sm">
                    {job2.companyData?.name}
                  </div>
                </div>
              ) : (
                <Dialog>
                  <DialogTrigger>
                    <div className="text-center items-center">
                      <AddCircleOutline />
                      <p className="font-medium">Add a Job</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Pick a company</DialogTitle>
                      <DialogDescription>
                        <div className="mt-4 w-full">
                          <div className="flex">
                            <div className="relative flex flex-1 items-center">
                              <Input
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md rounded-r-none"
                                type="text"
                                placeholder="Find a job"
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                              />
                              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <SearchIcon className="text-primary" />
                              </div>
                            </div>

                            <Button
                              className="bg-secondary text-primary hover:bg-primary hover:text-secondary border-primary items-center gap-1 rounded-l-none"
                              variant="outline"
                            >
                              Search
                            </Button>
                          </div>

                          <div className="w-full flex flex-col gap-4 py-10 px-4">
                            <div className="space-y-2">
                              {allJobs.map((job, index) => (
                                <div
                                  onClick={() => handleGetId(job.id)}
                                  key={index}
                                >
                                  <Card className="border-none bg-white w-full rounded-lg hover:bg-[#E6E6FA]/50 group hover:outline-2 hover:outline-primary cursor-pointer">
                                    <CardBody>
                                      <div className="flex gap-6 items-center">
                                        <div className="relative bg-transparent shrink-0">
                                          <Image
                                            alt="Job cover"
                                            className="object-cover rounded-lg"
                                            height={90}
                                            shadow="md"
                                            src="https://nextui.org/images/album-cover.png" // Replace with actual image URL
                                            width={90}
                                          />
                                        </div>
                                        <div className="flex flex-col w-full">
                                          <p className="text-base font-medium group-hover:text-primary">
                                            {
                                              job.userPostData.userCompanyData
                                                .name
                                            }
                                          </p>

                                          <p className="font-normal text-base text-gray-500">
                                            {job.postDetailData.name}
                                          </p>
                                          <div className="flex mt-2 -ml-1 items-center relative w-full space-x-2">
                                            <Badge
                                              variant="outline"
                                              className="bg-white w-fit text-nowrap rounded-lg"
                                            >
                                              {
                                                job.postDetailData
                                                  .salaryTypePostData.value
                                              }
                                            </Badge>
                                            <Badge
                                              variant="outline"
                                              className="bg-white w-fit text-nowrap rounded-lg"
                                            >
                                              {
                                                job.postDetailData
                                                  .provincePostData.value
                                              }
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>
                                    </CardBody>
                                  </Card>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
            </TableCell>
          </TableRow>
          <TableRow className="grid grid-cols-3">
            <TableCell className="font-medium text-base border-t-0">
              Description
            </TableCell>
          </TableRow>

          <TableRow className="grid grid-cols-3">
            <TableCell className="font-medium text-base">Address</TableCell>
            <TableCell>
              {job1.postDetailData?.provincePostData?.value}
            </TableCell>
            <TableCell>
              {job2.postDetailData?.provincePostData?.value}{" "}
            </TableCell>
          </TableRow>

          <TableRow className="grid grid-cols-3">
            <TableCell className="font-medium text-base">Job Type</TableCell>
            <TableCell>{job1.postDetailData?.jobTypePostData?.value}</TableCell>
            <TableCell>{job2.postDetailData?.jobTypePostData?.value}</TableCell>
          </TableRow>

          <TableRow className="grid grid-cols-3">
            <TableCell className="font-medium text-base">Experience</TableCell>
            <TableCell>{job1.postDetailData?.expTypePostData?.value}</TableCell>
            <TableCell>{job2.postDetailData?.expTypePostData?.value}</TableCell>
          </TableRow>

          <TableRow className="grid grid-cols-3">
            <TableCell className="font-medium text-base">Position</TableCell>
            <TableCell>
              {job1.postDetailData?.jobLevelPostData?.value}
            </TableCell>
            <TableCell>
              {" "}
              {job2.postDetailData?.jobLevelPostData?.value}
            </TableCell>
          </TableRow>

          <TableRow className="grid grid-cols-3">
            <TableCell className="font-medium text-base">Gender</TableCell>
            <TableCell>{job1.postDetailData?.genderPostData?.value}</TableCell>
            <TableCell>{job2.postDetailData?.genderPostData?.value}</TableCell>
          </TableRow>

          <TableRow className="grid grid-cols-3">
            <TableCell className="font-medium text-base">Work Type</TableCell>
            <TableCell>
              {job1.postDetailData?.workTypePostData?.value}
            </TableCell>
            <TableCell>
              {job2.postDetailData?.workTypePostData?.value}
            </TableCell>
          </TableRow>

          <TableRow className="grid grid-cols-3">
            <TableCell className="font-medium text-base">Benefit</TableCell>
            <TableCell>{job1.postDetailData?.benefit}</TableCell>
            <TableCell>{job2.postDetailData?.benefit}</TableCell>
          </TableRow>

          <TableRow className="grid grid-cols-3">
            <TableCell className="font-medium text-base">
              Skill Requirement
            </TableCell>
            <TableCell>{job1.postDetailData?.skillRequirement}</TableCell>
            <TableCell>{job2.postDetailData?.skillRequirement}</TableCell>
          </TableRow>

          <TableRow className="grid grid-cols-3">
            <TableCell className="font-medium text-base">
              Job Requirement
            </TableCell>
            <TableCell>
              <div
                dangerouslySetInnerHTML={{
                  __html: job1.postDetailData?.requirement,
                }}
              />
            </TableCell>
            <TableCell>
              <div
                dangerouslySetInnerHTML={{
                  __html: job2.postDetailData?.requirement,
                }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default JobsComparison;
