import { and, eq, getTableColumns, isNull } from 'drizzle-orm'
import { Injectable } from '@nestjs/common'

import { notes } from '@/schemas/note'
import { notebooks } from '@/schemas/notebook'
import { NewWorkspaceMember, WorkspaceMember, workspaceMembers } from '@/schemas/workspace-member'
import { IWorkspaceMemberRepository } from '@/types/repositories/IWorkspaceMemberRepository'

import { BaseRepository } from './base.repository'
import { TransactionManager } from './transaction.manager'

@Injectable()
export class WorkspaceMemberRepository
    extends BaseRepository<WorkspaceMember, NewWorkspaceMember, Pick<WorkspaceMember, 'userId' | 'workspaceId'>>(
        workspaceMembers,
    )
    implements IWorkspaceMemberRepository
{
    constructor(public readonly transactionManager: TransactionManager) {
        super(transactionManager)
    }

    async findMemberByNoteId(memberId: string, noteId: string): Promise<WorkspaceMember | null> {
        const [member] = await this.transactionManager
            .getTx()
            .select(getTableColumns(workspaceMembers))
            .from(workspaceMembers)
            .innerJoin(notebooks, eq(notebooks.workspaceId, workspaceMembers.workspaceId))
            .innerJoin(notes, eq(notes.notebookId, notebooks.id))
            .where(and(eq(notes.id, noteId), eq(workspaceMembers.userId, memberId), isNull(workspaceMembers.removedAt)))
        return member
    }
    async findMemberByNotebookId(memberId: string, workbookId: string): Promise<WorkspaceMember | null> {
        const [member] = await this.transactionManager
            .getTx()
            .select(getTableColumns(workspaceMembers))
            .from(workspaceMembers)
            .innerJoin(notebooks, eq(notebooks.workspaceId, workspaceMembers.workspaceId))
            .where(
                and(
                    eq(notebooks.id, workbookId),
                    eq(workspaceMembers.userId, memberId),
                    isNull(workspaceMembers.removedAt),
                ),
            )
        return member
    }
    async findMemberByWorkspaceId(memberId: string, workspaceId: string): Promise<WorkspaceMember | null> {
        const member = await this.transactionManager.getTx().query.workspaceMembers.findFirst({
            where: and(
                eq(workspaceMembers.workspaceId, workspaceId),
                eq(workspaceMembers.userId, memberId),
                isNull(workspaceMembers.removedAt),
            ),
        })
        return member ?? null
    }
}
