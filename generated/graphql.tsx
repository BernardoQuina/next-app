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
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  posts: Array<Post>;
  comments: Array<Comment>;
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

export type AuthPayload = {
  __typename?: 'AuthPayload';
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
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
  published?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  comments: Array<Comment>;
  textSnippet?: Maybe<Scalars['String']>;
};


export type PostCommentsArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<CommentWhereUniqueInput>;
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


export type PostWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type CommentWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  id?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  password?: Maybe<StringFilter>;
  email?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  posts?: Maybe<PostListRelationFilter>;
  comments?: Maybe<CommentListRelationFilter>;
};

export type UserOrderByInput = {
  id?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
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
  published?: Maybe<BoolFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  author?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
  comments?: Maybe<CommentListRelationFilter>;
};

export type PostOrderByInput = {
  id?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  body?: Maybe<SortOrder>;
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

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

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
  comment?: Maybe<Comment>;
  comments: Array<Comment>;
  commentCount?: Maybe<Scalars['Int']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<AuthPayload>;
  loginUser?: Maybe<AuthPayload>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  createPost?: Maybe<Post>;
  updatePost?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  createComment?: Maybe<Comment>;
  updateComment?: Maybe<Comment>;
  deleteComment?: Maybe<Comment>;
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
  updateEmail?: Maybe<Scalars['String']>;
  updatePassword?: Maybe<Scalars['String']>;
  confirmNewPassword?: Maybe<Scalars['String']>;
};


export type MutationDeleteUserArgs = {
  password: Scalars['String'];
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
  body: Scalars['String'];
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
  userId: Scalars['ID'];
};


export type SubscriptionPostSubArgs = {
  postId: Scalars['ID'];
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
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'published' | 'title' | 'textSnippet'>
  & { author?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { loginUser?: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    )> }
  )> }
);

export type NewPostMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
  published: Scalars['Boolean'];
}>;


export type NewPostMutation = (
  { __typename?: 'Mutation' }
  & { createPost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'body' | 'published'>
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
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email' | 'password'>
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  )> }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & PostSnippetFragment
  )> }
);

export type SinglePostQueryQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type SinglePostQueryQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'body' | 'published' | 'createdAt' | 'updatedAt'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'name'>
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
  author {
    id
    name
  }
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    user {
      id
      name
      email
    }
    token
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
export const NewPostDocument = gql`
    mutation NewPost($title: String!, $body: String!, $published: Boolean!) {
  createPost(title: $title, body: $body, published: $published) {
    id
    title
    body
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
    user {
      id
      name
      email
      password
    }
    token
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
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    email
  }
}
    `;

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
export const PostsDocument = gql`
    query Posts {
  posts(
    where: {published: {equals: true}}
    orderBy: {createdAt: desc}
    take: 10
    skip: 0
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
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const SinglePostQueryDocument = gql`
    query SinglePostQuery($postId: String!) {
  post(where: {id: $postId}) {
    id
    title
    body
    published
    createdAt
    updatedAt
    author {
      name
    }
  }
}
    `;

/**
 * __useSinglePostQueryQuery__
 *
 * To run a query within a React component, call `useSinglePostQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSinglePostQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSinglePostQueryQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useSinglePostQueryQuery(baseOptions: Apollo.QueryHookOptions<SinglePostQueryQuery, SinglePostQueryQueryVariables>) {
        return Apollo.useQuery<SinglePostQueryQuery, SinglePostQueryQueryVariables>(SinglePostQueryDocument, baseOptions);
      }
export function useSinglePostQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SinglePostQueryQuery, SinglePostQueryQueryVariables>) {
          return Apollo.useLazyQuery<SinglePostQueryQuery, SinglePostQueryQueryVariables>(SinglePostQueryDocument, baseOptions);
        }
export type SinglePostQueryQueryHookResult = ReturnType<typeof useSinglePostQueryQuery>;
export type SinglePostQueryLazyQueryHookResult = ReturnType<typeof useSinglePostQueryLazyQuery>;
export type SinglePostQueryQueryResult = Apollo.QueryResult<SinglePostQueryQuery, SinglePostQueryQueryVariables>;