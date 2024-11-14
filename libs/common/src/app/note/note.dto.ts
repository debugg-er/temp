import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateNoteDto {
    @ApiProperty()
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    notebookId: string

    @ApiProperty({ default: '{{$randomWords}}' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    title: string

    @ApiProperty({ default: '{{$randomWords}}' })
    @IsString()
    @IsNotEmpty()
    content: string
}

export class UpdateNoteDto {
    @ApiProperty({ default: '{{$randomWords}}' })
    @IsString()
    @IsOptional()
    @MaxLength(256)
    title?: string

    @ApiProperty({ default: '{{$randomWords}}' })
    @IsString()
    @IsOptional()
    content?: string
}
