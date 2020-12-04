export interface ICategory {
  id?: number;
  title?: string | React.ReactNode;
  code?: string;
  parentId?: number;
  url?: string;
  sequence?: number;

  value?: number | string;
  pId?: number;
  pid?: number;
}