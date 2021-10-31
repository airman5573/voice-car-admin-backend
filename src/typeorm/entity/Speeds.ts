import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import VC from "../../types";
import defaultValues from "../defaultValues";
import { Words } from "./Words";

@Entity('vc_speeds')
export class Speeds extends BaseEntity {
  constructor(team: number = 1, speeds = defaultValues.speeds) {
    super();
    const { 
      handOpen, handClose, elbowOpen, elbowClose,
      shoulderOpen, shoulderClose, waistLeft, waistRight,
      bottomGo, bottomBack, bottomLeft, bottomRight, bottomGoFast
    } = speeds;
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

  @Column({name: 'hand_open', default: defaultValues.speeds.handOpen})
  handOpen: number

  @Column({name: 'hand_close', default: defaultValues.speeds.handClose})
  handClose: number

  @Column({name: 'elbow_open', default: defaultValues.speeds.elbowOpen})
  elbowOpen: number

  @Column({name: 'elbow_close', default: defaultValues.speeds.elbowClose})
  elbowClose: number

  @Column({name: 'shoulder_open', default: defaultValues.speeds.shoulderOpen})
  shoulderOpen: number

  @Column({name: 'shoulder_close', default: defaultValues.speeds.shoulderClose})
  shoulderClose: number

  @Column({name: 'waist_left', default: defaultValues.speeds.waistLeft})
  waistLeft: number

  @Column({name: 'waist_right', default: defaultValues.speeds.waistRight})
  waistRight: number

  @Column({name: 'bottom_go', default: defaultValues.speeds.bottomGo})
  bottomGo: number

  @Column({name: 'bottom_back', default: defaultValues.speeds.bottomBack})
  bottomBack: number

  @Column({name: 'bottom_left', default: defaultValues.speeds.bottomLeft})
  bottomLeft: number

  @Column({name: 'bottom_right', default: defaultValues.speeds.bottomRight})
  bottomRight: number

  @Column({name: 'bottom_go_fast', default: defaultValues.speeds.bottomGoFast})
  bottomGoFast: number

  @OneToOne(() => Words, words => words.speeds)
  words: Words
}