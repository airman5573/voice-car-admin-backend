import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import defaultValues from "../defaultValues";

@Entity('vc_metas')
export class Metas extends BaseEntity {

  constructor(id: number, adminPassword: String, controlMode: String, editableSimilarWords: boolean, editableSpeeds: boolean) {
    super();
    this.id = id;
    this.adminPassword = adminPassword;
    this.controlMode = controlMode;
    this.editableSimilarWords = editableSimilarWords;
    this.editableSpeeds = editableSpeeds;
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'admin_password', default: defaultValues.metas.adminPassword })
  adminPassword: String

  @Column({ name: 'control_mode', default: defaultValues.metas.controlMode })
  controlMode: String

  @Column({ name: 'editable_similarwords', default: defaultValues.metas.editableSimilarWords })
  editableSimilarWords: boolean

  @Column({ name: 'editable_speeds', default: defaultValues.metas.editableSpeeds })
  editableSpeeds: boolean
}