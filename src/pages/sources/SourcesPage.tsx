import Box from "@mui/material/Box";
import {Button, InputAdornment, Stack, TextField} from "@mui/material";
import Header from "../../components/template/Header.tsx";
import {Add, Search} from "@mui/icons-material";
import {Source} from "../../dto/sources/source.ts";
import SourceCard from "../../components/sources/SourceCard.tsx";
import AddSourceModal from "../../components/sources/AddSourceModal.tsx";
import {useDispatch} from "react-redux";
import {addSourceSliceActions} from "../../features/components/sources/addSourceSlice.ts";
import {useQuery} from "react-query";
import {findAllSources} from "../../services/sources/sourceApi.ts";
import {errorSnackbarSliceActions} from "../../features/components/snackbars/errorSnackbarSlice.ts";
import {ChangeEvent, useEffect, useState} from "react";

const SourcesPage = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState<string>("");
    const [sources, setSources] = useState<Source[]>([]);

    const {data, isLoading, isError} = useQuery(["sources"], {
        queryFn: findAllSources
    })
    let content;
    if (isLoading) {
        content = <div>Loading</div>
    } else if (isError) {
        dispatch(errorSnackbarSliceActions.setOpen({
            text: "Something went wrong!"
        }))
    } else if (data) {
        content = sources.map((source: Source, index: number) => {
            return <SourceCard key={index} {...source} />
        })
    }

    const handleAdd = () => {
        dispatch(addSourceSliceActions.open({
            mode: "add"
        }));
    }

    useEffect(() => {
        if (data){
            const filteredSources = data.filter(source => source.name.toLowerCase().includes(keyword.toLowerCase()));
            setSources(filteredSources);
        }
    }, [data, keyword]);

    return (
        <Box>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Header text={"Sources"} />
                <Stack direction={'row'} spacing={2}>
                    <TextField
                        id="input-with-icon-textfield"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setKeyword(event.target.value);
                        }}
                    />
                    <Button
                        variant={'contained'}
                        startIcon={<Add />}
                        onClick={handleAdd}
                    >
                        Add New Source
                    </Button>
                </Stack>
            </Stack>
            <Box sx={{
                height: 20
            }} />
            <Stack spacing={2}>
                {content}
            </Stack>
            <AddSourceModal />
        </Box>
    )
}

export default SourcesPage