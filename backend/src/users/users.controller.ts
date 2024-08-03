import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getProfile(@Param() params: any): any {
    const userData = this.usersService.findOrCreateUser({ id: params.id });
    return userData;
  }

  @Put(':id')
  updateProfile(@Param() params: any, @Body() updateUserDto: any) {
    return this.usersService.updateUser(params.id, {
      email: updateUserDto.email,
      displayName: updateUserDto.displayName,
    });
  }

  @Get(':id/portfolio')
  getPortfolio(@Param() params: any) {
    return this.usersService.getUserPortfolio(params.id);
  }

  @Put(':id/portfolio')
  async addToPortfolio(
    @Param() params: any,
    @Body('symbol') symbol: string,
  ): Promise<any> {
    return this.usersService.addStockToPortfolio(params.id, symbol);
  }

  @Put(':id/removeStock')
  async removeFromPortfolio(
    @Param() params: any,
    @Body('symbol') symbol: string,
  ): Promise<any> {
    return this.usersService.removeStockFromPortfolio(params.id, symbol);
  }
}
