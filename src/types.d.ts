declare namespace Express {
  type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
  };

  type Maybe<T> = T | null;
  enum Permission {
    Admin = "ADMIN",
    User = "USER",
    Itemcreate = "ITEMCREATE",
    Itemupdate = "ITEMUPDATE",
    Itemdelete = "ITEMDELETE",
    Premissionupdate = "PREMISSIONUPDATE",
  }

  type Item = {
    __typename?: "Item";
    id: Scalars["ID"];
    title: Scalars["String"];
    description: Scalars["String"];
    image?: Maybe<Scalars["String"]>;
    largeImage?: Maybe<Scalars["String"]>;
    price: Scalars["Int"];
    createdAt: Scalars["String"];
    updatedAt: Scalars["String"];
    user: User;
  };

  type User = {
    __typename?: "User";
    id: Scalars["ID"];
    name: Scalars["String"];
    email: Scalars["String"];
    permissions?: Maybe<Array<Maybe<Permission>>>;
    items: Array<Maybe<Item>>;
  };
  export interface Request {
    userId?: string;
    user?: User;
  }
}
