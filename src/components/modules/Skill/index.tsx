"use client";

import * as React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
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
import { ISkill } from "@/types/type";
import { Badge } from "@/components/ui/badge";
import { deleteSkillById } from "@/service/skill";

const renderHtml = (html: string | undefined) => {
  if (!html) return null;
  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className="[&>strong]:font-bold [&>em]:italic [&>u]:underline [&>a]:text-emerald-600 [&>a]:underline [&>a:hover]:text-emerald-800"
    />
  );
};

export default function ManageSkills({ skills }: { skills: ISkill[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDeleteSkill = async (id: string) => {
    try {
      const response = await deleteSkillById(id);
      if (response?.success) {
        toast.success("Skill deleted successfully");
      } else {
        toast.error(response?.error?.[0]?.message || "Failed to delete skill");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  const columns: ColumnDef<ISkill>[] = [
    {
      accessorKey: "icon",
      header: "Icon",
      cell: ({ row }) => {
        const icon = row.original.icon;
        const isValidUrl = (url: string) => {
          try {
            new URL(url);
            return true;
          } catch {
            return false;
          }
        };

        return (
          <div className="w-10 h-10 overflow-hidden rounded-lg flex items-center justify-center">
            {icon && isValidUrl(icon) ? (
              <Image
                src={icon}
                width={40}
                height={40}
                alt="Skill icon"
                className="object-contain w-full h-full"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg">
                <span className="text-xs">No Icon</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Skill Name",
      cell: ({ row }) => (
        <div className="font-medium">
          <Link
            href={`/skill/${row.original._id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {row.getValue("name")}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-sm text-gray-600 line-clamp-2">
          {renderHtml(row.getValue("description"))}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        const categoryColors = {
          frontend: "bg-blue-100 text-blue-800",
          backend: "bg-green-100 text-green-800",
          devops: "bg-purple-100 text-purple-800",
          tools: "bg-amber-100 text-amber-800",
          softSkills: "bg-pink-100 text-pink-800",
          others: "bg-gray-100 text-gray-800",
        };

        return (
          <Badge
            className={`capitalize ${
              categoryColors[category as keyof typeof categoryColors] ||
              categoryColors.others
            }`}
          >
            {category}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const skill = row.original;
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
                Skill Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-100" />

              <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">
                <Link
                  href={`/skill/${skill._id}`}
                  className="flex items-center w-full"
                >
                  <FaEye className="mr-2 h-4 w-4 text-green-500" />
                  View Details
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">
                <Link
                  href={`/skill/update-skill/${skill._id}`}
                  className="flex items-center w-full"
                >
                  <FaEdit className="mr-2 h-4 w-4 text-amber-500" />
                  Edit Skill
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-100" />

              <DropdownMenuItem
                onClick={() => handleDeleteSkill(skill._id)}
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
    data: skills,
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
          placeholder="Search skills..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
            <Link href="/skill/create-skill">Add Skill</Link>
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
            {table.getRowModel().rows?.length ? (
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
                  No skills found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing {table.getRowModel().rows.length} of {skills.length} skills
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
