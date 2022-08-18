import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppSelector} from "./state/store";
import {useDispatch} from "react-redux";
import {setErrorAC} from "./state/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
    const error = useAppSelector((state: any) => state.app.error )
    const dispatch = useDispatch()
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
      dispatch(setErrorAC({error: null}))

  };

    return (
        <Snackbar open={error !== null} autoHideDuration={16000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>{error}</Alert>
        </Snackbar>
    );
}

