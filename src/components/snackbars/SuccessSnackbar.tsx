import React from "react";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import {Snackbar} from "@mui/material";
import {Dispatch} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {successSnackbarSliceActions} from "../../features/components/snackbars/successSnackbarSlice.ts";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SuccessSnackbar = () => {
    const dispatch: Dispatch = useDispatch();
    const successSnackbar = useSelector((state: RootState) => state.successSnackbar);

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(successSnackbarSliceActions.setClose());
    };

    return (
        <Snackbar open={successSnackbar.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {successSnackbar.text}
            </Alert>
        </Snackbar>
    );
}

export default SuccessSnackbar