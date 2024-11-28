import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

export interface QN_TableProps {
    columns: Array<{
        key: string
        label: string
        render?: (value: any, row: any) => React.ReactNode
    }>
    rows: any[]
    height?: any
    onRowClick?: (id: string) => void
}

const getKeyValue = (obj: any, key: string) => {
    return key.split('.').reduce((acc, curr) => acc && acc[curr], obj)
}

export default function QN_Table({ columns, rows, height, onRowClick }: QN_TableProps) {
    const handleRowClick = (item: any) => {
        if (onRowClick) {
            onRowClick(item._id)
        }
    }

    return (
        <Table
            isHeaderSticky
            aria-label="Table"
            style={{ height: '300%'}}
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody 
                items={rows} 
                emptyContent="Sem registros."
                style={{
                    height: '150px',
                    overflowY: 'auto',
                }}
                >
                {rows.map((item, index) => (
                    <TableRow
                        key={index}
                        onClick={() => handleRowClick(item)}
                        style={{
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                        {columns.map((column) => {
                            const value = getKeyValue(item, column.key) ?? 'N/A';
                            return (
                                <TableCell key={column.key}>
                                    {column.render ? column.render(value, item) : value}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
