import classNames from "classnames";
import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { REQUEST } from "@/src/api/request";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import AdminLayout from "../../layouts/AdminLayout";
import { EditIcon } from "../../UI/EditIcon";
import { DeleteIcon } from "../../UI/DeleteIcon";
import { IoMdAdd } from "react-icons/io";
import {
  RequestAdminCreateCourse,
  RequestAdminCreateCourseRelation,
  RequestAdminCreateGroupCourse,
  RequestAdminDeleteCourse,
  RequestAdminDeleteCourseRelation,
  RequestAdminDeleteGroupCourse,
  RequestAdminUpdateCourse,
  RequestAdminUpdateCourseRelation,
  RequestAdminUpdateGroupCourse,
} from "@/src/api/request/admin/dto";
import { ResponseMajorDetail } from "@/src/api/response/major";
import { NO_I } from "@/src/utils/helper";
import { ResponseGroupCourseDetails } from "@/src/api/response";
import { AddIcon } from "../../UI/AddIcon";
import { AddIconCircle } from "../../UI/AddIconCircle";
import { GroupCourseType } from "@/src/utils/enums";
import { requestWithRefreshTokens } from "@/src/api/request/admin/admin";

const AdminMajorDetails = (props: { majorId: string | null }) => {
  const router = useRouter();
  const [tableData, setTableData] = useState<Array<any>>();
  const [createGroup, setCreateGroup] = useState(
    new RequestAdminCreateGroupCourse()
  );
  const [updateGroup, setUpdateGroup] = useState(
    new RequestAdminUpdateGroupCourse()
  );
  const [deleteGroup, setDeleteGroup] = useState(
    new RequestAdminDeleteGroupCourse()
  );
  const [createChildCourse, setCreateChildCourse] = useState(
    new RequestAdminCreateCourse()
  );
  const [createChildGroup, setCreateChildGroup] = useState(
    new RequestAdminCreateGroupCourse()
  );
  const [updateCourse, setUpdateCourse] = useState(
    new RequestAdminUpdateCourse()
  );
  const [deleteCourse, setDeleteCourse] = useState(
    new RequestAdminDeleteCourse()
  );
  const [createCourseRelation, setCreateCourseRelation] = useState(
    new RequestAdminCreateCourseRelation()
  );
  const [updateCourseRelation, setUpdateCourseRelation] = useState(
    new RequestAdminUpdateCourseRelation()
  );
  const [deleteCourseRelation, setDeleteCourseRelation] = useState(
    new RequestAdminDeleteCourseRelation()
  );
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpen: isOpenModalCreateGroup,
    onOpen: onOpenModalCreateGroup,
    onClose: onCloseModalCreateGroup,
  } = useDisclosure();
  const {
    isOpen: isOpenModalEditGroup,
    onOpen: onOpenModalEditGroup,
    onClose: onCloseModalEditGroup,
  } = useDisclosure();
  const {
    isOpen: isOpenModalDeleteGroup,
    onOpen: onOpenModalDeleteGroup,
    onClose: onCloseModalDeleteGroup,
  } = useDisclosure();
  const {
    isOpen: isOpenModalCreateChildCourse,
    onOpen: onOpenModalCreateChildCourse,
    onClose: onCloseModalCreateChildCourse,
  } = useDisclosure();
  const {
    isOpen: isOpenModalCreateChildGroup,
    onOpen: onOpenModalCreateChildGroup,
    onClose: onCloseModalCreateChildGroup,
  } = useDisclosure();
  const {
    isOpen: isOpenModalUpdateCourse,
    onOpen: onOpenModalUpdateCourse,
    onClose: onCloseModalUpdateCourse,
  } = useDisclosure();
  const {
    isOpen: isOpenModalDeleteCourse,
    onOpen: onOpenModalDeleteCourse,
    onClose: onCloseModalDeleteCourse,
  } = useDisclosure();
  const {
    isOpen: isOpenModalCreateCourseRelation,
    onOpen: onOpenModalCreateCourseRelation,
    onClose: onCloseModalCreateCourseRelation,
  } = useDisclosure();
  const {
    isOpen: isOpenModalUpdateCourseRelation,
    onOpen: onOpenModalUpdateCourseRelation,
    onClose: onCloseModalUpdateCourseRelation,
  } = useDisclosure();
  const {
    isOpen: isOpenModalDeleteCourseRelation,
    onOpen: onOpenModalDeleteCourseRelation,
    onClose: onCloseModalDeleteCourseRelation,
  } = useDisclosure();

  const searchParams = useSearchParams();

  const majorId = props.majorId
    ? String(props.majorId)
    : searchParams.get("majorId") || "";

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
      key: "code",
      label: "CODE",
    },
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "credits",
      label: "CREDITS",
    },
    {
      key: "prereq",
      label: "PREREQ COURSE CODE",
    },
    {
      key: "actions",
      label: "ACTIONS",
    },
  ];

  useEffect(() => {
    REQUEST.GET_MAJOR_DETAILS(props.majorId || "")
      .then((res) => res.json())
      .then((majorDetails: ResponseMajorDetail) => {
        const list: Array<any> = [];
        let countMainGroup = 0;
        let tempCountChildGroup = 0;
        let countCourse = 1;
        const solveGroup = (
          groupData: ResponseGroupCourseDetails,
          round: number
        ) => {
          list.push({
            isGroup: true,
            no:
              round == 1
                ? NO_I[countMainGroup]
                : `${NO_I[countMainGroup]}.${tempCountChildGroup + 1}`,
            id: groupData.id,
            group: {
              type: groupData.type,
              minCredits: groupData.minCredits,
              minCourses: groupData.minCourses,
              minGroups: groupData.minGroups,
              title: groupData.title,
              description: groupData.description,
              level: groupData.level,
            },
            course: {},
          });
          for (const course of groupData.courses) {
            list.push({
              isGroup: false,
              no: countCourse,
              id: course.id,
              group: {},
              course: {
                code: course.code,
                name: course.name,
                credits: course.credits,
                prereqCourseRelations: course.prereqCourseRelations.map((e) => {
                  return {
                    id: e.id,
                    prereqCourseCode: e.prereqCourseCode,
                  };
                }),
              },
            });
            countCourse += 1;
          }
          for (const childGroup of groupData.children) {
            solveGroup(childGroup, round + 1);
            tempCountChildGroup += 1;
          }
          if (round == 1) {
            tempCountChildGroup = 0;
            countMainGroup += 1;
          }
        };

        for (const groupData of majorDetails.groupCourses) {
          solveGroup(groupData, 1);
        }
        console.log(list);
        setTableData(list);
      });
  }, [props.majorId]);

  const renderCell = React.useCallback(
    (
      item: {
        isGroup: boolean;
        no: string;
        id: string;
        group: {
          type: string;
          minCredits: number;
          minCourses: number;
          minGroups: number;
          title: string;
          description: string;
          level: number;
        };
        course: {
          code: string;
          name: string;
          credits: number;
          prereqCourseRelations: {
            id: string;
            prereqCourseCode: string;
          }[];
        };
      },
      columnKey: React.Key
    ) => {
      switch (columnKey) {
        case "no":
          return (
            <div className="flex flex-col">
              <p
                className="text-bold text-sm"
                style={item.isGroup ? { fontWeight: 700 } : {}}
              >
                {item.no}
              </p>
            </div>
          );
        case "id":
          return (
            <div className="flex flex-col">
              <p
                className="text-bold text-sm"
                style={
                  item.isGroup
                    ? { fontWeight: 900 - Number(item.group.level) * 100 }
                    : {}
                }
              >
                {item.id}
              </p>
            </div>
          );
        case "code":
          return (
            <div className="flex flex-col">
              <p
                className="text-bold text-sm"
                style={
                  item.isGroup
                    ? { fontWeight: 900 - Number(item.group.level) * 100 }
                    : {}
                }
              >
                {item.course.code}
              </p>
            </div>
          );
        case "name":
          return (
            <div className="flex flex-col">
              <p
                className="text-bold text-sm"
                style={
                  item.isGroup
                    ? { fontWeight: 900 - Number(item.group.level) * 100 }
                    : {}
                }
              >
                {item.course.name ||
                  `${item.group.title} (${item.group.description})`}
              </p>
            </div>
          );
        case "credits":
          return (
            <div className="flex flex-col">
              <p
                className="text-bold text-sm"
                style={
                  item.isGroup
                    ? { fontWeight: 900 - Number(item.group.level) * 100 }
                    : {}
                }
              >
                {item.isGroup ? item.group.minCredits : item.course.credits}
              </p>
            </div>
          );
        case "prereq":
          return (
            <div className="flex flex-col">
              <p
                className="text-bold text-sm"
                style={
                  item.isGroup
                    ? { fontWeight: 900 - Number(item.group.level) * 100 }
                    : {}
                }
              >
                {item.isGroup ? (
                  ""
                ) : (
                  <>
                    {item.course.prereqCourseRelations.map((e) => (
                      <div
                        key={`prereq${item.id}-${e.prereqCourseCode}`}
                        className="flex justify-around"
                      >
                        {e.prereqCourseCode}
                        <Tooltip content="Edit prereq code">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() =>
                              item.isGroup
                                ? null
                                : handleOpenModalUpdateCourseRelation(e.id)
                            }
                          >
                            <EditIcon />
                          </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete prereq code">
                          <span
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                            onClick={() =>
                              item.isGroup
                                ? null
                                : handleOpenModalDeleteCourseRelation(e.id)
                            }
                          >
                            <DeleteIcon />
                          </span>
                        </Tooltip>
                      </div>
                    ))}
                    <Button
                      startContent={<IoMdAdd />}
                      className="w-[100%] h-[80%] mt-[0.2rem]"
                      onClick={() =>
                        handleOpenModalCreateCourseRelation(item.id)
                      }
                    >
                      Add more
                    </Button>
                  </>
                )}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() =>
                    item.isGroup
                      ? handleOpenModalUpdateGroup(item.id)
                      : handleOpenModalUpdateCourse(item.id)
                  }
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() =>
                    item.isGroup
                      ? handleOpenModalDeleteGroup(item.id)
                      : handleOpenModalDeleteCourse(item.id)
                  }
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
              {item.isGroup && (
                <Tooltip color="success" content="Add Child Course">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() => handleOpenModalCreateChildCourse(item.id)}
                  >
                    <AddIcon />
                  </span>
                </Tooltip>
              )}
              {item.isGroup && (
                <Tooltip color="success" content="Add Child Group Course">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() =>
                      handleOpenModalCreateChildGroup(item.id, item.group.level)
                    }
                  >
                    <AddIconCircle />
                  </span>
                </Tooltip>
              )}
            </div>
          );
        default:
          return "";
      }
    },
    []
  );

  // HANDLE CONTROLL MODALS
  const handleOpenModalCreateGroup = () => {
    onOpenModalCreateGroup();
  };

  const handleOpenModalUpdateGroup = (groupCourseId: string) => {
    setUpdateGroup({
      ...updateGroup,
      groupCourseId: groupCourseId,
    });
    onOpenModalEditGroup();
  };

  const handleOpenModalDeleteGroup = (groupCourseId: string) => {
    setDeleteGroup({
      groupCourseId: groupCourseId,
    });
    onOpenModalDeleteGroup();
  };

  const handleOpenModalCreateChildCourse = (groupCourseId: string) => {
    setCreateChildCourse({
      ...createChildCourse,
      groupId: groupCourseId,
    });
    onOpenModalCreateChildCourse();
  };

  const handleOpenModalCreateChildGroup = (
    parentGroupId: string,
    parentGroupLevel: number
  ) => {
    setCreateChildGroup({
      ...createChildGroup,
      parentGroupId: parentGroupId,
      level: Number(parentGroupLevel) + 1,
    });
    onOpenModalCreateChildGroup();
  };

  const handleOpenModalUpdateCourse = (courseId: string) => {
    setUpdateCourse({
      ...updateCourse,
      courseId: courseId,
    });
    onOpenModalUpdateCourse();
  };

  const handleOpenModalDeleteCourse = (courseId: string) => {
    setDeleteCourse({
      courseId: courseId,
    });
    onOpenModalDeleteCourse();
  };

  const handleOpenModalCreateCourseRelation = (courseId: string) => {
    setCreateCourseRelation({
      ...createCourseRelation,
      courseId: courseId,
    });
    onOpenModalCreateCourseRelation();
  };

  const handleOpenModalUpdateCourseRelation = (courseRelationId: string) => {
    setUpdateCourseRelation({
      ...updateCourseRelation,
      courseRelationId: courseRelationId,
    });
    onOpenModalUpdateCourseRelation();
  };

  const handleOpenModalDeleteCourseRelation = (courseRelationId: string) => {
    setDeleteCourseRelation({
      courseRelationId: courseRelationId,
    });
    onOpenModalDeleteCourseRelation();
  };

  // HANDLE MODIFY DATA

  const handleCreateGroupCourse = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target as HTMLInputElement;
    if (field === "type") {
      setCreateGroup({
        ...createGroup,
        type: value as GroupCourseType,
        majorId: majorId,
      });
    } else if (field === "minCredits") {
      setCreateGroup({
        ...createGroup,
        minCredits: Number(value) || 0,
        majorId: majorId,
      });
    } else if (field === "minCourses") {
      setCreateGroup({
        ...createGroup,
        minCourses: Number(value) || 0,
        majorId: majorId,
      });
    } else if (field === "minGroups") {
      setCreateGroup({
        ...createGroup,
        minGroups: Number(value) || 0,
        majorId: majorId,
      });
    } else if (field === "title") {
      setCreateGroup({
        ...createGroup,
        title: value,
        majorId: majorId,
      });
    } else if (field === "description") {
      setCreateGroup({
        ...createGroup,
        description: value,
        majorId: majorId,
      });
    }
  };

  const handleUpdateGroup = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target as HTMLInputElement;
    if (field === "minCredits") {
      setUpdateGroup({
        ...updateGroup,
        minCredits: Number(value) || 0,
      });
    } else if (field === "minCourses") {
      setUpdateGroup({
        ...updateGroup,
        minCourses: Number(value) || 0,
      });
    } else if (field === "minGroups") {
      setUpdateGroup({
        ...updateGroup,
        minGroups: Number(value) || 0,
      });
    } else if (field === "title") {
      setUpdateGroup({
        ...updateGroup,
        title: value,
      });
    } else if (field === "description") {
      setUpdateGroup({
        ...updateGroup,
        description: value,
      });
    }
  };

  const handleCreateChildCourse = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target as HTMLInputElement;
    if (field === "code") {
      setCreateChildCourse({
        ...createChildCourse,
        code: value,
      });
    } else if (field === "name") {
      setCreateChildCourse({
        ...createChildCourse,
        name: value,
      });
    } else if (field === "credits") {
      setCreateChildCourse({
        ...createChildCourse,
        credits: Number(value) || 1,
      });
    }
  };

  const handleUpdateCourse = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target as HTMLInputElement;
    if (field === "code") {
      setUpdateCourse({
        ...updateCourse,
        code: value,
      });
    } else if (field === "name") {
      setUpdateCourse({
        ...updateCourse,
        name: value,
      });
    } else if (field === "credits") {
      setUpdateCourse({
        ...updateCourse,
        credits: Number(value) || 1,
      });
    }
  };

  const handleCreateChildGroup = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target as HTMLInputElement;
    if (field === "type") {
      setCreateChildGroup({
        ...createChildGroup,
        type: value as GroupCourseType,
        majorId: majorId,
      });
    } else if (field === "minCredits") {
      setCreateChildGroup({
        ...createChildGroup,
        minCredits: Number(value) || 0,
        majorId: majorId,
      });
    } else if (field === "minCourses") {
      setCreateChildGroup({
        ...createChildGroup,
        minCourses: Number(value) || 0,
        majorId: majorId,
      });
    } else if (field === "minGroups") {
      setCreateChildGroup({
        ...createChildGroup,
        minGroups: Number(value) || 0,
        majorId: majorId,
      });
    } else if (field === "title") {
      setCreateChildGroup({
        ...createChildGroup,
        title: value,
        majorId: majorId,
      });
    } else if (field === "description") {
      setCreateChildGroup({
        ...createChildGroup,
        description: value,
        majorId: majorId,
      });
    }
  };

  const handleCreateCourseRelation = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target as HTMLInputElement;
    if (field === "prereqCourseCode") {
      setCreateCourseRelation({
        ...createCourseRelation,
        prereqCourseCode: value,
      });
    }
  };

  const handleUpdateCourseRelation = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target as HTMLInputElement;
    if (field === "prereqCourseCode") {
      setUpdateCourseRelation({
        ...updateCourseRelation,
        prereqCourseCode: value,
      });
    }
  };

  // SUBMIT
  const handleSubmitCreateGroup = async () => {
    setIsLoading(true);
    await REQUEST.ADMIN_CREATE_GROUP_COURSE(createGroup)

      .then((data: any) => {
        setIsLoading(false);
        onCloseModalCreateGroup();
        if (!data.message) {
          router.reload();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitUpdateGroup = () => {
    setIsLoading(true);
    REQUEST.ADMIN_UPDATE_GROUP_COURSE(updateGroup)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalEditGroup();
        if (!data.message) {
          router.reload();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitDeleteGroup = (
    deleteGroup: RequestAdminDeleteGroupCourse
  ) => {
    setIsLoading(true);
    REQUEST.ADMIN_DELETE_GROUP_COURSE(deleteGroup)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalDeleteGroup();
        if (!data.message) {
          router.reload();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitCreateChildCourse = async () => {
    setIsLoading(true);
    await REQUEST.ADMIN_CREATE_COURSE(createChildCourse)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalCreateChildCourse();
        if (!data.message) {
          router.reload();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitUpdateCourse = async () => {
    setIsLoading(true);
    await REQUEST.ADMIN_UPDATE_COURSE(updateCourse)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalUpdateCourse();
        if (!data.message) {
          router.reload();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitCreateChildGroup = async () => {
    setIsLoading(true);
    await REQUEST.ADMIN_CREATE_GROUP_COURSE(createChildGroup)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalCreateChildGroup();
        if (!data.message) {
          router.reload();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitDeleteCourse = () => {
    setIsLoading(true);
    REQUEST.ADMIN_DELETE_COURSE(deleteCourse)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalDeleteCourse();
        if (!data.message) {
          router.reload();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitCreateCourseRelation = () => {
    setIsLoading(true);
    REQUEST.ADMIN_CREATE_COURSE_RELATION(createCourseRelation)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalCreateCourseRelation();
        if (!data.message) {
          router.reload();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitUpdateCourseRelation = () => {
    setIsLoading(true);
    REQUEST.ADMIN_UPDATE_COURSE_RELATION(updateCourseRelation)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalUpdateCourseRelation();
        if (!data.message) {
          router.reload();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitDeleteCourseRelation = () => {
    setIsLoading(true);
    REQUEST.ADMIN_DELETE_COURSE_RELATION(deleteCourseRelation)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalDeleteCourseRelation();
        if (!data.message) {
          router.reload();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div>
      <AdminLayout>
        <div className={classNames(styles.wrapper)}>
          <div className={classNames(styles.method)}>
            <Button
              startContent={<IoMdAdd />}
              className="w-[100%]"
              onClick={handleOpenModalCreateGroup}
            >
              Add new group course
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
                items={tableData || []}
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
          size={"2xl"}
          isOpen={isOpenModalCreateGroup}
          onClose={onCloseModalCreateGroup}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create new group course
                </ModalHeader>
                <ModalBody>
                  <Autocomplete
                    variant="underlined"
                    defaultItems={Object.values(GroupCourseType).map((v) => {
                      return { value: v };
                    })}
                    label="Type"
                    color="primary"
                    onChange={(e) => handleCreateGroupCourse(e, "name")}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.value}>
                        {item.value}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                  <Input
                    type="text"
                    color="primary"
                    label="Min Credits"
                    variant="underlined"
                    onChange={(e) => handleCreateGroupCourse(e, "minCredits")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Min Courses"
                    variant="underlined"
                    onChange={(e) => handleCreateGroupCourse(e, "minCourses")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Min Groups"
                    variant="underlined"
                    onChange={(e) => handleCreateGroupCourse(e, "minGroups")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Title"
                    variant="underlined"
                    onChange={(e) => handleCreateGroupCourse(e, "title")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Description"
                    variant="underlined"
                    onChange={(e) => handleCreateGroupCourse(e, "description")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSubmitCreateGroup}
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
          isOpen={isOpenModalEditGroup}
          onClose={onCloseModalEditGroup}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Group Course
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    color="primary"
                    label="Min Credits"
                    variant="underlined"
                    onChange={(e) => handleUpdateGroup(e, "minCredits")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Min Courses"
                    variant="underlined"
                    onChange={(e) => handleUpdateGroup(e, "minCourses")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Min Groups"
                    variant="underlined"
                    onChange={(e) => handleUpdateGroup(e, "minGroups")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Title"
                    variant="underlined"
                    onChange={(e) => handleUpdateGroup(e, "title")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Description"
                    variant="underlined"
                    onChange={(e) => handleUpdateGroup(e, "description")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => handleSubmitUpdateGroup()}
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
          isOpen={isOpenModalDeleteGroup}
          onClose={onCloseModalDeleteGroup}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete Group Course
                </ModalHeader>
                <ModalBody>
                  {`Are you sure you want to delete this group course? This action cannot be undone.`}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => handleSubmitDeleteGroup(deleteGroup)}
                    isLoading={isLoading}
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
          size={"2xl"}
          isOpen={isOpenModalCreateChildCourse}
          onClose={onCloseModalCreateChildCourse}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create new course
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    color="primary"
                    label="Code"
                    variant="underlined"
                    onChange={(e) => handleCreateChildCourse(e, "code")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Name"
                    variant="underlined"
                    onChange={(e) => handleCreateChildCourse(e, "name")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Credits"
                    variant="underlined"
                    onChange={(e) => handleCreateChildCourse(e, "credits")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSubmitCreateChildCourse}
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
          size={"2xl"}
          isOpen={isOpenModalUpdateCourse}
          onClose={onCloseModalUpdateCourse}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Update course
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    color="primary"
                    label="Code"
                    variant="underlined"
                    onChange={(e) => handleUpdateCourse(e, "code")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Name"
                    variant="underlined"
                    onChange={(e) => handleUpdateCourse(e, "name")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Credits"
                    variant="underlined"
                    onChange={(e) => handleUpdateCourse(e, "credits")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSubmitUpdateCourse}
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
          size={"2xl"}
          isOpen={isOpenModalCreateChildGroup}
          onClose={onCloseModalCreateChildGroup}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create new child group course
                </ModalHeader>
                <ModalBody>
                  <Autocomplete
                    variant="underlined"
                    defaultItems={Object.values(GroupCourseType).map((v) => {
                      return { value: v };
                    })}
                    label="Type"
                    color="primary"
                    onChange={(e) => handleCreateChildGroup(e, "name")}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.value}>
                        {item.value}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                  <Input
                    type="text"
                    color="primary"
                    label="Min Credits"
                    variant="underlined"
                    onChange={(e) => handleCreateChildGroup(e, "minCredits")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Min Courses"
                    variant="underlined"
                    onChange={(e) => handleCreateChildGroup(e, "minCourses")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Min Groups"
                    variant="underlined"
                    onChange={(e) => handleCreateChildGroup(e, "minGroups")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Title"
                    variant="underlined"
                    onChange={(e) => handleCreateChildGroup(e, "title")}
                  />
                  <Input
                    type="text"
                    color="primary"
                    label="Description"
                    variant="underlined"
                    onChange={(e) => handleCreateChildGroup(e, "description")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSubmitCreateChildGroup}
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
          isOpen={isOpenModalDeleteCourse}
          onClose={onCloseModalDeleteCourse}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete Course
                </ModalHeader>
                <ModalBody>
                  {`Are you sure you want to delete this course? This action cannot be undone.`}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => handleSubmitDeleteCourse()}
                    isLoading={isLoading}
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
          size={"2xl"}
          isOpen={isOpenModalCreateCourseRelation}
          onClose={onCloseModalCreateCourseRelation}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add new prereq course code
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    color="primary"
                    label="Prereq course code"
                    variant="underlined"
                    onChange={(e) =>
                      handleCreateCourseRelation(e, "prereqCourseCode")
                    }
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSubmitCreateCourseRelation}
                    isLoading={isLoading}
                  >
                    Add
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
          size={"2xl"}
          isOpen={isOpenModalUpdateCourseRelation}
          onClose={onCloseModalUpdateCourseRelation}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Update prereq course
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    color="primary"
                    label="Prereq course code"
                    variant="underlined"
                    onChange={(e) =>
                      handleUpdateCourseRelation(e, "prereqCourseCode")
                    }
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSubmitUpdateCourseRelation}
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
          isOpen={isOpenModalDeleteCourseRelation}
          onClose={onCloseModalDeleteCourseRelation}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete prereq course code
                </ModalHeader>
                <ModalBody>
                  {`Are you sure you want to delete this prereq course code? This action cannot be undone.`}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => handleSubmitDeleteCourseRelation()}
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

export default AdminMajorDetails;
