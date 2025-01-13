import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString,IsInt } from "class-validator";
import { CampaignsStatus } from "../campaigns.entity/campaigns-status.enum";

export class CreateCampaignDto{
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    goal_amount: number;

    @IsDateString()
    @IsNotEmpty()
    start_date: string;

    @IsDateString()
    @IsNotEmpty()
    end_date: string;

    @IsEnum(CampaignsStatus)
    status: CampaignsStatus

}