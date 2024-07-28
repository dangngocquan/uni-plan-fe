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

export const SESSION_STORAGE_KEYS = {
  ACCESS_TOKEN_KEY: "univerplan-accessToken",
  REFRESH_TOKEN_KEY: "univerplan-refreshToken",
  ADMIN_ACCESS_TOKEN_KEY: "univerplan-admin-accessToken",
  ADMIN_REFRESH_TOKEN_KEY: "univerplan-admin-refreshToken",

};
