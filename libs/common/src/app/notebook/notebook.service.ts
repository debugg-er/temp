import { ClsService } from 'nestjs-cls'
import { subject } from '@casl/ability'
import { Inject, Injectable } from '@nestjs/common'

import { ClsConfig } from '@/types/core/cls'
import { INotebookRepository } from '@/types/repositories/INotebookRepository'
import { ITransactionManager } from '@/types/repositories/ITransactionManager'
import { isNil } from '@/utils/mics'

import { CreateWorkbookDto, OrderingWorkbookDto } from './notebook.dto'
import { NotebookException } from './notebook.exception'
import { PermissionService } from '../permission/permission.service'
import { Action, Subject } from '../permission/permission.type'

@Injectable()
export class NotebookService {
    constructor(
        private readonly permissionService: PermissionService,
        private readonly clsService: ClsService<ClsConfig>,
        @Inject(ITransactionManager)
        private readonly transactionManager: ITransactionManager,
        @Inject(INotebookRepository)
        private readonly notebookRepository: INotebookRepository,
    ) {}

    async createNotebook(dto: CreateWorkbookDto) {
        await this.permissionService.canOrThrow(Action.Create, subject(Subject.Workbook, dto))

        const userId = this.clsService.get('token.id')
        return this.transactionManager.run(
            async () => {
                const lastOrder = await this.notebookRepository.findLastOrder(dto.workspaceId)
                const notebook = await this.notebookRepository.create({
                    ...dto,
                    order: isNil(lastOrder) ? 0 : lastOrder + 1,
                    createdBy: userId,
                    updatedBy: userId,
                })
                return notebook
            },
            { isolationLevel: 'serializable' },
        )
    }

    async orderingNotebook(notebookId: string, dto: OrderingWorkbookDto) {
        await this.permissionService.canOrThrow(Action.Update, subject(Subject.Workbook, { id: notebookId }))

        return this.transactionManager.run(
            async () => {
                const notebook = await this.notebookRepository.findById(notebookId)
                if (!notebook) {
                    throw new NotebookException.NotebookNotFound()
                }
                if (notebook.order === dto.order) return
                const lastOrder = (await this.notebookRepository.findLastOrder(notebook.workspaceId))!
                if (dto.order > lastOrder) {
                    throw new NotebookException.InvalidOrder()
                }

                await this.notebookRepository.rearrangeNotebookOrder(
                    notebook.workspaceId,
                    notebook.id,
                    notebook.order,
                    dto.order,
                )
            },
            { isolationLevel: 'repeatable read' },
        )
    }

    async getNotebooksByWorkspaceId(workspaceId: string) {
        await this.permissionService.canOrThrow(Action.Read, subject(Subject.Workbook, { workspaceId }))
        return this.notebookRepository.findNotebookByWorkspaceId(workspaceId)
    }
}
