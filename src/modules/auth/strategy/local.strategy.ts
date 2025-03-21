import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '@/modules/auth/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			usernameField: 'username'
		})
	}

	/**
	 * 本地登录校验
	 * @param username
	 * @param password
	 */
	async validate(username: string, password: string): Promise<any> {
		const user = await this.authService.validateUser(username, password)

		if (!user) {
			throw new UnauthorizedException('用户不存在')
		}

		return user
	}
}
