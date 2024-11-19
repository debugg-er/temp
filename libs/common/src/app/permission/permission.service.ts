import { ClsService } from 'nestjs-cls'
import { ForcedSubject } from '@casl/ability'
import { Inject, Injectable } from '@nestjs/common'

import { AppAbillityBuilder } from './app-abillity-builder'
import { PermissionException } from './permission.exception'
import { Action, Subject } from './permission.type'

import { Note } from '@/schemas/note'
import { Notebook } from '@/schemas/notebook'
import { Workspace } from '@/schemas/workspace'
import { WorkspaceMember } from '@/schemas/workspace-member'
import { ClsConfig } from '@/types/core/cls'
import { IWorkspaceMemberRepository } from '@/types/repositories/IWorkspaceMemberRepository'
import { isNil } from '@/utils/mics'

@Injectable()
export class PermissionService {
    constructor(
        private readonly clsService: ClsService<ClsConfig>,
        @Inject(IWorkspaceMemberRepository)
        private readonly workspaceMemberRepository: IWorkspaceMemberRepository,
    ) {}

    async can(action: Action, subject: ForcedSubject<Subject>) {
        const member = await this.getMember(subject)
        const ability = new AppAbillityBuilder(member ?? undefined).build()
        return ability.can(action, subject)
    }
    async canOrThrow(action: Action, subject: ForcedSubject<Subject>) {
        const hasPermission = await this.can(action, subject)
        if (!hasPermission) {
            throw new PermissionException.PermissionDenied()
        }
    }

    private async getMember(subject: ForcedSubject<Subject>): Promise<WorkspaceMember | null> {
        const userId = this.clsService.get('token.id')
        switch (subject.__caslSubjectType__) {
            case Subject.Workspace: {
                const w = subject as unknown as Workspace
                return this.workspaceMemberRepository.findMemberByWorkspaceId(userId, w.id)
            }
            case Subject.Workbook: {
                const wb = subject as unknown as Notebook
                if (!isNil(wb.workspaceId)) {
                    return this.workspaceMemberRepository.findMemberByWorkspaceId(userId, wb.workspaceId)
                }
                return this.workspaceMemberRepository.findMemberByNotebookId(userId, wb.id)
            }
            case Subject.Note: {
                const n = subject as unknown as Note
                if (!isNil(n.notebookId)) {
                    return this.workspaceMemberRepository.findMemberByNotebookId(userId, n.notebookId)
                }
                return this.workspaceMemberRepository.findMemberByNoteId(userId, n.id)
            }
            default:
                return null
        }
    }
}
