import { eq, getTableColumns } from 'drizzle-orm'
import { Injectable } from '@nestjs/common'

import { NewWorkspace, Workspace, workspaces } from '@/schemas/workspace'
import { workspaceMembers } from '@/schemas/workspace-member'
import { TPagination } from '@/types/core/query'
import { IWorkspaceRepository } from '@/types/repositories/IWorkspaceRepository'

import { BaseRepository } from './base.repository'
import { TransactionManager } from './transaction.manager'
import { withPagination } from '../drizzle.util'

@Injectable()
export class WorkspaceRepository
    extends BaseRepository<Workspace, NewWorkspace, Workspace['id']>(workspaces)
    implements IWorkspaceRepository
{
    constructor(public readonly transactionManager: TransactionManager) {
        super(transactionManager)
    }

    async getWorkspacesOfUser(userId: string, pagination: TPagination<'added_by'>): Promise<Workspace[]> {
        const db = this.transactionManager.getTx()
        const qb = db
            .select(getTableColumns(workspaces))
            .from(workspaces)
            .innerJoin(workspaceMembers, eq(workspaces.id, workspaceMembers.workspaceId))
            .where(eq(workspaceMembers.userId, userId))
            .$dynamic()

        return await withPagination(qb, pagination)
    }
}
