import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Stack,
    Select,
    TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import {addSourceSliceActions} from "../../features/components/sources/addSourceSlice.ts";
import Typography from "@mui/material/Typography";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {SourceRequest} from "../../dto/sources/sourceRequest.ts";
import {useMutation, useQueryClient} from "react-query";
import {createSource, editSource} from "../../services/sources/sourceApi.ts";
import {successSnackbarSliceActions} from "../../features/components/snackbars/successSnackbarSlice.ts";
import {errorSnackbarSliceActions} from "../../features/components/snackbars/errorSnackbarSlice.ts";
import {EditSourceRequest} from "../../dto/sources/editSourceRequest.ts";

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

interface AuthType {
    value: string,
    name: string
}

const AddSourceModal = () => {
    const queryClient = useQueryClient();
    const addSource = useSelector((state: RootState) => state.addSource);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(addSourceSliceActions.close())
    }

    const methods: string[] = ["GET", "POST"];
    const authTypes: AuthType[] = [
        {
            value: "NONE",
            name: "No Auth"
        }, {
            value: "BASIC",
            name: "Basic Auth"
        }, {
            value: "BEARER",
            name: "Bearer Token"
        }, {
            value: "API_KEY",
            name: "Api Key"
        }];

    const {handleSubmit,
        control,
        formState: {errors},
        setValue,
        getValues,
        watch,
        reset
    } = useForm({
        defaultValues: {
            name: "",
            url: "",
            method: "GET",
            body: "",
            authType: "NONE",
            authBody: "",
            header: "",
        }
    });

    const addMutation = useMutation({
        mutationFn: createSource,
        onSuccess: () => {
            reset();
            queryClient.invalidateQueries(["sources"])
            handleClose();
            dispatch(successSnackbarSliceActions.setOpen({
                text: "Successfully added source!"
            }));
        },
        onError: () => {
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Something went wrong!"
            }))
        }
    })

    const editMutation = useMutation({
        mutationFn: editSource,
        onSuccess: () => {
            reset();
            queryClient.invalidateQueries(["sources"])
            handleClose();
            dispatch(successSnackbarSliceActions.setOpen({
                text: "Successfully edited source!"
            }));
        },
        onError: () => {
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Something went wrong!"
            }))
        }
    })

    const handleAddSource = (data: SourceRequest) => {
        if (addSource.mode == "add"){
            addMutation.mutate(data);
        } else {
            const request: EditSourceRequest = {
                id: addSource.source!.id!,
                request: data
            }
            editMutation.mutate(request)
        }
    }

    const [selectedMethod, setSelectedMethod] = useState<string>("GET")
    const [selectedAuth, setSelectedAuth] = useState<string>("NONE")

    useEffect(() => {
        if (addSource.mode === "edit"){
            setValue("name", addSource.source?.name!)
            setValue("url", addSource.source?.url!)
            setValue("method", addSource.source?.method!);
            setValue("body", addSource.source?.body!);
            setValue("authBody", addSource.source?.authBody!);
            setValue("authType", addSource.source?.authType!);
            setValue("header", addSource.source?.header!);
        } else if (addSource.mode == "add") {
            reset()
        }
    }, [addSource.mode, addSource.source]);

    useEffect(() => {
        setSelectedMethod(getValues("method"))
        setSelectedAuth(getValues("authType"))
    }, [watch()]);


    return (
        <Modal
            open={addSource.open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant={'h6'}>
                        {addSource.mode === "add" ? "Add New Source" : "Edit Source"}
                    </Typography>
                    <Button color={'error'} variant={'contained'} onClick={handleClose}>
                        Cancel
                    </Button>
                </Stack>
                <Grid container>
                    <Grid item xs={12}>
                        <Controller
                            name={"name"}
                            control={control}
                            render={({field}) => (
                                <TextField
                                    margin={'normal'}
                                    required
                                    fullWidth
                                    id={'name'}
                                    label={'Name'}
                                    helperText={
                                        errors['name'] ? errors['name'].message : ""
                                    }
                                    error={errors['name'] !== undefined}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name={"url"}
                            control={control}
                            render={({field}) => (
                                <TextField
                                    margin={'normal'}
                                    required
                                    fullWidth
                                    id={'url'}
                                    label={'Url'}
                                    helperText={
                                        errors['url'] ? errors['url'].message : ""
                                    }
                                    error={errors['url'] !== undefined}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{
                        marginTop: 2
                    }}>
                        <Controller
                            name={'method'}
                            control={control}
                            render={({field}) => (
                                <FormControl fullWidth>
                                    <InputLabel id={'http-method-label'}>Http Method</InputLabel>
                                    <Select
                                        labelId={'http-method-label'}
                                        id={'method-select'}
                                        label={'Http Method'}
                                        fullWidth
                                        {...field}
                                    >
                                        {methods.map((method: string, index: number) => {
                                            return <MenuItem value={method} key={index}>{method}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    {
                        selectedMethod === "GET" ? <></> : <Grid item xs={12}>
                            <Controller
                                name={'body'}
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        margin={'normal'}
                                        fullWidth
                                        id={'body'}
                                        label={'Body'}
                                        multiline
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>
                    }
                    <Grid item xs={12} sx={{
                        marginTop: 2
                    }}>
                        <Controller
                            name={'authType'}
                            control={control}
                            render={({field}) => (
                                <FormControl fullWidth>
                                    <InputLabel id={'auth-type-label'}>Auth Type</InputLabel>
                                    <Select
                                        labelId={'auth-type-label'}
                                        id={'auth-select'}
                                        label={'Auth Type'}
                                        fullWidth
                                        {...field}
                                    >
                                        {authTypes.map((authType: AuthType, index: number) => {
                                            return <MenuItem value={authType.value} key={index}>{authType.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    {
                        selectedAuth === "NONE" ? <></> : <Grid item xs={12}>
                            <Controller
                                name={"authBody"}
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        margin={'normal'}
                                        required
                                        fullWidth
                                        id={'authBody'}
                                        label={'Auth Body'}
                                        helperText={
                                            errors['authBody'] ? errors['authBody'].message : ""
                                        }
                                        error={errors['authBody'] !== undefined}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>
                    }
                    {
                        selectedAuth !== "API_KEY" ? <></> : <Grid item xs={12}>
                            <Controller
                                name={"header"}
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        margin={'normal'}
                                        required
                                        fullWidth
                                        id={'header'}
                                        label={'Header'}
                                        helperText={
                                            errors['header'] ? errors['header'].message : ""
                                        }
                                        error={errors['header'] !== undefined}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>
                    }
                    <Grid item xs={12} sx={{
                        marginTop: 2
                    }}>
                        <Button variant={'contained'} fullWidth onClick={handleSubmit((data) => {
                            handleAddSource(data)
                        })}>
                            {addSource.mode == "add" ? "Add New Source" : "Save Changes"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default AddSourceModal