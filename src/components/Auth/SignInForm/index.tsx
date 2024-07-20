/* eslint-disable react/no-unescaped-entities */
import classNames from "classnames";
import styles from "./index.module.scss";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaGoogle, FaKey, FaLock } from "react-icons/fa";
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

const SignInForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    REQUEST.AUTH_SIGN_IN(email, password)
      .then((response) => response.json())
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
  };

  const handleEmailOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setEmail(value);
  };

  const handlePassswordOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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
          className="max-w-[100%] min-w-[70%] max-h-[100%] min-h-[70%] px-6 py-6 trasition-*"
          shadow="lg"
        >
          <CardHeader className="uppercase text-2xl justify-center align-center">
            <p className="font-bold">Sign In</p>
          </CardHeader>
          <CardBody className="pt-6">
            <Input
              type="email"
              color="primary"
              label="Email"
              variant="underlined"
            />
            <Input
              key={2}
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
              className="pt-6"
            />
          </CardBody>
          <CardFooter className="flex-col justify-center align-center pt-6">
            <Button
              color="primary"
              variant="shadow"
              endContent={<RiSendPlaneFill />}
            >
              Go
            </Button>
            <p className="py-4">Or</p>

            <Button
              color="primary"
              variant="shadow"
              onClick={() => authGoogle()}
              endContent={<FaGoogle />}
            >
              Sign in with Google
            </Button>
            <small className="pt-6">
              Don't have an account? <Link href={"/auth/signup"} className="hover:text-purple-500 hover:font-bold">Sign up</Link>
            </small>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default SignInForm;
