import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from "react";


function Alert(alertprops) {
  return <MuiAlert elevation={6} variant="filled" {...alertprops} />;
}
const SnackBarStrip = (props) => {
  const handleClose = () => {
    props.setSnackbarMsg({
      ...props.snackbarMsg.type,
      "show": false,
      "message": ""
    }
    )
  }
  return (<Snackbar
    open={props.snackbarMsg.show}
    TransitionComponent='Fade'
    autoHideDuration={3000}
    onClose={handleClose}
    anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
  >
    <Alert onClose={handleClose} severity={props.snackbarMsg.type}>
      {props.snackbarMsg.message}
    </Alert>
  </Snackbar>
  )
}
export default SnackBarStrip