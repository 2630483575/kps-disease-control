import { IsideMenu } from "../types/side";

interface IresMenuData {
  path: string;
  menuName: string;
  children: IresMenuData[];
}

export const convertSideMenu: Function = (
  menuList: IresMenuData[]
): IsideMenu[] => {
  return menuList.map((item, i) => {
    let children = null;

    if (item.children && item.path !== "Perm") {
      children = convertSideMenu(item.children);
    }

    return {
      key: item.path,
      label: item.menuName,
      children: children,
    };
  });
};

export const getPermTabs: Function = (
  menuList: IresMenuData[]
): { key: string; label: string }[] => {
  const permArr =
    menuList
      .find((item) => (item.path = "System"))
      ?.children.find((item) => item.path === "Perm")?.children || [];
  return permArr.map((item, i) => {
    return {
      key: item.path,
      label: item.menuName,
    };
  });
};
