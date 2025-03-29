"use client";

import * as React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
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
import { toast } from "sonner";
import { IContact } from "@/types/user";
import { deleteContactById } from "@/service/Contacts";

export default function ManageMessages({ message }: { message: IContact[] }) {
  console.log(message[0]._id, message[0].email);
  const [data, setData] = React.useState<IContact[]>(message);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDeleteContact = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await deleteContactById(id);
      if (response?.success) {
        setData((prevData) => prevData.filter((contact) => contact._id !== id));
        toast.success("Message deleted successfully");
      } else {
        toast.error(response?.message || "Failed to delete message");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting the message");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<IContact>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <a
          href={`mailto:${row.getValue("email")}`}
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          {row.getValue("email")}
        </a>
      ),
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <div className="text-sm line-clamp-2 dark:text-gray-300">
          {row.getValue("message")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const contact = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                disabled={isDeleting}
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="dark:bg-gray-800 dark:border-gray-700"
            >
              <DropdownMenuLabel className="dark:text-gray-200">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(contact.message);
                  toast.success("Message copied to clipboard");
                }}
                className="cursor-pointer dark:hover:bg-gray-700"
              >
                <FaEye className="mr-2 h-4 w-4" />
                <span className="dark:text-gray-200">View & Copy</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteContact(contact._id)}
                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:hover:bg-gray-700"
                disabled={isDeleting}
              >
                <FaTrash className="mr-2 h-4 w-4" />
                <span className="dark:text-red-400">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
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
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter messages..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="dark:bg-gray-800 dark:border-gray-700"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize dark:hover:bg-gray-700"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  <span className="dark:text-gray-200">{column.id}</span>
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border dark:border-gray-700">
        <Table>
          <TableHeader className="dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="dark:border-gray-700">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="dark:text-gray-200">
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
                  className="dark:border-gray-700 dark:hover:bg-gray-800/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="dark:text-gray-300">
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
                  className="h-24 text-center dark:text-gray-300"
                >
                  No messages found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground dark:text-gray-400">
          Showing {table.getRowModel().rows.length} of {data.length} messages
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
