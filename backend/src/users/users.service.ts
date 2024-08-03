import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findOrCreateUser(profile: any): Promise<User> {
    let user = await this.userModel.findOne({ googleId: profile.id }).exec();

    if (!user) {
      user = new this.userModel({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        profileImage: profile.photos[0].value,
      });
      await user.save();
    }
    return user;
  }
  async updateUser(userId: string, updateUserDto: any): Promise<User> {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ googleId: userId }, updateUserDto, {
        new: true,
        runValidators: true,
        upsert: false,
      })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with googleId ${userId} not found`);
    } else {
      return updatedUser;
    }
  }

  async getUserPortfolio(userId: string): Promise<string[]> {
    const user = await this.userModel.findOne({ googleId: userId }).exec();
    return user.favoriteStocks;
  }
  async addStockToPortfolio(userId: string, symbol: string): Promise<User> {
    const user = await this.userModel.findOne({ googleId: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.favoriteStocks.includes(symbol)) {
      user.favoriteStocks.push(symbol);
      await user.save();
    }

    return user;
  }
  async removeStockFromPortfolio(
    userId: string,
    symbol: string,
  ): Promise<User> {
    const user = await this.userModel.findOne({ googleId: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.favoriteStocks.includes(symbol)) {
      user.favoriteStocks = user.favoriteStocks.filter(
        (stock) => stock !== symbol,
      );
      await user.save();
    }
    return user;
  }
}
