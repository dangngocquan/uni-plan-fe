import { GroupCourseType } from "@/src/utils/enums";

export class RequestAdminAuthLogin {
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.password = "";
  }
}

// ADMIN SCHOOL

export class RequestAdminCreateSchool {
  name: string;

  constructor() {
    this.name = "";
  }
}

export class RequestAdminUpdateSchool {
  schoolId: string;
  name: string;

  constructor() {
    this.schoolId = "";
    this.name = "";
  }
}

export class RequestAdminDeleteSchool {
  schoolId: string;

  constructor() {
    this.schoolId = "";
  }
}

// ADMIN MAJOR

export class RequestAdminCreateMajor {
  name: string;
  schoolId: string;

  constructor() {
    this.name = "";
    this.schoolId = "";
  }
}

export class RequestAdminUpdateMajor {
  majorId: string;
  name: string;

  constructor() {
    this.majorId = "";
    this.name = "";
  }
}

export class RequestAdminDeleteMajor {
  majorId: string;

  constructor() {
    this.majorId = "";
  }
}

// GROUP COURSE
export class RequestAdminCreateGroupCourseRelation {
  groupId: string;
  parentGroupId: string;

  constructor() {
    this.groupId = "";
    this.parentGroupId = "";
  }
}

export class RequestAdminCreateGroupCourse {
  type: GroupCourseType;
  minCredits: number;
  minCourses: number;
  minGroups: number;
  majorId: string;
  title: string;
  description: string;
  parentGroupId: null | string;
  level: number;

  constructor() {
    this.type = GroupCourseType.MULTIPLE_SELECTION;
    this.minCredits = 0;
    this.minCourses = 0;
    this.minGroups = 0;
    this.majorId = "";
    this.title = "";
    this.description = "";
    this.parentGroupId = null;
    this.level = 1;
  }
}

export class RequestAdminUpdateGroupCourse {
  groupCourseId: string;
  minCredits: number;
  minCourses: number;
  minGroups: number;
  title: string;
  description: string;

  constructor() {
    this.groupCourseId = "";
    this.minCredits = 0;
    this.minCourses = 0;
    this.minGroups = 0;
    this.title = "";
    this.description = "";
  }
}

export class RequestAdminDeleteGroupCourse {
  groupCourseId: string;

  constructor() {
    this.groupCourseId = "";
  }
}

// GROUP COURSE
export class RequestAdminCreateCourseRelation {
  courseId: string;
  prereqCourseCode: string;

  constructor() {
    this.courseId = "";
    this.prereqCourseCode = "";
  }
}

export class RequestAdminUpdateCourseRelation {
  courseRelationId: string;
  prereqCourseCode: string;

  constructor() {
    this.courseRelationId = "";
    this.prereqCourseCode = "";
  }
}

export class RequestAdminDeleteCourseRelation {
  courseRelationId: string;

  constructor() {
    this.courseRelationId = "";
  }
}

export class RequestAdminCreateCourse {
  credits: number;
  code: string;
  name: string;
  groupId: string;

  constructor() {
    this.code = "";
    this.name = "";
    this.credits = 0;
    this.groupId = "";
  }
}

export class RequestAdminUpdateCourse {
  courseId: string;
  credits: number;
  code: string;
  name: string;

  constructor() {
    this.courseId = "";
    this.code = "";
    this.name = "";
    this.credits = 0;
  }
}

export class RequestAdminDeleteCourse {
  courseId: string;

  constructor() {
    this.courseId = "";
  }
}
