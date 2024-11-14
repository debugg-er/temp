import { and, between, desc, eq, sql } from 'drizzle-orm'
import { Injectable } from '@nestjs/common'

import { NewNotebook, Notebook, notebooks } from '@/schemas/notebook'
import { INotebookRepository } from '@/types/repositories/INotebookRepository'

import { BaseRepository } from './base.repository'
import { TransactionManager } from './transaction.manager'

@Injectable()
export class NotebookRepository
    extends BaseRepository<Notebook, NewNotebook, Notebook['id']>(notebooks)
    implements INotebookRepository
{
    constructor(readonly transactionManager: TransactionManager) {
        super(transactionManager)
    }

    async findNotebookByWorkspaceId(workspaceId: string) {
        return await this.transactionManager.getTx().query.notebooks.findMany({
            where: eq(notebooks.workspaceId, workspaceId),
        })
    }

    async findLastOrder(workspaceId: string): Promise<number | null> {
        const [lastOrderedWorkbook] = await this.transactionManager
            .getTx()
            .select({ order: notebooks.order })
            .from(notebooks)
            .where(eq(notebooks.workspaceId, workspaceId))
            .limit(1)
            .orderBy(desc(notebooks.order))
        return lastOrderedWorkbook?.order ?? null
    }

    async rearrangeNotebookOrder(workspaceId: string, workbookId: string, oldOrder: number, newOrder: number) {
        const db = this.transactionManager.getTx()
        if (oldOrder > newOrder) {
            await db
                .update(notebooks)
                .set({ order: sql`${notebooks.order} + 1` })
                .where(and(eq(notebooks.workspaceId, workspaceId), between(notebooks.order, newOrder, oldOrder)))
        } else {
            await db
                .update(notebooks)
                .set({ order: sql`${notebooks.order} - 1` })
                .where(and(eq(notebooks.workspaceId, workspaceId), between(notebooks.order, oldOrder, newOrder)))
        }
        await db.update(notebooks).set({ order: newOrder }).where(eq(notebooks.id, workbookId))
    }
}
