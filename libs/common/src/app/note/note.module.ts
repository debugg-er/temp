import { Module } from '@nestjs/common'

import { NoteController } from './note.controller'
import { NoteService } from './note.service'
import { PermissionModule } from '../permission/permission.module'

@Module({
    imports: [PermissionModule],
    controllers: [NoteController],
    providers: [NoteService],
})
export class NoteModule {}
