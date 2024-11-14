import { Module } from '@nestjs/common'

import { UserService } from './user.service'
import { PermissionModule } from '../permission/permission.module'
import { WorkspaceService } from '../workspace/workspace.service'

@Module({
    imports: [PermissionModule],
    controllers: [],
    providers: [UserService, WorkspaceService],
})
export class UserModule {}
