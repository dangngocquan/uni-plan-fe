import { REQUEST } from "../api/request";

export const saveToSessionStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, value);
  }
};

export const getFromSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(key);
  }
  return null;
};

export const removeFromSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};

export const refreshTokens = (role: string) => {
  if (role === "ADMIN") {
    const refreshToken = getFromSessionStorage(
      SESSION_STORAGE_KEYS.ADMIN_REFRESH_TOKEN_KEY
    );
    if (refreshToken) {
      return REQUEST.AUTH_REFRESH_TOKEN(refreshToken)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            removeFromSessionStorage(
              SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
            );
            removeFromSessionStorage(
              SESSION_STORAGE_KEYS.ADMIN_REFRESH_TOKEN_KEY
            );
          } else {
            saveToSessionStorage(
              SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY,
              res.accessToken
            );
            saveToSessionStorage(
              SESSION_STORAGE_KEYS.ADMIN_REFRESH_TOKEN_KEY,
              res.refreshToken
            );
          }
          return res;
        });
    }
    return new Promise(() => {});
  } else {
    const refreshToken = getFromSessionStorage(
      SESSION_STORAGE_KEYS.REFRESH_TOKEN_KEY
    );
    if (refreshToken) {
      return REQUEST.AUTH_REFRESH_TOKEN(refreshToken)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            removeFromSessionStorage(SESSION_STORAGE_KEYS.ACCESS_TOKEN_KEY);
            removeFromSessionStorage(SESSION_STORAGE_KEYS.REFRESH_TOKEN_KEY);
          } else {
            saveToSessionStorage(
              SESSION_STORAGE_KEYS.ACCESS_TOKEN_KEY,
              res.accessToken
            );
            saveToSessionStorage(
              SESSION_STORAGE_KEYS.REFRESH_TOKEN_KEY,
              res.refreshToken
            );
          }
          return res;
        });
    }
    return new Promise(() => {});
  }
};

export const SESSION_STORAGE_KEYS = {
  ACCESS_TOKEN_KEY: "univerplan-accessToken",
  REFRESH_TOKEN_KEY: "univerplan-refreshToken",
  ADMIN_ACCESS_TOKEN_KEY: "univerplan-admin-accessToken",
  ADMIN_REFRESH_TOKEN_KEY: "univerplan-admin-refreshToken",
};

export const getUserAccessToken = () =>
  getFromSessionStorage(SESSION_STORAGE_KEYS.ACCESS_TOKEN_KEY);

export const getUserRefreshToken = () =>
  getFromSessionStorage(SESSION_STORAGE_KEYS.REFRESH_TOKEN_KEY);

export const getAdminAccessToken = () =>
  getFromSessionStorage(SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY);

export const getAdminRefreshToken = () =>
  getFromSessionStorage(SESSION_STORAGE_KEYS.ADMIN_REFRESH_TOKEN_KEY);

export const logout = () => {
  removeFromSessionStorage(SESSION_STORAGE_KEYS.ACCESS_TOKEN_KEY);
  removeFromSessionStorage(SESSION_STORAGE_KEYS.REFRESH_TOKEN_KEY);
  removeFromSessionStorage(SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY);
  removeFromSessionStorage(SESSION_STORAGE_KEYS.ADMIN_REFRESH_TOKEN_KEY);
};
