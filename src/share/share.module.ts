import { Global, Module } from '@nestjs/common'
import { DatabaseModule } from '@/share/database/database.module'

@Global()
@Module({
    imports: [DatabaseModule],
    exports: [DatabaseModule]
})
export class ShareModule {
}
