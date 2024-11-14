import { Injectable } from '@nestjs/common'

import { NewNote, Note, notes } from '@/schemas/note'
import { TPagination } from '@/types/core/query'
import { INoteRepository } from '@/types/repositories/INoteRepository'

import { BaseRepository } from './base.repository'
import { TransactionManager } from './transaction.manager'

@Injectable()
export class NoteRepository extends BaseRepository<Note, NewNote, Note['id']>(notes) implements INoteRepository {
    constructor(readonly transactionManager: TransactionManager) {
        super(transactionManager)
    }

    findNotesInBook(_bookId: string, _pagination: TPagination<'updated_at'>): Promise<Note[]> {
        throw new Error('Method not implemented.')
    }
}
