import API_ROUTES from "./router";

export const adminAuthLogin = (email: string, password: string) => {
  return fetch(API_ROUTES.adminAuthLogin, {
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

