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
import { RiSendPlaneFill } from "react-icons/ri";
import { validateEmail } from "@/src/utils/helper";
import { AiFillHome } from "react-icons/ai";

const SignUpForm = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const checkValidRegister = () => {
    if (name == "") {
      setMessage("Name is required");
      return false;
    }
    if (email == "") {
      setMessage("Email is required");
      return false;
    }
    if (!validateEmail(email)) {
      setMessage("Email is invalid");
      return false;
    }
    if (password == "") {
      setMessage("Password is required");
      return false;
    }
    if (confirmPassword != password) {
      setMessage("Confirm password is not matching with password");
      return false;
    }
    return true;
  };

  const submit = () => {
    if (!checkValidRegister()) {
      return;
    }
    setIsSubmiting(true);
    REQUEST.AUTH_SIGN_UP(name, email, password)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setIsSubmiting(false);
          setMessage(data.message);
        } else {
          // saveToSessionStorage(
          //   SESSION_STORAGE_KEYS.ACCESS_TOKEN_KEY,
          //   data.accessToken
          // );
          // saveToSessionStorage(
          //   SESSION_STORAGE_KEYS.REFRESH_TOKEN_KEY,
          //   data.refreshToken
          // );
          router.push("/auth/verify-email");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setName(value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setEmail(value);
  };

  const handlePasssword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setPassword(value);
  };

  const handleConfirmPasssword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setConfirmPassword(value);
  };

  const authGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      REQUEST.AUTH_GOOGLE(tokenResponse.access_token)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          saveToSessionStorage(
            SESSION_STORAGE_KEYS.ACCESS_TOKEN_KEY,
            data.accessToken
          );
          saveToSessionStorage(
            SESSION_STORAGE_KEYS.REFRESH_TOKEN_KEY,
            data.refreshToken
          );
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onError: (error) => console.log(error),
  });

  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.card)}>
        <Card
          className="max-w-[100%] min-w-[400px] max-h-[100%] min-h-[400px] px-6 py-6"
          shadow="lg"
        >
          <CardHeader className="flex-col uppercase text-2xl justify-center align-center">
            <Button startContent={<AiFillHome/>} className="mr-auto mb-10">
              <Link href={"/"}>Home</Link>
            </Button>
            <p className="font-bold">Sign Up</p>
          </CardHeader>
          <CardBody className="pt-6">
            <Input
              type="text"
              color="primary"
              label="Name"
              variant="underlined"
              onChange={handleName}
            />
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

            <Input
              label="Confirm Password"
              variant="underlined"
              color="primary"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility2}
                  aria-label="toggle password visibility"
                >
                  {isVisible2 ? (
                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible2 ? "text" : "password"}
              onChange={handleConfirmPasssword}
            />
          </CardBody>
          <p className="pt-2 text-center text-red-500 text-xs min-h-[2rem]">
            {message}
          </p>
          <CardFooter className="flex-col justify-center align-center pt-6">
            <Button
              color="primary"
              variant="shadow"
              endContent={<RiSendPlaneFill />}
              onClick={() => submit()}
              className="min-w-[80%]"
              isLoading={isSubmiting}
            >
              Go
            </Button>
            <p className="py-2">Or</p>

            <Button
              color="primary"
              variant="shadow"
              onClick={() => authGoogle()}
              startContent={<FaGoogle />}
              className="min-w-[80%]"
            >
              Sign Up with Google
            </Button>
            <small className="pt-6">
              Already have an account?{" "}
              <Link
                href={"/auth/signin"}
                className="font-bold transition-all hover:text-purple-500"
              >
                Login
              </Link>
            </small>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default SignUpForm;
