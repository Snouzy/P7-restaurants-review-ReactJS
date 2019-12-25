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

const AddingRestaurantForm = props => {
   const { isRightClicked, handleClose, onSend } = props;

   return (
      <Dialog
         open={isRightClicked}
         onClose={handleClose}
         aria-labelledby="form-dialog-title"
      >
         <DialogTitle id="form-dialog-title">Ajouter un restaurant</DialogTitle>
         <DialogContent>
            <DialogContentText>
               Ici, vous pouvez ajouter un restaurant. Merci d'être le plus
               précis possible.
            </DialogContentText>
            <TextField
               margin="none"
               id="name"
               label="Nom du restaurant..."
               type="text"
               color="primary"
               fullWidth
               onChange={props.changed}
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
};

export default AddingRestaurantForm;