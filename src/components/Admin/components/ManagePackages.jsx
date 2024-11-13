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

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatePackage, setUpdatePackage] = useState({
    id: "",
    name: "",
    type: "",
    price: "",
    statusCode: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const packagesPerPage = 10; // Number of packages per page
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
        setTotalCount(response.data.count); // Set total count for pagination
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
  }, [currentPage, searchTerm, selectedType]);

  const handleSearchInputChange = (e) => setSearchTerm(e.target.value);

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
    setUpdatePackage({
      id: "",
      name: "",
      type: "",
      price: "",
      statusCode: "active",
    });
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setUpdatePackage({
      id: "",
      name: "",
      type: "",
      price: "",
      statusCode: "active",
    });
  };

  const handleOpenUpdateModal = (packageData) => {
    setUpdatePackage(packageData);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setUpdatePackage({
      id: "",
      name: "",
      type: "",
      price: "",
      statusCode: "active",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatePackage((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleCreateNewPackage(updatePackage);
      if (response.data && response.data.errCode === 0) {
        fetchPackages(searchTerm, selectedType);
      } else {
        console.error(
          "Failed to create package:",
          response.data.message || "No message"
        );
      }
      handleCloseCreateModal();
    } catch (error) {
      console.error("Error creating package:", error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleUpdatePackage(updatePackage);
      if (response.data && response.data.errCode === 0) {
        fetchPackages(searchTerm, selectedType);
      } else {
        console.error(
          "Failed to update package:",
          response.data.message || "No message"
        );
      }
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  const handleToggleStatus = async (packageId, currentStatus) => {
    try {
      const action =
        currentStatus === "active"
          ? handleDeactivePackage
          : handleActivePackage;
      const response = await action({ id: packageId });
      if (response.data && response.data.errCode === 0) {
        fetchPackages(searchTerm, selectedType);
      } else {
        console.error(
          "Failed to update package status:",
          response.data.message || "No message"
        );
      }
    } catch (error) {
      console.error("Error updating package status:", error);
    }
  };

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType === "all" || pkg.type === selectedType)
  );

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
            {/* <TableHead className="text-center">Status</TableHead> */}
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
              {/* <TableCell className="text-center">
                <Button
                  onClick={() => handleToggleStatus(pkg.id, pkg.statusCode)}
                  className={`text-white rounded-md w-20 ${
                    pkg.statusCode === "active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {pkg.statusCode}
                </Button>
              </TableCell> */}
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

      {/* Create Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={handleCloseCreateModal}>
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
                value={updatePackage.name}
                onChange={handleInputChange}
                required
              />
              <select
                name="type"
                value={updatePackage.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                {packageTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <Input
                name="price"
                placeholder="Price"
                type="number"
                value={updatePackage.price}
                onChange={handleInputChange}
                required
              />
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

      {/* Update Modal */}
      <Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
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
                required
              />
              <select
                name="type"
                value={updatePackage.type}
                onChange={handleInputChange}
                required
              >
                {packageTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <Input
                name="price"
                placeholder="Price"
                type="number"
                value={updatePackage.price}
                onChange={handleInputChange}
                required
              />
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

export default ManagePackages;
