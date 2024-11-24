import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DeleteConfirmationDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export default function DeleteConfirmationDialog({
  open,
  handleClose,
  handleConfirm,
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirmer la suppression"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
}