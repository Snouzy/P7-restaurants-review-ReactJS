import React from 'react';
import Stars from '../Common/Stars';

import {
   Dialog,
   Button,
   TextField,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle
} from '@material-ui/core';

export const CommentForm = ({
   onGivenNotation,
   numberOfStars,
   changed,
   pseudo,
   onSend
}) => {
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
                  justifier.
               </DialogContentText>
               Nombre d'étoiles (obligatoire):
               <Stars
                  size={30}
                  onGivenNotation={onGivenNotation} //onChange
                  numberOfStars={numberOfStars} //Give the stars of the user notation
               />
               <TextField
                  margin="dense"
                  id="name"
                  label="Votre nom..."
                  type="text"
                  color="primary"
                  size="small"
                  onChange={pseudo}
                  variant="outlined"
               />
               <TextField
                  required
                  margin="dense"
                  id="name"
                  label="Votre avis... (obligatoire)"
                  type="text"
                  color="primary"
                  variant="outlined"
                  size="medium"
                  fullWidth
                  onChange={changed}
                  multiline={true}
               />
            </DialogContent>
            <DialogActions>
               <Button color="primary" onClick={e => handleClose(e)}>
                  Fermer
               </Button>
               <Button color="primary" onClick={onSend}>
                  Envoyer
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};
