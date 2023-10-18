import { Categories } from "../../category/models/categories.model";

export interface BlogPost{
  id: string,
  title: string,
  urlHandle: string,
  shortDescription: string,
  featuredImageUrl: string,
  content: string,
  author: string,
  publishedDate: Date,
  isVisible: boolean,

  // add categories here to link models like you did for api
  categories: Categories[];
}
