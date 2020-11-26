export interface AntdTreeModel {
  key?: number | string;
  title?: string;
  children?: AntdTreeModel;
  selectable?: boolean;
}