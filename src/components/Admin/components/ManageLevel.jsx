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
import AdminValidationLevel from "../common/AdminValidationLevel";
import toast from "react-hot-toast";

const ManageLevel = () => {
  const [jobLevels, setJobLevels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [filteredJobLevels, setFilteredJobLevels] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [jobLevelToDelete, setJobLevelToDelete] = useState(null); // State to store job level to be deleted

  // form data for new create joblevel
  const [newJobLevel, setNewJobLevel] = useState({
    code: "",
    type: "JOBLEVEL",
    value: "",
  });
  // form data for new update joblevel
  const [updateJobLevel, setUpdateJobLevel] = useState({
    code: "",
    type: "JOBLEVEL",
    value: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobLevelsPerPage = 5; // Number of job levels per page

  useEffect(() => {
    const fetchJobLevels = async () => {
      try {
        setLoading(true);
        const response = await getAllJobLevel();
        if (Array.isArray(response.data.data)) {
          // Sort levels by `value` or another key in descending order
          const sortedJobLevels = response.data.data.sort((a, b) => {
            if (a.value < b.value) return 1;
            if (a.value > b.value) return -1;
            return 0;
          });
          setJobLevels(sortedJobLevels);
          setFilteredJobLevels(sortedJobLevels);
        } else {
          setError("Error fetching data. Please try again later.");
          setJobLevels([]);
          setFilteredJobLevels([]);
        }
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        setJobLevels([]);
        setFilteredJobLevels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobLevels();
  }, []);

  const handleSearchInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filter job types based on the input
    const filtered = jobLevels.filter((jobLevel) =>
      jobLevel.value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredJobLevels(filtered); // Update the filtered job types in real-time
  };

  const handleSearchClick = () => {
    // Filter the job types when search button is clicked
    const filtered = jobLevels.filter((jobLevel) =>
      jobLevel.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobLevels(filtered); // Update the filtered job types
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
    setNewJobLevel({ code: "", type: "JOBLEVEL", value: "" });
    setErrorMessage({});
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setNewJobLevel({ code: "", type: "JOBLEVEL", value: "" });
    setErrorMessage({});
  };

  const handleOpenUpdateModal = (jobLevel) => {
    setUpdateJobLevel(jobLevel);
    setUpdateModalOpen(true);
    setErrorMessage({});
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setUpdateJobLevel({ code: "", type: "JOBLEVEL", value: "" });
    setErrorMessage({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isCreateModalOpen) {
      setNewJobLevel((prev) => ({ ...prev, [name]: value }));
      const errors = AdminValidationLevel(
        { ...newJobLevel, [name]: value },
        true
      );
      setErrorMessage((prev) => ({ ...prev, [name]: errors[name] || "" }));
    } else {
      setUpdateJobLevel((prev) => ({ ...prev, [name]: value }));
      const errors = AdminValidationLevel(
        { ...updateJobLevel, [name]: value },
        true
      );
      setErrorMessage((prev) => ({ ...prev, [name]: errors[name] || "" }));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = AdminValidationLevel(newJobLevel, true);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      return;
    }

    const userData = {
      type: "JOBLEVEL",
      value: newJobLevel.value,
      code: newJobLevel.code,
    };

    try {
      const response = await handleCreateNewAllCode(userData);
      console.log("Create Response:", response);

      if (response.data && response.data.errCode === 0) {
        // Insert the new job level at the top of the list (new level at the beginning)
        const updatedJobLevels = [userData, ...jobLevels];

        // Sort the levels (if necessary, adjust this sorting condition based on your requirements)
        const sortedJobLevels = updatedJobLevels.sort((a, b) => {
          if (a.value < b.value) return 1;
          if (a.value > b.value) return -1;
          return 0;
        });

        setJobLevels(sortedJobLevels);
        setFilteredJobLevels(sortedJobLevels); // Keep the filtered job levels in sync
        toast.success("Level created successfully!");
      } else {
        console.error("Failed to create job level:", response.data);
        toast.error(
          `Failed to create level: ${response.data.message || "Unknown error"}`
        );
      }

      handleCloseCreateModal();
    } catch (error) {
      console.error("Error saving job level:", error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = AdminValidationLevel(updateJobLevel, false);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      return;
    }

    const userData = {
      type: updateJobLevel.type,
      value: updateJobLevel.value,
      code: updateJobLevel.code,
    };

    try {
      const response = await handleUpdateAllCode(userData);
      console.log("Update Response:", response);

      if (response.data && response.data.errCode === 0) {
        // Update the job level in the list
        setJobLevels((prev) =>
          prev.map((jobLevel) =>
            jobLevel.code === userData.code
              ? { ...jobLevel, value: userData.value }
              : jobLevel
          )
        );
        setFilteredJobLevels((prev) =>
          prev.map((jobLevel) =>
            jobLevel.code === userData.code
              ? { ...jobLevel, value: userData.value }
              : jobLevel
          )
        );
        toast.success("Level updated successfully!");
      } else {
        console.error("Failed to update job level:", response.data);
        toast.error(
          `Failed to update level: ${response.data.message || "Unknown error"}`
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
        setJobLevels((prev) =>
          prev.filter((jobLevel) => jobLevel.code !== code)
        );
        setFilteredJobLevels((prev) =>
          prev.filter((jobLevel) => jobLevel.code !== code)
        );
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

  const handleOpenDeleteModal = (jobLevel) => {
    setJobLevelToDelete(jobLevel); // Store the job level to delete
    setDeleteModalOpen(true); // Open the delete confirmation dialog
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false); // Close the delete confirmation dialog
    setJobLevelToDelete(null); // Clear the stored job level
  };

  const handleConfirmDelete = async () => {
    if (jobLevelToDelete) {
      try {
        const response = await handleDeleteAllCode({
          code: jobLevelToDelete.code,
        });
        if (response.data && response.data.errCode === 0) {
          setJobLevels((prev) =>
            prev.filter((jobLevel) => jobLevel.code !== jobLevelToDelete.code)
          );
          setFilteredJobLevels((prev) =>
            prev.filter((jobLevel) => jobLevel.code !== jobLevelToDelete.code)
          );
          toast.success("Level deleted successfully!");
        } else {
          console.error("Failed to delete job level:", response.data);
          toast.error(
            `Failed to delete level: ${
              response.data.errMessage || "Unknown error"
            }`
          );
        }
      } catch (error) {
        console.error("Error deleting job level:", error);
      } finally {
        handleCloseDeleteModal(); // Close the modal after the action
      }
    }
  };

  // const filteredJobLevels = jobLevels.filter((jobLevel) =>
  //   jobLevel.value.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // Pagination logic
  const indexOfLastJobLevel = currentPage * jobLevelsPerPage;
  const indexOfFirstJobLevel = indexOfLastJobLevel - jobLevelsPerPage;
  const currentJobLevels = filteredJobLevels.slice(
    indexOfFirstJobLevel,
    indexOfLastJobLevel
  );
  const totalPages = Math.ceil(filteredJobLevels.length / jobLevelsPerPage);

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
            <TableHead className="text-center">Job Level</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentJobLevels.map((jobLevel, index) => (
            <TableRow
              key={jobLevel.code}
              className="cursor-pointer hover:bg-slate-300"
            >
              <TableCell className="text-center">
                {index + 1 + indexOfFirstJobLevel}
              </TableCell>
              <TableCell className="text-center">{jobLevel.value}</TableCell>
              <TableCell className="text-center flex space-x-3 items-center justify-center">
                <Button
                  onClick={() => handleOpenUpdateModal(jobLevel)} // Open update modal with jobLevel data
                  className="text-white bg-third hover:bg-primary rounded-md w-10 h-9"
                >
                  <EditNoteOutlinedIcon />
                </Button>

                <Button
                  onClick={() => handleOpenDeleteModal(jobLevel)} // Open delete confirmation modal
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
                  value={newJobLevel.code}
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
                  value={newJobLevel.value}
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
                  value={updateJobLevel.code}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="value">Job Level Name:</Label>
                <Input
                  type="text"
                  id="value"
                  name="value"
                  value={updateJobLevel.value}
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

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteModalOpen} onOpenChange={handleCloseDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{"Confirm Delete"}</DialogTitle>
            <DialogDescription>
              {"Are you sure you want to delete this job level?"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              onClick={handleCloseDeleteModal}
              className="bg-third hover:text-white text-white rounded-md"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-third hover:text-white text-white rounded-md"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageLevel;
