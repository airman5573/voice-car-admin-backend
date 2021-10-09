import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import defaultValues from "../defaultValues";

@Entity('vc_metas')
export class Metas extends BaseEntity {

  constructor(id: number, adminPassword: String, controlMode: String, editable: boolean) {
    super();
    this.id = id;
    this.adminPassword = adminPassword;
    this.controlMode = controlMode;
    this.editable = editable;
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'admin_password', default: defaultValues.metas.adminPassword })
  adminPassword: String

  @Column({ name: 'control_mode', default: defaultValues.metas.controlMode })
  controlMode: String

  @Column({ default: defaultValues.metas.editable })
  editable: boolean
}