import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteConfirmationDialog from "./deleteConfirmDialog";
import EditDataDialog from "./editDataDialog";
import CreateDataDialog from "./createDataDialog";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  type: string;
  price: number;
  rating: number;
  warranty_years: number;
  available: boolean;
  dispo?: string;
}

function createData(
  _id: string,
  name: string,
  type: string,
  price: number,
  rating: number,
  warranty_years: number,
  available: boolean
) {
  let dispo: string;
  if (available) {
    dispo = "Disponible";
  } else {
    dispo = "En rupture de stock";
  }
  return { _id, name, type, price, rating, warranty_years, dispo };
}

export default function AccessibleTable() {
  const [rows, setRows] = React.useState<Product[]>([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
  const [selectedRowData, setSelectedRowData] = React.useState<{
    _id: string;
    name: string;
    type: string;
    price: number;
    rating: number;
    warranty_years: number;
    available: boolean;
  } | null>(null);
  // Récupération des données depuis l'API
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/products/all")
      .then((response) => {
        const data = response.data.products.map((item: Product) =>
          createData(
            item._id,
            item.name,
            item.type,
            item.price,
            item.rating,
            item.warranty_years,
            item.available
          )
        );
        setRows(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  // Fonctions de suppression
  const deleteProduct = (id: string) => {
    axios
      .delete(`http://localhost:3000/api/products/delete/${id}`)
      .then((response) => {
        console.log(response)
        setRows(rows.filter((row) => row._id !== id));
        console.log("Produit supprimé avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du produit :", error);
      });
  };
  const handleClickOpenDelete = (rowId: string) => {
    setSelectedRow(rowId);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedRow(null);
  };
  const handleConfirmDelete = () => {
    console.log(selectedRow);
    if (selectedRow) {
      deleteProduct(selectedRow);
    }
    console.log(`Produit supprimé avec succès`);
    setOpenDelete(false);
    setSelectedRow(null);
    window.location.reload();
  };

  // Fonctions de modification
  const handleClickOpenEdit = (rowId: string) => {
    const rowData = rows.find((row) => row._id === rowId);
    if (rowData) {
        if (rowData?.dispo === "Disponible") {
            rowData.available = true;
          } else {
            rowData.available = false;
          }
    }
    setSelectedRow(rowId);
    console.log(rowData);

    setSelectedRowData(
      rowData
        ? { ...rowData }
        : {
            _id: "",
            name: "",
            type: "",
            price: 0,
            rating: 0,
            warranty_years: 0,
            available: false,
          }
    );
    ;
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedRow(null);
  };
  const handleSaveEdit = (data: Product) => {
    // Logique de sauvegarde ici
    axios
      .put(`http://localhost:3000/api/products/update/${data._id}`, data)
      .then((response) => {
        console.log(response.data);
        setRows(
          rows.map((row) => (row._id === data._id ? { ...data } : row))
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la modification du produit :", error);
      });
    console.log("Produit modifié avec succès");
    setOpenEdit(false);
    setSelectedRow(null);
    window.location.reload();
    
  };

  // Fonctions d'ajout
  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };
  const handleSaveCreate = (data: Product) => {
    // Logique de sauvegarde ici
    axios
      .post("http://localhost:3000/api/products/create", data)
      .then((response) => {
        setRows([
          ...rows,
          createData(
            response.data._id,
            response.data.name,
            response.data.type,
            response.data.price,
            response.data.rating,
            response.data.warranty_years,
            response.data.available
          ),
        ]);
        console.log("Produit créé avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors de la création du produit :", error);
      });
    console.log("Données ajoutées :", data);
    setOpenCreate(false);
    window.location.reload();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Prix (€)</TableCell>
            <TableCell align="right">Note /5</TableCell>
            <TableCell align="right">Garantie Constructeur (année)</TableCell>
            <TableCell align="right">Disponibilité</TableCell>
            <TableCell align="right">
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpenCreate}
              >
                Ajouter un produit
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.rating}</TableCell>
              <TableCell align="right">{row.warranty_years}</TableCell>
              <TableCell align="right">{row.dispo}</TableCell>
              <TableCell align="right">
                <ButtonGroup>
                  <Button
                    variant="contained"
                    onClick={() => handleClickOpenEdit(row._id)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleClickOpenDelete(row._id)}
                  >
                    Supprimer
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteConfirmationDialog
        open={openDelete}
        handleClose={handleCloseDelete}
        handleConfirm={handleConfirmDelete}
      />
      <EditDataDialog
        open={openEdit}
        handleClose={handleCloseEdit}
        handleSave={handleSaveEdit}
        data={
          selectedRowData || {
            _id: "",
            name: "",
            type: "",
            price: 0,
            rating: 0,
            warranty_years: 0,
            available: false,
          }
        }
      />
      <CreateDataDialog
        open={openCreate}
        handleClose={handleCloseCreate}
        handleSave={handleSaveCreate}
      />
    </TableContainer>
  );
}
