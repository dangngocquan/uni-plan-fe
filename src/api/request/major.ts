import API_ROUTES from "./router";

export interface IMajorSearch {
  order: string;
  page: number;
  limit: number;
  q: string;
  schoolId: string | null;
}

export const getMajors = (options: IMajorSearch) => {
  let queries = [];
  if (options.q) queries.push(`q=${options.q}`);
  if (options.limit) queries.push(`limit=${options.limit}`);
  if (options.page) queries.push(`page=${options.page}`);
  if (options.order) queries.push(`order=${options.order}`);
  if (options.schoolId != null) queries.push(`schoolId=${options.schoolId}`);

  return fetch(
    `${API_ROUTES.getMajors}?${queries.join("&")}`,
    {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      // },
    }
  );
};
