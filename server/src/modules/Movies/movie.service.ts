import { UpdateMovieDto } from './dto/updateMovie.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from '../user/Movieschema/movies.schema';
import { CreateMovieDto } from './dto/crateMovie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = new this.movieModel(createMovieDto);
    return movie.save();
  }

  async createMany(movies: CreateMovieDto[]) {
    try {
      return await this.movieModel.insertMany(movies);
    } catch (error) {
      console.error('Error in inserting part:', error);
      throw new InternalServerErrorException('Failed to insert movies');
    }
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    try {
      const update = await this.movieModel.findByIdAndUpdate(
        id,
        updateMovieDto,
        {
          new: true,
        },
      );
      if (!update) throw new NotFoundException('Movie not found');
      return update;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: string): Promise<Movie> {
    try {
      const deleted = await this.movieModel.findByIdAndDelete(id);
      if (!deleted) throw new NotFoundException('Movie not found');
      return deleted;
    } catch (e) {
      throw e;
    }
  }

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find();
  }

  async findByGenre(genre: string): Promise<Movie[]> {
    const movieByGenre = await this.movieModel.find({ genre });
    if (movieByGenre.length == 0) {
      throw new NotFoundException('there is no movie in this genre');
    }
    return movieByGenre;
  }
  async findByLanguage(language: string): Promise<Movie[]> {
    const movieByLang = await this.movieModel.find({ language });
    if (movieByLang.length == 0) {
      throw new NotFoundException('there is no movie in this language');
    }
    return movieByLang;
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieModel.findById(id);
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async search(query: string): Promise<Movie[]> {
    const regex = new RegExp(query, 'i');
    const movie = await this.movieModel.find({
      $or: [
        { title: regex },
        { description: regex },
        { director: regex },
        { genre: regex },
        { language: regex },
      ],
    });
    if (movie.length == 0) {
      console.log('no movies were found');
    }
    return movie;
  }

  async findAllWithPagination(options) {
    const { limit, page, sort, orderBy } = options;
    try {
      const skipPages = (page - 1) * limit;

      const data = await this.movieModel
        .find()
        .sort({ [sort]: orderBy })
        .skip(skipPages)
        .limit(limit)
      

      const totalMovie = await this.movieModel.countDocuments();

      return {
        data,
        totalMovie:totalMovie,
        Inpage: page,
        moviesInSinglePage: limit,
        totalPage: Math.ceil(totalMovie / limit),
      };
    } catch (error) {
      console.error('Pagination error:', error);
      throw new InternalServerErrorException('Failed to paginate movies');
    }
  }
}
