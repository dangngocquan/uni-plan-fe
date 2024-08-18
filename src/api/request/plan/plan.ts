import {
  getFromSessionStorage,
  getUserAccessToken,
  SESSION_STORAGE_KEYS,
} from "@/src/utils/sessionStorage";
import API_ROUTES from "../router";
import {
  RequestCreatePlan,
  RequestCreatePlanCourse,
  RequestDeletePlan,
  RequestDeletePlanCourse,
  RequestUpdatePlan,
  RequestUpdatePlanCourse,
} from "./dto";

export interface IPlanSearch {
  order: string;
  page: number;
  limit: number;
  q: string;
}

export interface IPlanCourseSearch {
  order: string;
  page: number;
  limit: number;
  q: string;
  planId: string;
}

// PLANS

export const getPlans = (options: IPlanSearch) => {
  let queries = [];
  if (options.q) queries.push(`q=${options.q}`);
  if (options.limit) queries.push(`limit=${options.limit}`);
  if (options.page) queries.push(`page=${options.page}`);
  if (options.order) queries.push(`order=${options.order}`);

  return fetch(`${API_ROUTES.getPlans}?${queries.join("&")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getUserAccessToken()}`,
    },
  });
};

export const createPlan = (data: RequestCreatePlan) => {
  return fetch(API_ROUTES.createPlan, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getUserAccessToken()}`,
    },
    body: JSON.stringify(data),
  });
};

export const updatePlan = (data: RequestUpdatePlan) => {
  return fetch(API_ROUTES.updatePlan(data.planId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getUserAccessToken()}`,
    },
    body: JSON.stringify(data),
  });
};

export const deletePlan = (data: RequestDeletePlan) => {
  return fetch(API_ROUTES.deletePlan(data.planId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getUserAccessToken()}`,
    },
  });
};

// PLAN COURSES
export const getPlanCourses = (options: IPlanCourseSearch) => {
  let queries = [];
  if (options.q) queries.push(`q=${options.q}`);
  if (options.limit) queries.push(`limit=${options.limit}`);
  if (options.page) queries.push(`page=${options.page}`);
  if (options.order) queries.push(`order=${options.order}`);
  if (options.planId) queries.push(`planId=${options.planId}`);

  return fetch(`${API_ROUTES.getPlanCourses}?${queries.join("&")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getUserAccessToken()}`,
    },
  });
};

export const createPlanCourses = (data: RequestCreatePlanCourse) => {
  return fetch(API_ROUTES.createPlanCourse(data.planId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getUserAccessToken()}`,
    },
    body: JSON.stringify(data),
  });
};

export const updatePlanCourse = (data: RequestUpdatePlanCourse) => {
  return fetch(API_ROUTES.updatePlanCourse(data.planCourseId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getUserAccessToken()}`,
    },
    body: JSON.stringify(data),
  });
};

export const deletePlanCourse = (data: RequestDeletePlanCourse) => {
  return fetch(API_ROUTES.deletePlanCourse(data.planCourseId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      authorization: `Bearer ${getUserAccessToken()}`,
    },
  });
};
