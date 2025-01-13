import { Injectable ,NotFoundException} from '@nestjs/common';
import { Campaigns } from './campaigns.entity/campaigns.entity';
import { CreateCampaignDto } from './dto/create-campaigns.dto';
import { Repository } from 'typeorm';
import { UpdateCampaignsDto } from './dto/update-campaigns.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity/users.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class CampaignsService {
constructor(
    @InjectRepository(Campaigns)
    private campaignsRepository: Repository<Campaigns>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
){}

async create(createCampaignDto: CreateCampaignDto): Promise<Campaigns> {
    const user = await this.usersRepository.findOne({
      where: { id: createCampaignDto.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${createCampaignDto.userId} not found`);
    }

    const campaign = this.campaignsRepository.create({
      ...createCampaignDto,
      user,
    });

    return await this.campaignsRepository.save(campaign);
  }

async findAll(): Promise<Campaigns[]>{
return await this.campaignsRepository.find();
}

async findOne(id: number) {
const campaign = await this.campaignsRepository.findOne({ where: { id } });
if (!campaign)
  throw new NotFoundException(`User with the id ${id} was not found.`);
return campaign;
}
async update(id: number, updateCampaignsDto: UpdateCampaignsDto): Promise<Campaigns>{
await this.campaignsRepository.update(id,updateCampaignsDto);
return await this.findOne(id);
}

async remove(id: number): Promise<void> {
await this.campaignsRepository.delete(id);
}

}