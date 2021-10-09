import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('vc_passwords')
export class Passwords extends BaseEntity {

  constructor(team: number, password: String) {
    super();
    this.team = team;
    this.password = password;
  }

  @PrimaryGeneratedColumn()
  team: number

  @Column()
  password: String
}