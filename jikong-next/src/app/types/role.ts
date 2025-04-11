export type IRoleData = {
  id: number;
  roleId: number;
  roleName: string;
};

export type leftRoleMenu = {
  key: number;
  label: string;
};

export type treeSingleType = {
  title: string;
  key: string;
  children: treeSingleType[];
  disabled?: boolean;
};
export type relatedUserType = {
  key: number;
  userName: string;
  phone: string;
  email: string;
  relatedTime: string;
  status: number;
};
