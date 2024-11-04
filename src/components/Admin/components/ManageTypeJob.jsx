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

const ManageTypeJob = () => {
  const [jobTypes, setJobTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  // Form data for creating and updating job types
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
  const jobTypesPerPage = 5; // Adjust number of job types per page
  const indexOfLastJobType = currentPage * jobTypesPerPage;
  const indexOfFirstJobType = indexOfLastJobType - jobTypesPerPage;
  const currentJobTypes = jobTypes.slice(
    indexOfFirstJobType,
    indexOfLastJobType
  );
  const totalJobTypes = jobTypes.length; // Total job types for pagination

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        setLoading(true);
        const response = await getAllJobType();
        if (Array.isArray(response.data.data)) {
          setJobTypes(response.data.data);
        } else {
          setError("Error fetching data. Please try again later.");
          setJobTypes([]);
        }
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        setJobTypes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobTypes();
  }, []);

  const handleSearchInputChange = (e) => setSearchTerm(e.target.value);

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
    setNewJobType({ code: "", type: "JOBTYPE", value: "" });
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setNewJobType({ code: "", type: "JOBTYPE", value: "" });
  };

  const handleOpenUpdateModal = (jobType) => {
    setUpdateJobType(jobType);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setUpdateJobType({ code: "", type: "JOBTYPE", value: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isCreateModalOpen) {
      setNewJobType((prev) => ({ ...prev, [name]: value }));
    } else {
      setUpdateJobType((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      type: "JOBTYPE",
      value: newJobType.value,
      code: newJobType.code,
    };

    try {
      const response = await handleCreateNewAllCode(userData);
      console.log("Create Response:", response);

      if (response.data && response.data.errCode === 0) {
        setJobTypes((prev) => [...prev, userData]);
      } else {
        console.error(
          "Failed to create job type:",
          response.data.message || "No message"
        );
      }

      handleCloseCreateModal();
    } catch (error) {
      console.error("Error saving job type:", error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      type: updateJobType.type,
      value: updateJobType.value,
      code: updateJobType.code,
    };

    try {
      const response = await handleUpdateAllCode(userData);
      console.log("Update Response:", response);

      if (response.data && response.data.errCode === 0) {
        setJobTypes((prev) =>
          prev.map((jobType) =>
            jobType.code === userData.code
              ? { ...jobType, value: userData.value }
              : jobType
          )
        );
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

  const handleDeleteJobType = async (code) => {
    try {
      const response = await handleDeleteAllCode({ code });
      if (response.data && response.data.errCode === 0) {
        // Xóa thành công: cập nhật lại danh sách job types
        setJobTypes((prev) => prev.filter((jobType) => jobType.code !== code));
      } else {
        console.error(
          "Failed to delete job type:",
          response.data.errMessage || "No message"
        );
      }
    } catch (error) {
      console.error("Error deleting job type:", error);
    }
  };

  const filteredJobTypes = jobTypes.filter((jobType) =>
    jobType.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const totalPages = Math.ceil(filteredJobTypes.length / jobTypesPerPage);

  return (
    <div className="border border-blue-gray-100 shadow-sm rounded-lg">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="Search by type..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon sx={{ color: "gray" }} />
            </div>
          </div>
          <Button
            onClick={() => setSearchTerm("")}
            className="p-3 text-white bg-third hover:bg-primary rounded-md"
          >
            Reset Search
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
                  onClick={() => handleDeleteJobType(jobType.code)}
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
              <Label htmlFor="code">Job Code</Label>
              <Input
                type="text"
                name="code"
                value={newJobType.code}
                onChange={handleInputChange}
                required
                className="mb-2"
              />
              <Label htmlFor="value">Job Type</Label>
              <Input
                type="text"
                name="value"
                value={newJobType.value}
                onChange={handleInputChange}
                required
                className="mb-2"
              />
            </div>
            <Button
              type="submit"
              className="bg-third hover:text-white text-white rounded-md"
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
              <Label htmlFor="code">Job Code</Label>
              <Input
                type="text"
                name="code"
                value={updateJobType.code}
                onChange={handleInputChange}
                disabled // Disable editing the job code
                required
                className="mb-2"
              />
              <Label htmlFor="value">Job Type</Label>
              <Input
                type="text"
                name="value"
                value={updateJobType.value}
                onChange={handleInputChange}
                required
                className="mb-2"
              />
            </div>
            <Button
              type="submit"
              className="bg-third hover:text-white text-white rounded-md"
            >
              Update
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageTypeJob;
