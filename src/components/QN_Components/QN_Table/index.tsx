import { PaginatedResult } from "@/utils/interfaces/PaginatedResult.interface"
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Pagination
} from "@nextui-org/react"
import { useEffect, useState } from "react"

export interface QN_TableProps<T> {
	columns: Array<{
		key: string
		label: string
		render?: (value: any, row: T) => React.ReactNode
	}>
	rows?: T[]
	height?: any
	onRowClick?: (id: string) => void
	enablePagination?: boolean
	onFetchPage?: (page: number, rowsPerPage: number) => Promise<PaginatedResult<T>>
	paginatedResult?: PaginatedResult<T>
	rowsPerPage?: number
}

const getKeyValue = (obj: any, key: string) => {
	return key.split(".").reduce((acc, curr) => acc && acc[curr], obj)
}

export default function QN_Table<T>({
	columns,
	rows = [],
	height,
	onRowClick,
	enablePagination = false,
	onFetchPage,
	paginatedResult,
	rowsPerPage = 10
}: QN_TableProps<T>) {
	const [currentPage, setCurrentPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState<T[]>(rows)

	useEffect(() => {
		if (enablePagination && onFetchPage) {
			setIsLoading(true)
			onFetchPage(currentPage, rowsPerPage)
				.then((res) => setData(res.content))
				.finally(() => setIsLoading(false))
		} else {
			setData(rows)
		}
	}, [rows, currentPage, enablePagination, onFetchPage, rowsPerPage])

	const handleRowClick = (item: any) => {
		if (onRowClick) onRowClick(item._id)
	}

	const totalPages = paginatedResult?.totalPages ?? 1

	return (
		<div>
			<Table isHeaderSticky aria-label="Table" style={{ height: height ?? "300%" }}>
				<TableHeader columns={columns}>
					{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
				</TableHeader>
				<TableBody items={data} emptyContent={isLoading ? "Carregando..." : "Sem registros."}>
					{data.map((item: any, index: number) => (
						<TableRow
							key={index}
							onClick={() => handleRowClick(item)}
							style={{ cursor: "pointer", transition: "background-color 0.3s ease" }}
							onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
							onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
						>
							{columns.map((column) => {
								const value = getKeyValue(item, column.key) ?? "N/A"
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
			{enablePagination && totalPages > 1 && (
				<div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
					<Pagination
						page={currentPage}
						total={totalPages}
						onChange={setCurrentPage}
						loop
						color="primary"
						variant="flat"
					/>
				</div>
			)}
		</div>
	)
}
