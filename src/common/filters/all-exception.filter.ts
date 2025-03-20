import { ArgumentsHost, Catch, ExceptionFilter, ExecutionContext, HttpStatus } from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'
import { Request, Response } from 'express'
import { ResponseDto } from '@/common/dto/response.dto'

/**
 * 全局异常过滤器
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	catch(exception: ExecutionContext, host: ArgumentsHost) {
		const ctx = host.switchToHttp() as HttpArgumentsHost
		const response: Response = ctx.getResponse<Response>()
		const request: Request = ctx.getRequest<Request>()

		response.status(HttpStatus.OK).json(new ResponseDto([], request.requestId))
	}
}
