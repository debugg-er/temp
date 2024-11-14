import { Module } from '@nestjs/common'

import { NotebookController } from './notebook.controller'
import { NotebookService } from './notebook.service'
import { PermissionModule } from '../permission/permission.module'

@Module({
    imports: [PermissionModule],
    controllers: [NotebookController],
    providers: [NotebookService],
})
export class NotebookModule {}
