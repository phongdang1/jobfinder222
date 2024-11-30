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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import {
  handleCreateNewPackage,
  handleUpdatePackage,
  handleActivePackage,
  handleDeactivePackage,
  getAllPackage,
} from "../../../fetchData/Package";
import { Label } from "@/components/ui/label";
import AdminPagination from "./AdminPagination";
import axios from "../../../fetchData/axios";
import AdminValidationPackage from "../common/AdminValidationPackage";
import toast from "react-hot-toast";
import GlobalLoading from "@/components/GlobalLoading/GlobalLoading";

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [errorMessage, setErrorMessage] = useState({});
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({
    id: "",
    name: "",
    type: "",
    price: "",
    value: "",
    statusCode: "",
  });
  const [updatePackage, setUpdatePackage] = useState({
    id: "",
    name: "",
    type: "",
    price: "",
    value: "",
    statusCode: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const packagesPerPage = 5; // Number of packages per page
  const [totalCount, setTotalCount] = useState(0); // Total number of packages

  const packageTypes = ["View", "VIP", "Post"];

  const fetchPackages = async (searchKey = "", selectedType = "all") => {
    try {
      const response = await axios.get("/getAllPackage", {
        params: {
          searchKey,
          type: selectedType,
        },
      });

      if (response.data.errCode === 0) {
        setPackages(response.data.data);
      } else {
        setError(response.data.errMessage || "Error fetching packages");
      }
    } catch (error) {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages(searchTerm, selectedType);
  }, [searchTerm, selectedType]);

  const handleSearchInputChange = (e) => setSearchTerm(e.target.value);

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
    setUpdatePackage({
      id: "",
      name: "",
      type: "",
      price: "",
      value: "",
      statusCode: "active",
    });
    setErrorMessage({});
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setUpdatePackage({
      id: "",
      name: "",
      type: "",
      price: "",
      value: "",
      statusCode: "active",
    });
    setErrorMessage({});
  };

  const handleOpenCreateModel = () => {
    setCreateModalOpen(true);
    setNewPackage({
      id: "",
      name: "",
      type: "",
      price: "",
      value: "",
      statusCode: "active",
    });
  };

  const handleOpenUpdateModal = (packageData) => {
    setUpdatePackage(packageData);
    setUpdateModalOpen(true);
    setErrorMessage({});
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false); // Close the confirmation dialog without deleting
    setJobTypeToDelete(null); // Clear the job type to be deleted
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setUpdatePackage({
      id: "",
      name: "",
      type: "",
      price: "",
      value: "",
      statusCode: "active",
    });
    setErrorMessage({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (isCreateModalOpen) {
      setNewPackage((prev) => ({ ...prev, [name]: value }));
      const errors = AdminValidationPackage(
        { ...newPackage, [name]: value },
        true
      );
      setErrorMessage((prev) => ({ ...prev, [name]: errors[name] || "" }));
    } else {
      setUpdatePackage((prev) => ({ ...prev, [name]: value }));
      const errors = AdminValidationPackage(
        { ...updatePackage, [name]: value },
        true
      );
      setErrorMessage((prev) => ({ ...prev, [name]: errors[name] || "" }));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const errors = AdminValidationPackage(newPackage, true);
    setErrorMessage(errors);

    if (Object.keys(errors).length > 0) return;

    setIsSubmiting(true);

    try {
      const response = await handleCreateNewPackage(newPackage);
      if (response.data && response.data.errCode === 0) {
        fetchPackages(searchTerm, selectedType);
        toast.success("Package created successfully!");
        setNewPackage({
          id: "",
          name: "",
          type: "",
          price: "",
          value: "", // Reset point
          statusCode: "active",
        });
        setCreateModalOpen(false);
      } else {
        toast.error(response.data.message || "Failed to create package.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while creating package.");
    } finally {
      setIsSubmiting(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const errors = AdminValidationPackage(updatePackage, true);
    setErrorMessage(errors);

    if (Object.keys(errors).length > 0) return;

    setIsSubmiting(true);

    try {
      const response = await handleUpdatePackage(updatePackage);
      if (response.data && response.data.errCode === 0) {
        fetchPackages(searchTerm, selectedType);
        toast.success("Package updated successfully!");
        setUpdateModalOpen(false);
      } else {
        toast.error(response.data.message || "Failed to update package.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while updating package.");
    } finally {
      setIsSubmiting(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!selectedPackage) return;
    setIsSubmiting(true);
    const action =
      selectedPackage.statusCode === "Active"
        ? handleDeactivePackage
        : handleActivePackage;

    try {
      const response = await action({ id: selectedPackage.id });
      if (response.data && response.data.errCode === 0) {
        toast.success("Status updated successfully!");
        fetchPackages(); // Refresh the list
      } else {
        toast.error(response.data.message || "Failed to update status.");
      }
    } catch (error) {
      toast.error("Error updating status.");
    } finally {
      setIsDialogOpen(false);
      setSelectedPackage(null);
      setIsSubmiting(false);
    }
  };

  const openStatusDialog = (pkg) => {
    setSelectedPackage(pkg);
    setIsDialogOpen(true);
  };

  const filteredPackages = packages.filter((pkg) => {
    const searchTermLower = searchTerm.toLowerCase().trim(); // Normalize the search term
    const packageNameLower = pkg.name.toLowerCase(); // Normalize the package name

    // Split the search term by space and check if all parts exist in the package name
    const searchParts = searchTermLower.split(" ");
    const matchesAllParts = searchParts.every((part) =>
      packageNameLower.includes(part)
    );

    return (
      matchesAllParts && (selectedType === "all" || pkg.type === selectedType)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);
  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = filteredPackages.slice(
    indexOfFirstPackage,
    indexOfLastPackage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
              placeholder="Search by package name..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon sx={{ color: "gray" }} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="type-select">Filter by Type:</Label>
          <select
            id="type-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="all">All</option>
            {packageTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <Button
            onClick={handleOpenCreateModal}
            className="p-3 bg-third hover:text-white text-white rounded-md"
          >
            Create
          </Button>
        </div>
      </div>

      <Table className="table-auto w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">STT</TableHead>
            <TableHead className="text-center">Package Name</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Point</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPackages.map((pkg, index) => (
            <TableRow key={pkg.id}>
              <TableCell className="text-center">
                {index + 1 + (currentPage - 1) * packagesPerPage}
              </TableCell>
              <TableCell className="text-center">{pkg.name}</TableCell>
              <TableCell className="text-center">{pkg.type}</TableCell>
              <TableCell className="text-center">{pkg.price}</TableCell>
              <TableCell className="text-center">{pkg.value}</TableCell>
              <TableCell className="text-center">
                {" "}
                <span
                  className={`w-20 text-center inline-block py-1 px-2 rounded-full text-xs  ${
                    pkg.statusCode === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                  onClick={() => openStatusDialog(pkg)}
                >
                  {pkg.statusCode === "Active" ? "Active" : "Inactive"}
                </span>
              </TableCell>

              <TableCell className="text-center flex space-x-3 items-center justify-center">
                <Button
                  onClick={() => handleOpenUpdateModal(pkg)}
                  className="text-white bg-third hover:bg-primary rounded-md w-10 h-9"
                >
                  <EditNoteOutlinedIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onOpenChange={() => setIsDialogOpen(false)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Status Change</DialogTitle>
            </DialogHeader>
            <p>
              Are you sure you want to change the status of{" "}
              <strong>{selectedPackage?.name}</strong> to{" "}
              {selectedPackage?.statusCode === "Active" ? "Inactive" : "Active"}
              ?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                className="p-3 bg-third hover:text-white text-white rounded-md w-20"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="p-3 bg-third hover:text-white text-white rounded-md w-20"
                onClick={handleToggleStatus}
              >
                Confirm
              </Button>
              <GlobalLoading isSubmiting={isSubmiting} />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Modal */}
      {/* Modal for creating a new package */}
      <Dialog
        open={isCreateModalOpen}
        onOpenChange={() => setCreateModalOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Package</DialogTitle>
            <DialogDescription>
              Please fill in the package details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit}>
            <div className="flex flex-col space-y-4">
              <Input
                name="name"
                placeholder="Package Name"
                value={newPackage.name}
                onChange={handleInputChange}
                className={`${
                  errorMessage.name ? "border-red-500" : "focus:border-primary"
                }`}
              />
              {errorMessage.name && (
                <p className="text-red-500  mb-3">{errorMessage.name}</p>
              )}
              <select
                name="type"
                value={newPackage.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="View">View</option>
                <option value="VIP">VIP</option>
                <option value="Post">Post</option>
              </select>
              <Input
                name="price"
                placeholder="Price"
                type="number"
                value={newPackage.price}
                onChange={handleInputChange}
                className={`${
                  errorMessage.price ? "border-red-500" : "focus:border-primary"
                }`}
              />
              {errorMessage.price && (
                <p className="text-red-500  mb-3">{errorMessage.price}</p>
              )}
              <Input
                id="value"
                name="value"
                type="number"
                placeholder="Enter point value"
                value={newPackage.value}
                onChange={handleInputChange}
                className={errorMessage.value ? "border-red-500" : ""}
              />
              {errorMessage.value && (
                <p className="text-red-500 text-sm">{errorMessage.value}</p>
              )}
              <Button
                type="submit"
                className="p-3 bg-third hover:text-white text-white rounded-md w-20"
              >
                Create
              </Button>
            </div>
          </form>
          <GlobalLoading isSubmiting={isSubmiting} />
        </DialogContent>
      </Dialog>

      {/* Modal for updating package */}
      <Dialog
        open={isUpdateModalOpen}
        onOpenChange={() => setUpdateModalOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Package</DialogTitle>
            <DialogDescription>Modify the package details.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateSubmit}>
            <div className="flex flex-col space-y-4">
              <Input
                name="name"
                placeholder="Package Name"
                value={updatePackage.name}
                onChange={handleInputChange}
                className={`${
                  errorMessage.name ? "border-red-500" : "focus:border-primary"
                }`}
              />
              {errorMessage.name && (
                <p className="text-red-500  mb-3">{errorMessage.name}</p>
              )}
              <select
                name="type"
                value={updatePackage.type}
                onChange={handleInputChange}
                required
              >
                <option value="View">View</option>
                <option value="VIP">VIP</option>
                <option value="Post">Post</option>
              </select>
              <Input
                name="price"
                placeholder="Price"
                type="number"
                value={updatePackage.price}
                onChange={handleInputChange}
                className={`${
                  errorMessage.price ? "border-red-500" : "focus:border-primary"
                }`}
              />
              {errorMessage.price && (
                <p className="text-red-500  mb-3">{errorMessage.price}</p>
              )}
              <Input
                id="value"
                name="value"
                type="number"
                placeholder="Enter point value"
                value={updatePackage.value}
                onChange={handleInputChange}
                className={errorMessage.value ? "border-red-500" : ""}
              />
              {errorMessage.value && (
                <p className="text-red-500 text-sm">{errorMessage.value}</p>
              )}

              <Button
                type="submit"
                className="p-3 bg-third hover:text-white text-white rounded-md w-20"
              >
                Update
              </Button>
            </div>
          </form>
          <GlobalLoading isSubmiting={isSubmiting} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagePackages;
