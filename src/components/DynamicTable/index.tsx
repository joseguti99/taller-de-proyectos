import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from "@mui/material";
import { EmployeeData } from "../../interfaces/employes.interface";

export interface Column {
    label: string;
    key: string; 
    render?: (value: unknown, row: EmployeeData) => React.ReactNode;
}

interface DynamicTableProps {
    columns: Column[];
    rows: EmployeeData[];
}

export default function DynamicTable({ columns, rows }: DynamicTableProps) {
    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
                <TableHead sx={{ backgroundColor: "#d0d7e1" }}>
                    <TableRow>
                        {columns.map((col: Column) => (
                            <TableCell key={col.key}>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    {col.label.toUpperCase()}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow key={idx}>
                            {columns.map((col: Column) => (
                                <TableCell key={col.key}>
                                    {col.render
                                        ? col.render(row[col.key as keyof EmployeeData], row)
                                        : String(row[col.key as keyof EmployeeData] || '')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}