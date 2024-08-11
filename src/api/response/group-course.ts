import { RequestAdminCreateGroupCourseRelation } from "../request/admin/dto";
import { ResponseCourse } from "./course";
import { ResponsePageLinks, ResponsePageMeta } from "./pagination";

export class ResponseGetGroupCourse {
  items: Array<ResponseGroupCourse>;
  links: ResponsePageLinks;
  meta: ResponsePageMeta;

  constructor() {
    this.items = [];
    this.links = new ResponsePageLinks();
    this.meta = new ResponsePageMeta();
  }
}

export class ResponseGroupCourse {
  id: string;
  type: string;
  minCredits: number;
  minCourses: number;
  minGroups: number;
  majorId: string;
  title: string;
  description: string;
  level: number;

  constructor() {
    this.id = "";
    this.type = "";
    this.minCredits = 0;
    this.minCourses = 0;
    this.minGroups = 0;
    this.majorId = "";
    this.title = "";
    this.description = "";
    this.level = 0;
  }
}

export class ResponseGroupCourseDetails extends ResponseGroupCourse {
  relationChildren: RequestAdminCreateGroupCourseRelation[];
  courses: ResponseCourse[];
  children: ResponseGroupCourseDetails[];

  constructor() {
    super();
    this.relationChildren = [];
    this.courses = [];
    this.children = [];
  }
}
