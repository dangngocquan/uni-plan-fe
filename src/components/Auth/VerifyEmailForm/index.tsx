import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "./index.module.scss";

import {
  SESSION_STORAGE_KEYS,
  getFromSessionStorage,
  getUserAccessToken,
  saveToSessionStorage,
} from "@/src/utils/sessionStorage";
import { REQUEST } from "@/src/api/request";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import Link from "next/link";
import { IoArrowUndo } from "react-icons/io5";

const VerifyEmailForm = () => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState(
    "We've sent a verification link to your email. Please check and complete the verification."
  );
  const { query } = router;
  const token = query.token;

  useEffect(() => {
    if (!getUserAccessToken()) {
      if (token) {
        REQUEST.AUTH_VERIFY_SIGNUP(token.toString())
          .then((response) => response.json())
          .then((data) => {
            if (data.message) {
              setMessage("Invalid or expired verification link.");
            } else {
              setIsVerified(true);
              setMessage("Your email has been verified.");
              saveToSessionStorage(
                SESSION_STORAGE_KEYS.ACCESS_TOKEN_KEY,
                data.accessToken
              );
              saveToSessionStorage(
                SESSION_STORAGE_KEYS.REFRESH_TOKEN_KEY,
                data.refreshToken
              );
            }
          })
          .catch((error) => {
            setMessage("Invalid or expired verification link.");
          });
      } else {
        setIsVerified(false);
        setMessage(
          "We've sent a verification link to your email. Please check and complete the verification."
        );
      }
    } else {
      setIsVerified(true);
      setMessage("Your email has been verified.");
    }
  }, [token]);
  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.card)}>
        <Card>
          <CardHeader></CardHeader>
          <CardBody className="flex-col justify-center align-center">
            <p>{message}</p>
          </CardBody>
          <CardFooter className="flex-col justify-center align-center">
            {(isVerified && (
              <Button
                className="max-w-[10rem] align-center justify-center"
                startContent={<IoArrowUndo />}
              >
                <Link href="/">Home</Link>
              </Button>
            )) || (
              <Button
                className="max-w-[10rem] align-center justify-center"
                startContent={<IoArrowUndo />}
              >
                <Link href="/auth/signup">Back to Sign Up</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
