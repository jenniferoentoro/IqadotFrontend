import {Chip, Paper, Stack, Tooltip} from "@mui/material";
import {Source} from "../../dto/sources/source.ts";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Delete, Edit} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {addSourceSliceActions} from "../../features/components/sources/addSourceSlice.ts";
import {useMutation, useQueryClient} from "react-query";
import {deleteSource} from "../../services/sources/sourceApi.ts";
import {successSnackbarSliceActions} from "../../features/components/snackbars/successSnackbarSlice.ts";
import {errorSnackbarSliceActions} from "../../features/components/snackbars/errorSnackbarSlice.ts";

const SourceCard = (props: Source) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const handleEdit = () => {
        dispatch(addSourceSliceActions.open({
            mode: "edit",
            source: props
        }))
    }

    let authType = "";
    if (props.authType === "NONE") {
        authType = "No Auth";
    } else if (props.authType === "BEARER") {
        authType = "Bearer Token"
    } else if (props.authType === "API_KEY") {
        authType = "API Key"
    } else {
        authType = "Basic Auth"
    }

    const deleteMutation = useMutation(({
        mutationFn: deleteSource,
        onSuccess: () => {
            dispatch(successSnackbarSliceActions.setOpen({
                text: "Successfully deleted source!"
            }))
            queryClient.invalidateQueries(["sources"])
        },
        onError: () => {
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Something went wrong!"
            }))
        }
    }))

    const handleDelete = (data: number) => {
        deleteMutation.mutate(data);
    }

    return (
        <Paper elevation={2} sx={{
            width: 'full',
            padding: 2,
            borderRadius: '10px',
            marginBottom: 10
        }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Stack spacing={1}>
                    <Stack direction={'row'} spacing={1}>
                        <Chip label={authType} />
                        <Typography variant={'h5'}>
                            {props.name}
                        </Typography>
                    </Stack>
                    <Typography variant={'subtitle2'}>
                        {props.url}
                    </Typography>
                </Stack>
                <Stack spacing={1} direction={'row'}>
                    <Tooltip title={"Edit Source"}>
                        <IconButton onClick={handleEdit}>
                            <Edit color={'warning'} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Delete Source"}>
                        <IconButton onClick={() => {
                            handleDelete(props.id)
                        }}>
                            <Delete color={'error'} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default SourceCard