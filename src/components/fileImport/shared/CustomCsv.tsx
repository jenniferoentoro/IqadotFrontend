import {Button, Chip, Grid, Paper, Stack, TextField, ToggleButton, ToggleButtonGroup, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useState, MouseEvent, ChangeEvent} from "react";
import {
    Add,
    FirstPage,
    FormatAlignCenter,
    FormatAlignLeft,
    FormatAlignRight, Help, LastPage
} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {errorSnackbarSliceActions} from "../../../features/components/snackbars/errorSnackbarSlice.ts";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {useMutation} from "react-query";
import {articleCustomCsvUpload, previewCsvResult} from "../../../services/fileImport/articleImport.ts";
import CsvPreviewModal from "./CsvPreviewModal.tsx";
import {previewCsvSliceActions} from "../../../features/components/fileImport/previewCsvSlice.ts";
import {customBackdropSliceActions} from "../../../features/components/backdrop/customBackdropSlice.ts";
import {successSnackbarSliceActions} from "../../../features/components/snackbars/successSnackbarSlice.ts";
import IconButton from "@mui/material/IconButton";
import {csvHelperSliceActions} from "../../../features/components/helperModals/csvHelperSlice.ts";
import CsvHelperModal from "../helperModals/CsvHelperModal.tsx";

interface CustomCsvProps {
    headers: string[],
    file: File | null | undefined,
    channel: string,
    publish: boolean,
    onReset(): void
}

interface ArticleBody {
    header: string,
    text: string,
    placement: string
}

const CustomCsv = (props: CustomCsvProps) => {
    const [alignment, setAlignment] = useState<string | null>('left');
    const [availableHeaders, setAvailableHeaders] = useState<string[]>(props.headers)
    const [mode, setMode] = useState<string>("title");
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string[]>([]);
    const [articleBody, setArticleBody] = useState<ArticleBody[]>([]);

    const dispatch = useDispatch();

    const handleAlignment = (
        _event: MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
    };

    const handleAdd = (header: string) => {
        if (mode == 'title'){
            if (title != ""){
                dispatch(errorSnackbarSliceActions.setOpen({
                    text: "A title is already selected!"
                }))
                return
            }

            setTitle(header);

        }
        else if (mode == 'body'){
            setBody((prev: string[]) => [...prev, header])
            setArticleBody((prev: ArticleBody[]) => [...prev, {
                header: header,
                text: "",
                placement: "before"
            }])
        }

        setAvailableHeaders(
            availableHeaders.filter((available: string) => {
                return available != header
            })
        )
    }

    const handleTitleDelete = () => {
        setAvailableHeaders((prev: string[]) => [...prev, title]);
        setTitle("");
    }

    const handleMode = (mode: string) => {
        setMode(mode);
    }

    const clearBody = () => {
        setAvailableHeaders((prev) => [...prev, ...body]);
        setBody([]);
        setArticleBody([]);
    }

    const handleBodyDelete = (header: string) => {
        setAvailableHeaders((prev: string[]) => [...prev, header]);
        setBody(
            body.filter((body: string) => {
                return body != header
            })
        )
        setArticleBody(
            articleBody.filter((articleBody: ArticleBody) => {
                return articleBody.header != header
            })
        )
    }

    const handleTextChange = (
        event: ChangeEvent<HTMLInputElement>,
        header: string,
    ) => {
        const articleBodies: ArticleBody[] = articleBody.map((article: ArticleBody) => {
            if (article.header == header){
                return {
                    ...article,
                    text: event.target.value
                }
            } else {
                return article;
            }
        })
        setArticleBody(articleBodies);
    }

    const handlePlacementChange = (
        _event: MouseEvent<HTMLElement>,
        newPlacement: string,
        header: string
    ) => {
        const articleBodies: ArticleBody[] = articleBody.map((article: ArticleBody) => {
            if (article.header == header){
                return {
                    ...article,
                    placement: newPlacement
                }
            } else {
                return article
            }
        })
        setArticleBody(articleBodies)
    }

    const handlePreview = () => {
        if (title == ""){
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Title is required"
            }))
            return;
        }

        let bodyColumns = "";

        articleBody.map((article: ArticleBody) => {
            if (article.text != ""){
                return bodyColumns += `${article.header}#p;${article.placement};${article.text},`;
            } else {
                return bodyColumns += article.header + "#p,";
            }
        })

        const formData = new FormData();
        formData.append("file", props.file!);
        formData.append("channel", props.channel);
        formData.append("publish", props.publish as unknown as string);
        formData.append("title", title);
        formData.append("bodyColumns", bodyColumns);
        formData.append("alignment", alignment!);

        previewMutation.mutate(formData);
    }

    const handleSubmit = () => {
        dispatch(previewCsvSliceActions.close());
        dispatch(previewCsvSliceActions.reset());
        dispatch(customBackdropSliceActions.open());

        let bodyColumns = "";

        articleBody.map((article: ArticleBody) => {
            if (article.text != ""){
                return bodyColumns += `${article.header}#p;${article.placement};${article.text},`;
            } else {
                return bodyColumns += article.header + "#p,";
            }
        })

        const formData = new FormData();
        formData.append("file", props.file!);
        formData.append("channel", props.channel);
        formData.append("publish", props.publish as unknown as string);
        formData.append("title", title);
        formData.append("bodyColumns", bodyColumns);
        formData.append("alignment", alignment!);

        submitMutation.mutate(formData);
    }

    const previewMutation = useMutation({
        mutationFn: previewCsvResult,
        onSuccess: (data) => {
            dispatch(previewCsvSliceActions.setCsvArticles(data));
            dispatch(previewCsvSliceActions.open());
        },
        onError: () => {
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Something went wrong"
            }))
        }
    })

    const submitMutation = useMutation({
        mutationFn: articleCustomCsvUpload,
        onSuccess: () => {
            dispatch(customBackdropSliceActions.close());
            dispatch(successSnackbarSliceActions.setOpen({
                text: "Successfully uploaded article!"
            }))
            handleReset();
        },
        onError: () => {
            dispatch(customBackdropSliceActions.close());
            dispatch(errorSnackbarSliceActions.setOpen({
                text: "Failed to upload article!"
            }))
        }
    })

    const handleReset = () => {
        props.onReset()
    }

    const headers = availableHeaders.length == 0 ? "No headers available" : availableHeaders.map((header: string, index: number) => {
        return <Chip key={index} label={header} onClick={() => {
            handleAdd(header)
        }} icon={<Add/>}/>
    })

    const handleHelp = () => {
        dispatch(csvHelperSliceActions.open());
    }

    return (
        <Grid container sx={{
            marginTop: 1
        }} spacing={1}>
            <Grid item xs={12}>
                <Stack>
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                        <Typography variant={'h6'}>
                            Available Headers
                        </Typography>
                        <IconButton onClick={handleHelp}>
                            <Help />
                        </IconButton>
                    </Stack>
                    <Typography variant={'caption'} color={'gray'}>
                        *Select a header to select
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack direction={'row'} spacing={1}>
                    {headers}
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack direction={'row'} spacing={1}>
                    <Box sx={{
                        borderRadius: 5,
                        padding: 2,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Stack spacing={2} direction={'row'} alignItems={'center'}>
                            <Button
                                variant={mode == 'title' ? 'contained' : 'outlined'}
                                size={'small'}
                                disabled={mode == 'title'}
                                onClick={() => {
                                    handleMode('title')
                                }}
                            >
                                {mode == "title" ? "Selected" : "Select"}
                            </Button>
                            <Typography variant={'h6'}>
                                Article Title
                            </Typography>
                            {title != "" && <Chip label={title} onDelete={handleTitleDelete} />}
                        </Stack>
                    </Box>
                    <Stack spacing={1} alignItems={'flex-end'}>
                        <Tooltip title={"Sets the alignment for the article"}>
                            <Typography variant={'subtitle2'} sx={{
                                fontWeight: 700,
                                cursor: 'default'
                            }}>
                                Text Alignment
                            </Typography>
                        </Tooltip>
                        <ToggleButtonGroup
                            value={alignment}
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
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{
                    borderRadius: 5,
                    padding: 2,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Stack spacing={2} direction={'row'} alignItems={'center'}>
                        <Button
                            variant={mode == 'body' ? 'contained' : 'outlined'}
                            size={'small'}
                            disabled={mode == 'body'}
                            onClick={() => {
                                handleMode('body')
                            }}
                        >
                            {mode == "body" ? "Selected" : "Select"}
                        </Button>
                        <Typography variant={'h6'}>
                            Article Body
                        </Typography>
                    </Stack>
                    <Button
                        variant={'contained'}
                        color={'error'}
                        onClick={clearBody}
                    >
                        Clear All
                    </Button>
                </Box>
                {body.length != 0 && <Divider />}
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={2}>
                    {articleBody.map((body: ArticleBody, index: number) => {
                        return <Paper key={index} variant={'outlined'} sx={{
                            padding: 2,
                            borderRadius: 5
                        }}>
                            <Stack spacing={1}>
                                <Stack
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                >
                                    <Typography>
                                        {body.header}
                                    </Typography>
                                    <Button
                                        variant={'outlined'}
                                        color={'error'}
                                        onClick={() => {
                                            handleBodyDelete(body.header)
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Stack>
                                <Stack direction={'row'} spacing={1}>
                                    <TextField
                                        label={'Additional Text'}
                                        variant={'outlined'}
                                        value={body.text}
                                        id={body.header}
                                        fullWidth
                                        helperText={"(Optional) Adds text to the selected value"}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            handleTextChange(event, body.header)
                                        }}
                                    />
                                    <Stack spacing={1} alignItems={'flex-end'}>
                                        <ToggleButtonGroup
                                            value={body.placement}
                                            exclusive
                                            onChange={(event, value) => {
                                                handlePlacementChange(event, value, body.header)
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
                            </Stack>
                        </Paper>
                    })}
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant={"contained"}
                    fullWidth
                    onClick={handlePreview}
                >
                    Preview and Submit
                </Button>
            </Grid>
            <CsvPreviewModal mode={'csv'} onSubmit={handleSubmit} />
            <CsvHelperModal />
        </Grid>
    )
}

export default CustomCsv