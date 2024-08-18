export class RequestCreatePlan {
  name: string;

  constructor() {
    this.name = "";
  }
}

export class RequestUpdatePlan {
  planId: string;
  name: string;
  status: string;

  constructor() {
    this.planId = "";
    this.name = "";
    this.status = "COMPLETED";
  }
}

export class RequestDeletePlan {
  planId: string;

  constructor() {
    this.planId = "";
  }
}

export class RequestCreatePlanCourse {
  planId: string;
  baseCourseIds: string[];

  constructor() {
    this.planId = "";
    this.baseCourseIds = [];
  }
}

export class RequestUpdatePlanCourse {
  planCourseId: string;
  letterGrade: string;

  constructor() {
    this.planCourseId = "";
    this.letterGrade = "";
  }
}

export class RequestDeletePlanCourse {
  planCourseId: string;

  constructor() {
    this.planCourseId = "";
  }
}
