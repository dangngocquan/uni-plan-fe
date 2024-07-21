import API_ROUTES from "./router";

export const authGoogle = (googleAccessToken: string) => {
  return fetch(API_ROUTES.authGoogle, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      googleAccessToken: `${googleAccessToken}`,
    }),
  });
};

export const authSignIn = (email: string, password: string) => {
  return fetch(API_ROUTES.authSignIn, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: `${email}`,
      password: `${password}`,
    }),
  });
};

export const authSignUp = (name: string, email: string, password: string) => {
  return fetch(API_ROUTES.authSignUp, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      name: `${name}`,
      email: `${email}`,
      password: `${password}`,
    }),
  });
};

export const authVerifySignUp = (token: string) => {
  return fetch(API_ROUTES.authVerifySignUp, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      token: `${token}`,
    }),
  });
};

export const authForgotPassword = (email: string) => {
  return fetch(API_ROUTES.authForgotPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: `${email}`,
    }),
  });
};

export const authResetPassword = (token: string, newPassword: string) => {
  return fetch(API_ROUTES.authResetPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      token: token,
      newPassword: `${newPassword}`,
    }),
  });
};
