import {Button, Modal, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {previewCsvSliceActions} from "../../../features/components/fileImport/previewCsvSlice.ts";
import {useState} from "react";
import parse from "html-react-parser"
import Divider from "@mui/material/Divider";
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

interface CsvPreviewModalProps {
    mode: string,
    onSubmit(): void;
}

const CsvPreviewModal = (props: CsvPreviewModalProps) => {
    const dispatch = useDispatch();
    const csvPreview = useSelector((state: RootState) => state.previewCsv);
    const handleClose = () => {
        setIndex(0);
        dispatch(previewCsvSliceActions.reset());
        dispatch(previewCsvSliceActions.close());
    }

    const articlesLength: number = props.mode == 'csv' ? csvPreview.csvArticles.length - 1 : csvPreview.jsonArticles.length - 1;

    const [index, setIndex] = useState<number>(0)
    const incrementIndex = () => {
        setIndex(index + 1);
    }
    const decrementIndex = () => {
        setIndex(index - 1)
    }

    const handleSubmit = () => {
        props.onSubmit();
    }

    return (
        <Modal
            open={csvPreview.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography id="modal-modal-title" variant="h5">
                        Article Preview
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Stack>
                <Typography variant={'subtitle1'}>
                    {props.mode == 'csv' && csvPreview.csvArticles.length != 0 && "Subject : " + csvPreview.csvArticles.at(index)!.subject}
                    {props.mode == 'json' && csvPreview.jsonArticles.length != 0 && "Title : " + csvPreview.jsonArticles.at(index)!.title}
                </Typography>
                <Divider sx={{
                    my: 1
                }} />
                <div>
                    {
                        props.mode == 'csv' && csvPreview.csvArticles.length != 0 && parse(csvPreview.csvArticles.at(index)!.body)
                    }
                    {
                        props.mode == 'json' && csvPreview.jsonArticles.length != 0 && parse(csvPreview.jsonArticles.at(index)!.body)
                    }
                </div>
                <Stack direction={'row'} justifyContent={'space-between'} sx={{
                    marginY: 1
                }}>
                    <Button
                        variant={'outlined'}
                        disabled={index == 0}
                        onClick={decrementIndex}
                    >
                        Previous
                    </Button>
                    <Button
                        variant={'outlined'}
                        disabled={index == articlesLength}
                        onClick={incrementIndex}
                    >
                        Next
                    </Button>
                </Stack>
                <Button variant={'contained'} fullWidth onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Modal>
    );
}

export default CsvPreviewModal