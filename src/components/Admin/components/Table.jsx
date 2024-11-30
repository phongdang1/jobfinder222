import React, { useEffect, useState } from "react";
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
import { getAllUserPackage } from "@/fetchData/Package";
import AdminPagination from "./AdminPagination";

export function TableDemo() {
  const [userPackages, setUserPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUserPackages = async () => {
      try {
        const response = await getAllUserPackage();
        if (response?.data?.errCode === 0) {
          setUserPackages(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user packages:", error);
      }
    };

    fetchUserPackages();
  }, []);

  const totalPages = Math.ceil(userPackages.length / itemsPerPage);

  const paginatedData = userPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <Table className="bg-white border border-gray-200 rounded-sm">
        <TableCaption>List of user service packs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">STT</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>Package Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((userPackage, index) => (
            <TableRow key={userPackage.packageId}>
              <TableCell className="font-medium">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell>{userPackage.userPackageData.email}</TableCell>
              <TableCell>{userPackage.PackageData.name}</TableCell>
              <TableCell>{userPackage.PackageData.price}</TableCell>
              <TableCell>{userPackage.PackageData.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {/* <TableCell colSpan={5} className="text-right font-medium">
              Package Total: {userPackages.length}
            </TableCell> */}
          </TableRow>
        </TableFooter>
      </Table>
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
