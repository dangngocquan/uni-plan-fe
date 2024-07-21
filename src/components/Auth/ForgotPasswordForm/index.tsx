/* eslint-disable react/no-unescaped-entities */
import classNames from "classnames";
import styles from "./index.module.scss";
import React, { useState } from "react";
import router from "next/router";
import Link from "next/link";
import { REQUEST } from "@/src/api/request";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { validateEmail } from "@/src/utils/helper";
import { AiFillHome } from "react-icons/ai";

const ForgotPasswordForm = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const checkValidSubmit = () => {
    if (email == "") {
      setMessage("Email is required");
      return false;
    }
    if (!validateEmail(email)) {
      setMessage("Email is invalid");
      return false;
    }
    return true;
  };

  const submit = () => {
    if (!checkValidSubmit()) {
      return;
    }
    setIsSubmiting(true);
    setMessage("");
    REQUEST.AUTH_FORGOT_PASSWORD(email)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setIsSubmiting(false);
          setMessage(data.message);
        } else {
          router.push("/auth/reset-password");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setEmail(value);
  };

  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.card)}>
        <Card
          className="max-w-[100%] min-w-[400px] px-6 py-6"
          shadow="lg"
        >
          <CardHeader className="flex-col uppercase justify-center align-center">
            <Button startContent={<AiFillHome/>} className="mr-auto mb-5">
              <Link href={"/"}>Home</Link>
            </Button>
            <p className="font-bold">Forgot password?</p>
          </CardHeader>
          <CardBody>
            <Input
              type="email"
              color="primary"
              label="Email"
              variant="underlined"
              onChange={handleEmail}
            />
          </CardBody>
          <p className="pt-2 text-center text-red-500 text-xs min-h-[2rem]">
            {message}
          </p>
          <CardFooter className="flex-col justify-center align-center pt-6">
            <Button
              color="primary"
              variant="shadow"
              onClick={() => submit()}
              className="min-w-[60%]"
              isLoading={isSubmiting}
            >
              Reset password
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default ForgotPasswordForm;
