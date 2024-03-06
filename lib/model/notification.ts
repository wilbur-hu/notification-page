export enum Action {
  React,
  Follow,
  JoinGroup,
  PrivateMessage,
  CommentOnPicture,
  LeftGroup,
}

export type Notification = {
  id: string;
  date: Date;
  action: Action;
  target: string | null;
  read: boolean;
  user: User;
};

export type User = {
  name: string;
  avatar: string;
};
