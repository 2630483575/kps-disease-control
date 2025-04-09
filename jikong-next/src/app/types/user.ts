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
};
export type userResType = {
  id?: number;
  userName?: string;
  phoneNumber?: string;
  email?: string;
  roleNames?: string[];
  createTime?: string;
  status?: number;
  sex?: number;
  password?: string;
  remark?: string;
};
export type userByDept = {
  depId: number;
};
