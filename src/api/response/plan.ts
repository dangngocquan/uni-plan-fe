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
  creditCount: number;

  constructor() {
    this.no = 0;
    this.grade = "";
    this.count = 0;
    this.creditCount = 0;
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

export class ResponseGradeCPAStatus {
  minCPA: number;
  minRoundCPA: number;
  maxCPA: number;
  maxRoundCPA: number;
  calculatorCPA: {
    grade: string;
    status: string;
    fourPointGrade: number;
    label: string;
    details: {
      case1: {
        id: string;
        fromTenPointGrade: number;
        toTenPointGrade: number;
        labelTenPointGrade: string;
        fourPointGrade: number;
        letterGrade: string;
        conversionTableId: string;
        count: number;
      }[];
      case2: {
        id: string;
        fromTenPointGrade: number;
        toTenPointGrade: number;
        labelTenPointGrade: string;
        fourPointGrade: number;
        letterGrade: string;
        conversionTableId: string;
        count: number;
      }[];
    };
  }[];

  constructor() {
    this.minCPA = 0;
    this.minRoundCPA = 0;
    this.maxCPA = 4;
    this.maxRoundCPA = 4;
    this.calculatorCPA = [];
  }
}

export class ResponseCPAStatus {
  currentCPA: number;
  withImprovements: ResponseGradeCPAStatus;
  withoutImprovements: ResponseGradeCPAStatus;

  constructor() {
    this.currentCPA = 0;
    this.withImprovements = new ResponseGradeCPAStatus();
    this.withoutImprovements = new ResponseGradeCPAStatus();
  }
}

export class ResponsePlanDetail extends ResponsePlan {
  courses: ResponsePlanCourse[];
  summary: ResponsePlanSummary;
  cpaStatus: ResponseCPAStatus;

  constructor() {
    super();
    this.courses = [];
    this.summary = new ResponsePlanSummary();
    this.cpaStatus = new ResponseCPAStatus();
  }
}
