export type IdeplistData = {
  id: number;
  label: string;
  children: IdeplistData[];
  isSelected?: number;
};

export type leftDepMenu = {
  key: number;
  label: string;
  children: leftDepMenu[];
};
