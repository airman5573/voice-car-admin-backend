import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import VC from "../../types";
import defaultValues from "../defaultValues";
import { Speeds } from "./Speeds";

@Entity('vc_words')
export class Words extends BaseEntity {
  constructor(team: number = 1, words = defaultValues.words) {
    super();
    const {
      handOpen, handClose, elbowOpen, elbowClose,
      shoulderOpen, shoulderClose, waistLeft, waistRight,
      bottomGo, bottomBack, bottomLeft, bottomRight, bottomGoFast
    } = words;
    this.team = team;
    this.handOpen = handOpen;
    this.handClose = handClose;
    this.elbowOpen = elbowOpen;
    this.elbowClose = elbowClose;
    this.shoulderOpen = shoulderOpen;
    this.shoulderClose = shoulderClose;
    this.waistLeft = waistLeft;
    this.waistRight = waistRight;
    this.bottomGo = bottomGo;
    this.bottomBack = bottomBack;
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;
    this.bottomGoFast = bottomGoFast;
  }

  @PrimaryGeneratedColumn()
  team: number

  @Column({name: 'hand_open', type: 'text'})
  handOpen: string

  @Column({name: 'hand_close', type: 'text'})
  handClose: string

  @Column({name: 'elbow_open', type: 'text'})
  elbowOpen: string

  @Column({name: 'elbow_close', type: 'text'})
  elbowClose: string

  @Column({name: 'shoulder_open', type: 'text'})
  shoulderOpen: string

  @Column({name: 'shoulder_close', type: 'text'})
  shoulderClose: string

  @Column({name: 'waist_left', type: 'text'})
  waistLeft: string

  @Column({name: 'waist_right', type: 'text'})
  waistRight: string

  @Column({name: 'bottom_go', type: 'text'})
  bottomGo: string

  @Column({name: 'bottom_back', type: 'text'})
  bottomBack: string

  @Column({name: 'bottom_left', type: 'text'})
  bottomLeft: string

  @Column({name: 'bottom_right', type: 'text'})
  bottomRight: string

  @Column({name: 'bottom_go_fast', type: 'text'})
  bottomGoFast: string

  @OneToOne(() => Speeds, speeds => speeds.words)
  @JoinColumn({ name: 'team' })
  speeds: Speeds
}