import classNames from "classnames";
import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponseGetSchool } from "@/src/api/response";
import { useSearchParams } from "next/navigation";
import { REQUEST } from "@/src/api/request";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import AdminLayout from "../../layouts/AdminLayout";
import { EyeIcon } from "../../UI/EyeIcon";
import { EditIcon } from "../../UI/EditIcon";
import { DeleteIcon } from "../../UI/DeleteIcon";
import { IoMdAdd } from "react-icons/io";
import {
  RequestAdminCreateSchool,
  RequestAdminDeleteSchool,
  RequestAdminUpdateSchool,
} from "@/src/api/request/admin/dto";

const AdminSchool = () => {
  const router = useRouter();
  const [schools, setSchools] = useState(new ResponseGetSchool());
  const [createSchool, setCreateSchool] = useState(
    new RequestAdminCreateSchool()
  );
  const [updateSchool, setUpdateSchool] = useState(
    new RequestAdminUpdateSchool()
  );
  const [deleteSchool, setDeleteSchool] = useState(
    new RequestAdminDeleteSchool()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const {
    isOpen: isOpenModalCreateSchool,
    onOpen: onOpenModalCreateSchool,
    onClose: onCloseModalCreateSchool,
  } = useDisclosure();
  const {
    isOpen: isOpenModalEditSchool,
    onOpen: onOpenModalEditSchool,
    onClose: onCloseModalEditSchool,
  } = useDisclosure();
  const {
    isOpen: isOpenModalDeleteSchool,
    onOpen: onOpenModalDeleteSchool,
    onClose: onCloseModalDeleteSchool,
  } = useDisclosure();

  const searchParams = useSearchParams();
  const order = searchParams.get("order") || "ASC";
  const limit = Number(searchParams.get("limit")) || 10;

  const columns = [
    {
      key: "no",
      label: "NO",
    },
    {
      key: "id",
      label: "ID",
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
  }, [limit, order, page, query, router, isLoading]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  const renderCell = React.useCallback(
    (
      item: {
        no: string;
        id: string;
        name: string;
      },
      columnKey: React.Key
    ) => {
      switch (columnKey) {
        case "no":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{item.no}</p>
            </div>
          );
        case "id":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{item.id}</p>
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
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleOpenDetails(item.id)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleOpenModalUpdateSchool(item.id)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleOpenModalDeleteSchool(item.id)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return "";
      }
    },
    []
  );

  const handleOpenModalCreateSchool = () => {
    onOpenModalCreateSchool();
  };

  const handleOpenModalUpdateSchool = (schoolId: string) => {
    setUpdateSchool({
      ...updateSchool,
      schoolId: schoolId,
    });
    onOpenModalEditSchool();
  };

  const handleOpenModalDeleteSchool = (schoolId: string) => {
    setDeleteSchool({
      schoolId: schoolId,
    });
    onOpenModalDeleteSchool();
  };

  const handleCreateSchool = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setCreateSchool({
      name: value,
    });
  };

  const handleUpdateNameSchool = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setUpdateSchool({
      ...updateSchool,
      name: value,
    });
  };

  const handleSubmitCreateSchool = () => {
    setIsLoading(true);
    REQUEST.ADMIN_CREATE_SCHOOL(createSchool)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalCreateSchool();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitUpdateSchool = (schoolId: string) => {
    setIsLoading(true);
    REQUEST.ADMIN_UPDATE_SCHOOL(updateSchool)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalEditSchool();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitDeleteSchool = (deleteSchool: RequestAdminDeleteSchool) => {
    setIsLoading(true);
    REQUEST.ADMIN_DELETE_SCHOOL(deleteSchool)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalEditSchool();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleOpenDetails = (schoolId: string) => {
    router.push(`/admin/school/${schoolId}`);
  };

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
              className="max-w-[40rem] transition-all pr-[1rem]"
            />
            <Pagination
              total={schools.meta.totalPages}
              initialPage={1}
              page={page}
              onChange={setPage}
            />
          </div>
          <div className={classNames(styles.method)}>
            <Button
              startContent={<IoMdAdd />}
              className="w-[100%]"
              onClick={handleOpenModalCreateSchool}
            >
              Add new school
            </Button>
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
        <Modal
          size={"xl"}
          isOpen={isOpenModalCreateSchool}
          onClose={onCloseModalCreateSchool}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create new school
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    color="primary"
                    label="Name"
                    variant="underlined"
                    onChange={handleCreateSchool}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSubmitCreateSchool}
                    isLoading={isLoading}
                  >
                    Create
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
          size={"xl"}
          isOpen={isOpenModalEditSchool}
          onClose={onCloseModalEditSchool}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit school
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    color="primary"
                    label="Name"
                    variant="underlined"
                    onChange={handleUpdateNameSchool}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() =>
                      handleSubmitUpdateSchool(updateSchool.schoolId)
                    }
                    isLoading={isLoading}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
          size={"xl"}
          isOpen={isOpenModalDeleteSchool}
          onClose={onCloseModalDeleteSchool}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete school
                </ModalHeader>
                <ModalBody>
                  {`Are you sure you want to delete this school? This action cannot be undone.`}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => handleSubmitDeleteSchool(deleteSchool)}
                    isLoading={isLoading}
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </AdminLayout>
    </div>
  );
};

export default AdminSchool;
