<h1 align="center">NestJS 工程项目模板</h1>
<p align="center">
一个可用于生产的 NestJS 模板，包含企业应用程序的最佳实践，侧重于可扩展性、可维护性和开发人员体验。
</p>

## 内置功能

- [✔️] 用户认证与授权：基于 NestJS 的 JWT 认证和 RBAC 授权，提供完整的用户认证和授权功能
- [✔️] ORM 集成：使用 Prisma ORM 进行数据库操作
- [✔️] 请求验证与数据传输对象：使用 class-validator 和 class-transformer 对请求数据进行验证和格式转换
- [✔️] 全局异常处理与日志记录：配置全局异常过滤器，对错误进行统一处理与返回
- [✔️] 统一请求响应体：封装请求响应体，对请求响应进行统一处理和返回
- [✔️] 配置管理：使用 NestJS 的 ConfigModule 进行配置管理，支持环境变量和配置文件
- [✔️] 中间件与拦截器：内置用户请求、用户访问IP等中间件
- [✔️] 缓存集成：使用 Redis 进行缓存集成，支持缓存数据持久化、缓存数据过期时间设置等
- [✔️] 跨域支持：使用 NestJS 的 CORS 模块进行跨域支持，支持跨域请求的配置和设置
- [✔️] 数据分页: 针对 Prisma ORM 的数据分页进行封装
- 文件上传与存储：使用 Multer 进行文件上传和存储，支持文件上传的配置和设置
- 系统接口：根据业务代码自动生成相关的api接口文档。

## 使用

首先执行以下命令来创建一个新项目：

```shell
git clone https://github.com/lonewolfyx/nestjs-project-template.git my-project
```

其次执行以下命令来安装依赖包和初始化项目：

```shell
cd ./my-project
npm install
```

一旦安装了依赖项，您现在就可以通过创建`.env`包含用于开发的环境变量的新文件来配置您的项目。

```shell
cp .env.example .env.development
npm install
```

> 这边建议最后上线的时候将`.env.development`文件 cp 一份为 `.env.production` 使用生产环境变量

### 配置数据库

这边使用的是 Prisma ORM，所以需要先配置数据库，在 `prisma/schema.prisma` 文件中添加数据库配置，然后执行以下命令来生成数据库模型：

```shell
npm run db:pull
npm run db:generate
```

#### 公共接口

```ts
@Public()
```
