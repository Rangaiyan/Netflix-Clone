import {
  Logger,
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Signin, Signup } from "./dto/auth.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../../schemas/Userschemas/user.schema";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email }).exec(); // Added `.exec()` for better async handling

    if (!user) {
      this.logger.warn(`User not found: ${email}`);
      throw new UnauthorizedException("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      this.logger.warn(`Password mismatch for email: ${email}`);
      throw new UnauthorizedException("Password does not match");
    }

    return user;
  }

  async login(loginDto: Signin) {
    const user = await this.validateUser(loginDto.email, loginDto.password); // No try-catch here, use direct validation

    // Ensure `isAdmin` has a default value
    const payload = {
      email: user.email,
      id: user._id,
      isAdmin: user.isAdmin ?? false,
    };

    this.logger.log(`User logged in successfully: ${user.email}`);

    return {
      access_token: this.jwtService.sign(payload),
      isAdmin: user.isAdmin,
    };
  }

  async signup(signUpData: Signup) {
    const { name, email, password } = signUpData;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      this.logger.warn(`Signup attempted for existing user: ${email}`);
      throw new ConflictException("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    this.logger.log(`User signed up successfully: ${email}`);
    return {
      message: "User signed up successfully",
    };
  }
}
