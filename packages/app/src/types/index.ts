export type IImage = {
  id: string;
  url: string;
};

export type IVideo = {
  id: string;
  url: string;
  cover: string;
};

export type IPost = {
  id: string;
  title: string;
  category: string;
  images: IImage[];
  videos: IVideo[];
};

export type ICategory = {
  id: string;
  title: string;
  icon: string;
  feed: IFeed;
};

export type IFeed = {
  edges: IPostEdge[];
  pageInfo: IPageInfo;
};

export type IPostEdge = {
  node: IPost;
};

export type IPageInfo = {
  hasNextPage: boolean;
  endCursor: string;
};

export type ICategories = ICategory[]