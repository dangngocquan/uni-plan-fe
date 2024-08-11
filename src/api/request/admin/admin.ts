import {
  getFromSessionStorage,
  refreshTokens,
  SESSION_STORAGE_KEYS,
} from "@/src/utils/sessionStorage";
import API_ROUTES from "../router";
import {
  RequestAdminAuthLogin,
  RequestAdminCreateCourse,
  RequestAdminCreateCourseRelation,
  RequestAdminCreateGroupCourse,
  RequestAdminCreateGroupCourseRelation,
  RequestAdminCreateMajor,
  RequestAdminCreateSchool,
  RequestAdminDeleteCourse,
  RequestAdminDeleteCourseRelation,
  RequestAdminDeleteGroupCourse,
  RequestAdminDeleteMajor,
  RequestAdminDeleteSchool,
  RequestAdminUpdateCourse,
  RequestAdminUpdateCourseRelation,
  RequestAdminUpdateGroupCourse,
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

export const requestWithRefreshTokens = (request: Function) => {
  return request()
    .then((res: any) => res.json())
    .then((data: any) => {
      if (data.message === "Invalid token") {
        return refreshTokens("ADMIN").then((res) => {
          return request().then((res: any) => res.json());
        });
      } else {
        return data;
      }
    });
};

// ADMIN SCHOOL
export const adminCreateSchool = (data: RequestAdminCreateSchool) => {
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
  })
    
};

export const adminDeleteSchool = (data: RequestAdminDeleteSchool) => {
  return fetch(API_ROUTES.adminDeleteSchool(data.schoolId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
  })
    
};

// ADMIN MAJOR

export const adminCreateMajor = (data: RequestAdminCreateMajor) => {
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
  })
   
};

export const adminUpdateMajor = (data: RequestAdminUpdateMajor) => {
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
  })
    
};

export const adminDeleteMajor = (data: RequestAdminDeleteMajor) => {
  return fetch(API_ROUTES.adminDeleteMajor(data.majorId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
  })
    
};

// ADMIN GROUP COURSE
export const adminCreateGroupCourse = async (
  data: RequestAdminCreateGroupCourse
) => {
  return fetch(API_ROUTES.adminCreateGroupCourse, {
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

export const adminCreateGroupCourseRelation = (
  data: RequestAdminCreateGroupCourseRelation
) => {
  return fetch(API_ROUTES.adminCreateGroupCourseRelation, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
    body: JSON.stringify(data),
  })
    
};

export const adminUpdateGroupCourse = (data: RequestAdminUpdateGroupCourse) => {
  return fetch(API_ROUTES.adminUpdateGroupCourse(data.groupCourseId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
    body: JSON.stringify(data),
  })
    
};

export const adminDeleteGroupCourse = (data: RequestAdminDeleteGroupCourse) => {
  return fetch(API_ROUTES.adminDeleteGroupCourse(data.groupCourseId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
  })
    
};

// ADMIN COURSE
export const adminCreateCourse = async (data: RequestAdminCreateCourse) => {
  return fetch(API_ROUTES.adminCreateCourse, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
    body: JSON.stringify(data),
  })
    
};

export const adminCreateCourseRelation = (
  data: RequestAdminCreateCourseRelation
) => {
  return fetch(API_ROUTES.adminCreateCourseRelation(data.courseId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
    body: JSON.stringify(data),
  })
    
};

export const adminUpdateCourse = (data: RequestAdminUpdateCourse) => {
  return fetch(API_ROUTES.adminUpdateCourse(data.courseId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
    body: JSON.stringify(data),
  }) 
};

export const adminDeleteCourse = (data: RequestAdminDeleteCourse) => {
  return fetch(API_ROUTES.adminDeleteCourse(data.courseId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
  })
};

export const adminUpdateCourseRelation = (data: RequestAdminUpdateCourseRelation) => {
  return fetch(API_ROUTES.adminUpdateCourseRelation(data.courseRelationId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
    body: JSON.stringify(data),
  }) 
};

export const adminDeleteCourseRelation = (data: RequestAdminDeleteCourseRelation) => {
  return fetch(API_ROUTES.adminDeleteCourseRelation(data.courseRelationId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getFromSessionStorage(
        SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY
      )}`,
    },
  })
};
