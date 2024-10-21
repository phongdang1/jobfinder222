// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import SearchIcon from "@mui/icons-material/Search";
// import { Button } from "@/components/ui/button";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableFooter,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogDescription,
// } from "@/components/ui/dialog";
// import { getAllPostWithLimit, getDetailPostById } from "@/fetchData/Post";
// import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
// import { Label } from "@/components/ui/label";
// import AdminPagination from "./AdminPagination";

// const ManagePostAdmin = () => {
//     const [posts, setPosts] = useState([]);
//     const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//     const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
//     const [currentPostDetail, setCurrentPostDetail] = useState(null);
//     const [currentPostId, setCurrentPostId] = useState(null);
//     const [newPost, setNewPost] = useState({
//         title: "",
//         description: "",
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const postsPerPage = 5; // Number of posts per page

//     const indexOfLastPost = currentPage * postsPerPage;
//     const indexOfFirstPost = indexOfLastPost - postsPerPage;
//     const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
//     const totalPages = Math.ceil(posts.length / postsPerPage);

//     // Fetch all posts
//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 setLoading(true);
//                 const response = await getAllPostWithLimit(postsPerPage, (currentPage - 1) * postsPerPage);
//                 if (Array.isArray(response.data.data)) {
//                     setPosts(response.data.data);
//                 } else {
//                     setError("Error fetching data. Please try again later.");
//                 }
//             } catch (error) {
//                 setError("Error fetching data. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPosts();
//     }, []);

//     // Fetch post details
//     useEffect(() => {
//         const fetchPostDetails = async () => {
//             if (currentPostId !== null) {
//                 try {
//                     setLoading(true);
//                     const response = await getDetailPostById(currentPostId);
//                     setCurrentPostDetail(response.data.data);
//                 } catch (error) {
//                     setError("Error fetching post details. Please try again later.");
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         };
//         fetchPostDetails();
//     }, [currentPostId]);

//     // Modal handlers
//     const handleOpenCreateModal = () => {
//         setCreateModalOpen(true);
//         setNewPost({ title: "", description: "" });
//     };

//     const handleCloseCreateModal = () => {
//         setCreateModalOpen(false);
//     };

//     const handleOpenUpdateModal = (postId) => {
//         setCurrentPostId(postId);
//         setUpdateModalOpen(true);
//     };

//     const handleCloseUpdateModal = () => {
//         setUpdateModalOpen(false);
//         setCurrentPostId(null);
//         setCurrentPostDetail(null); // Reset post details on close
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div className="border border-blue-gray-100 shadow-sm rounded-lg">
//             <div className="flex justify-between items-center p-4">
//                 <Button
//                     onClick={handleOpenCreateModal}
//                     className="p-3 bg-third hover:text-white text-white rounded-md"
//                 >
//                     Create
//                 </Button>
//             </div>
//             <Table className="table-auto w-full">
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead className="w-[100px] text-center">STT</TableHead>
//                         <TableHead className="text-center">Post Name</TableHead>
//                         <TableHead className="text-center">Full Name User</TableHead>
//                         <TableHead className="text-center">Mail User</TableHead>
//                         <TableHead className="text-center">Phone User</TableHead>
//                         <TableHead className="text-center">Is Hot</TableHead>
//                         <TableHead className="text-center">Status Code</TableHead>
//                         <TableHead className="text-center">Actions</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {currentPosts.map((post, index) => (
//                         <TableRow key={post.id}>
//                             <TableCell className="text-center">
//                                 {indexOfFirstPost + index + 1}
//                             </TableCell>
//                             <TableCell className="text-center">
//                                 {post.postDetailData.name}
//                             </TableCell>
//                             <TableCell className="text-center">
//                                 {post.userPostData.lastName + " " + post.userPostData.firstName}
//                             </TableCell>
//                             <TableCell className="text-center">{post.userPostData.email}</TableCell>
//                             <TableCell className="text-center">{post.userPostData.phoneNumber}</TableCell>
//                             <TableCell className="text-center">{post.isHot === 1 ? "Yes" : "No"}</TableCell>
//                             <TableCell className="text-center">
//                                 <span
//                                     className={`py-1 px-2 rounded-full text-xs ${post.statusCode.toLowerCase() === "active"
//                                         ? "bg-green-500 text-white"
//                                         : "bg-red-500 text-white"
//                                         }`}
//                                 >
//                                     {post.statusCode.toLowerCase() === "active" ? "Active" : "Inactive"}
//                                 </span>
//                             </TableCell>
//                             <TableCell className="text-center">
//                                 <Button
//                                     onClick={() => handleOpenUpdateModal(post.id)}
//                                     className="text-white bg-third hover:bg-primary rounded-md w-10 h-9"
//                                 >
//                                     <EditNoteOutlinedIcon />
//                                 </Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//                 <TableFooter>
//                     <TableRow>
//                         <TableCell colSpan={8} className="text-center">
//                             <AdminPagination
//                                 currentPage={currentPage}
//                                 totalPages={totalPages}
//                                 onPageChange={setCurrentPage}
//                             />
//                         </TableCell>
//                     </TableRow>
//                 </TableFooter>
//             </Table>

//             {/* View Post Dialog */}
//             <Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
//                 <DialogContent className="max-h-[80vh] overflow-y-auto">
//                     {currentPostDetail && (
//                         <>
//                             <DialogHeader>
//                                 <DialogTitle>{currentPostDetail.postDetailData.name}</DialogTitle>
//                                 <DialogDescription>{currentPostDetail.postDetailData.description}</DialogDescription>
//                             </DialogHeader>
//                             <div className="border-t border-gray-200 mt-4">
//                                 <dl>
//                                     <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                                         <dt className="text-sm font-medium text-gray-500">Type Post</dt>
//                                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                                             {currentPostDetail.postDetailData.jobTypePostData.value}
//                                         </dd>
//                                     </div>

//                                     <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                                         <dt className="text-sm font-medium text-gray-500">Work Type</dt>
//                                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                                             {currentPostDetail.postDetailData.workTypePostData.value}
//                                         </dd>
//                                     </div>

//                                     <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                                         <dt className="text-sm font-medium text-gray-500">Salary</dt>
//                                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                                             {currentPostDetail.postDetailData.salaryTypePostData.value}
//                                         </dd>
//                                     </div>

//                                     <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                                         <dt className="text-sm font-medium text-gray-500">Job Level</dt>
//                                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                                             {currentPostDetail.postDetailData.jobLevelPostData.value}
//                                         </dd>
//                                     </div>

//                                     <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                                         <dt className="text-sm font-medium text-gray-500">Experience</dt>
//                                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                                             {currentPostDetail.postDetailData.expTypePostData.value}
//                                         </dd>
//                                     </div>

//                                     <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                                         <dt className="text-sm font-medium text-gray-500">Gender</dt>
//                                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                                             {currentPostDetail.postDetailData.genderPostData.value}
//                                         </dd>
//                                     </div>

//                                     <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                                         <dt className="text-sm font-medium text-gray-500">Province</dt>
//                                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                                             {currentPostDetail.postDetailData.provincePostData.value}
//                                         </dd>
//                                     </div>

//                                     <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                                         <dt className="text-sm font-medium text-gray-500">Time Post</dt>
//                                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                                             {new Date(currentPostDetail.timePost).toLocaleDateString()}
//                                         </dd>
//                                     </div>

//                                     <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                                         <dt className="text-sm font-medium text-gray-500">Time End</dt>
//                                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                                             {new Date(currentPostDetail.timeEnd).toLocaleDateString()}
//                                         </dd>
//                                     </div>
//                                     <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                                         <dt className="text-sm font-medium text-gray-500">Amount</dt>
//                                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                                             {currentPostDetail.postDetailData.amount}
//                                         </dd>
//                                     </div>
//                                 </dl>
//                             </div>
//                         </>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// };

// export default ManagePostAdmin;
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getAllPostWithLimit, getDetailPostById } from "@/fetchData/Post";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import AdminPagination from "./AdminPagination";

const ManagePostAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentPostDetail, setCurrentPostDetail] = useState(null);
  const [currentPostId, setCurrentPostId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Number of posts per page
  const [searchTerm, setSearchTerm] = useState("");
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await getAllPostWithLimit(
        postsPerPage,
        (currentPage - 1) * postsPerPage,
        (searchKey = "")
      );
      if (Array.isArray(response.data.data)) {
        setPosts(response.data.data);
      } else {
        setError("Error fetching data. Please try again later.");
      }
    } catch (error) {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch post details
  useEffect(() => {
    const fetchPostDetails = async () => {
      if (currentPostId !== null) {
        try {
          setLoading(true);
          const response = await getDetailPostById(currentPostId);
          setCurrentPostDetail(response.data.data);
        } catch (error) {
          setError("Error fetching post details. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPostDetails();
  }, [currentPostId]);

  const handleOpenUpdateModal = (postId) => {
    setCurrentPostId(postId);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setCurrentPostId(null);
    setCurrentPostDetail(null); // Reset post details on close
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = () => {
    fetchPosts(1, searchTerm);
    setCurrentPage(1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="border border-blue-gray-100 shadow-sm rounded-lg">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon sx={{ color: "gray" }} />
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            className="p-3 text-white bg-third hover:bg-primary rounded-md"
          >
            Search
          </Button>
        </div>
      </div>
      <Table className="table-auto w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">STT</TableHead>
            <TableHead className="text-center">Post Name</TableHead>
            <TableHead className="text-center">Full Name User</TableHead>
            <TableHead className="text-center">Mail User</TableHead>
            <TableHead className="text-center">Phone User</TableHead>
            <TableHead className="text-center">Is Hot</TableHead>
            <TableHead className="text-center">Status Code</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPosts.map((post, index) => (
            <TableRow key={post.id}>
              <TableCell className="text-center">
                {indexOfFirstPost + index + 1}
              </TableCell>
              <TableCell className="text-center">
                {post.postDetailData.name}
              </TableCell>
              <TableCell className="text-center">
                {post.userPostData.lastName + " " + post.userPostData.firstName}
              </TableCell>
              <TableCell className="text-center">
                {post.userPostData.email}
              </TableCell>
              <TableCell className="text-center">
                {post.userPostData.phoneNumber}
              </TableCell>
              <TableCell className="text-center">
                {post.isHot === 1 ? "Yes" : "No"}
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`py-1 px-2 rounded-full text-xs ${
                    post.statusCode.toLowerCase() === "active"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {post.statusCode.toLowerCase() === "active"
                    ? "Active"
                    : "Inactive"}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  onClick={() => handleOpenUpdateModal(post.id)}
                  className="text-white bg-third hover:bg-primary rounded-md w-10 h-9"
                >
                  <EditNoteOutlinedIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* View Post Dialog */}
      <Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          {currentPostDetail && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {currentPostDetail.postDetailData.name}
                </DialogTitle>
                <DialogDescription>
                  {currentPostDetail.postDetailData.description}
                </DialogDescription>
              </DialogHeader>
              <div className="border-t border-gray-200 mt-4">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Type Post
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentPostDetail.postDetailData.jobTypePostData.value}
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Work Type
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentPostDetail.postDetailData.workTypePostData.value}
                    </dd>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Salary
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {
                        currentPostDetail.postDetailData.salaryTypePostData
                          .value
                      }
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Job Level
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentPostDetail.postDetailData.jobLevelPostData.value}
                    </dd>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Experience
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentPostDetail.postDetailData.expTypePostData.value}
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Gender
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentPostDetail.postDetailData.genderPostData.value}
                    </dd>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Province
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentPostDetail.postDetailData.provincePostData.value}
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Time Post
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(
                        currentPostDetail.timePost
                      ).toLocaleDateString()}
                    </dd>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Time End
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(currentPostDetail.timeEnd).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Amount
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentPostDetail.postDetailData.amount}
                    </dd>
                  </div>
                </dl>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagePostAdmin;
