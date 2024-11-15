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
import DeleteIcon from "@mui/icons-material/Delete";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@/components/ui/button";
import {
  getAllWorkType,
  handleCreateNewAllCode,
  handleUpdateAllCode,
  handleDeleteAllCode,
} from "../../../fetchData/AllCode";
import { Label } from "@/components/ui/label";
import AdminPagination from "./AdminPagination";
import AdminValidationWorkForm from "../common/AdminValidationWorkForm";

const ManageWorkForm = () => {
  const [workTypes, setWorkTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [filteredWorkTypes, setFilteredWorkTypes] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false); // New state for delete confirmation
  const [deleteItem, setDeleteItem] = useState(null); // State to store the item being deleted

  const [newWorkType, setNewWorkType] = useState({
    code: "",
    type: "WORKTYPE",
    value: "",
  });

  const [updateWorkType, setUpdateWorkType] = useState({
    code: "",
    type: "WORKTYPE",
    value: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set the number of items per page
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchWorkTypes = async () => {
      try {
        const response = await getAllWorkType();
        if (Array.isArray(response.data.data)) {
          setWorkTypes(response.data.data);
          setTotalCount(response.data.data.length); // Set total count of work types
          setFilteredWorkTypes(response.data.data);
        } else {
          setError("Error fetching data. Please try again later.");
          setWorkTypes([]);
          setFilteredWorkTypes([]);
        }
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        setWorkTypes([]);
        setFilteredWorkTypes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkTypes();
  }, []);

  const handleSearchInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filter job types based on the input
    const filtered = workTypes.filter((workType) =>
      workType.value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredWorkTypes(filtered); // Update the filtered job types in real-time
  };

  const handleSearchClick = () => {
    // Filter the job types when search button is clicked
    const filtered = workTypes.filter((workType) =>
      workType.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWorkTypes(filtered); // Update the filtered job types
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
    setNewWorkType({ code: "", type: "WORKTYPE", value: "" });
    setErrorMessage({});
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setNewWorkType({ code: "", type: "WORKTYPE", value: "" });
    setErrorMessage({});
  };

  const handleOpenUpdateModal = (workType) => {
    setUpdateWorkType(workType);
    setUpdateModalOpen(true);
    setErrorMessage({});
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setUpdateWorkType({ code: "", type: "WORKTYPE", value: "" });
    setErrorMessage({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isCreateModalOpen) {
      setNewWorkType((prev) => ({ ...prev, [name]: value }));
      const errors = AdminValidationWorkForm(
        { ...newWorkType, [name]: value },
        true
      );
      setErrorMessage((prev) => ({ ...prev, [name]: errors[name] || "" }));
    } else {
      setUpdateWorkType((prev) => ({ ...prev, [name]: value }));
      const errors = AdminValidationWorkForm(
        { ...updateWorkType, [name]: value },
        true
      );
      setErrorMessage((prev) => ({ ...prev, [name]: errors[name] || "" }));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = AdminValidationWorkForm(newWorkType, true);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      return;
    }

    const userData = {
      type: "WORKTYPE",
      value: newWorkType.value,
      code: newWorkType.code,
    };

    try {
      const response = await handleCreateNewAllCode(userData);
      console.log("Create Response:", response);

      if (response.data && response.data.errCode === 0) {
        setWorkTypes((prev) => [...prev, userData]);
        setTotalCount((prev) => prev + 1); // Update total count
        setFilteredWorkTypes((prev) => [...prev, userData]);
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

    const validationErrors = AdminValidationWorkForm(updateWorkType, false);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      return;
    }

    const userData = {
      type: updateWorkType.type,
      value: updateWorkType.value,
      code: updateWorkType.code,
    };

    try {
      const response = await handleUpdateAllCode(userData);
      console.log("Update Response:", response);

      if (response.data && response.data.errCode === 0) {
        setWorkTypes((prev) =>
          prev.map((workType) =>
            workType.code === userData.code
              ? { ...workType, value: userData.value }
              : workType
          )
        );
        setFilteredWorkTypes((prev) =>
          prev.map((workType) =>
            workType.code === userData.code
              ? { ...workType, value: userData.value }
              : workType
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

  const handleDelete = async () => {
    try {
      if (!deleteItem) return;

      const response = await handleDeleteAllCode({ code: deleteItem.code });
      if (response.data && response.data.errCode === 0) {
        setWorkTypes((prev) =>
          prev.filter((workType) => workType.code !== deleteItem.code)
        );
        setFilteredWorkTypes((prev) =>
          prev.filter((workType) => workType.code !== deleteItem.code)
        );
        setTotalCount((prev) => prev - 1);
      } else {
        console.error(
          "Failed to delete job type:",
          response.data.errMessage || "No message"
        );
      }
      setDeleteConfirmOpen(false); // Close the confirmation dialog after deletion
    } catch (error) {
      console.error("Error deleting job type:", error);
    }
  };

  const handleOpenDeleteConfirm = (workType) => {
    setDeleteItem(workType);
    setDeleteConfirmOpen(true);
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setDeleteItem(null);
  };

  // // Filter work types based on search term
  // const filteredWorkTypes = workTypes.filter((workType) =>
  //   workType.value.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWorkTypes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredWorkTypes.length / itemsPerPage);

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
              placeholder="Search by type of work..."
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
            <TableHead className="text-center">Type of Work</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((workType, index) => (
            <TableRow
              key={workType.code}
              className="cursor-pointer hover:bg-slate-300"
            >
              <TableCell className="text-center">
                {index + 1 + (currentPage - 1) * itemsPerPage}
              </TableCell>
              <TableCell className="text-center">{workType.value}</TableCell>
              <TableCell className="text-center flex space-x-3 items-center justify-center">
                <Button
                  onClick={() => handleOpenUpdateModal(workType)}
                  className="text-white bg-third hover:bg-primary rounded-md w-10 h-9"
                >
                  <EditNoteOutlinedIcon />
                </Button>

                <Button
                  onClick={() => handleOpenDeleteConfirm(workType)}
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

      {/* Dialog for create type of work */}
      <Dialog open={isCreateModalOpen} onOpenChange={handleCloseCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Type of Work</DialogTitle>
            <DialogDescription>
              Enter the information of the work type to create.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit}>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="value">Type of Work</Label>
                <Input
                  id="value"
                  name="value"
                  value={newWorkType.value}
                  onChange={handleInputChange}
                  className={`${
                    errorMessage.value
                      ? "border-red-500"
                      : "focus:border-primary"
                  }`}
                />
                {errorMessage.value && (
                  <p className="text-red-500  mb-3">{errorMessage.value}</p>
                )}
              </div>
              <div>
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  name="code"
                  value={newWorkType.code}
                  onChange={handleInputChange}
                  className={`${
                    errorMessage.code
                      ? "border-red-500"
                      : "focus:border-primary"
                  } `}
                />
                {errorMessage.code && (
                  <p className="text-red-500 mb-3">{errorMessage.code}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
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

      {/* Dialog for update type of work */}
      <Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Type of Work</DialogTitle>
            <DialogDescription>
              Enter the new information of the work type.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateSubmit}>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="value">Type of Work</Label>
                <Input
                  id="value"
                  name="value"
                  value={updateWorkType.value}
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
              <div>
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  name="code"
                  value={updateWorkType.code}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
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
      <Dialog
        open={isDeleteConfirmOpen}
        onOpenChange={handleCloseDeleteConfirm}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{"Confirm Delete"}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the work type {deleteItem?.value}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              onClick={handleCloseDeleteConfirm}
              className="bg-third hover:text-white text-white rounded-md"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
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

export default ManageWorkForm;
