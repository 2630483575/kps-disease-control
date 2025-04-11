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
};
