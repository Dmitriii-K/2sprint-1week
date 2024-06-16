export enum SortDirection {
  asc,
  desc,
}

export type BlogPostInputModel = {
  title: string;
  shortDescription: string;
  content: string;
};

export type BlgId = {
  id: string;
};
