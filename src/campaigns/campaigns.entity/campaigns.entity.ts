import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CampaignsStatus } from "./campaigns-status.enum";
import { User } from "src/users/users.entity/users.entity";

@Entity()
export class Campaigns {
   @PrimaryGeneratedColumn()
   id: number;
   
   @Column()
   title: string;

   @Column()
   description: string;

   @Column()
   goal_amount: number;

   @Column()
   start_date: Date;
   
   @Column()
   end_date: Date;

   @Column({type: 'enum',enum: CampaignsStatus})
   status: CampaignsStatus;

   @ManyToOne(()=>User,(user)=>user.campaign,{nullable: false})
   user:User;
}
