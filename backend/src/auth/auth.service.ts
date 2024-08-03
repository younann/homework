import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(profile: any): Promise<any> {
    const user = await this.usersService.findOrCreateUser(profile);
    return user;
  }
}
