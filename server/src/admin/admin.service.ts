import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/Userschemas/user.schema';
import { Movie, MovieDocument } from '../modules/user/Movieschema/movies.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, // ✅ Ensure correct injection
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
