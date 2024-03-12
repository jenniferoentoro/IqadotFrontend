import React from "react";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {Snackbar} from "@mui/material";
import {errorSnackbarSliceActions} from "../../features/components/snackbars/errorSnackbarSlice.ts";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorSnackbar = () => {
    const dispatch = useDispatch();
    const errorSnackbar = useSelector((state: RootState) => state.errorSnackbar);

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(errorSnackbarSliceActions.setClose());
    };

    return (
        <Snackbar open={errorSnackbar.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorSnackbar.text}
            </Alert>
        </Snackbar>
    );
}

export default ErrorSnackbar