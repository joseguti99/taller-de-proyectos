import { Button, Grid } from "@mui/material";
import { Header, Search, CardStates, DynamicTable } from "../../components";
import { columns } from "./constants";
import useEmployes from "./useEmployes";
import EmployeeModal from "./components/modal";
import { Delete, Edit, People } from "@mui/icons-material";
import { EmployeeData } from "../../interfaces/employes.interface";

export default function Employes() {
    const {
        search,
        setSearch,
        handleSubmit,
        filteredRows,
        handleCreate,
        handleEdit,
        handleSave,
        modalOpen,
        selectedEmployee,
        handleClose,
        handleDelete,
        CardStatesData
    } = useEmployes();

    const columnsDinamic = [
        ...columns,
        {
            label: "Acciones",
            key: "actions",
            render: (_: unknown, row: EmployeeData) => (
                <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEdit(row)}
                >
                    Editar
                </Button>
            ),
        },
        {
            label: "Acciones",
            key: "actions",
            render: (_: unknown, row: EmployeeData) => (
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(row)}
                >
                    Eliminar
                </Button>
            ),
        }
    ]

    return (
        <Grid sx={{ backgroundColor: '#f7f8fe', height: '100vh' }}>
            <Header title="Gestion de Empleados" icon={<People />} />
            <CardStates data={CardStatesData}/>
            <Grid display='flex' justifyContent='space-between' alignItems='center' mx={1} gap={2}>
                <Search value={search} setValue={setSearch} onSearch={handleSubmit} />
                <Button variant='contained' size='small' onClick={handleCreate}>
                    Nuevo Empleado
                </Button>
            </Grid>
            <Grid mx={1} mt={2}>
                <DynamicTable columns={columnsDinamic} rows={filteredRows} />
            </Grid>
            <EmployeeModal
                open={modalOpen}
                onClose={handleClose}
                onSave={handleSave}
                initialData={selectedEmployee}
            />
        </Grid>
    )
}