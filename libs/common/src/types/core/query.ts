export type TPagination<SortableColumn extends string | number = string> = {
    limit: number
    offset?: number
    sort?: TSort<SortableColumn>
}

export type TSort<SortableColumn extends string | number | symbol> = Record<SortableColumn, 'desc' | 'acs'>
