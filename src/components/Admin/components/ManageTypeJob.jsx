import React, { useState, useEffect } from "react";
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
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@/components/ui/button";
import { getAllJobType } from "../../../fetchData/AllCode";
import {
  handleCreateNewAllCode,
  handleUpdateAllCode,
  handleDeleteAllCode,
} from "../../../fetchData/AllCode";
import { Label } from "@/components/ui/label";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminPagination from "./AdminPagination";
import AdminValidationTypeJob from "../common/AdminValidationTypeJob";

const ManageTypeJob = () => {
  const [jobTypes, setJobTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobTypes, setFilteredJobTypes] = useState([]); // State for filtered job types
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [jobTypeToDelete, setJobTypeToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  const [newJobType, setNewJobType] = useState({
    code: "",
    type: "JOBTYPE",
    value: "",
  });
  const [updateJobType, setUpdateJobType] = useState({
    code: "",
    type: "JOBTYPE",
    value: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobTypesPerPage = 5;
  const indexOfLastJobType = currentPage * jobTypesPerPage;
  const indexOfFirstJobType = indexOfLastJobType - jobTypesPerPage;
  const currentJobTypes = filteredJobTypes.slice(
    indexOfFirstJobType,
    indexOfLastJobType
  );
  const totalJobTypes = filteredJobTypes.length;

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        setLoading(true);
        const response = await getAllJobType();
        if (Array.isArray(response.data.data)) {
          setJobTypes(response.data.data);
          setFilteredJobTypes(response.data.data); // Set initial filtered job types
        } else {
          setError("Error fetching data. Please try again later.");
          setJobTypes([]);
          setFilteredJobTypes([]);
        }
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        setJobTypes([]);
        setFilteredJobTypes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobTypes();
  }, []);

  const handleSearchInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filter job types based on the input
    const filtered = jobTypes.filter((jobType) =>
      jobType.value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredJobTypes(filtered); // Update the filtered job types in real-time
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
    setNewJobType({ code: "", type: "JOBTYPE", value: "" });
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setNewJobType({ code: "", type: "JOBTYPE", value: "" });
    setErrorMessage({});
  };

  const handleOpenUpdateModal = (jobType) => {
    setUpdateJobType(jobType);
    setUpdateModalOpen(true);
  };

  const handleDeleteConfirmation = (jobType) => {
    setJobTypeToDelete(jobType);
    setDeleteConfirmOpen(true); // Open the confirmation dialog
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setUpdateJobType({ code: "", type: "JOBTYPE", value: "" });
    setErrorMessage({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (isCreateModalOpen) {
      setNewJobType((prev) => ({ ...prev, [name]: value }));
      const errors = AdminValidationTypeJob(
        { ...newJobType, [name]: value },
        true
      );
      setErrorMessage((prev) => ({ ...prev, [name]: errors[name] || "" }));
    } else {
      setUpdateJobType((prev) => ({ ...prev, [name]: value }));
      const errors = AdminValidationTypeJob(
        { ...updateJobType, [name]: value },
        true
      );
      setErrorMessage((prev) => ({ ...prev, [name]: errors[name] || "" }));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = AdminValidationTypeJob(newJobType, true);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      return;
    }

    const userData = {
      type: "JOBTYPE",
      value: newJobType.value,
      code: newJobType.code,
    };

    try {
      const response = await handleCreateNewAllCode(userData);
      if (response.data && response.data.errCode === 0) {
        setJobTypes((prev) => [...prev, userData]);
        setFilteredJobTypes((prev) => [...prev, userData]); // Add to filtered list as well
      } else {
        // Log the full response for debugging
        console.error("Failed to create job type:", response.data);
        alert(
          `Failed to create job type. ${response.data.message || "No message"}`
        );
      }

      handleCloseCreateModal();
    } catch (error) {
      console.error("Error saving job type:", error);
      alert("An error occurred while creating the job type. Please try again.");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = AdminValidationTypeJob(updateJobType, false);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      return;
    }

    const userData = {
      type: updateJobType.type,
      value: updateJobType.value,
      code: updateJobType.code,
    };

    try {
      const response = await handleUpdateAllCode(userData);
      if (response.data && response.data.errCode === 0) {
        setJobTypes((prev) =>
          prev.map((jobType) =>
            jobType.code === userData.code
              ? { ...jobType, value: userData.value }
              : jobType
          )
        );
        setFilteredJobTypes((prev) =>
          prev.map((jobType) =>
            jobType.code === userData.code
              ? { ...jobType, value: userData.value }
              : jobType
          )
        ); // Update filtered job types
      } else {
        console.error(
          "Failed to update job type:",
          response.data.message || "No message"
        );
      }

      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating job type:", error);
    }
  };

  const handleDeleteJobType = async () => {
    if (!jobTypeToDelete) return;

    try {
      const response = await handleDeleteAllCode({
        code: jobTypeToDelete.code,
      });
      if (response.data && response.data.errCode === 0) {
        setJobTypes((prev) =>
          prev.filter((jobType) => jobType.code !== jobTypeToDelete.code)
        );
        setFilteredJobTypes((prev) =>
          prev.filter((jobType) => jobType.code !== jobTypeToDelete.code)
        ); // Remove from filtered list as well
      } else {
        console.error(
          "Failed to delete job type:",
          response.data.errMessage || "No message"
        );
      }
    } catch (error) {
      console.error("Error deleting job type:", error);
    } finally {
      setDeleteConfirmOpen(false); // Close the confirmation dialog
      setJobTypeToDelete(null); // Clear the job type to be deleted
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false); // Close the confirmation dialog without deleting
    setJobTypeToDelete(null); // Clear the job type to be deleted
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const totalPages = Math.ceil(filteredJobTypes.length / jobTypesPerPage);

  return (
    <div className="border border-blue-gray-100 shadow-sm rounded-lg">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2 w-1/2">
          <div className="relative flex-grow">
            <Input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Search by type of job..."
              value={searchTerm}
              onChange={handleSearchInputChange} // Directly updates filtered list
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
            <TableHead className="text-center">Type of Job</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentJobTypes.map((jobType, index) => (
            <TableRow
              key={jobType.code}
              className="cursor-pointer hover:bg-slate-300"
            >
              <TableCell className="text-center">
                {index + 1 + (currentPage - 1) * jobTypesPerPage}
              </TableCell>
              <TableCell className="text-center">{jobType.value}</TableCell>
              <TableCell className="text-center flex space-x-3 items-center justify-center">
                <Button
                  onClick={() => handleOpenUpdateModal(jobType)} // Open update modal with jobType data
                  className="text-white bg-third hover:bg-primary rounded-md w-10 h-9"
                >
                  <EditNoteOutlinedIcon />
                </Button>
                <Button
                  onClick={() => handleDeleteConfirmation(jobType)} // Open delete confirmation dialog
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

      {/* Dialog for create type of job */}
      <Dialog open={isCreateModalOpen} onOpenChange={handleCloseCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{"Create Job Type"}</DialogTitle>
            <DialogDescription>
              {"Enter details for the new job type."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit}>
            <div className="flex flex-col">
              <Label htmlFor="code" className="mb-2">
                Job Code
              </Label>
              <Input
                type="text"
                name="code"
                value={newJobType.code}
                onChange={handleInputChange}
                className={`${
                  errorMessage.code ? "border-red-500" : "focus:border-primary"
                } `}
              />
              {errorMessage.code && (
                <p className="text-red-500  mb-3">{errorMessage.code}</p>
              )}
              <Label htmlFor="value" className="mb-2 mt-2">
                Job Type
              </Label>
              <Input
                type="text"
                name="value"
                value={newJobType.value}
                onChange={handleInputChange}
                className={`${
                  errorMessage.value ? "border-red-500" : "focus:border-primary"
                } `}
              />
              {errorMessage.value && (
                <p className="text-red-500 mb-3">{errorMessage.value}</p>
              )}
            </div>
            <Button
              type="submit"
              className="bg-third hover:text-white text-white rounded-md mt-4"
            >
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for update type of job */}
      <Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{"Update Job Type"}</DialogTitle>
            <DialogDescription>
              {"Update the details of the selected job type."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateSubmit}>
            <div className="flex flex-col">
              <Label htmlFor="code" className="mb-2">
                Job Code
              </Label>
              <Input
                type="text"
                name="code"
                value={updateJobType.code}
                onChange={handleInputChange}
                disabled // Disable editing the job code
                className="mb-2"
              />
              <Label htmlFor="value" className="mb-2 mt-2">
                Job Type
              </Label>
              <Input
                type="text"
                name="value"
                value={updateJobType.value}
                onChange={handleInputChange}
                className={`${
                  errorMessage.value ? "border-red-500" : "focus:border-primary"
                } `}
              />
              {errorMessage.value && (
                <p className="text-red-500 mb-3">{errorMessage.value}</p>
              )}
            </div>
            <Button
              type="submit"
              className="bg-third hover:text-white text-white rounded-md mt-4"
            >
              Update
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Delete */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={handleCancelDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job type? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4 mt-4">
            <Button
              onClick={handleCancelDelete}
              className="bg-third hover:text-white text-white rounded-md mt-4"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteJobType}
              className="bg-third hover:text-white text-white rounded-md mt-4"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageTypeJob;
