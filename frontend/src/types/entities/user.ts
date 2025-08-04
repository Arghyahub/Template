export type UserType = "admin" | "owner" | "employee";

class User {
  id: number;
  name: string;
  email: string;
  password?: string;
  user_type: UserType;
  access_role_id: string;
  access_role: Record<string, any>;

  constructor() {
    this.id = null;
    this.name = "";
    this.email = "";
    this.password = "";
    this.user_type = "employee";
    this.access_role_id = "";
  }
}

export default User;
