import {
    Button,
    Chip, FormControl,
    FormHelperText,
    Grid, InputLabel, MenuItem,
    Paper, Select,
    Stack,
    Switch,
    TextField,
    ToggleButton, ToggleButtonGroup,
    Tooltip
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import ChannelSelect from "../ChannelSelect.tsx";
import Typography from "@mui/material/Typography";
import {ChangeEvent, MouseEvent, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {useDispatch} from "react-redux";
import {errorSnackbarSliceActions} from "../../../features/components/snackbars/errorSnackbarSlice.ts";
import {
    articleUploadJson,
    previewJsonChildrenHeaders,
    previewJsonParentHeaders,
    previewJsonResult
} from "../../../services/fileImport/articleImport.ts";
import {
    Add,
    Check,
    FirstPage,
    FormatAlignCenter,
    FormatAlignLeft,
    FormatAlignRight,
    LastPage
} from "@mui/icons-material";
import {PreviewChildren} from "../../../dto/file/json/previewChildren.ts";
import {PreviewJsonRequest} from "../../../dto/file/json/previewJsonRequest.ts";
import CsvPreviewModal from "./CsvPreviewModal.tsx";
import {previewCsvSliceActions} from "../../../features/components/fileImport/previewCsvSlice.ts";
import {UploadJsonRequest} from "../../../dto/file/json/uploadJsonRequest.ts";
import {customBackdropSliceActions} from "../../../features/components/backdrop/customBackdropSlice.ts";
import {successSnackbarSliceActions} from "../../../features/components/snackbars/successSnackbarSlice.ts";
import {findAllSources} from "../../../services/sources/sourceApi.ts";
import {Source} from "../../../dto/sources/source.ts";
import {AxiosError} from "axios";
import IconButton from "@mui/material/IconButton";
import {staticUploadJson} from "../../../services/fileImport/staticImport.ts";

interface ArticleBody {
    header: string,
    text: string,
    placement: string,
    type: string,
}

interface JsonImportProps {
    mode: string
}

const JsonImport = (props: JsonImportProps) => {
    const [parentHeaders, setParentHeaders] = useState<string[]>([]);
    const [selectedParent, setSelectedParent] = useState<string>("")
    const [childrenHeaders, setChildrenHeaders] = useState<string[]>([]);
    const [selectedChildren, setSelectedChildren] = useState<ArticleBody[]>([]);
    const [alignment, setAlignment] = useState<string>("left")
    const [mode, setMode] = useState<string>("title");
    const [title, setTitle] = useState<string>("");

    const dispatch = useDispatch();
    const {control,
        formState: {errors},
        setValue,
        getValues,
        reset} = useForm({
        defaultValues: {
            channel: "label",
            apiId: 0,
            isPublished: true,
            titleSelectedColumn: "",
            resultsField: "",
            alignment: "left"
        }
    });

    const {data, isLoading, isError} = useQuery<Source[], AxiosError>(["jsonSources"], {
        queryFn: findAllSources
    })
    let content;
    if (isLoading) {
        content = <MenuItem disabled>Loading...</MenuItem>
    } else if (isError) {
        content = <MenuItem disabled>Error</MenuItem>
    } else if (data) {
        content = data.map((source: Source, index: number) => {
            return <MenuItem key={index} value={source.id}>{source.name}</MenuItem>
        })
    }

    const parentPreviewMutation = useMutation({
        mutationFn: previewJsonParentHeaders,
        onSuccess: (data) => {
            setParentHeaders(data);
        },
        onError: () => {
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Error fetching headers"
            }))
        }
    })

    const childrenPreviewMutation = useMutation({
        mutationFn: previewJsonChildrenHeaders,
        onSuccess: (data: string[]) => {
            setChildrenHeaders(data)
        },
        onError: () => {
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Unable to fetch headers"
            }))
        }
    })

    const handleParentChange = (header: string) => {
        setSelectedParent(header);
        setValue("resultsField", header);
        setSelectedChildren([]);
        setTitle("");

        const previewData: PreviewChildren = {
            apiId: getValues('apiId'),
            resultsField: getValues('resultsField')
        }

        childrenPreviewMutation.mutate(previewData)
    }

    const handleParentPreview = () => {
        const apiUrl = getValues("apiId");
        if (apiUrl == 0){
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "API Url is required!"
            }))
            return
        }

        parentPreviewMutation.mutate({
            apiId: apiUrl
        })
    }

    const handleModeChange = (mode: string) => {
        setMode(mode);
    }

    const handleAlignment = (
        _event: MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setValue("alignment", newAlignment!);
        setAlignment(newAlignment!);
    };

    const handleTitleDelete = () => {
        setChildrenHeaders((prev) => [...prev, title]);
        setTitle("")
    }

    const clearChildren = () => {
        const articles = childrenHeaders;
        selectedChildren.map((children: ArticleBody) => {
            return articles.push(children.header)
        })
        setChildrenHeaders(articles);
        setSelectedChildren([]);
    }

    const handleChildrenAdd = (header: string) => {
        if (mode == "title"){
            if (title != ""){
                dispatch(errorSnackbarSliceActions.setOpen({
                    text: "A title is already selected!"
                }))
                return
            }

            setTitle(header);
            setValue("titleSelectedColumn", header)
        } else if (mode == "body"){
            const newChildren: ArticleBody = {
                header: header,
                text: "",
                placement: "before",
                type: "p"
            }
            setSelectedChildren((prev: ArticleBody[]) => [...prev, newChildren])
        }

        setChildrenHeaders(
            childrenHeaders.filter((children: string) => {
                return children != header;
            })
        )
    }

    const handleChildrenDelete = (header: string) => {
        setChildrenHeaders((prev: string[]) => [...prev, header]);
        setSelectedChildren(
            selectedChildren.filter((article: ArticleBody) => {
                return article.header != header
            })
        )
    }

    const handleTypeChange = (
        _event: MouseEvent<HTMLElement>,
        newType: string,
        header: string
    ) => {
        const articleBodies: ArticleBody[] = selectedChildren.map((article: ArticleBody) => {
            if (article.header == header){
                return {
                    ...article,
                    type: newType
                }
            } else {
                return article
            }
        })
        setSelectedChildren(articleBodies)
    }

    const handleTextChange = (
        event: ChangeEvent<HTMLInputElement>,
        header: string,
    ) => {
        const articleBodies: ArticleBody[] = selectedChildren.map((article: ArticleBody) => {
            if (article.header == header){
                return {
                    ...article,
                    text: event.target.value
                }
            } else {
                return article;
            }
        })
        setSelectedChildren(articleBodies);
    }

    const handlePlacementChange = (
        _event: MouseEvent<HTMLElement>,
        newPlacement: string,
        header: string
    ) => {
        const articleBodies: ArticleBody[] = selectedChildren.map((article: ArticleBody) => {
            if (article.header == header){
                return {
                    ...article,
                    placement: newPlacement
                }
            } else {
                return article
            }
        })
        setSelectedChildren(articleBodies)
    }

    const previewMutation = useMutation({
        mutationFn: previewJsonResult,
        onSuccess: (data) => {
            dispatch(previewCsvSliceActions.setJsonArticles(data))
            dispatch(previewCsvSliceActions.open())
        },
        onError: () => {
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Something went wrong"
            }))
        }
    })

    const generateBody = (): string => {
        let bodyColumns = "";
        selectedChildren.map((article: ArticleBody) => {
            if (article.type == 'p'){
                if (article.text != ""){
                    return bodyColumns += `${article.header}%23p;${article.placement};${article.text},`;
                } else {
                    return bodyColumns += article.header + "%23p,";
                }
            } else if (article.type == 'img'){
                return bodyColumns += `${article.header}%23img,`
            } else if (article.type == 'video'){
                return bodyColumns += `${article.header}%23video`
            }
        })

        return bodyColumns;
    }

    const handlePreview = () => {
        if (title == ""){
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Title is required!"
            }));
            return;
        }

        const request: PreviewJsonRequest = {
            resultsField: getValues('resultsField'),
            titleSelectedColumn: getValues('titleSelectedColumn'),
            apiId: getValues('apiId'),
            bodySelectedColumns: generateBody(),
            alignment: getValues('alignment') as unknown as string
        }

        previewMutation.mutate(request)
    }

    const uploadArticleMutation = useMutation({
        mutationFn: articleUploadJson,
        onSuccess: (data) => {
            console.log(data);
            dispatch(customBackdropSliceActions.close());
            dispatch(successSnackbarSliceActions.setOpen({
                text: "Successfully uploaded article!"
            }))
            reset();
            setTitle("")
            setSelectedParent("");
            setParentHeaders([]);
            setChildrenHeaders([]);
            setSelectedChildren([]);
            setMode('title');
        },
        onError: () => {
            dispatch(customBackdropSliceActions.close());
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Failed to upload article!"
            }))
        }
    })

    const uploadStaticMutation = useMutation({
        mutationFn: staticUploadJson,
        onSuccess: () => {
            dispatch(customBackdropSliceActions.close());
            dispatch(successSnackbarSliceActions.setOpen({
                text: "Successfully uploaded article!"
            }))
            reset();
            setTitle("")
            setSelectedParent("");
            setParentHeaders([]);
            setChildrenHeaders([]);
            setSelectedChildren([]);
            setMode('title');
        },
        onError: () => {
            dispatch(customBackdropSliceActions.close());
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Failed to upload article!"
            }))
        }
    })

    const handleSubmit = () => {
        dispatch(previewCsvSliceActions.close());
        dispatch(previewCsvSliceActions.reset());
        dispatch(customBackdropSliceActions.open());

        const request: UploadJsonRequest = {
            resultsField: getValues('resultsField'),
            titleSelectedColumn: getValues('titleSelectedColumn'),
            apiId: getValues('apiId'),
            bodySelectedColumns: generateBody(),
            alignment: getValues('alignment') as unknown as string,
            channel: getValues('channel'),
            isPublished: getValues('isPublished') as unknown as string,
        }

        if (props.mode == 'static'){
            uploadStaticMutation.mutate(request)
        } else if (props.mode == 'article'){
            uploadArticleMutation.mutate(request)
        }
    }

    return (
        <Grid container spacing={1}>
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
                        name={"isPublished"}
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
                <Stack direction={'row'} spacing={2} sx={{
                    marginY: 1
                }}>
                    <Controller
                        name={"apiId"}
                        control={control}
                        render={({field}) => (
                            <FormControl fullWidth>
                                <InputLabel id={'api-id-label'}>Source</InputLabel>
                                <Select
                                    labelId={'api-id-label'}
                                    id={'source-select'}
                                    label={'Source'}
                                    {...field}
                                >
                                    <MenuItem disabled value={0}>Select a source</MenuItem>
                                    {content}
                                </Select>
                            </FormControl>
                        )}
                    />
                    <Button variant={'contained'} onClick={handleParentPreview}>
                        Preview
                    </Button>
                </Stack>
            </Grid>
            {parentHeaders.length != 0 &&
                <Grid item xs={12}>
                    <Stack sx={{
                        marginY: 1
                    }} spacing={1}>
                        <Stack>
                            <Typography variant={'h6'}>
                                Available Fields
                            </Typography>
                            <Typography variant={'caption'} color={'gray'}>
                                *Select a field to preview
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} spacing={1}>
                            {parentHeaders.map((header: string, index: number) => {
                                return <Chip
                                        key={index}
                                        label={header}
                                        color={selectedParent == header ? "primary" : "default"}
                                        icon={selectedParent == header ? <Check /> : <Add />}
                                        onClick={() => {
                                            handleParentChange(header);
                                        }}
                                />
                            })}
                        </Stack>
                    </Stack>
                </Grid>
            }
            {
                selectedParent != "" &&
                <Grid item xs={12}>
                    <Stack sx={{
                        marginY: 1
                    }} spacing={1}>
                        <Typography>
                            {`Available fields for ${selectedParent}`}
                        </Typography>
                        <Grid container spacing={1}>
                            {childrenHeaders.length == 0 ? <Grid item>No Headers Found</Grid> : childrenHeaders.map((children: string, index: number) => {
                                return <Grid item key={index}>
                                    <Chip key={index} label={children} icon={<Add />} onClick={() => {
                                        handleChildrenAdd(children)
                                    }} />
                                </Grid>
                            })}
                        </Grid>
                    </Stack>
                </Grid>
            }
            {
                childrenHeaders.length != 0 &&
                <Grid item xs={12}>

                        <Typography variant={'h6'}>
                            Selected Fields
                        </Typography>
                        <Stack direction={'row'} justifyContent={'space-between'} sx={{
                            marginY: 1
                        }}>
                            <Stack direction={'row'} spacing={2}>
                                <Button
                                    variant={'outlined'}
                                    disabled={mode == "title"}
                                    onClick={() => {
                                        handleModeChange("title")
                                    }}
                                >
                                    {mode == "title" ? "Selected" : "Select"}
                                </Button>
                                <Typography variant={'h6'}>
                                    Article Title
                                </Typography>
                                {title != "" &&
                                    <Chip label={title} onDelete={handleTitleDelete} />
                                }
                            </Stack>
                            <ToggleButtonGroup
                                value={alignment}
                                size={'small'}
                                exclusive
                                onChange={(event, value) => {
                                    handleAlignment(event, value)
                                }}
                                aria-label="text alignment"
                            >
                                <ToggleButton value="left" aria-label="left aligned">
                                    <FormatAlignLeft/>
                                </ToggleButton>
                                <ToggleButton value="center" aria-label="centered">
                                    <FormatAlignCenter/>
                                </ToggleButton>
                                <ToggleButton value="right" aria-label="right aligned">
                                    <FormatAlignRight/>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'} sx={{
                            marginY: 1
                        }}>
                            <Stack direction={'row'} spacing={2}>
                                <Button
                                    variant={'outlined'}
                                    disabled={mode == 'body'}
                                    onClick={() => {
                                        handleModeChange('body')
                                    }}
                                >
                                    {mode == "body" ? "Selected" : "Select"}
                                </Button>
                                <Typography variant={'h6'}>
                                    Article Body
                                </Typography>
                            </Stack>
                            <Button variant={'contained'} color={'error'} onClick={clearChildren}>
                                Clear All
                            </Button>
                        </Stack>

                    <Stack spacing={1}>
                        {selectedChildren.map((article: ArticleBody, index: number) => {
                            return <Paper key={index} variant={'outlined'} sx={{
                                padding: 2,
                                borderRadius: 5
                            }}>
                                <Stack spacing={2}>
                                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                            <ToggleButtonGroup
                                                value={article.type}
                                                size={'small'}
                                                exclusive
                                                onChange={(event, value) => {
                                                    handleTypeChange(event, value, article.header)
                                                }}
                                                aria-label="text placement"
                                            >
                                                <ToggleButton value="p" aria-label="before">
                                                    Text
                                                </ToggleButton>
                                                <ToggleButton value="img" aria-label="after">
                                                    Image
                                                </ToggleButton>
                                                <ToggleButton value="video" aria-label="after">
                                                    Video
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                            <Typography>
                                                {article.header}
                                            </Typography>
                                        </Stack>
                                        <Button variant={'outlined'} color={'error'} onClick={() => {
                                            handleChildrenDelete(article.header)
                                        }}>
                                            Delete
                                        </Button>
                                    </Stack>
                                    {
                                        article.type == "p" &&
                                        <Stack direction={'row'} spacing={1}>
                                            <TextField
                                                label={'Additional Text'}
                                                variant={'outlined'}
                                                value={article.text}
                                                id={article.header}
                                                fullWidth
                                                helperText={"Adds text to the selected value"}
                                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                    handleTextChange(event, article.header)
                                                }}
                                            />
                                            <Stack spacing={1} alignItems={'flex-end'}>
                                                <ToggleButtonGroup
                                                    value={article.placement}
                                                    exclusive
                                                    onChange={(event, value) => {
                                                        handlePlacementChange(event, value, article.header)
                                                    }}
                                                    aria-label="text placement"
                                                >
                                                    <ToggleButton value="before" aria-label="before">
                                                        <Tooltip title={'Adds the text before value'}>
                                                            <LastPage/>
                                                        </Tooltip>
                                                    </ToggleButton>
                                                    <ToggleButton value="after" aria-label="after">
                                                        <Tooltip title={'Adds the text after value'}>
                                                            <FirstPage/>
                                                        </Tooltip>
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                                <Typography variant={'subtitle2'} sx={{
                                                    color: 'gray'
                                                }}>
                                                    Placement
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    }
                                </Stack>
                            </Paper>
                        })}
                    </Stack>
                </Grid>
            }
            {
                selectedChildren.length != 0 &&
                <Grid item xs={12}>
                    <Button variant={'contained'} fullWidth onClick={handlePreview}>
                        Preview and Submit
                    </Button>
                </Grid>
            }
            <CsvPreviewModal mode={'json'} onSubmit={handleSubmit} />
        </Grid>
    )
}

export default JsonImport