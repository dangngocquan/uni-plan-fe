import API_ROUTES from "./router";

export interface ISearch {
  order: string;
  page: number;
  limit: number;
  q: string;
}

export const getSchool = (options: ISearch) => {
  let queries = [];
  if (options.q) queries.push(`q=${options.q}`);
  if (options.limit) queries.push(`limit=${options.limit}`);
  if (options.page) queries.push(`page=${options.page}`);
  if (options.order) queries.push(`order=${options.order}`);

  return fetch(`${API_ROUTES.getSchool}?${queries.join("&")}`, {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "*",
    // },
  });
};
