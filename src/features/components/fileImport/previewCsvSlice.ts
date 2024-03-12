import {createSlice} from "@reduxjs/toolkit";

interface CsvArticle {
    subject: string,
    body: string,
}

interface JsonArticle {
    title: string,
    body: string
}

interface InitialState {
    open: boolean,
    csvArticles: CsvArticle[],
    jsonArticles: JsonArticle[]
}

const initialState: InitialState = {
    open: false,
    csvArticles: [],
    jsonArticles: []
}

const previewCsvSlice = createSlice({
    name: 'previewCsv',
    initialState,
    reducers: {
        open: (state) => {
            state.open = true;
        },
        close: (state) => {
            state.open = false;
        },
        setCsvArticles: (state, action) => {
            state.csvArticles = action.payload;
        },
        setJsonArticles: (state, action) => {
            state.jsonArticles = action.payload
        },
        reset: (state) => {
            state.csvArticles = [];
            state.jsonArticles = [];
        }
    }
})

export const previewCsvSliceActions = previewCsvSlice.actions

export default previewCsvSlice.reducer