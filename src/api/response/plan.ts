import { ResponsePageLinks, ResponsePageMeta } from "./pagination";

export class ResponseGetPlan {
  items: Array<ResponsePlan>;
  links: ResponsePageLinks;
  meta: ResponsePageMeta;

  constructor() {
    this.items = [];
    this.links = new ResponsePageLinks();
    this.meta = new ResponsePageMeta();
  }
}

export class ResponsePlan {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
  status: string;
  updatedAt: Date;

  constructor() {
    this.id = "";
    this.name = "";
    this.ownerId = "";
    this.createdAt = new Date();
    this.status = "";
    this.updatedAt = new Date();
  }
}
