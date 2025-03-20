import { Module } from '@nestjs/common'
import { ShareModule } from '@/share/share.module'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { ConfigModule } from '@nestjs/config'
import * as process from 'node:process'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`.env.${process.env.NODE_ENV}`]
        }),
        ShareModule

    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
