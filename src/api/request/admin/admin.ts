import {
  getFromSessionStorage,
  refreshTokens,
  SESSION_STORAGE_KEYS,
} from "@/src/utils/sessionStorage";
import API_ROUTES from "../router";
import {
  RequestAdminAuthLogin,
  RequestAdminCreateMajor,
  RequestAdminCreateSchool,
  RequestAdminDeleteMajor,
  RequestAdminDeleteSchool,
  RequestAdminUpdateMajor,
  RequestAdminUpdateSchool,
} from "./dto";

export const adminAuthLogin = (data: RequestAdminAuthLogin) => {
  return fetch(API_ROUTES.adminAuthLogin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  });
};


// ADMIN SCHOOL
export const adminCreateSchool = (data: RequestAdminCreateSchool) => {
  refreshTokens("ADMIN");
  return fetch(API_ROUTES.adminCreateSchool, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
    body: JSON.stringify(data),
  });
};

export const adminUpdateSchool = (data: RequestAdminUpdateSchool) => {
  refreshTokens("ADMIN");
  return fetch(API_ROUTES.adminUpdateSchool(data.schoolId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
    body: JSON.stringify({
      name: `${data.name}`,
    }),
  });
};

export const adminDeleteSchool = (data: RequestAdminDeleteSchool) => {
  refreshTokens("ADMIN");
  return fetch(API_ROUTES.adminDeleteSchool(data.schoolId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
  });
};

// ADMIN MAJOR

export const adminCreateMajor = (data: RequestAdminCreateMajor) => {
  refreshTokens("ADMIN");
  return fetch(API_ROUTES.adminCreateMajor, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
    body: JSON.stringify(data),
  });
};

export const adminUpdateMajor = (data: RequestAdminUpdateMajor) => {
  refreshTokens("ADMIN");
  return fetch(API_ROUTES.adminUpdateMajor(data.majorId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
    body: JSON.stringify({
      name: `${data.name}`,
    }),
  });
};

export const adminDeleteMajor = (data: RequestAdminDeleteMajor) => {
  refreshTokens("ADMIN");
  return fetch(API_ROUTES.adminDeleteMajor(data.majorId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
  });
};

