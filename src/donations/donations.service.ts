import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity/users.entity';
import { Donation } from './entities/donation.entity';
import { Campaigns } from 'src/campaigns/campaigns.entity/campaigns.entity';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
    @InjectRepository(User)
  private userRepository: Repository<User>,
  @InjectRepository(Campaigns)
  private campaignRepository: Repository<Campaigns>,
  ){}

  async create(createDonationDto:CreateDonationDto){
    const users = await this.userRepository.findOne({where:{id: createDonationDto.userId},
    })
    if(!users){
      throw new NotFoundException('user not found');
    }

    const campaigns = await this.campaignRepository.findOne({where:{id: createDonationDto.campaignId},
    })
    if(!campaigns){
      throw new NotFoundException('campagins not found');
    }

    const donation = this.donationRepository.create({...createDonationDto,user:users,campaign:campaigns});
    return this.donationRepository.save(donation);

  }


  async findAll(): Promise<Donation[]> {
    return await this.donationRepository.find({
      relations: ['user', 'campaign'], 
    });
  }
  
  async findOne(id: number): Promise<Donation> {
    const donation = await this.donationRepository.findOne({
      where: { id },
      relations: ['user', 'campaign'], 
    });
    if (!donation) {
      throw new NotFoundException(`Donation with id ${id} not found`);
    }
    return donation;
  }
  

 async update(id: number, updateDonationDto: UpdateDonationDto) {
    const userAvailable = await this.userRepository.findOne({
      where:{id: updateDonationDto.userId}
    })
    if(!userAvailable){
      throw new NotFoundException('user not found')
    }

    const campaignAvailable = await this.campaignRepository.findOne({
      where:{id: updateDonationDto.campaignId}
    })
    if(!campaignAvailable){
      throw new NotFoundException('campaign not found')
    }

    const donationAvailable = await this.donationRepository.findOne({
      where:{id},
    })
    if(!donationAvailable){
      throw new NotFoundException('application not found')
    }

    const updatedDonation = this.donationRepository.create({...updateDonationDto,user:userAvailable,campaign:campaignAvailable})
    return this.donationRepository.save(updatedDonation)
  }

  async remove(id: number): Promise<void> {
    const donationAvailable = await this.donationRepository.findOne({
      where:{id},
    })
    if ((!donationAvailable)) {
      throw new NotFoundException('donation not found');
    }
    await this.donationRepository.delete(id);
  }
}
