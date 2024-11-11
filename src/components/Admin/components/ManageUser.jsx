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
  getAllJobLevel,
  handleCreateNewAllCode,
  handleUpdateAllCode,
  handleDeleteAllCode,
} from "@/fetchData/AllCode";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Label } from "@/components/ui/label";
import AdminPagination from "./AdminPagination"; // Import the pagination component
import DeleteIcon from "@mui/icons-material/Delete";
import { SiLevelsdotfyi } from "react-icons/si";
import AdminValidation from "../common/AdminValidation";
import { getAllUsers } from "@/fetchData/User";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  // form data for new create joblevel
  const [newUser, setNewUser] = useState({
    code: "",
    type: "JOBLEVEL",
    value: "",
  });
  // form data for new update joblevel
  const [updateUser, setUpdateUser] = useState({
    code: "",
    type: "JOBLEVEL",
    value: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Number of job levels per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers();
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
        } else {
          setError("Error fetching data. Please try again later.");
          setUsers([]);
          setFilteredUsers([]);
        }
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        setUsers([]);
        setFilteredUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSearchInputChange = (e) => setSearchTerm(e.target.value);

  const handleSearchClick = () => {
    const filtered = users.filter((user) =>
      user.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
    setNewUser({ code: "", type: "JOBLEVEL", value: "" });
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setNewUser({ code: "", type: "JOBLEVEL", value: "" });
  };

  const handleOpenUpdateModal = (user) => {
    setUpdateUser(user);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setUpdateUser({ code: "", type: "JOBLEVEL", value: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isCreateModalOpen) {
      setNewUser((prev) => ({ ...prev, [name]: value }));
      const errors = AdminValidation({ ...newUser, [name]: value }, true);
      setErrorMessage((prev) => ({ ...prev, [name]: errors[name] || "" }));
    } else {
      setUpdateUser((prev) => ({ ...prev, [name]: value }));
      const errors = AdminValidation({ ...updateUser, [name]: value }, true);
      setErrorMessage((prev) => ({ ...prev, [name]: errors[name] || "" }));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = AdminValidation(newUser, true);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      return;
    }

    const userData = {
      type: "JOBLEVEL",
      value: newUser.value,
      code: newUser.code,
    };

    try {
      const response = await handleCreateNewAllCode(userData);
      console.log("Create Response:", response);

      if (response.data && response.data.errCode === 0) {
        setUsers((prev) => [...prev, userData]);
        setFilteredUsers((prev) => [...prev, userData]);
      } else {
        console.error(
          "Failed to create job level:",
          response.data.message || "No message"
        );
      }

      handleCloseCreateModal();
    } catch (error) {
      console.error("Error saving job level:", error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = AdminValidation(updateUser, false);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      return;
    }

    const userData = {
      type: updateUser.type,
      value: updateUser.value,
      code: updateUser.code,
    };

    try {
      const response = await handleUpdateAllCode(userData);
      console.log("Update Response:", response);

      if (response.data && response.data.errCode === 0) {
        // Update the job level in the list
        setUsers((prev) =>
          prev.map((user) =>
            user.code === userData.code
              ? { ...user, value: userData.value }
              : user
          )
        );
        setFilteredUsers((prev) =>
          prev.map((user) =>
            user.code === userData.code
              ? { ...user, value: userData.value }
              : user
          )
        );
      } else {
        console.error(
          "Failed to update job level:",
          response.data.message || "No message"
        );
      }

      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating job level:", error);
    }
  };

  const handleDelete = async (code) => {
    try {
      const response = await handleDeleteAllCode({ code });
      if (response.data && response.data.errCode === 0) {
        setUsers((prev) => prev.filter((user) => user.code !== code));
        setFilteredUsers((prev) => prev.filter((user) => user.code !== code));
      } else {
        console.error(
          "Failed to delete job level:",
          response.data.errMessage || "No message"
        );
      }
    } catch (error) {
      console.error("Error deleting job level:", error);
    }
  };

  // const filteredJobLevels = jobLevels.filter((jobLevel) =>
  //   jobLevel.value.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="border border-blue-gray-100 shadow-sm rounded-lg">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2 w-1/2">
          <div className="relative flex-grow">
            <Input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Search by job level..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon sx={{ color: "gray" }} />
            </div>
          </div>
          <Button
            onClick={handleSearchClick}
            className="p-3 text-white bg-third hover:bg-primary rounded-md"
          >
            Search
          </Button>
        </div>
        <Button
          onClick={handleOpenCreateModal}
          className="p-3 bg-third hover:text-white text-white rounded-md"
        >
          Create
        </Button>
      </div>
      <Table className="table-auto w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">STT</TableHead>
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">First Name</TableHead>
            <TableHead className="text-center">Last Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Address</TableHead>
            <TableHead className="text-center">Phone Number</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user, index) => (
            <TableRow
              key={user.code}
              user={user}
              className="cursor-pointer hover:bg-slate-300"
            >
              <TableCell className="text-center">
                {index + 1 + indexOfFirstUser}
              </TableCell>
              <TableCell className="text-center">{user.value}</TableCell>
              <TableCell className="text-center">
                {user.firstName || "N/A"}
              </TableCell>
              <TableCell className="text-center">
                {user.lastName || "N/A"}
              </TableCell>
              <TableCell className="text-center">{user.email}</TableCell>
              <TableCell className="text-center">
                {user.address || "N/A"}
              </TableCell>
              <TableCell className="text-center">
                {user.phoneNumber || "N/A"}
              </TableCell>
              <TableCell className="text-center">{user.roleCode}</TableCell>
              <TableCell className="text-center flex space-x-3 items-center justify-center">
                <Button
                  onClick={() => handleOpenUpdateModal(user)} // Open update modal with jobLevel data
                  className="text-white bg-third hover:bg-primary rounded-md w-10 h-9"
                >
                  <EditNoteOutlinedIcon />
                </Button>

                <Button
                  onClick={() => handleDelete(user.code)}
                  className="text-white bg-red-500 hover:bg-red-600 rounded-md w-10 h-9"
                >
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage} // Update currentPage when page changes
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Dialog for create level of job */}
      <Dialog open={isCreateModalOpen} onOpenChange={handleCloseCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{"Create Job Level"}</DialogTitle>
            <DialogDescription>
              {"Enter details for the new job level."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Job Level Code:</Label>
                <Input
                  type="text"
                  id="code"
                  name="code"
                  value={newUser.code}
                  onChange={handleInputChange}
                  className={`${
                    errorMessage.code
                      ? "border-red-500"
                      : "focus:border-primary"
                  }`}
                />
                {errorMessage.code && (
                  <p className="text-red-500  mb-3">{errorMessage.code}</p>
                )}
              </div>
              <div>
                <Label htmlFor="value">Job Level Name:</Label>
                <Input
                  type="text"
                  id="value"
                  name="value"
                  value={newUser.value}
                  onChange={handleInputChange}
                  className={`${
                    errorMessage.value
                      ? "border-red-500"
                      : "focus:border-primary"
                  } `}
                />
                {errorMessage.value && (
                  <p className="text-red-500 mb-3">{errorMessage.value}</p>
                )}
              </div>
              <Button
                type="submit"
                className="bg-third hover:text-white text-white rounded-md"
              >
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for update level of job */}
      <Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{"Update Job Level"}</DialogTitle>
            <DialogDescription>
              {"Update details for the selected job level."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Job Level Code:</Label>
                <Input
                  type="text"
                  id="code"
                  name="code"
                  value={updateUser.code}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="value">Job Level Name:</Label>
                <Input
                  type="text"
                  id="value"
                  name="value"
                  value={updateUser.value}
                  onChange={handleInputChange}
                  className={`${
                    errorMessage.value
                      ? "border-red-500"
                      : "focus:border-primary"
                  } `}
                />
                {errorMessage.value && (
                  <p className="text-red-500 mb-3">{errorMessage.value}</p>
                )}
              </div>
              <Button
                type="submit"
                className="bg-third hover:text-white text-white rounded-md"
              >
                Update
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUser;
