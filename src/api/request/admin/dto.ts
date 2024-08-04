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
