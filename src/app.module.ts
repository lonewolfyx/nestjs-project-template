import { Module } from '@nestjs/common'
import { ShareModule } from '@/share/share.module'
import { ConfigModule } from '@nestjs/config'
import * as process from 'node:process'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { AllExceptionFilter } from '@/common/filters/all-exception.filter'
import { ResponseInterceptor } from '@/common/interceptor/response.interceptor'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard'
import { AppController } from '@/app.controller'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [`.env.${process.env.NODE_ENV}`]
		}),
		ShareModule,
		AuthModule,
		UserModule

	],
	controllers: [
		AppController
	],
	providers: [
		{ provide: APP_GUARD, useClass: JwtAuthGuard },
		{ provide: APP_FILTER, useClass: AllExceptionFilter },
		{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }
	]
})
export class AppModule {}
