export class ResponseAuthMe {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string;

  constructor() {
    this.id = "";
    this.email = "";
    this.name = "";
    this.role = "USER";
    this.avatar = "";
  }
}
