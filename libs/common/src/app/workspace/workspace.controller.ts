import { Observable } from 'rxjs'
import { UseGuards } from '@nestjs/common'

import { CreateWorkspaceRequestDto } from './workspace.dto'
import { NotebookService } from '../notebook/notebook.service'
import { WorkspaceService } from '../workspace/workspace.service'

import { Auth0Guard } from '@/guards/authenticate.guard'
import {
    CreateWorkspaceReply,
    GetNotebooksReply,
    GetNotebooksRequest,
    GetWorkspaceReply,
    GetWorkspaceRequest,
    WorkspaceServiceController,
    WorkspaceServiceControllerMethods,
} from '@/proto/workspace'

@UseGuards(Auth0Guard)
@WorkspaceServiceControllerMethods()
export class WorkspaceController implements WorkspaceServiceController {
    constructor(
        private readonly workspaceService: WorkspaceService,
        private readonly notebookService: NotebookService,
    ) {}

    createWorkspace(
        dto: CreateWorkspaceRequestDto,
    ): CreateWorkspaceReply | Promise<CreateWorkspaceReply> | Observable<CreateWorkspaceReply> {
        return this.workspaceService.createWorkspace(dto)
    }

    getWorkspace(
        request: GetWorkspaceRequest,
    ): GetWorkspaceReply | Promise<GetWorkspaceReply> | Observable<GetWorkspaceReply> {
        throw new Error('Method not implemented.')
    }

    getNotebooks(
        request: GetNotebooksRequest,
    ): GetNotebooksReply | Promise<GetNotebooksReply> | Observable<GetNotebooksReply> {
        throw new Error('Method not implemented.')
    }
}
