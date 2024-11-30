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

export function TableDemo() {
  const [userPackages, setUserPackages] = useState([]);

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

  return (
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
        {userPackages.map((userPackage, index) => (
          <TableRow key={userPackage.packageId}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            {/* <TableCell>
              {userPackage.userPackageData.firstName}{" "}
              {userPackage.userPackageData.lastName}
            </TableCell> */}
            <TableCell>{userPackage.userPackageData.email}</TableCell>
            <TableCell>{userPackage.PackageData.name}</TableCell>
            <TableCell>{userPackage.PackageData.price}</TableCell>
            <TableCell>{userPackage.PackageData.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="text-right font-medium">
            Package Total: {userPackages.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
