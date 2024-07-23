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
import Link from "next/link";

const SchoolPage = () => {
  const router = useRouter();
  const [schools, setSchools] = useState(new ResponseGetSchool());
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const order = searchParams.get("order") || "ASC";
  const limit = Number(searchParams.get("limit")) || 10;

  useEffect(() => {
    REQUEST.GET_SCHOOL({ order: order, limit: limit, page: page, q: query })
      .then((res) => res.json())
      .then((schools) => {
        setSchools(schools);
      });
  }, [limit, order, page, query, router]);

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
            {schools.items.map((school) => {
              return (
                <Link href={`/school/${school.id}`} key={school.id}>
                  <Card className="h-[9rem] w-[20rem] cursor-pointer">
                    <CardHeader className="justify-center text-3xl">
                      <IoSchool />
                    </CardHeader>
                    <CardBody className="justify-center text-center">
                      {school.name}
                    </CardBody>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default SchoolPage;
