import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID:
        '13917508526-so78ju1vf1a5vgckc1beatfnbdegdk7k.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3030/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = await this.authService.validateUser(profile);
    done(null, user);
  }
}
