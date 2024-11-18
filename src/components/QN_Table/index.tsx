import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

export interface QN_TableProps {
    columns: Array<{
        key: string;
        label: string;
        render?: (value: any, row: any) => React.ReactNode
    }>
    rows: any[]
    onRowClick?: (id: string) => void
}

export default function QN_Table({ columns, rows, onRowClick }: QN_TableProps) {
    const handleRowClick = (item: any) => {
        if (onRowClick) {
            onRowClick(item._id)
        }
    }

    return (
        <Table aria-label='Table'>
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={rows} emptyContent={"Sem registros."}>
                {rows.map((item, index) => (
                    <TableRow
                        key={index}
                        onClick={() => handleRowClick(item)}
                        style={{
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        {(columnKey) => {
                            const column = columns.find(col => col.key === columnKey)
                            const value = getKeyValue(item, columnKey) ?? 'N/A'
                            return (
                                <TableCell>
                                    {column?.render ? column.render(value, item) : value}
                                </TableCell>
                            )
                        }}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
