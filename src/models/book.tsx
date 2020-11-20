import { PublisherModel } from "./publisher";
import { AuthorModel } from "./author";
import { CategoryModel } from "./category";

export interface BookModel {
  id?: number;
  ISBN?: string;
  title?: string;
  author?: AuthorModel;
  publisher?: PublisherModel;
  summary?: string;
  category?: CategoryModel;
  thumbnail?: string;
  pictures?: string;
  status?: boolean;
}