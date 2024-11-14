import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateNoteDto } from './note.dto'
import { NoteService } from './note.service'

@ApiTags('/notes')
@Controller('/notes')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Post('/')
    createBook(@Body() dto: CreateNoteDto) {
        return this.noteService.createNote(dto)
    }

    @Get('/:id')
    getNote(@Param('id') noteId: string) {
        return this.noteService.getNoteById(noteId)
    }

    // @Patch('/:id')
    // updateBook(@Param('id') noteId: string, @Body(new JoiValidationPipe(CreateBookDtoSchema)) dto: CreateNoteDto) {
    //     return this.noteService.updateNote(noteId, dto)
    // }
}
