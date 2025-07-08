import { Chip } from "@mui/material";
import { Column } from "../../components/DynamicTable";
import { EmployeeData } from "../../interfaces/employes.interface";

export const columns: Column[] = [
  {
    label: "Empleado",
    key: "employee",
    render: (value, row) => (
      <div>
        <strong>{String(value)}</strong>
        <div style={{ fontSize: "0.85em", color: "#888" }}>{String(row.email)}</div>
      </div>
    ),
  },
  { label: "Documento", key: "document" },
  { label: "Teléfono", key: "phone" },
  {
    label: "Estado",
    key: "status",
    render: (value) => (
      <Chip
        label={String(value)}
        size="small"
        color={value === "ACTIVO" ? "success" : "error"}
        variant="outlined"
        sx={{ fontWeight: "bold" }}
      />
    ),
  },
  { label: "Fecha Ingreso", key: "startDate" },
];

export const initialEmployees: EmployeeData[] = [
  {
    id: "1",
    employee: "Juan Carlos Pérez",
    email: "juan.perez@empresa.com",
    document: "12.345.678",
    phone: "+54 351 123-4567",
    status: "ACTIVO",
    startDate: "15/03/2023",
  },
  {
    id: "2",
    employee: "María López",
    email: "maria.lopez@empresa.com",
    document: "23.456.789",
    phone: "+54 351 987-6543",
    status: "INACTIVO",
    startDate: "01/02/2022",
  },
  {
    id: "3",
    employee: "Carlos Gómez",
    email: "carlos.gomez@empresa.com",
    document: "34.567.890",
    phone: "+54 11 5555-6666",
    status: "ACTIVO",
    startDate: "20/06/2021",
  },
  {
    id: "4",
    employee: "Lucía Fernández",
    email: "lucia.fernandez@empresa.com",
    document: "45.678.901",
    phone: "+54 351 222-3333",
    status: "ACTIVO",
    startDate: "10/11/2020",
  },
  {
    id: "5",
    employee: "Pedro Martínez",
    email: "pedro.martinez@empresa.com",
    document: "56.789.012",
    phone: "+54 351 444-5555",
    status: "INACTIVO",
    startDate: "05/08/2019",
  },
];
