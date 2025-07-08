import { useEffect, useState } from "react";
import { EmployeeData } from "../../interfaces/employes.interface";
import { CardStatesProps } from "../../components/CardStates";
import { initialEmployees } from "./constants";

export default function useEmployes() {
    const [search, setSearch] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [initialData, setInitialData] = useState<EmployeeData>();
    const [rows, setRows] = useState<EmployeeData[]>(initialEmployees);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | undefined>();

    const handleCreate = () => {
        setSelectedEmployee(undefined);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedEmployee(undefined);
    };

    const handleEdit = (employee: EmployeeData) => {
        setSelectedEmployee(employee);
        setModalOpen(true);
    };

    const handleSave = (data: EmployeeData) => {
        setRows((prev) => {
            if (data.id) {
                // Edición: buscar por id y actualizar
                const index = prev.findIndex(row => row.id === data.id);
                if (index !== -1) {
                    const newRows = [...prev];
                    newRows[index] = data;
                    return newRows;
                }
                // Si no encontró id, lo agrega (por si acaso)
                return [...prev, data];
            } else {
                // Creación: generar id y agregar
                const newData = { ...data, id: crypto.randomUUID() };
                return [...prev, newData];
            }
        });

        setModalOpen(false);
    };

    const handleDelete = (employee: EmployeeData) => {
        setModalOpen(false);
        setRows((prev) => prev.filter((row) => row.employee !== employee.employee));
    };

    const handleSubmit = () => {
        const lowerSearch = search.toLowerCase();
        setFilteredRows(
            rows.filter((row) =>
                row.employee.toLowerCase().includes(lowerSearch) ||
                row.email.toLowerCase().includes(lowerSearch) ||
                row.document.toLowerCase().includes(lowerSearch) ||
                row.phone.toLowerCase().includes(lowerSearch) ||
                row.status.toLowerCase().includes(lowerSearch)
            )
        );
    };

    const CardStatesData: CardStatesProps["data"] = [
        { label: "Total Empleados", value: rows?.length || 0 },
        { label: "Activos", value: rows?.filter((row) => row.status === "ACTIVO").length || 0 },
        { label: "Inactivos", value: rows?.filter((row) => row.status === "INACTIVO").length || 0 },
    ]

    const [filteredRows, setFilteredRows] = useState<EmployeeData[]>(initialEmployees);

    useEffect(() => {
        if (!search.trim()) {
            setFilteredRows(rows);
        }
    }, [search, rows]);

    return {
        search,
        setSearch,
        handleSubmit,
        rows,
        filteredRows,
        open,
        setOpen,
        initialData,
        setInitialData,
        handleCreate,
        handleEdit,
        handleSave,
        modalOpen,
        selectedEmployee,
        handleClose,
        handleDelete,
        CardStatesData
    };
}