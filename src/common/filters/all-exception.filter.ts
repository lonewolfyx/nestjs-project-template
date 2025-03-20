import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'
import { Request, Response } from 'express'
import { ResponseDto } from '@/common/dto/response.dto'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { isArray } from 'radash'
import { SERVER_INTERNAL_ERROR } from '@/constants/response.constants'

interface ErrorResponse {
	message: string | string[]
	error: string
	statusCode: number
}

interface ErrorStructure {
	code: number
	message: string
}

/**
 * 全局异常过滤器
 */
@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
	catch(exception: T, host: ArgumentsHost) {
		const ctx = host.switchToHttp() as HttpArgumentsHost
		const response: Response = ctx.getResponse<Response>()
		const request: Request = ctx.getRequest<Request>()

		const { code, message } = this.getErrorStructure(exception)

		response.status(HttpStatus.OK).json(new ResponseDto(message).setCode(code).setRequestId(request.requestId))
	}

	/**
	 * 获取错误信息
	 * @param exception
	 * @private
	 */
	private getErrorStructure(exception: T): ErrorStructure {
		if (exception instanceof BadRequestException) {
			const response = exception.getResponse() as ErrorResponse
			const message = isArray(response.message) ? response.message?.[0] : response.message

			return {
				code: response.statusCode,
				message
			}
		}

		if (exception instanceof HttpException) {
			return {
				code: exception.getStatus(),
				message: exception.message
			}
		}

		return {
			code: HttpStatus.INTERNAL_SERVER_ERROR,
			message: SERVER_INTERNAL_ERROR
		}
	}
}
