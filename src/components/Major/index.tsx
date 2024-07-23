import classNames from "classnames";
import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponseGetSchool } from "@/src/api/response";
import { useSearchParams } from "next/navigation";
import { REQUEST } from "@/src/api/request";
import MainLayout from "../layouts/MainLayout";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Pagination,
} from "@nextui-org/react";
import { IoSchool } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { ResponseGetMajor } from "@/src/api/response/major";
import { TbActivity } from "react-icons/tb";

const MajorPage = (props: { schoolId: string | null }) => {
  const router = useRouter();
  const [majors, setMajors] = useState(new ResponseGetMajor());
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const order = searchParams.get("order") || "ASC";
  const limit = Number(searchParams.get("limit")) || 10;
  const schoolIdd = props.schoolId
    ? String(props.schoolId)
    : searchParams.get("schoolId");

  useEffect(() => {
    REQUEST.GET_MAJORS({
      order: order,
      limit: limit,
      page: page,
      q: query,
      schoolId: schoolIdd,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMajors(data);
      });
  }, [limit, order, page, query, router, schoolIdd]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  return (
    <div>
      <MainLayout>
        <div className={classNames(styles.wrapper)}>
          <div className={classNames(styles.filter)}>
            <Input
              type="text"
              color="primary"
              variant="bordered"
              placeholder="Search major ..."
              onChange={handleSearch}
              startContent={<FaSearch />}
              className="max-w-[40rem] transition-all"
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
                <Card key={e.id} className="h-[7rem] w-[20rem] cursor-pointer">
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
      </MainLayout>
    </div>
  );
};

export default MajorPage;