// import React from "react";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
//   return (
//     <div className="flex justify-center mt-8 mb-5">
//       <nav className="flex items-center space-x-2">
//         <Pagination>
//           <PaginationContent>
//             {/* Nút "Previous" */}
//             {currentPage > 1 && (
//               <PaginationItem>
//                 <PaginationPrevious
//                   href="#"
//                   onClick={() => onPageChange(currentPage - 1)}
//                 />
//               </PaginationItem>
//             )}

//             {/* Các nút trang */}
//             {Array.from({ length: totalPages }, (_, index) => (
//               <PaginationItem key={index}>
//                 <PaginationLink
//                   href="#"
//                   onClick={() => onPageChange(index + 1)}
//                   active={currentPage === index + 1}
//                 >
//                   {index + 1}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}

//             {/* Nút "Next" */}
//             {currentPage < totalPages && (
//               <PaginationItem>
//                 <PaginationNext
//                   href="#"
//                   onClick={() => onPageChange(currentPage + 1)}
//                 />
//               </PaginationItem>
//             )}
//           </PaginationContent>
//         </Pagination>
//       </nav>
//     </div>
//   );
// };

// export default PaginationComponent;



import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-8 mb-5">
      <nav className="flex items-center space-x-2">
        <Pagination>
          <PaginationContent>
            {/* Nút "Previous" */}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => onPageChange(currentPage - 1)}
                />
              </PaginationItem>
            )}

            {/* Các nút trang */}
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => onPageChange(index + 1)}
                  isActive={currentPage === index + 1} // use isActive prop
                  className={
                    currentPage === index + 1
                      ? "border border-purple-600 text-white bg-purple-600" // Active button style
                      : "text-black hover:text-purple-600" // Inactive button style
                  }
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Nút "Next" */}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => onPageChange(currentPage + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </nav>
    </div>
  );
};

export default PaginationComponent;
