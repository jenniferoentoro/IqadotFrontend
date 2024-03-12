import {Button, Modal, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {csvHelperSliceActions} from "../../../features/components/helperModals/csvHelperSlice.ts";
import Box from "@mui/material/Box";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Close} from "@mui/icons-material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CsvHelperModal = () => {
    const [page, setPage] = useState<number>(0);
    const titles: string[] = ["Custom", "Modes", "Content", "Text Alignment", "Additional Text"];
    const contents: string[] = ["Customization allows you to choose how this file be imported. " +
    "You can select which headers given to fill the title and the body."
        , "There are two buttons that will change the mode if you are currently selecting the title or the body. " +
        "You can move between the two modes by clicking the select button"
        , "The content of an import will have a title and a content. The title title will be the header. " +
        "The body will be the content of the import where it can contain more than one header."
        , "The text alignment allows you to customize the body of the import. There are three alignments that you " +
        "can choose which are left, center, and right."
        , "Each body can be added additional text to help explain about the body. This is optional and you can select " +
        "where the text will be added. You can select the placement from the button located next to the text field."
    ]

    const dispatch = useDispatch();
    const csvHelper = useSelector((state: RootState) => state.csvHelper);
    const handleClose = () => {
        dispatch(csvHelperSliceActions.close())
    }

    return (
        <Modal
            open={csvHelper.open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography id="modal-modal-title" variant="h5">
                        {titles.at(page)}
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Stack>
                <Typography variant={'subtitle2'}>
                    {contents.at(page)}
                </Typography>
                <Stack direction={'row'} justifyContent={'space-between'} sx={{
                    marginY: 1
                }}>
                    <Button
                        variant={'outlined'}
                        disabled={page == 0}
                        onClick={() => {
                            setPage(page - 1);
                        }}
                    >
                        Previous
                    </Button>
                    <Button
                        variant={'outlined'}
                        disabled={page == titles.length - 1}
                        onClick={() => {
                            setPage(page + 1)
                        }}
                    >
                        Next
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default CsvHelperModal