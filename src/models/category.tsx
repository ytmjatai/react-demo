export interface CategoryModel {
  id?: number;
  title?: string;
  code?: string;
  parentId?: number;
  url?: string;
  sequence?: number;

  value?: number | string;
  pId ?: number;
}