import {Backdrop, CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const CustomBackdrop = () => {
    const customBackdrop = useSelector((state: RootState) => state.customBackdrop);

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={customBackdrop.open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default CustomBackdrop