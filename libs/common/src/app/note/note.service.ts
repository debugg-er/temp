import { ClsService } from 'nestjs-cls'
import { subject } from '@casl/ability'
import { Inject, Injectable } from '@nestjs/common'

import { CreateNoteDto } from './note.dto'
import { NoteException } from './note.exception'
import { PermissionService } from '../permission/permission.service'
import { Action, Subject } from '../permission/permission.type'

import { ClsConfig } from '@/types/core/cls'
import { TPagination } from '@/types/core/query'
import { INotebookRepository } from '@/types/repositories/INotebookRepository'
import { INoteRepository } from '@/types/repositories/INoteRepository'

@Injectable()
export class NoteService {
    constructor(
        private readonly clsService: ClsService<ClsConfig>,
        private readonly permissionService: PermissionService,
        @Inject(INoteRepository)
        private readonly noteRepository: INoteRepository,
        @Inject(INotebookRepository)
        private readonly workbookRepository: INotebookRepository,
    ) {}

    async getNoteById(noteId: string) {
        await this.permissionService.canOrThrow(Action.Read, subject(Subject.Note, { id: noteId }))
        const note = await this.noteRepository.findById(noteId)
        if (!note) {
            throw new NoteException.NoteNotFound()
        }
        return note
    }

    async getNotesByBookId(bookId: string, pagination: TPagination) {
        await this.permissionService.canOrThrow(Action.Read, subject(Subject.Note, { bookId }))
        return this.noteRepository.findNotesInBook(bookId, {
            ...pagination,
            sort: { updated_at: 'desc' },
        })
    }

    async createNote(dto: CreateNoteDto) {
        await this.permissionService.canOrThrow(Action.Create, subject(Subject.Note, { bookId: dto.notebookId }))
        const book = await this.workbookRepository.findById(dto.notebookId)
        if (!book) {
            throw new NoteException.BookNotFound()
        }
        const userId = this.clsService.get('token.id')
        const newNote = await this.noteRepository.create({
            ...dto,
            createdBy: userId,
            updatedBy: userId,
        })
        return newNote
    }

    // async updateNote(noteId: number, dto: UpdateNoteDto) {
    //     await this.permissionService.canOrThrow(Action.Update, subject(Subject.Note, { id: noteId }))
    //     const updatedNote = await this.prismaService.note.update({
    //         data: dto,
    //         where: { id: noteId },
    //     })
    //     return updatedNote
    // }
}
