export type UserType = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type CommentType = {
  id: string;
  date: string;
  user: UserType;
  comment: string;
  rating: number;
};

export type CommentsType = CommentType[];

export type NewCommentType = {
  offerId: string;
  comment: string;
  rating: number;
}
