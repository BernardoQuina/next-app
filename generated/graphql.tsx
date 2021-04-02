import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  /** Only logged in user can query it but its hashed anyway */
  password?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  followers: Array<User>;
  following: Array<User>;
  posts: Array<Post>;
  comments: Array<Comment>;
  likes: Array<Like>;
  myNotification: Array<Notification>;
  sentNotification: Array<Notification>;
  followersCount?: Maybe<Scalars['Int']>;
  followingCount?: Maybe<Scalars['Int']>;
  followsMe?: Maybe<Scalars['Boolean']>;
  IFollow?: Maybe<Scalars['Boolean']>;
};


export type UserFollowersArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<UserWhereUniqueInput>;
};


export type UserFollowingArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<UserWhereUniqueInput>;
};


export type UserPostsArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<PostWhereUniqueInput>;
};


export type UserCommentsArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<CommentWhereUniqueInput>;
};


export type UserLikesArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<LikeWhereUniqueInput>;
};


export type UserMyNotificationArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<NotificationWhereUniqueInput>;
};


export type UserSentNotificationArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<NotificationWhereUniqueInput>;
};

export type UserSubResponse = {
  __typename?: 'userSubResponse';
  mutation?: Maybe<Scalars['String']>;
  data?: Maybe<User>;
};

export type Post = {
  __typename?: 'Post';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  images: Array<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  comments: Array<Comment>;
  likes: Array<Like>;
  textSnippet?: Maybe<Scalars['String']>;
  commentCount?: Maybe<Scalars['Int']>;
  likeCount?: Maybe<Scalars['Int']>;
};


export type PostCommentsArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<CommentWhereUniqueInput>;
};


export type PostLikesArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<LikeWhereUniqueInput>;
};

export type PostSubResponse = {
  __typename?: 'postSubResponse';
  mutation?: Maybe<Scalars['String']>;
  data?: Maybe<Post>;
};

export type Comment = {
  __typename?: 'Comment';
  id?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['String']>;
};

export type CommentSubResponse = {
  __typename?: 'commentSubResponse';
  mutation?: Maybe<Scalars['String']>;
  data?: Maybe<Comment>;
};

export type Like = {
  __typename?: 'Like';
  active?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['String']>;
};

export type Notification = {
  __typename?: 'Notification';
  id?: Maybe<Scalars['String']>;
  receiver?: Maybe<User>;
  receiverId?: Maybe<Scalars['String']>;
  dispatcher?: Maybe<User>;
  dispatcherId?: Maybe<Scalars['String']>;
  seen?: Maybe<Scalars['Boolean']>;
  read?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
};

export type PostWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type CommentWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type LikeWhereUniqueInput = {
  userId_postId?: Maybe<LikeUserIdPostIdCompoundUniqueInput>;
};

export type NotificationWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  id?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  password?: Maybe<StringNullableFilter>;
  email?: Maybe<StringFilter>;
  googleId?: Maybe<StringNullableFilter>;
  facebookId?: Maybe<StringNullableFilter>;
  photo?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  followers?: Maybe<UserListRelationFilter>;
  following?: Maybe<UserListRelationFilter>;
  posts?: Maybe<PostListRelationFilter>;
  comments?: Maybe<CommentListRelationFilter>;
  likes?: Maybe<LikeListRelationFilter>;
  myNotification?: Maybe<NotificationListRelationFilter>;
  sentNotification?: Maybe<NotificationListRelationFilter>;
};

export type UserOrderByInput = {
  id?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  googleId?: Maybe<SortOrder>;
  facebookId?: Maybe<SortOrder>;
  photo?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type PostWhereInput = {
  AND?: Maybe<Array<PostWhereInput>>;
  OR?: Maybe<Array<PostWhereInput>>;
  NOT?: Maybe<Array<PostWhereInput>>;
  id?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  body?: Maybe<StringFilter>;
  images?: Maybe<StringNullableListFilter>;
  published?: Maybe<BoolFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  author?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
  comments?: Maybe<CommentListRelationFilter>;
  likes?: Maybe<LikeListRelationFilter>;
};

export type PostOrderByInput = {
  id?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  body?: Maybe<SortOrder>;
  images?: Maybe<SortOrder>;
  published?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
};

export type CommentWhereInput = {
  AND?: Maybe<Array<CommentWhereInput>>;
  OR?: Maybe<Array<CommentWhereInput>>;
  NOT?: Maybe<Array<CommentWhereInput>>;
  id?: Maybe<StringFilter>;
  text?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  author?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
  post?: Maybe<PostWhereInput>;
  postId?: Maybe<StringFilter>;
};

export type CommentOrderByInput = {
  id?: Maybe<SortOrder>;
  text?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  postId?: Maybe<SortOrder>;
};

export type LikeWhereInput = {
  AND?: Maybe<Array<LikeWhereInput>>;
  OR?: Maybe<Array<LikeWhereInput>>;
  NOT?: Maybe<Array<LikeWhereInput>>;
  active?: Maybe<BoolFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  author?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
  post?: Maybe<PostWhereInput>;
  postId?: Maybe<StringFilter>;
};

export type LikeOrderByInput = {
  active?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  postId?: Maybe<SortOrder>;
};

export type NotificationWhereInput = {
  AND?: Maybe<Array<NotificationWhereInput>>;
  OR?: Maybe<Array<NotificationWhereInput>>;
  NOT?: Maybe<Array<NotificationWhereInput>>;
  id?: Maybe<StringFilter>;
  receiver?: Maybe<UserWhereInput>;
  receiverId?: Maybe<StringFilter>;
  dispatcher?: Maybe<UserWhereInput>;
  dispatcherId?: Maybe<StringFilter>;
  seen?: Maybe<BoolFilter>;
  read?: Maybe<BoolFilter>;
  message?: Maybe<StringFilter>;
  link?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type NotificationOrderByInput = {
  id?: Maybe<SortOrder>;
  receiverId?: Maybe<SortOrder>;
  dispatcherId?: Maybe<SortOrder>;
  seen?: Maybe<SortOrder>;
  read?: Maybe<SortOrder>;
  message?: Maybe<SortOrder>;
  link?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type LikeUserIdPostIdCompoundUniqueInput = {
  userId: Scalars['String'];
  postId: Scalars['String'];
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringFilter>;
};

export type StringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type UserListRelationFilter = {
  every?: Maybe<UserWhereInput>;
  some?: Maybe<UserWhereInput>;
  none?: Maybe<UserWhereInput>;
};

export type PostListRelationFilter = {
  every?: Maybe<PostWhereInput>;
  some?: Maybe<PostWhereInput>;
  none?: Maybe<PostWhereInput>;
};

export type CommentListRelationFilter = {
  every?: Maybe<CommentWhereInput>;
  some?: Maybe<CommentWhereInput>;
  none?: Maybe<CommentWhereInput>;
};

export type LikeListRelationFilter = {
  every?: Maybe<LikeWhereInput>;
  some?: Maybe<LikeWhereInput>;
  none?: Maybe<LikeWhereInput>;
};

export type NotificationListRelationFilter = {
  every?: Maybe<NotificationWhereInput>;
  some?: Maybe<NotificationWhereInput>;
  none?: Maybe<NotificationWhereInput>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringNullableListFilter = {
  equals?: Maybe<Array<Scalars['String']>>;
  has?: Maybe<Scalars['String']>;
  hasEvery?: Maybe<Array<Scalars['String']>>;
  hasSome?: Maybe<Array<Scalars['String']>>;
  isEmpty?: Maybe<Scalars['Boolean']>;
};

export type BoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type NestedStringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
};

export type NestedStringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type NestedBoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users: Array<User>;
  userCount?: Maybe<Scalars['Int']>;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  postCount?: Maybe<Scalars['Int']>;
  myPosts: Array<Maybe<Post>>;
  comment?: Maybe<Comment>;
  comments: Array<Comment>;
  commentCount?: Maybe<Scalars['Int']>;
  like?: Maybe<Like>;
  likes: Array<Like>;
  likeCount?: Maybe<Scalars['Int']>;
  notification?: Maybe<Notification>;
  notifications: Array<Notification>;
  myNotifications?: Maybe<Array<Maybe<Notification>>>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<UserWhereUniqueInput>;
};


export type QueryPostArgs = {
  where: PostWhereUniqueInput;
};


export type QueryPostsArgs = {
  where?: Maybe<PostWhereInput>;
  orderBy?: Maybe<Array<PostOrderByInput>>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<PostWhereUniqueInput>;
};


export type QueryMyPostsArgs = {
  take: Scalars['Int'];
  skip: Scalars['Int'];
};


export type QueryCommentArgs = {
  where: CommentWhereUniqueInput;
};


export type QueryCommentsArgs = {
  where?: Maybe<CommentWhereInput>;
  orderBy?: Maybe<Array<CommentOrderByInput>>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<CommentWhereUniqueInput>;
};


export type QueryLikeArgs = {
  where: LikeWhereUniqueInput;
};


export type QueryLikesArgs = {
  where?: Maybe<LikeWhereInput>;
  orderBy?: Maybe<Array<LikeOrderByInput>>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<LikeWhereUniqueInput>;
};


export type QueryNotificationArgs = {
  where: NotificationWhereUniqueInput;
};


export type QueryNotificationsArgs = {
  where?: Maybe<NotificationWhereInput>;
  orderBy?: Maybe<Array<NotificationOrderByInput>>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<NotificationWhereUniqueInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  loginUser?: Maybe<User>;
  logoutUser?: Maybe<Scalars['Boolean']>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  changePassword?: Maybe<User>;
  follow?: Maybe<User>;
  unfollow?: Maybe<User>;
  createPost?: Maybe<Post>;
  updatePost?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  createComment?: Maybe<Comment>;
  updateComment?: Maybe<Comment>;
  deleteComment?: Maybe<Comment>;
  likePost?: Maybe<Like>;
  markAsSeen?: Maybe<Scalars['Boolean']>;
  markAsRead?: Maybe<Notification>;
};


export type MutationCreateUserArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  password: Scalars['String'];
  updateName?: Maybe<Scalars['String']>;
  updatePhoto?: Maybe<Scalars['String']>;
  updateEmail?: Maybe<Scalars['String']>;
  updatePassword?: Maybe<Scalars['String']>;
  confirmNewPassword?: Maybe<Scalars['String']>;
};


export type MutationDeleteUserArgs = {
  password?: Maybe<Scalars['String']>;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
};


export type MutationFollowArgs = {
  userId: Scalars['String'];
};


export type MutationUnfollowArgs = {
  userId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
  body: Scalars['String'];
  images: Array<Scalars['String']>;
  published: Scalars['Boolean'];
};


export type MutationUpdatePostArgs = {
  whereId: Scalars['String'];
  updateTitle?: Maybe<Scalars['String']>;
  updateBody?: Maybe<Scalars['String']>;
  updatePublished?: Maybe<Scalars['Boolean']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  postId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  whereId: Scalars['String'];
  updateText: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
};


export type MutationLikePostArgs = {
  postId: Scalars['String'];
};


export type MutationMarkAsSeenArgs = {
  notificationsIds: Array<Scalars['String']>;
};


export type MutationMarkAsReadArgs = {
  notificationId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  userSub?: Maybe<UserSubResponse>;
  postSubByUser?: Maybe<PostSubResponse>;
  postSub?: Maybe<PostSubResponse>;
  myPostSub?: Maybe<PostSubResponse>;
  commentSubByUser?: Maybe<CommentSubResponse>;
  commentSubByPost?: Maybe<CommentSubResponse>;
  commentSub?: Maybe<CommentSubResponse>;
};


export type SubscriptionUserSubArgs = {
  userId: Scalars['ID'];
};


export type SubscriptionPostSubByUserArgs = {
  userId: Scalars['String'];
};


export type SubscriptionPostSubArgs = {
  postId: Scalars['String'];
};


export type SubscriptionCommentSubByUserArgs = {
  userId: Scalars['ID'];
};


export type SubscriptionCommentSubByPostArgs = {
  postId: Scalars['ID'];
};


export type SubscriptionCommentSubArgs = {
  commentId: Scalars['ID'];
};

export type PostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'published' | 'title' | 'textSnippet' | 'images' | 'likeCount' | 'commentCount' | 'userId'>
  & { author?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'photo'>
  )> }
);

export type BasicUserInfoFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'email' | 'photo' | 'googleId' | 'facebookId' | 'followersCount' | 'followingCount' | 'followsMe' | 'IFollow'>
);

export type CommentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'createdAt' | 'text' | 'postId'>
  & { author?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'photo'>
  )> }
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'email' | 'photo' | 'googleId' | 'facebookId' | 'createdAt' | 'updatedAt' | 'followersCount' | 'followingCount' | 'followsMe' | 'IFollow'>
  & { likes: Array<(
    { __typename?: 'Like' }
    & Pick<Like, 'postId' | 'active'>
  )> }
);

export type LikePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type LikePostMutation = (
  { __typename?: 'Mutation' }
  & { likePost?: Maybe<(
    { __typename?: 'Like' }
    & Pick<Like, 'active' | 'createdAt' | 'userId' | 'postId'>
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
    & { likes: Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'active' | 'postId'>
    )> }
  )> }
);

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & { deleteComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text' | 'postId'>
  )> }
);

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'body' | 'published'>
  )> }
);

export type DeleteUserMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  )> }
);

export type EditCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
  text: Scalars['String'];
}>;


export type EditCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text' | 'createdAt'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  )> }
);

export type EditPostMutationVariables = Exact<{
  postId: Scalars['String'];
  updatePublished?: Maybe<Scalars['Boolean']>;
  updateTitle?: Maybe<Scalars['String']>;
  updateBody?: Maybe<Scalars['String']>;
}>;


export type EditPostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'body' | 'published'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  )> }
);

export type EditUserMutationVariables = Exact<{
  password: Scalars['String'];
  updateName?: Maybe<Scalars['String']>;
  updatePhoto?: Maybe<Scalars['String']>;
  updateEmail?: Maybe<Scalars['String']>;
  updatePassword?: Maybe<Scalars['String']>;
  confirmNewPassword?: Maybe<Scalars['String']>;
}>;


export type EditUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'photo' | 'email' | 'password' | 'createdAt' | 'updatedAt'>
    & { likes: Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'active' | 'postId'>
    )> }
  )> }
);

export type FollowMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FollowMutation = (
  { __typename?: 'Mutation' }
  & { follow?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { loginUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
    & { likes: Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'active' | 'postId'>
    )> }
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logoutUser'>
);

export type MarkAsSeenMutationVariables = Exact<{
  notificationsIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type MarkAsSeenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'markAsSeen'>
);

export type MarkAsReadMutationVariables = Exact<{
  notificationId: Scalars['String'];
}>;


export type MarkAsReadMutation = (
  { __typename?: 'Mutation' }
  & { markAsRead?: Maybe<(
    { __typename?: 'Notification' }
    & Pick<Notification, 'id' | 'read'>
  )> }
);

export type NewCommentMutationVariables = Exact<{
  postId: Scalars['String'];
  text: Scalars['String'];
}>;


export type NewCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  )> }
);

export type NewPostMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
  images: Array<Scalars['String']> | Scalars['String'];
  published: Scalars['Boolean'];
}>;


export type NewPostMutation = (
  { __typename?: 'Mutation' }
  & { createPost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'body' | 'images' | 'published'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
    & { likes: Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'active' | 'postId'>
    )> }
  )> }
);

export type UnfollowMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UnfollowMutation = (
  { __typename?: 'Mutation' }
  & { unfollow?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type MyNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNotificationsQuery = (
  { __typename?: 'Query' }
  & { myNotifications?: Maybe<Array<Maybe<(
    { __typename?: 'Notification' }
    & Pick<Notification, 'id' | 'receiverId' | 'dispatcherId' | 'read' | 'seen' | 'message' | 'link'>
    & { dispatcher?: Maybe<(
      { __typename?: 'User' }
      & BasicUserInfoFragment
    )> }
  )>>> }
);

export type MyPostsQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
}>;


export type MyPostsQuery = (
  { __typename?: 'Query' }
  & { myPosts: Array<Maybe<(
    { __typename?: 'Post' }
    & PostSnippetFragment
  )>> }
);

export type PostsQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & PostSnippetFragment
  )> }
);

export type SingleCommentQueryVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type SingleCommentQuery = (
  { __typename?: 'Query' }
  & { comment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  )> }
);

export type SinglePostQueryVariables = Exact<{
  postId?: Maybe<Scalars['String']>;
}>;


export type SinglePostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'body' | 'images' | 'published' | 'likeCount' | 'commentCount' | 'createdAt' | 'updatedAt'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'photo'>
    )>, comments: Array<(
      { __typename?: 'Comment' }
      & CommentFragment
    )> }
  )> }
);

export type UserQueryVariables = Exact<{
  userId?: Maybe<Scalars['String']>;
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & BasicUserInfoFragment
  )> }
);

export type UserPostsQueryVariables = Exact<{
  userId?: Maybe<Scalars['String']>;
  take: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type UserPostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & PostSnippetFragment
  )> }
);

export type MyPostsSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MyPostsSubSubscription = (
  { __typename?: 'Subscription' }
  & { myPostSub?: Maybe<(
    { __typename?: 'postSubResponse' }
    & Pick<PostSubResponse, 'mutation'>
    & { data?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'body'>
    )> }
  )> }
);

export type UserPostsSubSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserPostsSubSubscription = (
  { __typename?: 'Subscription' }
  & { postSubByUser?: Maybe<(
    { __typename?: 'postSubResponse' }
    & Pick<PostSubResponse, 'mutation'>
    & { data?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'body'>
    )> }
  )> }
);

export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  updatedAt
  published
  title
  textSnippet
  images
  likeCount
  commentCount
  userId
  author {
    id
    name
    photo
  }
}
    `;
export const BasicUserInfoFragmentDoc = gql`
    fragment BasicUserInfo on User {
  id
  name
  email
  photo
  googleId
  facebookId
  followersCount
  followingCount
  followsMe
  IFollow
}
    `;
export const CommentFragmentDoc = gql`
    fragment Comment on Comment {
  id
  createdAt
  text
  author {
    id
    name
    photo
  }
  postId
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  name
  email
  photo
  googleId
  facebookId
  createdAt
  updatedAt
  followersCount
  followingCount
  followsMe
  IFollow
  likes {
    postId
    active
  }
}
    `;
export const LikePostDocument = gql`
    mutation LikePost($postId: String!) {
  likePost(postId: $postId) {
    active
    createdAt
    userId
    postId
  }
}
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, baseOptions);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!, $confirmPassword: String!) {
  changePassword(
    token: $token
    newPassword: $newPassword
    confirmPassword: $confirmPassword
  ) {
    id
    name
    email
    likes {
      active
      postId
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: String!) {
  deleteComment(id: $commentId) {
    id
    text
    postId
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, baseOptions);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String!) {
  deletePost(id: $postId) {
    id
    title
    body
    published
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($password: String!) {
  deleteUser(password: $password) {
    id
    name
    email
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const EditCommentDocument = gql`
    mutation EditComment($commentId: String!, $text: String!) {
  updateComment(whereId: $commentId, updateText: $text) {
    id
    text
    createdAt
    author {
      id
      name
    }
  }
}
    `;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useEditCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>) {
        return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument, baseOptions);
      }
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;
export const EditPostDocument = gql`
    mutation EditPost($postId: String!, $updatePublished: Boolean, $updateTitle: String, $updateBody: String) {
  updatePost(
    whereId: $postId
    updatePublished: $updatePublished
    updateTitle: $updateTitle
    updateBody: $updateBody
  ) {
    id
    title
    body
    published
    author {
      id
      name
    }
  }
}
    `;
export type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      updatePublished: // value for 'updatePublished'
 *      updateTitle: // value for 'updateTitle'
 *      updateBody: // value for 'updateBody'
 *   },
 * });
 */
export function useEditPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, baseOptions);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export const EditUserDocument = gql`
    mutation EditUser($password: String!, $updateName: String, $updatePhoto: String, $updateEmail: String, $updatePassword: String, $confirmNewPassword: String) {
  updateUser(
    password: $password
    updateName: $updateName
    updatePhoto: $updatePhoto
    updateEmail: $updateEmail
    updatePassword: $updatePassword
    confirmNewPassword: $confirmNewPassword
  ) {
    id
    name
    photo
    email
    password
    createdAt
    updatedAt
    likes {
      active
      postId
    }
  }
}
    `;
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      password: // value for 'password'
 *      updateName: // value for 'updateName'
 *      updatePhoto: // value for 'updatePhoto'
 *      updateEmail: // value for 'updateEmail'
 *      updatePassword: // value for 'updatePassword'
 *      confirmNewPassword: // value for 'confirmNewPassword'
 *   },
 * });
 */
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
        return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, baseOptions);
      }
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export const FollowDocument = gql`
    mutation Follow($userId: String!) {
  follow(userId: $userId) {
    id
    name
  }
}
    `;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, baseOptions);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    id
    name
    email
    likes {
      active
      postId
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logoutUser
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MarkAsSeenDocument = gql`
    mutation MarkAsSeen($notificationsIds: [String!]!) {
  markAsSeen(notificationsIds: $notificationsIds)
}
    `;
export type MarkAsSeenMutationFn = Apollo.MutationFunction<MarkAsSeenMutation, MarkAsSeenMutationVariables>;

/**
 * __useMarkAsSeenMutation__
 *
 * To run a mutation, you first call `useMarkAsSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAsSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAsSeenMutation, { data, loading, error }] = useMarkAsSeenMutation({
 *   variables: {
 *      notificationsIds: // value for 'notificationsIds'
 *   },
 * });
 */
export function useMarkAsSeenMutation(baseOptions?: Apollo.MutationHookOptions<MarkAsSeenMutation, MarkAsSeenMutationVariables>) {
        return Apollo.useMutation<MarkAsSeenMutation, MarkAsSeenMutationVariables>(MarkAsSeenDocument, baseOptions);
      }
export type MarkAsSeenMutationHookResult = ReturnType<typeof useMarkAsSeenMutation>;
export type MarkAsSeenMutationResult = Apollo.MutationResult<MarkAsSeenMutation>;
export type MarkAsSeenMutationOptions = Apollo.BaseMutationOptions<MarkAsSeenMutation, MarkAsSeenMutationVariables>;
export const MarkAsReadDocument = gql`
    mutation MarkAsRead($notificationId: String!) {
  markAsRead(notificationId: $notificationId) {
    id
    read
  }
}
    `;
export type MarkAsReadMutationFn = Apollo.MutationFunction<MarkAsReadMutation, MarkAsReadMutationVariables>;

/**
 * __useMarkAsReadMutation__
 *
 * To run a mutation, you first call `useMarkAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAsReadMutation, { data, loading, error }] = useMarkAsReadMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useMarkAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkAsReadMutation, MarkAsReadMutationVariables>) {
        return Apollo.useMutation<MarkAsReadMutation, MarkAsReadMutationVariables>(MarkAsReadDocument, baseOptions);
      }
export type MarkAsReadMutationHookResult = ReturnType<typeof useMarkAsReadMutation>;
export type MarkAsReadMutationResult = Apollo.MutationResult<MarkAsReadMutation>;
export type MarkAsReadMutationOptions = Apollo.BaseMutationOptions<MarkAsReadMutation, MarkAsReadMutationVariables>;
export const NewCommentDocument = gql`
    mutation NewComment($postId: String!, $text: String!) {
  createComment(postId: $postId, text: $text) {
    id
    text
    author {
      id
      name
    }
  }
}
    `;
export type NewCommentMutationFn = Apollo.MutationFunction<NewCommentMutation, NewCommentMutationVariables>;

/**
 * __useNewCommentMutation__
 *
 * To run a mutation, you first call `useNewCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newCommentMutation, { data, loading, error }] = useNewCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useNewCommentMutation(baseOptions?: Apollo.MutationHookOptions<NewCommentMutation, NewCommentMutationVariables>) {
        return Apollo.useMutation<NewCommentMutation, NewCommentMutationVariables>(NewCommentDocument, baseOptions);
      }
export type NewCommentMutationHookResult = ReturnType<typeof useNewCommentMutation>;
export type NewCommentMutationResult = Apollo.MutationResult<NewCommentMutation>;
export type NewCommentMutationOptions = Apollo.BaseMutationOptions<NewCommentMutation, NewCommentMutationVariables>;
export const NewPostDocument = gql`
    mutation NewPost($title: String!, $body: String!, $images: [String!]!, $published: Boolean!) {
  createPost(title: $title, body: $body, images: $images, published: $published) {
    id
    title
    body
    images
    published
  }
}
    `;
export type NewPostMutationFn = Apollo.MutationFunction<NewPostMutation, NewPostMutationVariables>;

/**
 * __useNewPostMutation__
 *
 * To run a mutation, you first call `useNewPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newPostMutation, { data, loading, error }] = useNewPostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      images: // value for 'images'
 *      published: // value for 'published'
 *   },
 * });
 */
export function useNewPostMutation(baseOptions?: Apollo.MutationHookOptions<NewPostMutation, NewPostMutationVariables>) {
        return Apollo.useMutation<NewPostMutation, NewPostMutationVariables>(NewPostDocument, baseOptions);
      }
export type NewPostMutationHookResult = ReturnType<typeof useNewPostMutation>;
export type NewPostMutationResult = Apollo.MutationResult<NewPostMutation>;
export type NewPostMutationOptions = Apollo.BaseMutationOptions<NewPostMutation, NewPostMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($name: String!, $email: String!, $password: String!, $confirmPassword: String!) {
  createUser(
    name: $name
    email: $email
    password: $password
    confirmPassword: $confirmPassword
  ) {
    id
    name
    email
    likes {
      active
      postId
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UnfollowDocument = gql`
    mutation Unfollow($userId: String!) {
  unfollow(userId: $userId) {
    id
    name
  }
}
    `;
export type UnfollowMutationFn = Apollo.MutationFunction<UnfollowMutation, UnfollowMutationVariables>;

/**
 * __useUnfollowMutation__
 *
 * To run a mutation, you first call `useUnfollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowMutation, { data, loading, error }] = useUnfollowMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnfollowMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowMutation, UnfollowMutationVariables>) {
        return Apollo.useMutation<UnfollowMutation, UnfollowMutationVariables>(UnfollowDocument, baseOptions);
      }
export type UnfollowMutationHookResult = ReturnType<typeof useUnfollowMutation>;
export type UnfollowMutationResult = Apollo.MutationResult<UnfollowMutation>;
export type UnfollowMutationOptions = Apollo.BaseMutationOptions<UnfollowMutation, UnfollowMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyNotificationsDocument = gql`
    query MyNotifications {
  myNotifications {
    id
    receiverId
    dispatcherId
    read
    seen
    message
    link
    dispatcher {
      ...BasicUserInfo
    }
  }
}
    ${BasicUserInfoFragmentDoc}`;

/**
 * __useMyNotificationsQuery__
 *
 * To run a query within a React component, call `useMyNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<MyNotificationsQuery, MyNotificationsQueryVariables>) {
        return Apollo.useQuery<MyNotificationsQuery, MyNotificationsQueryVariables>(MyNotificationsDocument, baseOptions);
      }
export function useMyNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNotificationsQuery, MyNotificationsQueryVariables>) {
          return Apollo.useLazyQuery<MyNotificationsQuery, MyNotificationsQueryVariables>(MyNotificationsDocument, baseOptions);
        }
export type MyNotificationsQueryHookResult = ReturnType<typeof useMyNotificationsQuery>;
export type MyNotificationsLazyQueryHookResult = ReturnType<typeof useMyNotificationsLazyQuery>;
export type MyNotificationsQueryResult = Apollo.QueryResult<MyNotificationsQuery, MyNotificationsQueryVariables>;
export const MyPostsDocument = gql`
    query MyPosts($skip: Int!, $take: Int!) {
  myPosts(skip: $skip, take: $take) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __useMyPostsQuery__
 *
 * To run a query within a React component, call `useMyPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPostsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useMyPostsQuery(baseOptions: Apollo.QueryHookOptions<MyPostsQuery, MyPostsQueryVariables>) {
        return Apollo.useQuery<MyPostsQuery, MyPostsQueryVariables>(MyPostsDocument, baseOptions);
      }
export function useMyPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPostsQuery, MyPostsQueryVariables>) {
          return Apollo.useLazyQuery<MyPostsQuery, MyPostsQueryVariables>(MyPostsDocument, baseOptions);
        }
export type MyPostsQueryHookResult = ReturnType<typeof useMyPostsQuery>;
export type MyPostsLazyQueryHookResult = ReturnType<typeof useMyPostsLazyQuery>;
export type MyPostsQueryResult = Apollo.QueryResult<MyPostsQuery, MyPostsQueryVariables>;
export const PostsDocument = gql`
    query Posts($take: Int!, $skip: Int!) {
  posts(
    where: {published: {equals: true}}
    orderBy: {createdAt: desc}
    take: $take
    skip: $skip
  ) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const SingleCommentDocument = gql`
    query SingleComment($commentId: String!) {
  comment(where: {id: $commentId}) {
    id
    text
    author {
      id
      name
    }
  }
}
    `;

/**
 * __useSingleCommentQuery__
 *
 * To run a query within a React component, call `useSingleCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleCommentQuery({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useSingleCommentQuery(baseOptions: Apollo.QueryHookOptions<SingleCommentQuery, SingleCommentQueryVariables>) {
        return Apollo.useQuery<SingleCommentQuery, SingleCommentQueryVariables>(SingleCommentDocument, baseOptions);
      }
export function useSingleCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SingleCommentQuery, SingleCommentQueryVariables>) {
          return Apollo.useLazyQuery<SingleCommentQuery, SingleCommentQueryVariables>(SingleCommentDocument, baseOptions);
        }
export type SingleCommentQueryHookResult = ReturnType<typeof useSingleCommentQuery>;
export type SingleCommentLazyQueryHookResult = ReturnType<typeof useSingleCommentLazyQuery>;
export type SingleCommentQueryResult = Apollo.QueryResult<SingleCommentQuery, SingleCommentQueryVariables>;
export const SinglePostDocument = gql`
    query SinglePost($postId: String) {
  post(where: {id: $postId}) {
    id
    title
    body
    images
    published
    likeCount
    commentCount
    createdAt
    updatedAt
    author {
      id
      name
      photo
    }
    comments {
      ...Comment
    }
  }
}
    ${CommentFragmentDoc}`;

/**
 * __useSinglePostQuery__
 *
 * To run a query within a React component, call `useSinglePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useSinglePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSinglePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useSinglePostQuery(baseOptions?: Apollo.QueryHookOptions<SinglePostQuery, SinglePostQueryVariables>) {
        return Apollo.useQuery<SinglePostQuery, SinglePostQueryVariables>(SinglePostDocument, baseOptions);
      }
export function useSinglePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SinglePostQuery, SinglePostQueryVariables>) {
          return Apollo.useLazyQuery<SinglePostQuery, SinglePostQueryVariables>(SinglePostDocument, baseOptions);
        }
export type SinglePostQueryHookResult = ReturnType<typeof useSinglePostQuery>;
export type SinglePostLazyQueryHookResult = ReturnType<typeof useSinglePostLazyQuery>;
export type SinglePostQueryResult = Apollo.QueryResult<SinglePostQuery, SinglePostQueryVariables>;
export const UserDocument = gql`
    query User($userId: String) {
  user(where: {id: $userId}) {
    ...BasicUserInfo
  }
}
    ${BasicUserInfoFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserPostsDocument = gql`
    query UserPosts($userId: String, $take: Int!, $skip: Int!) {
  posts(
    where: {published: {equals: true}, userId: {equals: $userId}}
    orderBy: {createdAt: desc}
    take: $take
    skip: $skip
  ) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __useUserPostsQuery__
 *
 * To run a query within a React component, call `useUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPostsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useUserPostsQuery(baseOptions: Apollo.QueryHookOptions<UserPostsQuery, UserPostsQueryVariables>) {
        return Apollo.useQuery<UserPostsQuery, UserPostsQueryVariables>(UserPostsDocument, baseOptions);
      }
export function useUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserPostsQuery, UserPostsQueryVariables>) {
          return Apollo.useLazyQuery<UserPostsQuery, UserPostsQueryVariables>(UserPostsDocument, baseOptions);
        }
export type UserPostsQueryHookResult = ReturnType<typeof useUserPostsQuery>;
export type UserPostsLazyQueryHookResult = ReturnType<typeof useUserPostsLazyQuery>;
export type UserPostsQueryResult = Apollo.QueryResult<UserPostsQuery, UserPostsQueryVariables>;
export const MyPostsSubDocument = gql`
    subscription MyPostsSub {
  myPostSub {
    mutation
    data {
      id
      title
      body
    }
  }
}
    `;

/**
 * __useMyPostsSubSubscription__
 *
 * To run a query within a React component, call `useMyPostsSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMyPostsSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPostsSubSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMyPostsSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MyPostsSubSubscription, MyPostsSubSubscriptionVariables>) {
        return Apollo.useSubscription<MyPostsSubSubscription, MyPostsSubSubscriptionVariables>(MyPostsSubDocument, baseOptions);
      }
export type MyPostsSubSubscriptionHookResult = ReturnType<typeof useMyPostsSubSubscription>;
export type MyPostsSubSubscriptionResult = Apollo.SubscriptionResult<MyPostsSubSubscription>;
export const UserPostsSubDocument = gql`
    subscription UserPostsSub($userId: String!) {
  postSubByUser(userId: $userId) {
    mutation
    data {
      id
      title
      body
    }
  }
}
    `;

/**
 * __useUserPostsSubSubscription__
 *
 * To run a query within a React component, call `useUserPostsSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserPostsSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPostsSubSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserPostsSubSubscription(baseOptions: Apollo.SubscriptionHookOptions<UserPostsSubSubscription, UserPostsSubSubscriptionVariables>) {
        return Apollo.useSubscription<UserPostsSubSubscription, UserPostsSubSubscriptionVariables>(UserPostsSubDocument, baseOptions);
      }
export type UserPostsSubSubscriptionHookResult = ReturnType<typeof useUserPostsSubSubscription>;
export type UserPostsSubSubscriptionResult = Apollo.SubscriptionResult<UserPostsSubSubscription>;