"use client";

import { getHistoricMeetings } from "@/actions/meetings";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import { getStatus } from "@/lib/utils";
import { Pagination } from "../global/pagination";
import { useState } from "react";
import { Calendar, Loader2 } from "lucide-react";

type Props = {
  cellId: string;
};

export const TabHistoricCell = ({ cellId }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, isPending } = useQuery({
    queryKey: ["historic"],
    queryFn: async () => {
      const response = await getHistoricMeetings(cellId);
      return response;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full grid place-items-center py-8">
        <Loader2 className="size-7 animate-spin" />
      </div>
    );
  }

  const totalItems = data?.length;
  const totalPages = Math.ceil(totalItems! / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mt-10 space-y-5">
      {currentItems?.length === 0 ? (
        <div className="w-full items-center justify-center text-center flex flex-col gap-y-4 text-muted-foreground mt-32">
          <Calendar className="size-14" />
          <p>Nenhum encontro marcado até o momento!</p>
        </div>
      ) : (
        <Table className="overflow-hidden w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Título</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-end">Participantes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="relative">
            {currentItems !== undefined && currentItems?.length > 0 ? (
              currentItems?.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {meeting.title}
                  </TableCell>
                  <TableCell>{meeting.date.toLocaleDateString()}</TableCell>
                  <TableCell>{meeting.location}</TableCell>
                  <TableCell>{meeting.host}</TableCell>
                  <TableCell>{getStatus(meeting.status)}</TableCell>
                  <TableCell className="text-end">
                    {meeting.participantsCount}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Nenhuma reunião encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {currentItems?.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
