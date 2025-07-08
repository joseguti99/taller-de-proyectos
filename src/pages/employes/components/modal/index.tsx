import React, { useState, useEffect } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Stack,
} from "@mui/material";
import { EmployeeData } from "../../../../interfaces/employes.interface";
import { parseDateToISO } from "../../../../utils/dates";

interface EmployeeModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: EmployeeData) => void;
    initialData?: EmployeeData; // Si viene, es edición; si no, creación
}

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function EmployeeModal({
    open,
    onClose,
    onSave,
    initialData,
}: EmployeeModalProps) {
    const [form, setForm] = useState<EmployeeData>({
        id: "",
        employee: "",
        email: "",
        document: "",
        phone: "",
        status: "ACTIVO",
        startDate: "",
    });

    // Cargar datos cuando cambie initialData (modo edición)
    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        } else {
            setForm({
                id: "",
                employee: "",
                email: "",
                document: "",
                phone: "",
                status: "ACTIVO",
                startDate: "",
            });
        }
    }, [initialData, open]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Aquí podrías agregar validaciones
        if (!form.employee || !form.email) {
            alert("Empleado y Email son obligatorios");
            return;
        }
        onSave(form);
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="employee-modal-title">
            <Box sx={style}>
                <Typography id="employee-modal-title" variant="h6" mb={2}>
                    {initialData ? "Editar Empleado" : "Nuevo Empleado"}
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        label="Empleado"
                        name="employee"
                        value={form.employee}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Documento"
                        name="document"
                        value={form.document}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Teléfono"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        select
                        label="Estado"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="ACTIVO">ACTIVO</MenuItem>
                        <MenuItem value="INACTIVO">INACTIVO</MenuItem>
                    </TextField>

                    <TextField
                        label="Fecha Ingreso"
                        name="startDate"
                        type="date"
                        value={parseDateToISO(form.startDate)}
                        onChange={(e) => {
                            const date = new Date(e.target.value);
                            if (!isNaN(date.getTime())) {
                                const day = String(date.getDate()).padStart(2, "0");
                                const month = String(date.getMonth() + 1).padStart(2, "0");
                                const year = date.getFullYear();
                                setForm((prev) => ({
                                    ...prev,
                                    startDate: `${day}/${month}/${year}`,
                                }));
                            } else {
                                // Si la fecha no es válida, limpia el campo o maneja error
                                setForm((prev) => ({
                                    ...prev,
                                    startDate: "",
                                }));
                            }
                        }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button onClick={onClose} sx={{ mr: 1 }}>
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={handleSave}>
                            Guardar
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Modal>
    );
}
