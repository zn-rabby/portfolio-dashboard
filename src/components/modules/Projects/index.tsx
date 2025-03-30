"use client";

import * as React from "react";
import {
  FaCopy,
  FaEye,
  FaEdit,
  FaTrash,
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { deleteProjectById } from "@/service/Project";
import { IProject } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ManageProject({ projects }: { projects: IProject[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDeleteProject = async (id: string) => {
    try {
      const response = await deleteProjectById(id);
      if (response?.success) {
        toast.success("Project deleted successfully");
      } else {
        toast.error(
          response?.error?.[0]?.message || "Failed to delete project"
        );
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  const columns: ColumnDef<IProject>[] = [
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => {
        const images = row.original.image as string[];
        const thumbnail = images?.[0] || "";

        const isValidUrl = (url: string) => {
          try {
            new URL(url);
            return true;
          } catch {
            return false;
          }
        };

        return (
          <div className="w-16 h-16 overflow-hidden rounded-lg border border-gray-200">
            {thumbnail && isValidUrl(thumbnail) ? (
              <Image
                src={thumbnail}
                width={64}
                height={64}
                alt="Project thumbnail"
                className="object-cover w-full h-full"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                <span className="text-xs">No Image</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Project Title",
      cell: ({ row }) => (
        <div className="font-medium">
          <Link
            href={`/projects/${row.original._id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {row.getValue("title")}
          </Link>
          <div className="text-sm text-gray-500 mt-1">
            {row.original.category}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "technologies",
      header: "Tech Stack",
      cell: ({ row }) => {
        const techs = (row.getValue("technologies") as string[])?.slice(0, 3);
        return (
          <div className="flex flex-wrap gap-1">
            {techs?.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs px-2 py-0.5 border-gray-200 text-gray-700"
              >
                {tech}
              </Badge>
            ))}
            {row.original.technologies?.length > 3 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-0.5 border-gray-200"
                    >
                      +{row.original.technologies.length - 3}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border shadow-lg p-2">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {row.original.technologies?.slice(3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs px-2 py-0.5 border-gray-200"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge
            variant="outline"
            className={`text-xs capitalize ${
              status === "completed"
                ? "bg-green-50 text-green-700 border-green-200"
                : status === "ongoing"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
          >
            {String(status)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "links",
      header: "Links",
      cell: ({ row }) => (
        <div className="flex gap-2">
          {row.original.liveDemoLink && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-blue-50"
                    onClick={() =>
                      window.open(row.original.liveDemoLink, "_blank")
                    }
                  >
                    <FaExternalLinkAlt className="text-blue-600" size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white border shadow-lg">
                  <p>Live Demo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {row.original.repoLinkClient && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-gray-100"
                    onClick={() =>
                      window.open(row.original.repoLinkClient, "_blank")
                    }
                  >
                    <FaGithub className="text-gray-700" size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white border shadow-lg">
                  <p>Client Code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {row.original.repoLinkServer && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-gray-100"
                    onClick={() =>
                      window.open(row.original.repoLinkServer, "_blank")
                    }
                  >
                    <FaGithub className="text-gray-700" size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white border shadow-lg">
                  <p>Server Code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const project = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-gray-100"
                aria-label="Open actions menu"
              >
                <MoreHorizontal className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-white border border-gray-200 shadow-lg rounded-md"
            >
              <DropdownMenuLabel className="text-gray-700 font-medium">
                Project Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-100" />

              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(project.liveDemoLink)
                }
                className="text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                <FaCopy className="mr-2 h-4 w-4 text-blue-500" />
                Copy Live Link
              </DropdownMenuItem>

              <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">
                <Link
                  href={`/projects/${project._id}`}
                  className="flex items-center w-full"
                >
                  <FaEye className="mr-2 h-4 w-4 text-green-500" />
                  View Details
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">
                <Link
                  href={`/projects/update-project/${project._id}`}
                  className="flex items-center w-full"
                >
                  <FaEdit className="mr-2 h-4 w-4 text-amber-500" />
                  Edit Project
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-100" />

              <DropdownMenuItem
                onClick={() => handleDeleteProject(project._id)}
                className="text-red-600 hover:bg-red-50 cursor-pointer"
              >
                <FaTrash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: projects,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Input
          placeholder="Search projects..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto border-gray-300 hover:bg-gray-50"
              >
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white border border-gray-200 shadow-lg"
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-gray-700 hover:bg-gray-50"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild>
            <Link href="/projects/create-project">Add Project</Link>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-gray-700 font-medium"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50 border-gray-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing {table.getRowModel().rows.length} of {projects.length}{" "}
          projects
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-gray-300 hover:bg-gray-50"
          >
            Previous
          </Button>
          <div className="flex items-center gap-1 text-sm text-gray-700">
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-gray-300 hover:bg-gray-50"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
