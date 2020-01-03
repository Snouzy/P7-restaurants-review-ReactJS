import React from "react";
import {
   Dialog,
   Button,
   TextField,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle
} from "@material-ui/core";

const AddingRestaurantForm = ({
   isRightClicked,
   handleClose,
   onSend,
   changed
}) => (
   <Dialog
      open={isRightClicked}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
   >
      <DialogTitle id="form-dialog-title">Ajouter un restaurant</DialogTitle>
      <DialogContent>
         <DialogContentText>
            Ici, vous pouvez ajouter un restaurant. Merci d'être le plus précis
            possible. Attention, votre restaurant n'aura aucune étoile à son
            ajout.
         </DialogContentText>
         <TextField
            margin="none"
            id="name"
            label="Nom du restaurant..."
            type="text"
            color="primary"
            fullWidth
            onChange={changed}
         />
      </DialogContent>
      <DialogActions>
         <Button color="primary" onClick={handleClose}>
            Fermer
         </Button>
         <Button color="primary" onClick={onSend}>
            Ajouter
         </Button>
      </DialogActions>
   </Dialog>
);

export default AddingRestaurantForm;
