import classNames from "classnames";
import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { REQUEST } from "@/src/api/request";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ResponseMajorDetail } from "@/src/api/response/major";
import { NO_I } from "@/src/utils/helper";
import { ResponseGroupCourseDetails } from "@/src/api/response";
import MainLayout from "../layouts/MainLayout";

const UserMajorDetails = (props: { majorId: string | null }) => {
  const router = useRouter();
  const [tableData, setTableData] = useState<Array<any>>();
  const [isLoading, setIsLoading] = useState(false);

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
                prereqCourseCodes: course.prereqCourseRelations.map(
                  (e) => e.prereqCourseCode
                ),
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

  return (
    <div>
      <MainLayout>
        <div className={classNames(styles.wrapper)}>
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
      </MainLayout>
    </div>
  );
};

export default UserMajorDetails;
