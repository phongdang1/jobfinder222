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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "../../../fetchData/axios";
import { Badge } from "@/components/ui/badge";

const ManageJobPost = () => {
  const [company, setCompany] = useState([]);
  const [post, setPost] = useState([]);
  const [userCVs, setUserCVs] = useState({});
  const [userDetails, setUserDetails] = useState({});

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
        console.log("User CVs by Post ID: ", userCvData);
        console.log("User Details: ", userDetailsData);
      } else {
        console.log("Error: ", res.data.errMessage);
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  return (
    <div className="mt-8">
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
                  <DialogContent className="sm:max-w-[1300px] h-1/2">
                    <DialogHeader>
                      <DialogTitle>{post.postDetailData.name}</DialogTitle>
                      <DialogDescription>
                        User CV Details for this post.
                      </DialogDescription>
                    </DialogHeader>
                    {/* table của user */}

                    <Table>
                      <TableCaption>
                        A list of your recent invoices.
                      </TableCaption>
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
                        {userCVs[post.id]?.map((userCv, index) => (
                          // accordion cv của user
                          <>
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                <img
                                  className="rounded-full w-14 h-14"
                                  src={userDetails[userCv.userId]?.image}
                                />
                              </TableCell>
                              <TableCell>
                                {userDetails[userCv.userId]?.firstName}{" "}
                                {userDetails[userCv.userId]?.lastName}
                              </TableCell>
                              {/* <TableCell className="w-1/5 max-w-[1rem] whitespace-nowrap overflow-hidden text-ellipsis">
                                {userDetails[userCv.userId]?.address}
                              </TableCell> */}
                              {/* <TableCell
                                className={`${
                                  userDetails[userCv.userId]?.UserDetailData
                                    ?.genderCode == "M"
                                    ? "text-blue-700"
                                    : "text-pink-600"
                                } font-semibold`}
                              >
                                {
                                  userDetails[userCv.userId]?.UserDetailData
                                    ?.genderCode
                                }
                              </TableCell> */}
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
    ${
      parseInt(userCv.file) < 25
        ? "text-red-500"
        : parseInt(userCv.file) < 50
        ? "text-orange-500"
        : parseInt(userCv.file) < 75
        ? "text-yellow-500"
        : "text-green-500"
    } font-semibold
  `}
                                >
                                  {userCv.file}
                                </span>
                              </TableCell>
                              <TableCell className="max-w-[300px] break-words whitespace-normal">{userCv.description}</TableCell>
                              {/* <TableCell>
                                {userDetails[userCv.userId]?.listSkill &&
                                userDetails[userCv.userId].listSkill.length >
                                  0 ? (
                                  <div className="flex flex-wrap justify-evenly">
                                    {userDetails[userCv.userId].listSkill.map(
                                      (skill, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="w-auto my-1"
                                          >
                                            <Badge
                                              variant="outline"
                                              className="bg-secondary hover:cursor-pointer border-2 hover:border-primary my-1 w-[110px] flex items-center justify-center text-center"
                                            >
                                              {skill.skillData?.name ||
                                                skill.skillId ||
                                                "Unknown Skill"}
                                            </Badge>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                ) : (
                                  <p>No skills available</p>
                                )}
                              </TableCell> */}

                              {/* mở dialog coi cv */}
                              <TableCell>
                                <Dialog className="w-[1500px]">
                                  <DialogTrigger>
                                    {" "}
                                    <AiOutlineEye className="w-5 h-5 mr-2 text-primary bg-white  hover:text-primary/50 border border-none rounded font-semibold" />
                                  </DialogTrigger>
                                  <DialogContent className="max-w-[1000px]">
                                    <div>
                                      <h1 className="border-b-2 font-semibold text-xl">User Detail</h1>
                                      <div className="flex gap-2">
                                        <h1 className="font-semibold">
                                          Address:{" "}
                                        </h1>
                                        <span>
                                          {userDetails[userCv.userId]?.address}
                                        </span>
                                      </div>
                                      <div className="flex gap-2">
                                        <h1 className="font-semibold">
                                          Phone Number:{" "}
                                        </h1>
                                        <span>
                                          {userDetails[userCv.userId]?.phoneNumber}
                                        </span>
                                      </div>
                                    </div>
                                    <h1 className="border-b-2 font-semibold text-xl">User CV</h1>
                                    <iframe
                                      width={"100%"}
                                      height={"700px"}
                                      src={
                                        userDetails[userCv.userId]
                                          ?.UserDetailData?.file
                                      }
                                    ></iframe>
                                    {/* <DialogFooter>
                                      <Button>ABC</Button>
                                    </DialogFooter> */}
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                              {/* 2 cái nút */}
                              <TableCell className="flex gap-4">
                                <Button className="bg-white border border-primary hover:bg-primary hover:text-white">
                                  Approve
                                </Button>
                                <Button className="bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white">
                                  Reject
                                </Button>
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
                      </TableBody>
                    </Table>
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
