import { Global, Module } from '@nestjs/common'

import { INotebookRepository } from '@/types/repositories/INotebookRepository'
import { INoteRepository } from '@/types/repositories/INoteRepository'
import { ITransactionManager } from '@/types/repositories/ITransactionManager'
import { IUserRepository } from '@/types/repositories/IUserRepository'
import { IUserSessionRepository } from '@/types/repositories/IUserSessionRepository'
import { IWorkspaceMemberRepository } from '@/types/repositories/IWorkspaceMemberRepository'
import { IWorkspaceRepository } from '@/types/repositories/IWorkspaceRepository'

import { DrizzleService } from './drizzle.service'
import { NoteRepository } from './repositories/note.repository'
import { NotebookRepository } from './repositories/notebook.repository'
import { TransactionManager } from './repositories/transaction.manager'
import { UserRepository } from './repositories/user.repository'
import { UserSessionRepository } from './repositories/user-session.repository'
import { WorkspaceRepository } from './repositories/workspace.repository'
import { WorkspaceMemberRepository } from './repositories/workspace-member.repository'

@Global()
@Module({
    providers: [
        DrizzleService,
        TransactionManager,
        {
            provide: ITransactionManager,
            useClass: TransactionManager,
        },
        {
            provide: IWorkspaceMemberRepository,
            useClass: WorkspaceMemberRepository,
        },
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        {
            provide: IWorkspaceRepository,
            useClass: WorkspaceRepository,
        },
        {
            provide: INotebookRepository,
            useClass: NotebookRepository,
        },
        {
            provide: IUserSessionRepository,
            useClass: UserSessionRepository,
        },
        {
            provide: INoteRepository,
            useClass: NoteRepository,
        },
    ],
    exports: [
        ITransactionManager,
        IUserRepository,
        IWorkspaceMemberRepository,
        IWorkspaceRepository,
        INotebookRepository,
        IUserSessionRepository,
        INoteRepository,
    ],
})
export class DrizzleModule {}
