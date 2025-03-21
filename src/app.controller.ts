import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from '@/modules/auth/guard/local-auth.guard'
import { AuthService } from '@/modules/auth/auth.service'
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard'
import { Public } from '@/modules/auth/decorators/public.decorator'

@Controller()
export class AppController {
	constructor(private readonly authService: AuthService) {}

	@Post('auth/login')
	@Public()
	@UseGuards(LocalAuthGuard)
	login(@Request() req: Request): any {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		return this.authService.login(req.user)
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile() {
		return '123'
	}
}
