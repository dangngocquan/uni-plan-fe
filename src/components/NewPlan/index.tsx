import classNames from "classnames";
import styles from "./index.module.scss";
import React, { Dispatch, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import MainLayout from "../layouts/MainLayout";
import { getUserAccessToken } from "@/src/utils/sessionStorage";
import { useSearchParams } from "next/navigation";
import {
  ResponseGetMajor,
  ResponseGetSchool,
  ResponseGroupCourseDetails,
  ResponseMajorDetail,
} from "@/src/api/response";
import { REQUEST } from "@/src/api/request";
import { IoSchool } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { TbActivity } from "react-icons/tb";
import { NO_I } from "@/src/utils/helper";
import { RequestCreatePlan } from "@/src/api/request/plan/dto";
import { ResponsePlan } from "@/src/api/response/plan";
import { PLanStatus } from "@/src/utils/enums";

const NewPlan = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState("step-1"); // "m-1-step-2", "m-1-step-3"
  const [meta, setMeta] = useState({ schoolId: "", majorId: "" });
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [createPlan, setCreatePlan] = useState(new RequestCreatePlan());

  // School
  const [schools, setSchools] = useState(new ResponseGetSchool());

  // Major
  const [majors, setMajors] = useState(new ResponseGetMajor());

  // Courses
  const [tableData, setTableData] = useState<any[]>();
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
  ];

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
          prereqCourseCodes: string[];
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
                style={
                  item.isGroup
                    ? { fontWeight: 900 - Number(item.group.level) * 100 }
                    : {}
                }
              >
                {item.no}
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
                {item.isGroup
                  ? ""
                  : item.course.prereqCourseCodes.map((code) => {
                      return (
                        <div key={`prereq${item.id}-${code}`}>{`${code}`}</div>
                      );
                    })}
              </p>
            </div>
          );
        default:
          return "";
      }
    },
    []
  );

  // Filter
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const order = searchParams.get("order") || "ASC";
  const limit = Number(searchParams.get("limit")) || 10;

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  useEffect(() => {
    if (!getUserAccessToken()) {
      router.push("/auth/signin");
      return;
    }
    if (step === "m-1-step-2") {
      REQUEST.GET_SCHOOL({ order: order, limit: limit, page: page, q: query })
        .then((res) => res.json())
        .then((schools) => {
          setSchools(schools);
        });
    } else if (step === "m-1-step-3") {
      REQUEST.GET_MAJORS({
        order: order,
        limit: limit,
        page: page,
        q: query,
        schoolId: meta.schoolId,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMajors(data);
        });
    } else if (step === "m-1-step-4") {
      REQUEST.GET_MAJOR_DETAILS(meta.majorId)
        .then((res) => res.json())
        .then((majorDetails: ResponseMajorDetail) => {
          const list: Array<any> = [];
          let countCourse = 1;
          const solveGroup = (
            groupData: ResponseGroupCourseDetails,
            level: number,
            parentNo: string,
            indexChild: number
          ) => {
            const no =
              level == 1 ? NO_I[indexChild] : `${parentNo}.${indexChild + 1}`;
            list.push({
              isGroup: true,
              no: no,
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
                  prereqCourseCodes: course.prereqCourseRelations.map(
                    (e) => e.prereqCourseCode
                  ),
                },
              });
              countCourse += 1;
            }
            for (let i = 0; i < groupData.children.length; i++) {
              const childGroup = groupData.children[i];
              solveGroup(childGroup, level + 1, no, i);
            }
          };

          for (let j = 0; j < majorDetails.groupCourses.length; j++) {
            const groupData = majorDetails.groupCourses[j];
            solveGroup(groupData, 1, "", j);
          }
          setTableData(list);
        })
        .catch(() => {
          setTableData([]);
        });
    }
  }, [isLoading, limit, meta, order, page, query, router, step]);

  const handleCreatePlanCourses = () => {
    setIsLoading(true);
    REQUEST.CREATE_PLAN(createPlan)
      .then((res: ResponsePlan | any) => {
        if (!res.message) {
          return REQUEST.CREATE_PLAN_COURSES({
            planId: res.id,
            baseCourseIds: selectedCourseIds || [],
          });
        }
      })
      .then((res: any) => {
        if (!res.message) {
          return REQUEST.UPDATE_PLAN({
            ...createPlan,
            planId: res.planId,
            status: PLanStatus.COMPLETED,
          });
        }
      })
      .then((res: any) => {
        if (!res.message) {
          setIsLoading(false);
          router.push(`/plan`);
        }
      });
    setIsLoading(false);
  };

  return (
    <div>
      <MainLayout>
        <div className={classNames(styles.wrapper)}>
          <p className="text-xl font-bold pt-[3rem]"> CREATE PLAN</p>
          <div className={classNames(styles.content)}>
            {/* STEP 1 */}
            {step === "step-1" && (
              <div className={classNames(styles.content)}>
                <div className={classNames(styles.steps)}>
                  {/* <Button color="secondary">Previous step</Button> */}
                  <p className="text-center py-[2rem] flex-1">
                    Step 01: Choose the method to create the courses for your
                    plan.
                  </p>
                  {/* <Button color="secondary">Next step</Button> */}
                </div>
                <div className={classNames(styles.methods)}>
                  <Card
                    isPressable
                    className="w-[20rem] text-wrap mx-[1rem]"
                    onClick={() => {
                      setStep("m-1-step-2");
                    }}
                  >
                    <CardHeader className="text-lg font-bold justify-center">
                      From our system
                    </CardHeader>
                    <CardBody>
                      Choose a school, select a major, and then pick courses
                      from that major for your plan.
                    </CardBody>
                    <CardFooter></CardFooter>
                  </Card>
                  <Card className="w-[20rem] text-wrap mx-[1rem]" isDisabled>
                    <CardHeader className="text-lg font-bold justify-center">
                      Customize
                    </CardHeader>
                    <CardBody>
                      You will need to create courses for your plans on your
                      own, including the code, name, and number of credits for
                      each course.
                    </CardBody>
                    <CardFooter></CardFooter>
                  </Card>
                </div>
              </div>
            )}
            {/* METHOD 1 STEP 2  */}
            {step === "m-1-step-2" && (
              <div className={classNames(styles.content)}>
                <div className={classNames(styles.steps)}>
                  <Button
                    color="secondary"
                    onPress={() => {
                      setStep("step-1");
                    }}
                  >
                    Previous step
                  </Button>
                  <p className="text-center py-[2rem] flex-1">
                    Step 02: Select the school
                  </p>
                  <Button color="secondary" isDisabled>
                    Next step
                  </Button>
                </div>
                <div className={classNames(styles.content)}>
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
                  <div className={classNames(styles.schools)}>
                    {schools.items.map((school) => {
                      return (
                        <Card
                          isPressable
                          key={school.id}
                          className="mx-[1rem] my-[1rem] h-[10rem] w-[19rem] cursor-pointer"
                          onPress={() => {
                            setMeta({ ...meta, schoolId: school.id });
                            setStep("m-1-step-3");
                          }}
                        >
                          <CardHeader className="justify-center text-xl">
                            <IoSchool />
                          </CardHeader>
                          <CardBody className="justify-center text-center">
                            {school.name}
                          </CardBody>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {/* METHOD 1 STEP 3  */}
            {step === "m-1-step-3" && (
              <div className={classNames(styles.content)}>
                <div className={classNames(styles.steps)}>
                  <Button
                    color="secondary"
                    onPress={() => {
                      setStep("m-1-step-2");
                    }}
                  >
                    Previous step
                  </Button>
                  <p className="text-center py-[2rem] flex-1">
                    Step 03: Select the major
                  </p>
                  <Button color="secondary" isDisabled>
                    Next step
                  </Button>
                </div>
                <div className={classNames(styles.content)}>
                  <div className={classNames(styles.filter)}>
                    <Input
                      type="text"
                      color="primary"
                      variant="bordered"
                      placeholder="Search major ..."
                      onChange={handleSearch}
                      startContent={<FaSearch />}
                      className="max-w-[40rem] transition-all pr-[1rem]"
                    />
                    <Pagination
                      total={majors.meta.totalPages}
                      initialPage={1}
                      page={page}
                      onChange={setPage}
                    />
                  </div>
                  <div className={classNames(styles.majors)}>
                    {majors.items.map((e) => {
                      return (
                        <Card
                          isPressable
                          key={e.id}
                          className="mx-[1rem] my-[1rem] h-[10rem] w-[19rem] cursor-pointer"
                          onPress={() => {
                            setMeta({ ...meta, majorId: e.id });
                            setStep("m-1-step-4");
                          }}
                        >
                          <CardHeader className="justify-center text-3xl">
                            <TbActivity />
                          </CardHeader>
                          <CardBody className="justify-center text-center">
                            {e.name}
                          </CardBody>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {/* METHOD 1 STEP 4  */}
            {step === "m-1-step-4" && (
              <div className={classNames(styles.content)}>
                <div className={classNames(styles.steps)}>
                  <Button
                    color="secondary"
                    onPress={() => {
                      setStep("m-1-step-3");
                    }}
                  >
                    Previous step
                  </Button>
                  <p className="text-center py-[2rem] flex-1">
                    Step 04: Select the courses for your plan.
                  </p>
                  <Button
                    color="secondary"
                    onPress={() => {
                      setStep("m-1-step-5");
                    }}
                  >
                    Next step
                  </Button>
                </div>
                <div
                  className={classNames(styles.content_9)}
                  style={{ marginBottom: "2rem" }}
                >
                  <Table
                    aria-label="Controlled table example with dynamic content"
                    selectionMode="multiple"
                    disabledKeys={tableData
                      ?.filter((e) => e.isGroup)
                      .map((e) => e.id)}
                    selectedKeys={selectedCourseIds}
                    onSelectionChange={(keys) => {
                      const a: React.SetStateAction<string[]> = [];
                      new Set(keys).forEach((o) => a.push(o.toString()));
                      setSelectedCourseIds(a);
                    }}
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
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                          )}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
            {/* METHOD 1 STEP 5  */}
            {step === "m-1-step-5" && (
              <div className={classNames(styles.content)}>
                <div className={classNames(styles.steps)}>
                  <Button
                    color="secondary"
                    onPress={() => {
                      setStep("m-1-step-4");
                    }}
                  >
                    Previous step
                  </Button>
                  <p className="text-center py-[2rem] flex-1">
                    Step 05: Enter the name for your plan.
                  </p>
                  <Button
                    color="secondary"
                    onPress={() => handleCreatePlanCourses()}
                  >
                    Create
                  </Button>
                </div>
                <div
                  className={classNames(styles.content_9)}
                  style={{ marginBottom: "2rem" }}
                >
                  <Input
                    type="text"
                    color="secondary"
                    label="Name"
                    variant="underlined"
                    defaultValue={createPlan.name || ""}
                    onChange={(e) => {
                      setCreatePlan({
                        ...createPlan,
                        name: e.target.value,
                      });
                    }}
                    className="w-[60%]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default NewPlan;
