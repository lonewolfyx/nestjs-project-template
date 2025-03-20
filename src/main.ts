import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module'
import * as process from 'node:process'
import { Logger, ValidationPipe } from '@nestjs/common'
import { requestMiddleware } from '@/common/middleware/request.middleware'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// 跨域
	app.enableCors()

	// 请求 ID
	app.use(requestMiddleware)

	// 全局管道验证器
	app.useGlobalPipes(
		new ValidationPipe({
			// 自动将请求体转换为对应的DTO类实例
			transform: true
		})
	)

	await app.listen(process.env.PORT ?? 3000)

	return app.getUrl()
}

void (async (): Promise<void> => {
	try {
		const url = await bootstrap()
		Logger.log(url, 'Bootstrap')
	} catch (error) {
		Logger.error(error, 'Bootstrap')
	}
})()
