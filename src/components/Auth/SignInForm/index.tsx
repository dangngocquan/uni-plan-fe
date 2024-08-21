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

const SignInForm = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    if (password == "") {
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
    REQUEST.AUTH_SIGN_IN(email, password)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setIsSubmiting(false);
          setMessage(data.message);
        } else {
          saveToSessionStorage(
            SESSION_STORAGE_KEYS.ACCESS_TOKEN_KEY,
            data.accessToken
          );
          saveToSessionStorage(
            SESSION_STORAGE_KEYS.REFRESH_TOKEN_KEY,
            data.refreshToken
          );
          // if (window.history.length > 1) {
          //   router.back();
          //   console.log(router.asPath);
          //   // if (router.asPath.includes("auth")) {
          //   router.push("/");
          //   // }
          //   router.reload();
          // } else {
          router.push("/");
          // }
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

  const handlePasssword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setPassword(value);
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
          // if (window.history.length > 1) {
          //   router.back();
          //   if (router.asPath.includes("auth")) {
          //     router.push("/");
          //   }
          //   router.reload();
          // } else {
          router.push("/");
          // }
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
          className="max-w-[100%] min-w-[400px] max-h-[100%] min-h-[500px] px-6 py-6"
          shadow="lg"
        >
          <CardHeader className="flex-col uppercase text-2xl justify-center align-center">
            <Button startContent={<AiFillHome />} className="mr-auto mb-10">
              <Link href={"/"}>Home</Link>
            </Button>
            <p className="font-bold">Sign In</p>
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
            <Link
              className="transition-all text-xs text-right pt-1 hover:text-purple-500"
              href={"/auth/forgot-password"}
            >
              Forgot pasword?
            </Link>
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
              Sign in with Google
            </Button>
            <small className="pt-6">
              Don't have an account?{" "}
              <Link
                href={"/auth/signup"}
                className="font-bold transition-all hover:text-purple-500"
              >
                Sign up
              </Link>
            </small>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default SignInForm;
