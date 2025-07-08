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
    render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface DynamicTableProps {
    columns: unknown;
    rows: EmployeeData[];
}

export default function DynamicTable({ columns, rows }: DynamicTableProps) {
    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
                <TableHead sx={{ backgroundColor: "#d0d7e1" }}>
                    <TableRow>
                        {columns.map((col) => (
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
                            {columns.map((col) => (
                                <TableCell key={col.key}>
                                    {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
