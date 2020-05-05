import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../server';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Aggregate = {
   __typename?: 'Aggregate';
  count: Scalars['Int'];
};

export type DeleteResponse = {
   __typename?: 'DeleteResponse';
  id: Scalars['String'];
};

export type Item = {
   __typename?: 'Item';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  largeImage?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type ItemsConnection = {
   __typename?: 'ItemsConnection';
  aggregate?: Maybe<Aggregate>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createItem: Item;
  updateItem: Item;
  deleteItem: DeleteResponse;
  signup: User;
  signin?: Maybe<User>;
  signout?: Maybe<SuccessMessage>;
  requestReset?: Maybe<SuccessMessage>;
  resetPassword: User;
  updatePermissions?: Maybe<User>;
};


export type MutationCreateItemArgs = {
  title: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  largeImage?: Maybe<Scalars['String']>;
};


export type MutationUpdateItemArgs = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
};


export type MutationDeleteItemArgs = {
  id: Scalars['ID'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};


export type MutationSigninArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRequestResetArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  token: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};


export type MutationUpdatePermissionsArgs = {
  permissions?: Maybe<Array<Maybe<Permission>>>;
  userId: Scalars['ID'];
};

export enum OrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export enum Permission {
  Admin = 'ADMIN',
  User = 'USER',
  Itemcreate = 'ITEMCREATE',
  Itemupdate = 'ITEMUPDATE',
  Itemdelete = 'ITEMDELETE',
  Premissionupdate = 'PREMISSIONUPDATE'
}

export type Query = {
   __typename?: 'Query';
  items: Array<Maybe<Item>>;
  item?: Maybe<Item>;
  itemsConnection?: Maybe<ItemsConnection>;
  me?: Maybe<User>;
  users: Array<Maybe<User>>;
  test?: Maybe<Scalars['String']>;
};


export type QueryItemsArgs = {
  orderBy?: Maybe<OrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
};


export type QueryItemArgs = {
  id: Scalars['ID'];
};

export type SuccessMessage = {
   __typename?: 'SuccessMessage';
  message?: Maybe<Scalars['String']>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  permissions?: Maybe<Array<Maybe<Permission>>>;
  items: Array<Maybe<Item>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  OrderByInput: OrderByInput,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Item: ResolverTypeWrapper<Item>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  User: ResolverTypeWrapper<User>,
  Permission: Permission,
  ItemsConnection: ResolverTypeWrapper<ItemsConnection>,
  Aggregate: ResolverTypeWrapper<Aggregate>,
  Mutation: ResolverTypeWrapper<{}>,
  DeleteResponse: ResolverTypeWrapper<DeleteResponse>,
  SuccessMessage: ResolverTypeWrapper<SuccessMessage>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  OrderByInput: OrderByInput,
  Int: Scalars['Int'],
  Item: Item,
  ID: Scalars['ID'],
  String: Scalars['String'],
  User: User,
  Permission: Permission,
  ItemsConnection: ItemsConnection,
  Aggregate: Aggregate,
  Mutation: {},
  DeleteResponse: DeleteResponse,
  SuccessMessage: SuccessMessage,
  Boolean: Scalars['Boolean'],
};

export type AggregateResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Aggregate'] = ResolversParentTypes['Aggregate']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type DeleteResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DeleteResponse'] = ResolversParentTypes['DeleteResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  largeImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ItemsConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ItemsConnection'] = ResolversParentTypes['ItemsConnection']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['Aggregate']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createItem?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<MutationCreateItemArgs, 'title' | 'description' | 'price'>>,
  updateItem?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<MutationUpdateItemArgs, 'id'>>,
  deleteItem?: Resolver<ResolversTypes['DeleteResponse'], ParentType, ContextType, RequireFields<MutationDeleteItemArgs, 'id'>>,
  signup?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'password' | 'name'>>,
  signin?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSigninArgs, 'email' | 'password'>>,
  signout?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType>,
  requestReset?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, RequireFields<MutationRequestResetArgs, 'email'>>,
  resetPassword?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'token' | 'password' | 'confirmPassword'>>,
  updatePermissions?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdatePermissionsArgs, 'userId'>>,
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  items?: Resolver<Array<Maybe<ResolversTypes['Item']>>, ParentType, ContextType, RequireFields<QueryItemsArgs, never>>,
  item?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<QueryItemArgs, 'id'>>,
  itemsConnection?: Resolver<Maybe<ResolversTypes['ItemsConnection']>, ParentType, ContextType>,
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  test?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type SuccessMessageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SuccessMessage'] = ResolversParentTypes['SuccessMessage']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  permissions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Permission']>>>, ParentType, ContextType>,
  items?: Resolver<Array<Maybe<ResolversTypes['Item']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = Context> = {
  Aggregate?: AggregateResolvers<ContextType>,
  DeleteResponse?: DeleteResponseResolvers<ContextType>,
  Item?: ItemResolvers<ContextType>,
  ItemsConnection?: ItemsConnectionResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  SuccessMessage?: SuccessMessageResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
