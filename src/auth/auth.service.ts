import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string, token?: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      return null;
    }
  
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (isPasswordValid) {
      const { password, ...result } = user.toObject();
      return result;
    }

    if (token) {
      if (user.accessToken !== token) {
        return null;
      }
      const now = new Date();
      if (user.tokenExpiration && user.tokenExpiration < now) {
        return null;
      }
      const { password, ...result } = user.toObject();
      return result;
    }
  
    return null;
  }
  

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
  
    
      const user = await this.usersService.findByEmail(email);
    
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      
      const payload = { username: user.username, sub: user._id };
      const access_token = this.jwtService.sign(payload);
  
      user.accessToken = access_token;
      user.tokenExpiration = new Date(Date.now() + 60 * 60 * 1000); 
       await user.save().catch(error => {
        throw new BadRequestException('Invalid user data');
      });
  
      return {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        access_token,
      };
  }

  
  async register(registerDto: RegisterDto) {
    const { email } = registerDto;
  
    try {
      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
  
      const newUser = await this.usersService.create({ ...registerDto });
  
      const payload = { username: newUser.username, sub: newUser._id };
      const access_token = this.jwtService.sign(payload);
      const tokenExpiration = new Date(Date.now() + 60 * 60 * 1000);
  
      newUser.accessToken = access_token;
      newUser.tokenExpiration = tokenExpiration;
  
      await newUser.save();
  
      return {
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
        access_token,
      };
    } catch (error) {
        throw new BadRequestException('Bad input data');
    }
  }
  async logout(token: string) {
    const user = await this.usersService.findByToken(token);
  
    if (user && user?._id) {
      await this.usersService.update(user._id as unknown as string, {
        accessToken: null,
        tokenExpiration: null,
      });
    }
  }

}
