import React from "react";
import Stars from "./Stars";

import {
   Dialog,
   Button,
   TextField,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle
} from "@material-ui/core";

export const CommentForm = props => {
   const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = e => {
      setOpen(false);
   };

   return (
      <div>
         <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Ajouter un avis
         </Button>
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
         >
            <DialogTitle id="form-dialog-title">
               Laissez votre commentaire...
            </DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Ici, vous pouvez noter un restaurant et lui attribuer une
                  note. Merci de rester le plus objectif possible et de vous
                  jusitifer.
               </DialogContentText>
               Nombre d'étoiles :
               <Stars
                  size={30}
                  onGivenNotation={props.onGivenNotation} //onChange
                  numberOfStars={props.numberOfStars} //Give the stars of the user notation
               />
               <TextField
                  margin="none"
                  id="name"
                  label="Votre avis..."
                  type="text"
                  color="primary"
                  fullWidth
                  onChange={props.changed}
               />
            </DialogContent>
            <DialogActions>
               <Button color="primary" onClick={e => handleClose(e)}>
                  Fermer
               </Button>
               <Button color="primary" onClick={props.onSend}>
                  Envoyer
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};
