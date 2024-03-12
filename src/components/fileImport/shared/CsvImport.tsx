import {Button, FormHelperText, Grid, Stack, Switch} from "@mui/material";
import {styled} from "@mui/material/styles";
import {CloudUpload} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {useMutation} from "react-query";
import {staticCsvUpload} from "../../../services/fileImport/staticImport.ts";
import {Controller, useForm} from "react-hook-form";
import {successSnackbarSliceActions} from "../../../features/components/snackbars/successSnackbarSlice.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import {fileSchema} from "../../../utils/validations/fileImport/fileSchema.ts";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import Box from "@mui/material/Box";
import {customBackdropSliceActions} from "../../../features/components/backdrop/customBackdropSlice.ts";
import {errorSnackbarSliceActions} from "../../../features/components/snackbars/errorSnackbarSlice.ts";
import {articleCsvUpload, previewCsvHeaders} from "../../../services/fileImport/articleImport.ts";
import {channelSelectSliceActions} from "../../../features/components/fileImport/channelSelectSlice.ts";
import ChannelSelect from "../ChannelSelect.tsx";
import CustomCsv from "./CustomCsv.tsx";

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

interface CsvStaticImportProps{
    mode: string
}

const CsvImport = (props: CsvStaticImportProps) => {
    const [mode, setMode] = useState<string>("default");
    const [fileName, setFileName] = useState("")
    const [fileError, setFileError] = useState("")
    const [headers, setHeaders] = useState<string[]>([]);
    const [showCustomize, setShowCustomize] = useState<boolean>(true);
    const dispatch = useDispatch();

    const {handleSubmit, control,
        formState: {errors},
        getValues,
        reset} = useForm({
        defaultValues: {
            channel: "label",
            file: null,
            publish: true
        },
        resolver: joiResolver(fileSchema)
    });

    const staticMutation = useMutation({
        mutationFn: staticCsvUpload,
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

    const articleMutation = useMutation({
        mutationFn: articleCsvUpload,
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

    const previewMutation = useMutation({
        mutationFn: previewCsvHeaders,
        onSuccess: (data: string[]) => {
            setHeaders(data)
        },
        onError: () => {
            setShowCustomize(false);
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Error fetching headers!"
            }))
        }
    })

    const handlePreview = (data: File) => {
        const formData = new FormData();
        formData.append("file", data);
        // TODO: remove channel
        formData.append("channel", "7a6f91e1-5ea7-7c54-7d00-12c3ee148075");

        previewMutation.mutate(formData);
    }

    const onSubmit = (data: any) => {
        if (!data.file){
            setFileError("A CSV File is required!")
            return;
        }

        if (data.file.type != "text/csv") {
            setFileError("File must be CSV!");
            return;
        }

        const formData = new FormData();
        formData.append("channel", data.channel);
        formData.append("publish", data.publish);
        formData.append("file", data.file);

        dispatch(customBackdropSliceActions.open());
        if (props.mode === "static"){
            staticMutation.mutate(formData)
        } else if (props.mode === "article"){
            articleMutation.mutate(formData)
        }
    }

    const handleMode = () => {
        if (getValues("channel") == "label"){
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Channel is required"
            }))
            return;
        }
        mode == "default" ? setMode("custom") : setMode("default");
    }

    const resetCustom = () => {
        reset();
        setFileName("");
        setMode('default');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType={"multipart/form-data"}>
            <Grid container>
                <Grid item xs={12}>
                    <Controller
                        name={"channel"}
                        control={control}
                        disabled={mode == "custom"}
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
                                    disabled={mode == "custom"}
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
                    <Stack direction={"row"}>
                        <Grid container spacing={2} alignItems={"center"}>
                            <Grid item>
                                <Button component="label" variant="contained" disabled={mode == "custom"} startIcon={<CloudUpload />}>
                                    Upload CSV
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
                                                            onChange(event.target.files ? event.target.files[0] : null);
                                                            handlePreview(event.target.files[0])
                                                            setFileName(event.target.files ? event.target.files[0].name : "")
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
                        {fileName != "" && showCustomize && <Button
                            color={mode == "default" ? "primary" : "error"}
                            variant={"contained"}
                            onClick={handleMode}>
                            {mode == "default" ? "Customize" : "Cancel"}
                        </Button>}
                    </Stack>

                </Grid>
                <Grid item xs={12}>
                    {mode == "custom" &&
                        <CustomCsv
                            headers={headers}
                            file={getValues("file")}
                            channel={getValues("channel")}
                            publish={getValues("publish")}
                            onReset={resetCustom}
                        />
                    }
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
                {mode != "custom" &&
                    <Grid item xs={12}>
                    <Button
                        id={"submit"}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 1, mb: 2}}
                    >
                        Upload Question
                    </Button>
                </Grid>
                }
            </Grid>
        </form>
    )
}

export default CsvImport