import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Permission } from "../generated/graphql";
import { Item } from "./Item";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: false })
  name: string;

  @Column("text", { unique: true, nullable: false })
  email: string;

  @Column("text", { nullable: false })
  password: string;

  @Column("text", { nullable: true })
  resetToken?: string;

  @Column("text", { nullable: true })
  resetTokenExpiry?: string;

  @Column("text", { array: true })
  permissions: Permission[];

  @OneToMany((type) => Item, (item) => item.user)
  items: Item[];
}
