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
import * as XLSX from "xlsx"; // Import thư viện SheetJS
import { Button } from "@/components/ui/button";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

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

  // // Hàm xuất dữ liệu ra file Excel
  // const handleExportToExcel = () => {
  //   const dataToExport = userPackages.map((userPackage, index) => ({
  //     STT: index + 1,
  //     "User Email": userPackage.userPackageData.email,
  //     "Package Name": userPackage.PackageData.name,
  //     Price: userPackage.PackageData.price,
  //     Type: userPackage.PackageData.type,
  //   }));

  //   // Tạo worksheet từ dữ liệu
  //   const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "User Service Packs");

  //   // Xuất file Excel
  //   XLSX.writeFile(workbook, "User_Service_Packs.xlsx");
  // };

  // Hàm xuất dữ liệu ra file Excel
  const handleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("User Service Packs");

    // Thêm tiêu đề cột
    worksheet.columns = [
      { header: "STT", key: "stt", width: 10 },
      { header: "User Email", key: "email", width: 30 },
      { header: "Package Name", key: "packageName", width: 25 },
      { header: "Price", key: "price", width: 15 },
      { header: "Type", key: "type", width: 15 },
    ];

    // Thêm dữ liệu vào worksheet
    userPackages.forEach((userPackage, index) => {
      worksheet.addRow({
        stt: index + 1,
        email: userPackage.userPackageData.email,
        packageName: userPackage.PackageData.name,
        price: userPackage.PackageData.price,
        type: userPackage.PackageData.type,
      });
    });

    // Căn giữa nội dung và thêm viền cho tất cả các ô
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Xuất file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "User_Service_Packs.xlsx");
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <Button
          onClick={handleExportToExcel}
          className="bg-third hover:text-white text-white rounded-md mt-4"
        >
          Export to Excel
        </Button>
      </div>
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
          <TableRow></TableRow>
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
