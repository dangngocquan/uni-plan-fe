import { ResponsePageLinks, ResponsePageMeta } from "./pagination";

export class ResponseGetCourse {
  items: Array<ResponseCourse>;
  links: ResponsePageLinks;
  meta: ResponsePageMeta;

  constructor() {
    this.items = [];
    this.links = new ResponsePageLinks();
    this.meta = new ResponsePageMeta();
  }
}

export class ResponseCourse {
  id: string;
  code: string;
  name: string;
  credits: number;
  groupId: string;
  prereqCourseRelations: ResponseCourseRelationDto[];

  constructor() {
    this.id = "";
    this.code = "";
    this.name = "";
    this.credits = 1;
    this.groupId = "";
    this.prereqCourseRelations = [];
  }
}

export class ResponseCourseRelationDto {
  id: string;
  courseId: string;
  prereqCourseCode: string;

  constructor() {
    this.id = "";
    this.courseId = "";
    this.prereqCourseCode = "";
  }
}
