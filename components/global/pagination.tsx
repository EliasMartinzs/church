import {
  Pagination as PaginationShadcn,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <PaginationShadcn className="flex items-center justify-end">
      <PaginationContent>
        <Button
          variant="outline"
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index + 1}>
            <PaginationLink href="#" onClick={() => onPageChange(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <Button
          variant="outline"
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </Button>
      </PaginationContent>
    </PaginationShadcn>
  );
};
