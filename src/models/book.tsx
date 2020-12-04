import { IPublisher } from "./publisher";
import { IAuthor } from "./author";
import { ICategory } from "./category";

export interface IBook {
  id?: number;
  ISBN?: string;
  title?: string;
  author?: IAuthor;
  publisher?: IPublisher;
  summary?: string;
  category?: ICategory;
  thumbnail?: string;
  pictures?: string;
  status?: boolean;
}