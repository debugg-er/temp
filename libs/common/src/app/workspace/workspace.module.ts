import { Module } from '@nestjs/common'

import { WorkspaceController } from './workspace.controller'
import { WorkspaceService } from './workspace.service'
import { NotebookService } from '../notebook/notebook.service'
import { PermissionModule } from '../permission/permission.module'

@Module({
    imports: [PermissionModule],
    controllers: [WorkspaceController],
    providers: [WorkspaceService, NotebookService],
})
export class WorkspaceModule {}
