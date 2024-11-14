import { UserService } from './user.service'
import { WorkspaceService } from '../workspace/workspace.service'
import { GetMyWorkspacesReply, UserServiceController, UserServiceControllerMethods } from '@/proto/user'
import { Empty } from '@/proto/google/protobuf/empty'
import { Observable } from 'rxjs'

@UserServiceControllerMethods()
export class UserResolver implements UserServiceController {
    constructor(
        private readonly userService: UserService,
        private readonly workspaceService: WorkspaceService,
    ) {}

    getMyWorkspaces(
        request: Empty,
    ): GetMyWorkspacesReply | Observable<GetMyWorkspacesReply> | Promise<GetMyWorkspacesReply> {
        throw new Error('Method not implemented.')
    }
}