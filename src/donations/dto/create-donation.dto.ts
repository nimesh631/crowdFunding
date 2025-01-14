import { IsInt,IsNotEmpty } from "class-validator";

export class CreateDonationDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsInt()
    @IsNotEmpty()
    campaignId: number;

    @IsInt()
    @IsNotEmpty()
    amount: number;

}
