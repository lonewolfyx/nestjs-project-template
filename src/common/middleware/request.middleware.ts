import dayjs from 'dayjs'

/**
 * 请求 ID 中间件
 * @param req
 * @param res
 * @param next
 */
export const requestMiddleware = (req: any, res: any, next: () => void) => {
	req.requestId = dayjs().format('YYYYMMDDHHmmss')

	next()
}
