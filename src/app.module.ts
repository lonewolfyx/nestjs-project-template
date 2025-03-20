import { Module } from '@nestjs/common'
import { ShareModule } from '@/share/share.module'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { ConfigModule } from '@nestjs/config'
import * as process from 'node:process'
import { APP_FILTER } from '@nestjs/core'
import { AllExceptionFilter } from '@/common/filters/all-exception.filter'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [`.env.${process.env.NODE_ENV}`]
		}),
		ShareModule

	],
	controllers: [AppController],
	providers: [
		AppService,
		{ provide: APP_FILTER, useClass: AllExceptionFilter }
    ]
})
export class AppModule {}
