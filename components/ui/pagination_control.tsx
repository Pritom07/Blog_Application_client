"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./button";
import { T_metaData } from "@/types/metaData.types";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination_control = ({ metaData }: { metaData: T_metaData }) => {
  const {
    resultCount,
    page: current_page,
    limit: page_size,
    totalPages,
  } = metaData;
  let start = (current_page - 1) * page_size + 1;
  let end = Math.min(current_page * page_size, resultCount);

  const searchParams = useSearchParams();
  const router = useRouter();

  const navigate = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-2 flex justify-between items-center">
      <div className="text-sm text-muted-foreground">
        Results: {start} – {end} of {resultCount}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer"
          onClick={() => navigate(1)}
          disabled={current_page === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer"
          onClick={() => navigate(current_page - 1)}
          disabled={current_page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="px-3 text-sm font-medium">
          Page {current_page} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer"
          onClick={() => navigate(current_page + 1)}
          disabled={current_page === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer"
          onClick={() => navigate(totalPages)}
          disabled={current_page === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination_control;
