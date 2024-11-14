import { ClsService } from 'nestjs-cls'
import { subject } from '@casl/ability'
import { Inject, Injectable } from '@nestjs/common'

import { ALPHANUMERIC } from '@/constants/charset'
import { PaginationDto } from '@/dto/query'
import { EWorkspaceType, WORKSPACE_ID_LENGTH } from '@/schemas/workspace'
import { EWorkspaceRole } from '@/schemas/workspace-member'
import { ClsConfig } from '@/types/core/cls'
import { ITransactionManager } from '@/types/repositories/ITransactionManager'
import { IWorkspaceMemberRepository } from '@/types/repositories/IWorkspaceMemberRepository'
import { IWorkspaceRepository } from '@/types/repositories/IWorkspaceRepository'
import { generateString } from '@/utils/string'

import { CreateWorkspaceRequestDto } from './workspace.dto'
import { PermissionService } from '../permission/permission.service'
import { Action, Subject } from '../permission/permission.type'

@Injectable()
export class WorkspaceService {
    constructor(
        private readonly permissionService: PermissionService,
        private readonly clsService: ClsService<ClsConfig>,
        @Inject(ITransactionManager)
        private readonly transactionManager: ITransactionManager,
        @Inject(IWorkspaceRepository)
        private readonly workspaceRepository: IWorkspaceRepository,
        @Inject(IWorkspaceMemberRepository)
        private readonly workspaceMemberRepository: IWorkspaceMemberRepository,
    ) {}

    async getWorkspaceById(id: string) {
        await this.permissionService.canOrThrow(Action.Read, subject(Subject.Workspace, { id }))
        return this.workspaceRepository.findById(id)
    }

    async createWorkspace(dto: CreateWorkspaceRequestDto) {
        const userId = this.clsService.get('token.id')

        const newWorkspaceId = generateString(WORKSPACE_ID_LENGTH, ALPHANUMERIC)
        const newWorksapce =  await this.transactionManager.run(async () => {
            const newWorkspace = await this.workspaceRepository.create({
                id: newWorkspaceId,
                ...dto,
                type: EWorkspaceType.Defined,
                createdBy: userId,
                updatedBy: userId,
            })
            await this.workspaceMemberRepository.create({
                workspaceId: newWorkspaceId,
                userId: userId,
                role: EWorkspaceRole.Admin,
                addedBy: userId,
                updatedBy: userId,
            })

            return newWorkspace
        })
        console.log(newWorksapce)
        return newWorksapce
    }

    getAuthenticatedUserWorkspaces(pagination: PaginationDto) {
        const userId = this.clsService.get('token.id')
        return this.workspaceRepository.getWorkspacesOfUser(userId, {
            ...pagination,
            sort: {
                added_by: 'desc',
            },
        })
    }
}
