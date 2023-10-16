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
}
