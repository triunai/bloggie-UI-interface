export interface UpdateBlogPostModel {
  title: string,
  urlHandle: string,
  shortDescription: string,
  featuredImageUrl: string,
  content: string,
  author: string,
  publishedDate: Date,
  isVisible: boolean,
  categories: string[]; //remmeber the dto model? this reflects that, it was an array of GUID, naturally corresponds to string
}

