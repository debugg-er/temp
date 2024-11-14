import { IsInt, IsOptional, Max, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PaginationDto {
    @ApiProperty({ default: 50 })
    @IsInt()
    @Min(1)
    @Max(200)
    @IsOptional()
    limit = 50

    @ApiProperty({ default: 0 })
    @IsInt()
    @Min(0)
    @IsOptional()
    offset = 0
}
