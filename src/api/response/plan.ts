import { ResponseCourse, ResponseGetCourse } from "./course";
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

export class ResponsePlanCourse {
  id: string;
  planId: string;
  baseCourseId: string;

  fourPointGrade: number;

  letterGrade: number;

  status: string;

  baseCourse: ResponseCourse;

  constructor() {
    this.id = "";
    this.planId = "";
    this.baseCourseId = "";
    this.fourPointGrade = 0;
    this.letterGrade = 0;
    this.status = "";
    this.baseCourse = new ResponseCourse();
  }
}

export class GradeStatus {
  no: number;
  grade: string;
  count: number;

  constructor() {
    this.no = 0;
    this.grade = "";
    this.count = 0;
  }
}


export class ResponsePlanSummary {
  totalCourses: number;
  totalCredits: number;
  numberCoursesCompleted: number;
  numberCreditsCompleted: number;
  currentCPA: number;
  grades: GradeStatus[];

  constructor() {
    this.totalCourses = 0;
    this.totalCredits = 0;
    this.numberCoursesCompleted = 0;
    this.numberCreditsCompleted = 0;
    this.currentCPA = 0;
    this.grades = [];
  }
}

export class ResponsePlanDetail extends ResponsePlan {
  courses: ResponsePlanCourse[];
  summary: ResponsePlanSummary;

  constructor() {
    super();
    this.courses = [];
    this.summary = new ResponsePlanSummary();
  }
}
