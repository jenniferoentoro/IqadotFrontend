import {Button, FormHelperText, Grid, Stack, Switch, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {staticSchema} from "../../../utils/validations/fileImport/staticSchema.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import {fillRequest} from "../../../dto/file/staticFile/fillRequest.ts";
import {useMutation} from "react-query";
import {staticFillUpload} from "../../../services/fileImport/staticImport.ts";
import {useDispatch} from "react-redux";
import {successSnackbarSliceActions} from "../../../features/components/snackbars/successSnackbarSlice.ts";
import {errorSnackbarSliceActions} from "../../../features/components/snackbars/errorSnackbarSlice.ts";
import {customBackdropSliceActions} from "../../../features/components/backdrop/customBackdropSlice.ts";
import ChannelSelect from "../ChannelSelect.tsx";
import {channelSelectSliceActions} from "../../../features/components/fileImport/channelSelectSlice.ts";
import Typography from "@mui/material/Typography";

const FillStaticImport = () => {
    const dispatch = useDispatch();

    const {handleSubmit, control,
        reset,
        formState: {errors}} = useForm({
        defaultValues: {
            channel: "label",
            subject: "",
            body: "",
            answer: "",
            publish: true
        },
        resolver: joiResolver(staticSchema)
    });

    const mutation = useMutation({
        mutationFn: staticFillUpload,
        onSuccess: () => {
            dispatch(channelSelectSliceActions.reset());
            dispatch(customBackdropSliceActions.close());
            dispatch(successSnackbarSliceActions.setOpen({
                text: "Successfully imported question"
            }));
            reset();
        },
        onError: () => {
            dispatch(customBackdropSliceActions.close());
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Something went wrong!"
            }))
        },
    })

    const handleAdd = (data: fillRequest) => {
        dispatch(customBackdropSliceActions.open());
        console.log(data);
        mutation.mutate(data)
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Controller
                    name={"channel"}
                    control={control}
                    render={({field}) => (
                        <>
                            <ChannelSelect {...field} ref={null} />
                            <FormHelperText error={errors["channel"] !== undefined}>
                                {errors["channel"] ? errors["channel"].message : "Select for which channel to be published"}
                            </FormHelperText>
                        </>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <Controller
                    name={"subject"}
                    control={control}
                    render={({field}) => (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="subject"
                            label="Subject"
                            helperText={
                                errors["subject"]
                                    ? errors["subject"].message
                                    : "Title for the import"
                            }
                            error={errors["subject"] !== undefined}
                            {...field}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <Controller
                    name={"body"}
                    control={control}
                    render={({field}) => (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="question"
                            label="Question"
                            helperText={
                                errors["body"]
                                    ? errors["body"].message
                                    : "Question for the import"
                            }
                            error={errors["body"] !== undefined}
                            {...field}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <Controller
                    name={"answer"}
                    control={control}
                    render={({field}) => (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="answer"
                            label="Answer"
                            helperText={
                                errors["answer"]
                                    ? errors["answer"].message
                                    : "Answer for the import"
                            }
                            error={errors["answer"] !== undefined}
                            {...field}
                        />
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
                <Button
                    id={"submit"}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 1, mb: 2}}
                    onClick={handleSubmit((data) => {
                        handleAdd(data);
                    })}
                >
                    Upload Question
                </Button>
            </Grid>
        </Grid>
    )
}

export default FillStaticImport