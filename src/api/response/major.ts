import { ResponseGroupCourseDetails } from "./group-course";
import { ResponsePageLinks, ResponsePageMeta } from "./pagination";

export class ResponseGetMajor {
  items: Array<ResponseMajor>;
  links: ResponsePageLinks;
  meta: ResponsePageMeta;

  constructor() {
    this.items = [];
    this.links = new ResponsePageLinks();
    this.meta = new ResponsePageMeta();
  }
}

export class ResponseMajor {
  id: string;
  name: string;
  schoolId: string;

  constructor() {
    this.id = "";
    this.name = "";
    this.schoolId = "";
  }
}

export class ResponseMajorDetail extends ResponseMajor {
  groupCourses: ResponseGroupCourseDetails[];

  constructor() {
    super();
    this.groupCourses = [];
  }
}
