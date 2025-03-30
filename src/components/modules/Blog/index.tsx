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
import { IBlog } from "@/types/type";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteBlogById } from "@/service/Blog";

export default function ManageBlogs({ blogs }: { blogs: IBlog[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDeleteBlog = async (id: string) => {
    try {
      const response = await deleteBlogById(id);
      if (response?.success) {
        toast.success("Blog deleted successfully");
        // You might want to refresh the data here
      } else {
        toast.error(response?.error?.[0]?.message || "Failed to delete blog");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  const columns: ColumnDef<IBlog>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const image = row.original.image;

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
            {image && isValidUrl(image) ? (
              <Image
                src={image}
                width={64}
                height={64}
                alt="Blog thumbnail"
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
      header: "Blog Title",
      cell: ({ row }) => (
        <div className="font-medium">
          <Link
            href={`/blogs/${row.original._id}`}
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
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => (
        <div className="text-sm text-gray-700">{row.getValue("author")}</div>
      ),
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const tags = row.original.tags || []; // Fallback to empty array if undefined
        const visibleTags = tags.slice(0, 3);
        return (
          <div className="flex flex-wrap gap-1">
            {visibleTags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs px-2 py-0.5 border-gray-200 text-gray-700"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-0.5 border-gray-200"
                    >
                      +{tags.length - 3}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border shadow-lg p-2">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {tags.slice(3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs px-2 py-0.5 border-gray-200"
                        >
                          {tag}
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
        const status = row.original.isDeleted ? "deleted" : "published";
        return (
          <Badge
            variant="outline"
            className={`text-xs capitalize ${
              status === "published"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const blog = row.original;
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
                Blog Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-100" />

              <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">
                <Link
                  href={`/blogs/${blog._id}`}
                  className="flex items-center w-full"
                >
                  <FaEye className="mr-2 h-4 w-4 text-green-500" />
                  View Details
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">
                <Link
                  href={`/blogs/update-blog/${blog._id}`}
                  className="flex items-center w-full"
                >
                  <FaEdit className="mr-2 h-4 w-4 text-amber-500" />
                  Edit Blog
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-100" />

              <DropdownMenuItem
                onClick={() => handleDeleteBlog(blog._id)}
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
    data: blogs,
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
          placeholder="Search blogs..."
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
            <Link href="/blogs/create-blog">Add Blog</Link>
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
                  No blogs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing {table.getRowModel().rows.length} of {blogs.length} blogs
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
