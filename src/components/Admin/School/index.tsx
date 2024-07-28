import classNames from "classnames";
import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponseGetSchool } from "@/src/api/response";
import { useSearchParams } from "next/navigation";
import { REQUEST } from "@/src/api/request";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  getKeyValue,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { IoSchool } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import AdminLayout from "../../layouts/AdminLayout";
import { EyeIcon } from "../../UI/EyeIcon";
import { EditIcon } from "../../UI/EditIcon";
import { DeleteIcon } from "../../UI/DeleteIcon";

const AdminSchool = () => {
  const router = useRouter();
  const [schools, setSchools] = useState(new ResponseGetSchool());
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const order = searchParams.get("order") || "ASC";
  const limit = Number(searchParams.get("limit")) || 10;

  const columns = [
    {
      key: "no",
      label: "NO",
    },
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "actions",
      label: "ACTIONS",
    },
  ];

  useEffect(() => {
    REQUEST.GET_SCHOOL({ order: order, limit: limit, page: page, q: query })
      .then((res) => res.json())
      .then((schools: ResponseGetSchool) => {
        setSchools(schools);
      });
  }, [limit, order, page, query, router]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  const renderCell = React.useCallback((item: {
    no: string,
    name: string,
  }, columnKey: React.Key) => {
    switch (columnKey) {
      case "no":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{item.no}</p>
          </div>
        );
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{item.name}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return "";
    }
  }, []);

  return (
    <div>
      <AdminLayout>
        <div className={classNames(styles.wrapper)}>
          <div className={classNames(styles.filter)}>
            <Input
              type="text"
              color="primary"
              variant="bordered"
              placeholder="Search schools ..."
              onChange={handleSearch}
              startContent={<FaSearch />}
              className="max-w-[40rem] transition-all"
            />
            <Pagination
              total={schools.meta.totalPages}
              initialPage={1}
              page={page}
              onChange={setPage}
            />
          </div>
          <div className={classNames(styles.schools)}>
            <Table aria-label="Example table with dynamic content">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody
                emptyContent={"No rows to display."}
                items={schools.items.map((item, index) => {
                  return {
                    key: `${index + 1}`,
                    no: `${index + 1}`,
                    ...item,
                  };
                })}
              >
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminSchool;
