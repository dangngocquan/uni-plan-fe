import classNames from "classnames";
import styles from "./index.module.scss";
import React, { Key, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { REQUEST } from "@/src/api/request";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import MainLayout from "../layouts/MainLayout";
import { ResponsePlanDetail } from "@/src/api/response/plan";
import { MdClose, MdDone } from "react-icons/md";
import { IoMdSnow } from "react-icons/io";
import { EditIcon } from "../UI/EditIcon";
import { DeleteIcon } from "../UI/DeleteIcon";
import { RiFireFill } from "react-icons/ri";
import {
  RequestDeletePlanCourse,
  RequestUpdatePlanCourse,
} from "@/src/api/request/plan/dto";
import { LetterGrade } from "@/src/utils/enums";

const UserPlanDetails = (props: { planId: string | null }) => {
  const router = useRouter();
  const [tableData, setTableData] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isImprovement, setIsImprovement] = useState(true);
  const [data, setData] = useState(new ResponsePlanDetail());
  const [updatePlanCourse, setUpdatePlanCourse] = useState(
    new RequestUpdatePlanCourse()
  );
  const [clearPlanCourse, setClearPlanCourse] = useState(
    new RequestUpdatePlanCourse()
  );
  const [deletePlanCourse, setDeletePlanCourse] = useState(
    new RequestDeletePlanCourse()
  );
  const {
    isOpen: isOpenModalUpdatePlanCourse,
    onOpen: onOpenModalUpdatePlanCourse,
    onClose: onCloseModalUpdatePlanCourse,
  } = useDisclosure();
  const {
    isOpen: isOpenModalClearPlanCourse,
    onOpen: onOpenModalClearPlanCourse,
    onClose: onCloseModalClearPlanCourse,
  } = useDisclosure();
  const {
    isOpen: isOpenModalDeletePlanCourse,
    onOpen: onOpenModalDeletePlanCourse,
    onClose: onCloseModalDeletePlanCourse,
  } = useDisclosure();

  const searchParams = useSearchParams();

  const planId = props.planId
    ? String(props.planId)
    : searchParams.get("planId") || "";

  const columns = [
    {
      key: "no",
      label: "NO",
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
      key: "grade",
      label: "GRADE",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "actions",
      label: "ACTIONS",
    },
  ];

  const columnsSummaryGrades = [
    {
      key: "no",
      label: "NO",
    },
    {
      key: "grade",
      label: "GRADE",
    },
    {
      key: "count",
      label: "COUNT",
    },
    {
      key: "creditCount",
      label: "CREDIT COUNT",
    },
  ];

  const columnsCPAStatus = [
    {
      key: "grade",
      label: "GRADE",
    },
    {
      key: "range",
      label: "RANGE",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "cases",
      label: "CASES",
    },
  ];

  useEffect(() => {
    REQUEST.GET_PLAN_DETAIL({
      id: props.planId
        ? String(props.planId)
        : searchParams.get("planId") || "",
    })
      // .then((res: any) => res.json())
      .then((res: any) => {
        if (res.message) {
          return null;
        }
        const planDetails: ResponsePlanDetail = res as ResponsePlanDetail;
        setData(planDetails);
        const list = planDetails.courses.map((course, index) => {
          return {
            id: course.id,
            no: index + 1,
            code: course.baseCourse.code,
            name: course.baseCourse.name,
            credits: course.baseCourse.credits,
            status: course.status,
            grade: course.letterGrade,
            prereqCourseCodes: course.baseCourse.prereqCourseRelations.map(
              (e) => e.prereqCourseCode
            ),
          };
        });
        setTableData(list);
      });
  }, [props.planId, searchParams]);

  const renderCell = React.useCallback(
    (
      item: {
        no: string;
        id: string;
        code: string;
        name: string;
        credits: number;
        status: string;
        grade: string;
        prereqCourseCodes: string[];
      },
      columnKey: React.Key
    ) => {
      switch (columnKey) {
        case "no":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{item.no}</p>
            </div>
          );
        case "code":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{item.code}</p>
            </div>
          );
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{item.name}</p>
            </div>
          );
        case "credits":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{item.credits}</p>
            </div>
          );
        case "grade":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{item.grade}</p>
            </div>
          );
        case "status":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">
                {item.status == "COMPLETED" ? (
                  <MdDone className="text-green-500" />
                ) : item.grade === "F" ? (
                  <MdClose className="text-red-500" />
                ) : (
                  <IoMdSnow className="text-blue-500" />
                )}
              </p>
            </div>
          );
        case "prereq":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">
                {item.prereqCourseCodes.map((code) => {
                  return (
                    <div key={`prereq${item.id}-${code}`}>{`${code}`}</div>
                  );
                })}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit grade">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleOpenModalUpdatePlanCourse(item.id)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Clear grade">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleOpenModalClearPlanCourse(item.id)}
                >
                  <RiFireFill />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Remove course">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleOpenModalDeletePlanCourse(item.id)}
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

  const renderCellSummaryGrades = React.useCallback(
    (
      item: {
        no: number;
        grade: string;
        count: number;
        creditCount: number;
      },
      columnKey: React.Key
    ) => {
      switch (columnKey) {
        case "no":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{item.no}</p>
            </div>
          );
        case "grade":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{item.grade}</p>
            </div>
          );
        case "count":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{item.count}</p>
            </div>
          );
        case "creditCount":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{item.creditCount}</p>
            </div>
          );
        default:
          return "";
      }
    },
    []
  );

  const renderCellCAPStatus = React.useCallback(
    (
      item: {
        grade: string;
        label: string;
        status: string;
        details: {
          case1: {
            id: string;
            fromTenPointGrade: number;
            toTenPointGrade: number;
            labelTenPointGrade: string;
            fourPointGrade: number;
            letterGrade: string;
            conversionTableId: string;
            count: number;
          }[];
          case2: {
            id: string;
            fromTenPointGrade: number;
            toTenPointGrade: number;
            labelTenPointGrade: string;
            fourPointGrade: number;
            letterGrade: string;
            conversionTableId: string;
            count: number;
          }[];
        };
      },
      columnKey: React.Key
    ) => {
      switch (columnKey) {
        case "grade":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{item.grade}</p>
            </div>
          );
        case "range":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{item.label}</p>
            </div>
          );
        case "status":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">
                {item.status === "DONE"
                  ? "Already Completed"
                  : item.status === "IS_POSSIBLE"
                  ? "Possible"
                  : "Impossible"}
              </p>
            </div>
          );
        case "cases":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">
                {item.details.case1.length === 0 ? (
                  ""
                ) : (
                  <Tabs
                    aria-label="Dynamic tabs"
                    // className="flex justify-center align-center"
                    size="sm"
                  >
                    <Tab key={1} title="Case 1">
                      {item.details.case1.map((e, index) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-between gap-[1rem] w-[15rem]"
                          >
                            <div>{`Grade: ${e["letterGrade"]}`}</div>
                            <div>{`Requirement: ${e["count"]} credits`}</div>
                          </div>
                        );
                      })}
                    </Tab>
                    <Tab key={2} title="Case 2">
                      {item.details.case2.map((e, index) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-between gap-[1rem]  w-[15rem]"
                          >
                            <div>{`Grade: ${e["letterGrade"]}`}</div>
                            <div>{`Requirement: ${e["count"]} credits`}</div>
                          </div>
                        );
                      })}
                    </Tab>
                  </Tabs>
                )}
              </p>
            </div>
          );
        default:
          return "";
      }
    },
    []
  );

  const handleOpenModalUpdatePlanCourse = (id: string) => {
    setUpdatePlanCourse({
      ...updatePlanCourse,
      planCourseId: id,
    });
    onOpenModalUpdatePlanCourse();
  };

  const handleOpenModalClearPlanCourse = (id: string) => {
    setClearPlanCourse({
      ...clearPlanCourse,
      letterGrade: null,
      planCourseId: id,
    });
    onOpenModalClearPlanCourse();
  };

  const handleOpenModalDeletePlanCourse = (id: string) => {
    setDeletePlanCourse({
      ...deletePlanCourse,
      planCourseId: id,
    });
    onOpenModalDeletePlanCourse();
  };

  const handleUpdatePlanCourse = (e: Key | null, field: string) => {
    const value = e ? e.toString() : null;
    if (field === "grade") {
      setUpdatePlanCourse({
        ...updatePlanCourse,
        letterGrade: value,
      });
    }
  };

  const handleSubmitUpdatePlanCourse = async () => {
    setIsLoading(true);
    await REQUEST.UPDATE_PLAN_COURSE(updatePlanCourse)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalUpdatePlanCourse();
        if (!data.message) {
          router.reload();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitClearPlanCourse = () => {
    setIsLoading(true);
    REQUEST.UPDATE_PLAN_COURSE(clearPlanCourse)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalClearPlanCourse();
        if (!data.message) {
          router.reload();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmitDeletePlanCourse = () => {
    setIsLoading(true);
    REQUEST.DELETE_PLAN_COURSE(deletePlanCourse)
      .then((data: any) => {
        setIsLoading(false);
        onCloseModalDeletePlanCourse();
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
      <MainLayout>
        <div className={classNames(styles.wrapper)}>
          <div className="py-[2rem] font-bold">{`Plan: ${data.name}`}</div>
          <div className={classNames(styles.content_9)}>
            <div className="flex w-[100%] flex-col justify-center">
              <Tabs
                aria-label="Dynamic tabs"
                className="flex justify-center align-center"
              >
                <Tab key={"list-course"} title={"List courses"}>
                  <div className={classNames(styles.courses)}>
                    <Table
                      aria-label="Example table with dynamic content"
                      className="flex w-[100%] justify-center"
                    >
                      <TableHeader columns={columns}>
                        {(column) => (
                          <TableColumn key={column.key}>
                            {column.label}
                          </TableColumn>
                        )}
                      </TableHeader>
                      <TableBody
                        emptyContent={"No rows to display."}
                        items={tableData || []}
                      >
                        {(item) => (
                          <TableRow key={item.key}>
                            {(columnKey) => (
                              <TableCell>
                                {renderCell(item, columnKey)}
                              </TableCell>
                            )}
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </Tab>
                <Tab
                  key={"summary"}
                  title={"Summary"}
                  className="flex flex-col justify-center align-center"
                >
                  <div className="flex justify-center flex-col gap-[2rem] py-[2rem] align-center m-auto">
                    <Card className="max-h-[10rem] align-center">
                      <CardBody className="h-[100%]">
                        <p className="flex justify-between">
                          {`Total number of courses:`}
                          <span>{`${data.summary.totalCourses}`}</span>
                        </p>
                        <p className="flex justify-between">
                          {`Total number of credits:`}
                          <span>{`${data.summary.totalCredits}`}</span>
                        </p>
                        <p className="flex justify-between text-green-500">
                          {`Number courses completed:`}
                          <span>{`${data.summary.numberCoursesCompleted}`}</span>
                        </p>
                        <p className="flex justify-between text-green-500">
                          {`Number credits completed:`}
                          <span>{`${data.summary.numberCreditsCompleted}`}</span>
                        </p>
                        <p className="flex justify-between text-green-500">
                          {`Current CPA:`}
                          <span>{`${
                            Math.round(data.summary.currentCPA * 10000) / 10000
                          }`}</span>
                        </p>
                      </CardBody>
                    </Card>

                    <Table
                      aria-label="Example table with dynamic content"
                      className="flex justify-center min-w-[25rem]"
                    >
                      <TableHeader columns={columnsSummaryGrades}>
                        {(column) => (
                          <TableColumn key={column.key}>
                            {column.label}
                          </TableColumn>
                        )}
                      </TableHeader>
                      <TableBody
                        emptyContent={"No rows to display."}
                        items={data.summary.grades || []}
                      >
                        {(item) => (
                          <TableRow key={item.grade}>
                            {(columnKey) => (
                              <TableCell>
                                {renderCellSummaryGrades(item, columnKey)}
                              </TableCell>
                            )}
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </Tab>

                <Tab key={"cpa-details"} title={"CPA Details"}>
                  <div className={classNames(styles.courses)}>
                    <Checkbox
                      isSelected={isImprovement}
                      onChange={() => setIsImprovement(!isImprovement)}
                      className="mx-auto"
                      size="sm"
                    >
                      Improvement
                    </Checkbox>
                    <div className="flex flex-col items-center">
                      {/* {data.cpaStatus.withoutImprovements.calculatorCPA.map(
                        (e, index) => {
                          return (
                            <div
                              key={index}
                              className="flex flex-col items-center"
                            >
                              <div className="border-l-2 border-black h-32"></div>
                              <div className="relative my-1">
                                <div className="w-3 h-3 bg-black rounded-full"></div>
                                <div className="absolute top-1/2 left-full border-t-2 border-black w-[3rem] ml-1"></div>
                              </div>
                            </div>
                          );
                        }
                      )} */}
                      <div className="relative min-w-[50rem] h-[10rem] bg-gray-300 mt-[11.5rem]">
                        {data.cpaStatus.withImprovements.calculatorCPA.map(
                          (e) => {
                            return (
                              <div
                                key={e.grade}
                                className="absolute top-0 w-[1.5px] h-[110%] bg-blue-600"
                                style={{
                                  left: `${(e.fourPointGrade / 4.0) * 100}%`,
                                }}
                              ></div>
                            );
                          }
                        )}
                        <div
                          className="absolute top-0 w-[1.5px] h-[110%] bg-blue-600"
                          style={{ left: `100%` }}
                        ></div>
                        <div
                          key={"min-cpa"}
                          className="absolute top-[-40%] w-[1.5px] h-[250%] bg-red-600"
                          style={{
                            left: `${
                              ((isImprovement
                                ? data.cpaStatus.withImprovements.minCPA
                                : data.cpaStatus.withoutImprovements.minCPA) /
                                4.0) *
                              100
                            }%`,
                          }}
                        ></div>
                        <div
                          key={"current-cpa"}
                          className="absolute top-[-70%] w-[1.5px] h-[250%] bg-red-600"
                          style={{
                            left: `${(data.summary.currentCPA / 4.0) * 100}%`,
                          }}
                        ></div>
                        <div
                          key={"max-cpa"}
                          className="absolute top-[-100%] w-[1.5px] h-[250%] bg-red-600"
                          style={{
                            left: `${
                              ((isImprovement
                                ? data.cpaStatus.withImprovements.maxCPA
                                : data.cpaStatus.withoutImprovements.maxCPA) /
                                4.0) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>

                      <div className="relative mt-[1rem] min-w-[50rem]">
                        {data.cpaStatus.withImprovements.calculatorCPA.map(
                          (e) => {
                            return (
                              <span
                                key={e.fourPointGrade}
                                className="absolute transform -translate-x-1"
                                style={{
                                  left: `${(e.fourPointGrade / 4.0) * 100}%`,
                                }}
                              >
                                {e.fourPointGrade}
                              </span>
                            );
                          }
                        )}
                        <span
                          className="absolute transform translate-x-0"
                          style={{
                            left: `100%`,
                          }}
                        >
                          4.0
                        </span>
                        <span
                          key={"current-cpa"}
                          className="absolute transform -translate-x-[2rem] -translate-y-[26rem] mt-[10rem]"
                          style={{
                            left: `${
                              ((isImprovement
                                ? data.cpaStatus.withImprovements.minCPA
                                : data.cpaStatus.withoutImprovements.minCPA) /
                                4.0) *
                              100
                            }%`,
                          }}
                        >
                          {"Min"}
                        </span>
                        <span
                          key={"current-cpa"}
                          className="absolute transform -translate-x-1 mt-[10rem]"
                          style={{
                            left: `${
                              ((isImprovement
                                ? data.cpaStatus.withImprovements.minCPA
                                : data.cpaStatus.withoutImprovements.minCPA) /
                                4.0) *
                              100
                            }%`,
                          }}
                        >
                          {Math.round(
                            (isImprovement
                              ? data.cpaStatus.withImprovements.minCPA
                              : data.cpaStatus.withoutImprovements.minCPA) *
                              1000
                          ) / 1000}
                        </span>

                        <span
                          key={"current-cpa"}
                          className="absolute transform -translate-x-[3.5rem] -translate-y-[26rem] mt-[7rem]"
                          style={{
                            left: `${(data.summary.currentCPA / 4.0) * 100}%`,
                          }}
                        >
                          {"Current"}
                        </span>
                        <span
                          key={"current-cpa"}
                          className="absolute transform -translate-x-1 mt-[7rem]"
                          style={{
                            left: `${(data.summary.currentCPA / 4.0) * 100}%`,
                          }}
                        >
                          {Math.round(data.summary.currentCPA * 10000) / 10000}
                        </span>

                        <span
                          key={"current-cpa"}
                          className="absolute transform -translate-x-[2rem] -translate-y-[26rem] mt-[4rem]"
                          style={{
                            left: `${
                              ((isImprovement
                                ? data.cpaStatus.withImprovements.maxCPA
                                : data.cpaStatus.withoutImprovements.maxCPA) /
                                4.0) *
                              100
                            }%`,
                          }}
                        >
                          {"Max"}
                        </span>
                        <span
                          key={"current-cpa"}
                          className="absolute transform -translate-x-1 mt-[4rem]"
                          style={{
                            left: `${
                              ((isImprovement
                                ? data.cpaStatus.withImprovements.maxCPA
                                : data.cpaStatus.withoutImprovements.maxCPA) /
                                4.0) *
                              100
                            }%`,
                          }}
                        >
                          {Math.round(
                            (isImprovement
                              ? data.cpaStatus.withImprovements.maxCPA
                              : data.cpaStatus.withoutImprovements.maxCPA) *
                              1000
                          ) / 1000}
                        </span>
                      </div>
                    </div>

                    <Table
                      aria-label="Example table with dynamic content"
                      className="flex justify-center min-w-[25rem] mt-[15rem] mb-[5rem]"
                    >
                      <TableHeader columns={columnsCPAStatus}>
                        {(column) => (
                          <TableColumn key={column.key}>
                            {column.label}
                          </TableColumn>
                        )}
                      </TableHeader>
                      <TableBody
                        emptyContent={"No rows to display."}
                        items={
                          (isImprovement
                            ? data.cpaStatus.withImprovements.calculatorCPA
                            : data.cpaStatus.withoutImprovements
                                .calculatorCPA) || []
                        }
                      >
                        {(item) => (
                          <TableRow key={item.grade}>
                            {(columnKey) => (
                              <TableCell>
                                {renderCellCAPStatus(item, columnKey)}
                              </TableCell>
                            )}
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        <Modal
          size={"3xl"}
          isOpen={isOpenModalUpdatePlanCourse}
          onClose={onCloseModalUpdatePlanCourse}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Update course
                </ModalHeader>
                <ModalBody>
                  <Autocomplete
                    variant="underlined"
                    defaultItems={Object.values(LetterGrade).map((v) => {
                      return { value: v };
                    })}
                    label="Grade"
                    color="primary"
                    onSelectionChange={(e) =>
                      handleUpdatePlanCourse(e, "grade")
                    }
                  >
                    {(item) => (
                      <AutocompleteItem key={item.value}>
                        {item.value}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSubmitUpdatePlanCourse}
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
          isOpen={isOpenModalClearPlanCourse}
          onClose={onCloseModalClearPlanCourse}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Clear Grade
                </ModalHeader>
                <ModalBody>
                  {`Are you sure you want to clear grade of this course? This action cannot be undone.`}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => handleSubmitClearPlanCourse()}
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
          size={"xl"}
          isOpen={isOpenModalDeletePlanCourse}
          onClose={onCloseModalDeletePlanCourse}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Remove course
                </ModalHeader>
                <ModalBody>
                  {`Are you sure you want to remove this course? This action cannot be undone.`}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => handleSubmitDeletePlanCourse()}
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

export default UserPlanDetails;
