import { UserTypeEntity } from "./user-entity";

class RoleEntity {
  id: number;
  name: string;
  description: string;
  is_master: boolean;
  for_type: UserTypeEntity;
  role: Record<string, any>;
  created_at?: Date;
  updated_by_id: string;
  updated_by_user?: UserTypeEntity;
  updated_at?: Date;
  users: string[];

  constructor() {
    this.id = null;
    this.name = "";
    this.description = "";
    this.is_master = true;
    this.for_type = "employee";
    this.role = {};
    this.created_at = null;
    this.updated_by_id = "";
    this.updated_by_user = undefined;
    this.updated_at = null;
    this.users = [];
  }
}

export default RoleEntity;
