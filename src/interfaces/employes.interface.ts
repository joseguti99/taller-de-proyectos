export interface EmployeeData {
    id: string;
    employee: string;
    email: string;
    document: string;
    phone: string;
    status: "ACTIVO" | "INACTIVO";
    startDate: string;
}