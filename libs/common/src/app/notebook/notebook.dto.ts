import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateWorkbookDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    workspaceId: string

    @ApiProperty({ default: '{{$randomWords}}' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    title: string
}

export class OrderingWorkbookDto {
    @ApiProperty()
    @IsInt()
    @Min(0)
    order: number
}
