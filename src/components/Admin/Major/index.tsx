import classNames from "classnames";
import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  RequestAdminCreateMajor,
  RequestAdminDeleteMajor,
  RequestAdminUpdateMajor,
} from "@/src/api/request/admin/dto";
import { ResponseGetMajor } from "@/src/api/response/major";

const AdminMajor = (props: { schoolId: string | null }) => {
  const router = useRouter();
  const [Majors, setMajors] = useState(new ResponseGetMajor());
  const [createMajor, setCreateMajor] = useState(new RequestAdminCreateMajor());
  const [updateMajor, setUpdateMajor] = useState(new RequestAdminUpdateMajor());
  const [deleteMajor, setDeleteMajor] = useState(new RequestAdminDeleteMajor());
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const {
    isOpen: isOpenModalCreateMajor,
    onOpen: onOpenModalCreateMajor,
    onClose: onCloseModalCreateMajor,
  } = useDisclosure();
  const {
    isOpen: isOpenModalEditMajor,
    onOpen: onOpenModalEditMajor,
    onClose: onCloseModalEditMajor,
  } = useDisclosure();
  const {
    isOpen: isOpenModalDeleteMajor,
    onOpen: onOpenModalDeleteMajor,
    onClose: onCloseModalDeleteMajor,
  } = useDisclosure();

  const searchParams = useSearchParams();
  const order = searchParams.get("order") || "ASC";
  const limit = Number(searchParams.get("limit")) || 10;
  const schoolId = props.schoolId
    ? String(props.schoolId)
    : searchParams.get("schoolId");

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
    { key: "schoolId", label: "SCHOOL ID" },
    {
      key: "actions",
      label: "ACTIONS",
    },
  ];

  useEffect(() => {
    REQUEST.GET_MAJORS({
      order: order,
      limit: limit,
      page: page,
      q: query,
      schoolId: schoolId,
    })
      .then((res) => res.json())
      .then((Majors: ResponseGetMajor) => {
        setMajors(Majors);
      });
  }, [limit, order, page, query, router, isLoading, schoolId]);

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
        schoolId: string;
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
        case "schoolId":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{item.schoolId}</p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleSubmitMajorDetails(item.id)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleOpenModalUpdateMajor(item.id)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleOpenModalDeleteMajor(item.id)}
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

  const handleOpenModalCreateMajor = () => {
    onOpenModalCreateMajor();
  };

  const handleOpenModalUpdateMajor = (majorId: string) => {
    setUpdateMajor({
      ...updateMajor,
      majorId: majorId,
    });
    onOpenModalEditMajor();
  };

  const handleOpenModalDeleteMajor = (majorId: string) => {
    setDeleteMajor({
      majorId: majorId,
    });
    onOpenModalDeleteMajor();
  };

  const handleCreateMajor = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target as HTMLInputElement;
    if (field === "name") {
      setCreateMajor({
        ...createMajor,
        name: value,
      });
    } else if (field === "schoolId") {
      setCreateMajor({
        ...createMajor,
        schoolId: value,
      });
    }
  };

  const handleUpdateMajor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setUpdateMajor({
      ...updateMajor,
      name: value,
    });
  };

  const handleSubmitCreateMajor = () => {
    setIsLoading(true);
    REQUEST.ADMIN_CREATE_MAJOR(createMajor)

      .then((data: any) => {
        setIsLoading(false);
        onCloseModalCreateMajor();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitUpdateMajor = () => {
    setIsLoading(true);
    REQUEST.ADMIN_UPDATE_MAJOR(updateMajor)

      .then((data: any) => {
        setIsLoading(false);
        onCloseModalEditMajor();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitDeleteMajor = (deleteMajor: RequestAdminDeleteMajor) => {
    setIsLoading(true);
    REQUEST.ADMIN_DELETE_MAJOR(deleteMajor)

      .then((data: any) => {
        setIsLoading(false);
        onCloseModalDeleteMajor();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitMajorDetails = (majorId: string) => {
    router.push(`/admin/major/${majorId}`);
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
              placeholder="Search Majors ..."
              onChange={handleSearch}
              startContent={<FaSearch />}
              className="max-w-[40rem] transition-all pr-[1rem]"
            />
            <Pagination
              total={Majors.meta.totalPages}
              initialPage={1}
              page={page}
              onChange={setPage}
            />
          </div>
          <div className={classNames(styles.method)}>
            <Button
              startContent={<IoMdAdd />}
              className="w-[100%]"
              onClick={handleOpenModalCreateMajor}
            >
              Add new Major
            </Button>
          </div>
          <div className={classNames(styles.majors)}>
            <Table aria-label="Example table with dynamic content">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody
                emptyContent={"No rows to display."}
                items={Majors.items.map((item, index) => {
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
          isOpen={isOpenModalCreateMajor}
          onClose={onCloseModalCreateMajor}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create new Major
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    color="primary"
                    label="Name"
                    variant="underlined"
                    onChange={(e) => handleCreateMajor(e, "name")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="School ID"
                    variant="underlined"
                    onChange={(e) => handleCreateMajor(e, "schoolId")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSubmitCreateMajor}
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
          isOpen={isOpenModalEditMajor}
          onClose={onCloseModalEditMajor}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Major
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    color="primary"
                    label="Name"
                    variant="underlined"
                    onChange={handleUpdateMajor}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSubmitUpdateMajor}
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
          isOpen={isOpenModalDeleteMajor}
          onClose={onCloseModalDeleteMajor}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete Major
                </ModalHeader>
                <ModalBody>
                  {`Are you sure you want to delete this Major? This action cannot be undone.`}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => handleSubmitDeleteMajor(deleteMajor)}
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

export default AdminMajor;
