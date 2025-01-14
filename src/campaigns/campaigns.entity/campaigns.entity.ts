import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CampaignsStatus } from "./campaigns-status.enum";
import { User } from "src/users/users.entity/users.entity";
import { Donation } from "src/donations/entities/donation.entity";

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
   start_date: string;
   
   @Column()
   end_date: string;

   @Column({type: 'enum',enum: CampaignsStatus})
   status: CampaignsStatus;

   @ManyToOne(()=>User,(user)=>user.campaign,{nullable: false})
   user:User;
   
   @OneToMany(()=>Donation,(donation)=>donation.campaign)
   donation: Donation;
}
