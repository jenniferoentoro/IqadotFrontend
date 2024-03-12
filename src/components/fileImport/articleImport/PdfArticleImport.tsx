import Typography from "@mui/material/Typography";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {fileSchema} from "../../../utils/validations/fileImport/fileSchema.ts";
import {useMutation} from "react-query";
import {customBackdropSliceActions} from "../../../features/components/backdrop/customBackdropSlice.ts";
import {successSnackbarSliceActions} from "../../../features/components/snackbars/successSnackbarSlice.ts";
import {errorSnackbarSliceActions} from "../../../features/components/snackbars/errorSnackbarSlice.ts";
import {Button, FormHelperText, Grid, Stack, Switch} from "@mui/material";
import {CloudUpload} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {articlePdfUpload} from "../../../services/fileImport/articleImport.ts";
import {styled} from "@mui/material/styles";
import ChannelSelect from "../ChannelSelect.tsx";
import {channelSelectSliceActions} from "../../../features/components/fileImport/channelSelectSlice.ts";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const PdfArticleImport = () => {
    const [fileName, setFileName] = useState("")
    const [fileError, setFileError] = useState("")
    const dispatch = useDispatch();

    const {handleSubmit, control,
        formState: {errors},
        reset} = useForm({
        defaultValues: {
            channel: "label",
            file: null,
            publish: true
        },
        resolver: joiResolver(fileSchema)
    });

    const mutation = useMutation({
        mutationFn: articlePdfUpload,
        onSuccess: () => {
            reset();
            setFileName("");
            dispatch(channelSelectSliceActions.reset());
            dispatch(customBackdropSliceActions.close());
            dispatch(successSnackbarSliceActions.setOpen({
                text: "Successfully imported question"
            }));
        }, onError: () => {
            dispatch(customBackdropSliceActions.close());
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Something went wrong!"
            }))
        }
    })

    const onSubmit = (data: any) => {
        if (!data.file){
            setFileError("A PDF File is required!");
            return;
        }

        if (data.file.type != "application/pdf") {
            setFileError("File must be PDF!");
            return;
        }

        const formData = new FormData();
        formData.append("channel", data.channel);
        formData.append("publish", data.publish);
        formData.append("file", data.file);

        dispatch(customBackdropSliceActions.open());
        mutation.mutate(formData)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType={"multipart/form-data"}>
            <Grid container>
                <Grid item xs={12}>
                    <Controller
                        name={"channel"}
                        control={control}
                        render={({field}) => (
                            <>
                                <ChannelSelect {...field} ref={null} />
                                <FormHelperText sx={{
                                    color: "red"
                                }}>
                                    {errors["channel"] ? errors["channel"].message : ""}
                                </FormHelperText>
                            </>
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Controller
                            name={"publish"}
                            control={control}
                            render={({field}) => (
                                <Switch
                                    defaultChecked={true}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    {...field}
                                />
                            )}
                        />
                        <Typography variant={"subtitle1"}>
                            Publish
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems={"center"}>
                        <Grid item>
                            <Button component="label" variant="contained" startIcon={<CloudUpload />}>
                                Upload PDF
                                <Controller
                                    control={control}
                                    name={"file"}
                                    render={({ field: { value, onChange, ...field } }) => {
                                        return (
                                            <VisuallyHiddenInput
                                                type="file"
                                                id={"file"}
                                                onChange={(event) => {
                                                    try {
                                                        onChange(event.target.files[0]);
                                                        setFileName(event.target.files[0].name)
                                                        setFileError("");
                                                    } catch (error: unknown) {
                                                        console.log(error)
                                                    }
                                                }}
                                                {...field}
                                            />
                                        );
                                    }}
                                />
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant={"subtitle2"} sx={{
                                color: "gray"
                            }}>{fileName === "" ? "" : fileName}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{
                        height: 5
                    }} />
                    <Typography variant={"subtitle2"} sx={{
                        color: "red"
                    }}>
                        {fileError === "" ? "" : fileError}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        id={"submit"}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 1, mb: 2}}
                    >
                        Upload Article
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default PdfArticleImport