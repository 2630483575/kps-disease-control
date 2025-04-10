export type leftDictMenu = {
  key: number;
  label: string;
  children: leftDictMenu[];
};
// 返回的包含两个menu数据的数组
export type IDictTypeData = {
  cateType: string;
  cateDesc: string;
  children: IDictListData[];
};
// 字典左边menu
export type IDictListData = {
  id: number;
  name: string;
  children: IDictListData[];
};
// 标签列表数据类型
export type tagDataType = {
  index?: number;
  tagName?: string;
  updateTime?: string;
  rank?: number;
  tagId?: number;
};
// 标签列表返回数据
export type tagResType = {
  id?: number;
  tagName?: string;
  updateTime?: string;
  tagId?: number;
  rank?: number;
};
