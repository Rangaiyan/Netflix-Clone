import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../../src/modules/user/user.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Movie, MovieSchema } from '../modules/user/Movieschema/movies.schema';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule, 
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
