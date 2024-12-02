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

import {
  getAllUsers,
  getUsersById,
  banUser,
  unBanUser,
  setUserToAdmin,
} from "@/fetchData/User";
import AdminPagination from "./AdminPagination";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import toast from "react-hot-toast";
import GlobalLoadingMain from "@/components/GlobalLoading/GlobalLoadingMain";

const ManageUser = () => {
  const [action, setAction] = useState("");
  const [note, setNote] = useState("");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentUserDetail, setcurrentUserDetail] = useState(null);
  const [currentUserId, setcurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [er, setEr] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const usersPerPage = 10;
  const indexOfLastuser = currentPage * usersPerPage;
  const indexOfFirstuser = indexOfLastuser - usersPerPage;
  const [filteredusers, setFilteredusers] = useState([]);
  const currentuser = filteredusers.slice(indexOfFirstuser, indexOfLastuser);
  const totalPages = Math.ceil(filteredusers.length / usersPerPage);
  const [selectedStatus, setSelectedStatus] = useState("ALL"); // State for selected status

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers(searchTerm);
      setTimeout(() => {
        if (response.data.errCode === 0) {
          setUsers(response.data.data);
          setFilteredusers(response.data.data);
        } else {
          setError("Error fetching data. Please try again later.");
          setUsers([]);
        }
        setLoading(false); // Dừng loading sau 3 giây
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setError("Error fetching data. Please try again later.");
        setUsers([]);
        setLoading(false);
      }, 1000); // Thời gian chờ là 3 giây
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);
  const fetchuserDetails = async () => {
    if (currentUserId !== null) {
      try {
        setLoading(true);
        const response = await getUsersById(currentUserId);
        console.log("res", response.data.data);
        setcurrentUserDetail(response.data.data);
      } catch (error) {
        setError("Error fetching user details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchuserDetails();
  }, [currentUserId]);

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    let filtered;
    if (status.toUpperCase() === "ALL".toUpperCase()) {
      filtered = users;
    } else {
      filtered = users.filter(
        (user) => user.statusCode.toUpperCase() === status.toUpperCase()
      );
    }
    setFilteredusers(filtered);
  };

  const handleSearchInputChange = (e) => setSearchTerm(e.target.value);

  const handleOpenUpdateModal = (id) => {
    setcurrentUserId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSearch = () => {
    setSearch(searchTerm);
    fetchUsers(search);
  };

  const handleActive = async () => {
    try {
      setLoading(true);
      const res = await unBanUser(currentUserId);
      console.log("res.data: ", res.data.errCode);
      if (res.data.errCode === 0) {
        toast.success("User đã mở khóa thành công!");
        fetchUsers();
        fetchuserDetails();
        setShowConfirm(false);
        setModalOpen(false);
      } else {
        toast.error("Có lỗi xảy ra:", res.data.message);
      }
    } catch (error) {
      toast.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlesetUserToAdmin = async () => {
    try {
      setLoading(true);
      const res = await setUserToAdmin(currentUserId);
      console.log("res.data: ", res.data.errCode);
      if (res.data.errCode === 0) {
        toast.success("Set admin thành công!");
        fetchUsers();
        fetchuserDetails();
        setShowConfirm(false);
        setModalOpen(false);
      } else {
        toast.error("Có lỗi xảy ra:", res.data.message);
      }
    } catch (error) {
      toast.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleBlur = () => {
    if (!note.trim()) {
      setEr(true);
    }
  };
  const handleBan = async (note) => {
    try {
      setLoading(true);
      const res = await banUser(currentUserDetail.id, note);
      console.log("res.data: ", res.data.errCode);
      if (res.data.errCode === 0) {
        fetchUsers();
        fetchuserDetails();
        toast.success("User đã bị cấm thành công!");
        setShowConfirm(false);
        setModalOpen(false);
      } else {
        toast.error("Có lỗi xảy ra:", res.data.message);
      }
    } catch (error) {
      toast.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <GlobalLoadingMain isSubmiting={true} />;

  if (error) return <p>{error}</p>;

  return (
    <div className="border border-blue-gray-100 shadow-sm rounded-lg">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2 w-full">
          <div className="relative flex-grow">
            <Input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Search by user name..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon sx={{ color: "gray" }} />
            </div>
          </div>
          <Button
            onClick={handleSearch}
            className="p-3 text-white bg-third hover:bg-primary rounded-md"
          >
            Search
          </Button>
        </div>
        <div className="relative w-full flex justify-end pr-2 sm:pr-4 mt-2 sm:mt-4">
          <select
            id="typeFilter"
            className="p-1 sm:p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            {" "}
            <option value="ALL">All Status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="BANNED">BANNED</option>
          </select>
        </div>
      </div>
      <Table className="table-auto w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">STT</TableHead>
            <TableHead className="text-center">First Name</TableHead>
            <TableHead className="text-center">Last Name</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Phone</TableHead>
            <TableHead className="text-center">Status Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentuser.map((user, index) => (
            <TableRow
              key={user.id}
              onClick={() => handleOpenUpdateModal(user.id)}
              className="cursor-pointer hover:bg-slate-300"
            >
              <TableCell className="text-center">
                {indexOfFirstuser + index + 1}
              </TableCell>
              <TableCell className="text-center">{user.firstName}</TableCell>
              <TableCell className="text-center">{user.lastName}</TableCell>
              <TableCell className="text-center">
                {user.roleCode.toUpperCase()}
              </TableCell>
              <TableCell className="text-center">{user.phoneNumber}</TableCell>
              <TableCell className="text-center">
                <span
                  className={`w-20 text-center inline-block py-1 px-2 rounded-full text-xs ${
                    user.statusCode.toUpperCase() === "ACTIVE"
                      ? "bg-green-500 text-white"
                      : "bg-orange-500 text-white"
                  }`}
                >
                  {user.statusCode.toUpperCase() === "ACTIVE"
                    ? "ACTIVE"
                    : user.statusCode.toUpperCase() === "PENDING"
                    ? "PENDING"
                    : user.statusCode.toUpperCase() === "BANNED"
                    ? "BANNED"
                    : "INACTIVE"}
                </span>
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
                onPageChange={setCurrentPage} // Update currentPage when page changes
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Dialog for view detail user */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          {currentUserDetail && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {currentUserDetail.firstName +
                    " " +
                    currentUserDetail.lastName}
                </DialogTitle>
              </DialogHeader>
              <div className="border-t border-gray-200 mt-4  pt-4">
                {currentUserDetail.roleCode.toUpperCase() !=
                  "admin".toUpperCase() && (
                  <div className="flex justify-end">
                    <Button
                      onClick={() => {
                        setShowConfirm(true);
                        setAction("setAdmin");
                      }}
                      className="text-white bg-third hover:bg-primary rounded-md w-10 h-9"
                      title="Update user to admin"
                    >
                      <EditNoteOutlinedIcon />
                    </Button>
                  </div>
                )}

                <dl>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.firstName +
                        " " +
                        currentUserDetail.lastName}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.email}
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.address}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone Number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.phoneNumber}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">DOB</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {
                        new Date(currentUserDetail.dob)
                          .toISOString()
                          .split("T")[0]
                      }
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Point</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.point}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Type Login
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.typeLogin}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      isVerify
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.isVerify === 1 ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      isUpdate
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.isUpdate === 1 ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">isVip</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.isVip === 1 ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Type Login
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.typeLogin}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      AddressCode
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.UserDetailData.addressCode}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Salary
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.UserDetailData.salaryJobCode}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Experience
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.UserDetailData.experienceJobCode}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Gender
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.UserDetailData.genderCode === "M"
                        ? "Male"
                        : "Female"}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Category job
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.UserDetailData.categoryJobCode}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Job Level
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.UserDetailData.jobLevelCode}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Work type
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.UserDetailData.workTypeCode}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      isTakeMail
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.isTakeMail === 1 ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      isFindJob
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.isFindJob === 1 ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">File</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUserDetail.file}
                    </dd>
                  </div>

                  <div className="pt-6">
                    <div className="flex justify-end">
                      {currentUserDetail.statusCode.toUpperCase() ===
                        "ACTIVE".toUpperCase() && (
                        <button
                          onClick={() => {
                            setShowConfirm(true);
                            setAction("ban");
                          }}
                          className="p-3 text-white bg-orange-500 hover:bg-orange-700 rounded-md"
                        >
                          Ban
                        </button>
                      )}
                      {currentUserDetail.statusCode.toUpperCase() ===
                        "BANNED".toUpperCase() && (
                        <button
                          onClick={handleActive}
                          className="p-3 text-white bg-green-500 hover:bg-green-700 rounded-md"
                        >
                          Active
                        </button>
                      )}
                      <GlobalLoadingMain isSubmiting={loading} />
                    </div>

                    {showConfirm === true && (
                      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                        <DialogContent className="max-w-sm">
                          <DialogHeader>
                            <DialogTitle>Confirm Action</DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            Are you sure {action}?
                          </DialogDescription>
                          <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
                            Warning: This action cannot be undone.
                          </h3>
                          {action !== "setAdmin" && (
                            <div className="mt-4">
                              <label
                                htmlFor="banReason"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Reason for {action}:
                              </label>
                              <Input
                                id="banReason"
                                type="text"
                                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={note}
                                onBlur={handleBlur}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Enter the reason for banning this user"
                              />
                              {er && (
                                <p className="mt-2 text-sm text-red-600">
                                  Please enter a reason for {action} this user.
                                </p>
                              )}
                            </div>
                          )}
                          <div className="flex justify-center mt-4">
                            <button
                              onClick={() => {
                                if (
                                  action.toUpperCase() === "ban".toUpperCase()
                                ) {
                                  handleBan(note);
                                }
                                if (
                                  action.toUpperCase() ===
                                  "setAdmin".toUpperCase()
                                ) {
                                  handlesetUserToAdmin();
                                }
                                setNote("");
                              }}
                              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
                            >
                              Yes, I'm sure
                            </button>
                            <GlobalLoadingMain isSubmiting={loading} />
                            <button
                              onClick={() => setShowConfirm(false)}
                              className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                            >
                              No, cancel
                            </button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
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

export default ManageUser;
