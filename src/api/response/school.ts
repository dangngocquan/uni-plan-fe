import { ResponsePageLinks, ResponsePageMeta } from "./pagination";

export class ResponseGetSchool {
  items: Array<ResponseSchool>;
  links: ResponsePageLinks;
  meta: ResponsePageMeta;

  constructor() {
    this.items = [];
    this.links = new ResponsePageLinks();
    this.meta = new ResponsePageMeta();
  }
}

export class ResponseSchool {
  id: string;
  name: string;

  constructor() {
    this.id = "";
    this.name = "";
  }
}
