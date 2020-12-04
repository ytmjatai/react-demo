import { DataNode } from "antd/lib/tree";
import { ICategory } from "./category";
import { IAuthor } from "./author";

export interface ICommomTreeData extends DataNode, ICategory, IAuthor {

}