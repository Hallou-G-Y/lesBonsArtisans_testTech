import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface CreateDataDialogProps {
    open: boolean;
    handleClose: () => void;
    handleSave: (data: { name: string; type: string; price: number; rating: number; warranty_years: number; available: boolean; }) => void;
}

export default function CreateDataDialog({ open, handleClose, handleSave }: CreateDataDialogProps) {
    const [formData, setFormData] = React.useState({
        name: "",
        type: "",
        price: 0,
        rating: 0,
        warranty_years: 0,
        available: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'price' || name === 'rating' || name === 'warranty_years' ? parseFloat(value) : value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

    const handleSubmit = () => {
        handleSave(formData);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Créer un nouveau produit</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Prix (€)"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Note"
                    name="rating"
                    type="number"
                    value={formData.rating}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Garantie Constructeur (année)"
                    name="warranty_years"
                    type="number"
                    value={formData.warranty_years}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.available}
                            onChange={handleCheckboxChange}
                            name="available"
                        />
                    }
                    label="Disponible"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Annuler
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Enregistrer
                </Button>
            </DialogActions>
        </Dialog>
    );
}