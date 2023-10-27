'use client';

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { Card, CardContent } from './ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';
import Image from 'next/image';
import EditProductDialog from './EditProductDialog';
import DeleteProductDialog from './DeleteProductDialog';

const dashboardProductColumns = [
	{
		accessorKey: 'image',
		header: 'Image',
		cell: ({ row }) => (
			<div className="flex items-center gap-2 w-fit m-auto">
				<Image
					src={row.getValue('image')}
					alt={row.getValue('name')}
					className="object-cover w-20 rounded-lg"
					width={80}
					height={60}
				/>
			</div>
		),
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => (
			<p className=" text-slate-700 text-sm lg:text-base">
				{row.getValue('name')}
			</p>
		),
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({ row }) => (
			<p className=" text-slate-700 text-sm lg:text-base">
				${row.getValue('price')}
			</p>
		),
	},
	{
		accessorKey: 'id',
		header: 'Actions',
		cell: (info) => {
			const infoCasted = info;
			const product = infoCasted.products.filter(
				(p) => p.id == infoCasted.row.getValue('id')
			)[0];
			return (
				<div className="flex gap-2 justify-center">
					<EditProductDialog product={product} />
					<DeleteProductDialog id={infoCasted.row.getValue('id')} />
				</div>
			);
		},
	},
];

function DashboardProductTable({ products }) {
	const table = useReactTable({
		data: products,
		columns: dashboardProductColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card>
			<CardContent>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} className="text-center">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className=" w-1/5 text-center">
											{flexRender(cell.column.columnDef.cell, {
												...cell.getContext(),
												products,
											})}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={dashboardProductColumns.length}
									className="h-24 text-center"
								>
									<h4 className="text-lg font-semibold">
										You do not have added any product yet
									</h4>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

export default DashboardProductTable;
