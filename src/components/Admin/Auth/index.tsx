/* eslint-disable react/no-unescaped-entities */
import classNames from "classnames";
import styles from "./index.module.scss";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import router from "next/router";
import Link from "next/link";
import {
  saveToSessionStorage,
  SESSION_STORAGE_KEYS,
} from "@/src/utils/sessionStorage";
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
import { RequestAdminAuthLogin } from "@/src/api/request/admin/dto";

const AdminLoginForm = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [adminAuthLogin, setAdminAuthLogin] = useState(
    new RequestAdminAuthLogin()
  );
  const [message, setMessage] = useState("");

  const checkValidSubmit = () => {
    if (adminAuthLogin.email == "") {
      setMessage("Email is required");
      return false;
    }
    if (!validateEmail(adminAuthLogin.email)) {
      setMessage("Email is invalid");
      return false;
    }
    if (adminAuthLogin.password == "") {
      setMessage("Password is required");
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
    REQUEST.ADMIN_AUTH_LOGIN(adminAuthLogin)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setIsSubmiting(false);
          setMessage(data.message);
        } else {
          saveToSessionStorage(
            SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY,
            data.accessToken
          );
          saveToSessionStorage(
            SESSION_STORAGE_KEYS.ADMIN_REFRESH_TOKEN_KEY,
            data.refreshToken
          );
          router.push("/admin/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setAdminAuthLogin({
      ...adminAuthLogin,
      email: value,
    });
  };

  const handlePasssword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setAdminAuthLogin({
      ...adminAuthLogin,
      password: value,
    });
  };

  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.card)}>
        <Card
          className="max-w-[100%] min-w-[400px] max-h-[100%] min-h-[300px] px-6 py-6"
          shadow="lg"
          radius="sm"
        >
          <CardHeader className="flex-col uppercase text-2xl justify-center align-center">
            <p className="font-bold">Admin Login</p>
          </CardHeader>
          <CardBody className="pt-6">
            <Input
              type="email"
              color="primary"
              label="Email"
              variant="underlined"
              onChange={handleEmail}
            />
            <Input
              label="Password"
              variant="underlined"
              color="primary"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              onChange={handlePasssword}
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
              className="min-w-[80%]"
              isLoading={isSubmiting}
            >
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default AdminLoginForm;
