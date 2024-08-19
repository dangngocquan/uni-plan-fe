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
import { IoMdAdd } from "react-icons/io";
import MainLayout from "../layouts/MainLayout";
import { EyeIcon } from "../UI/EyeIcon";
import { EditIcon } from "../UI/EditIcon";
import { DeleteIcon } from "../UI/DeleteIcon";
import { ResponseGetPlan } from "@/src/api/response/plan";
import { getUserAccessToken } from "@/src/utils/sessionStorage";
import {
  RequestCreatePlan,
  RequestDeletePlan,
  RequestUpdatePlan,
} from "@/src/api/request/plan/dto";
import Loading from "../Loading";

const Plan = () => {
  const router = useRouter();
  const [plans, setPlans] = useState(new ResponseGetPlan());
  const [createPlan, setCreatePlan] = useState(new RequestCreatePlan());
  const [updatePlan, setUpdatePlan] = useState(new RequestUpdatePlan());
  const [deletePlan, setDeletePlan] = useState(new RequestDeletePlan());
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const {
    isOpen: isOpenModalCreatePlan,
    onOpen: onOpenModalCreatePlan,
    onClose: onCloseModalCreatePlan,
  } = useDisclosure();
  const {
    isOpen: isOpenModalEditPlan,
    onOpen: onOpenModalEditPlan,
    onClose: onCloseModalEditPlan,
  } = useDisclosure();
  const {
    isOpen: isOpenModalDeletePlan,
    onOpen: onOpenModalDeletePlan,
    onClose: onCloseModalDeletePlan,
  } = useDisclosure();

  const searchParams = useSearchParams();
  const order = searchParams.get("order") || "ASC";
  const limit = Number(searchParams.get("limit")) || 10;

  const columns = [
    {
      key: "no",
      label: "NO",
    },
    // {
    //   key: "id",
    //   label: "ID",
    // },
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "createdAt",
      label: "CREATED AT",
    },
    {
      key: "actions",
      label: "ACTIONS",
    },
  ];

  useEffect(() => {
    if (!getUserAccessToken()) {
      router.push("/auth/signin");
    } else {
      REQUEST.GET_PLANS({ order: order, limit: limit, page: page, q: query })
        // .then((res) => res.json())
        .then((data: ResponseGetPlan) => {
          setPlans(data);
        });
      setIsLoading(false);
    }
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
        key: string;
        no: string;
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        ownerId: string;
        status: string;
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
        // case "id":
        //   return (
        //     <div className="flex flex-col">
        //       <p className="text-bold text-sm capitalize">{item.id}</p>
        //     </div>
        //   );
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{item.name}</p>
            </div>
          );
        case "createdAt":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {new Date(item.createdAt).toUTCString()}
              </p>
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
                  onClick={() => handleOpenModalUpdatePlan(item.id)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleOpenModalDeletePlan(item.id)}
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

  const handleOpenModalCreatePlan = () => {
    router.push("/plan/new");
  };

  const handleOpenModalUpdatePlan = (id: string) => {
    setUpdatePlan({
      ...updatePlan,
      planId: id,
    });
    onOpenModalEditPlan();
  };

  const handleOpenModalDeletePlan = (id: string) => {
    setDeletePlan({
      planId: id,
    });
    onOpenModalDeletePlan();
  };

  const handleCreatePlan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setCreatePlan({
      name: value,
    });
  };

  const handleUpdatePlan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setUpdatePlan({
      ...updatePlan,
      name: value,
    });
  };

  const handleSubmitCreatePlan = () => {
    setIsLoading(true);
    REQUEST.CREATE_PLAN(createPlan)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalCreatePlan();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitUpdatePlan = () => {
    setIsLoading(true);
    REQUEST.UPDATE_PLAN(updatePlan)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalEditPlan();
        router.reload();
      })
      .catch((error: any) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  const handleSubmitDeletePlan = () => {
    setIsLoading(true);
    REQUEST.DELETE_PLAN(deletePlan)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalDeletePlan();
        router.reload();
      })
      .catch((error: any) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  const handleOpenDetails = (id: string) => {
    router.push(`/plan/detail/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <MainLayout>
        <div className={classNames(styles.wrapper)}>
          <div className={classNames(styles.filter)}>
            <Input
              type="text"
              color="primary"
              variant="bordered"
              placeholder="Search your plans ..."
              onChange={handleSearch}
              startContent={<FaSearch />}
              className="max-w-[40rem] transition-all pr-[1rem]"
            />
            <Pagination
              total={plans?.meta?.totalPages || 0}
              initialPage={1}
              page={page}
              onChange={setPage}
            />
          </div>
          <div className={classNames(styles.method)}>
            <Button
              startContent={<IoMdAdd />}
              className="w-[100%]"
              onClick={handleOpenModalCreatePlan}
            >
              Add new plan
            </Button>
          </div>
          <div className={classNames(styles.schools)}>
            <Table aria-label="Example table content">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody
                emptyContent={"No rows to display."}
                items={plans.items.map((item, index) => {
                  return {
                    key: `${index + 1}`,
                    no: `${index + 1}`,
                    ...item,
                    createdAt: item.createdAt.toString(),
                    updatedAt: item.updatedAt.toString(),
                  };
                })}
              >
                {(item) => (
                  <TableRow key={item.id}>
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
          isOpen={isOpenModalCreatePlan}
          onClose={onCloseModalCreatePlan}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create new plan
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    color="primary"
                    label="Name"
                    variant="underlined"
                    onChange={handleCreatePlan}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSubmitCreatePlan}
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
          isOpen={isOpenModalEditPlan}
          onClose={onCloseModalEditPlan}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit plan
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    color="primary"
                    label="Name"
                    variant="underlined"
                    onChange={handleUpdatePlan}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => handleSubmitUpdatePlan()}
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
          isOpen={isOpenModalDeletePlan}
          onClose={onCloseModalDeletePlan}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete plan
                </ModalHeader>
                <ModalBody>
                  {`Are you sure you want to delete this plan? This action cannot be undone.`}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => handleSubmitDeletePlan()}
                    isLoading={isLoading}
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </MainLayout>
    </div>
  );
};

export default Plan;
