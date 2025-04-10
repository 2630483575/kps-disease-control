export type DataType = {
  id?: number;
  userName?: string;
  phoneNumber?: string;
  email?: string;
  roleName?: string;
  createTime?: string;
  status?: number;
  sex?: number;
  password?: string;
  remark?: string;
  userId?: number;
};
export type userResType = {
  id?: number;
  userName?: string;
  phoneNumber?: string;
  email?: string;
  roleNames: string[];
  createTime?: string;
  status?: number;
  sex?: number;
  password?: string;
  remark?: string;
  userId?: number;
};
export type userByDept = {
  depId: number;
};
export type roleDataType = {
  roleId?: number;
  roleName?: string;
};
