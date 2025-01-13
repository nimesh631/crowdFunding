import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsModule } from './campaigns/campaigns.module';
import { Campaigns } from './campaigns/campaigns.entity/campaigns.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'nimesh',
      database: 'crowd_funding',
      entities: [User,Campaigns],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CampaignsModule,

  ],
})

export class AppModule {}
