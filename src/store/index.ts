import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "../features/components/sidebarSlice.js";
import authReducer from "../features/auth/authSlice.tsx"
import successSnackbarSlice from "../features/components/snackbars/successSnackbarSlice.ts";
import errorSnackbarSlice from "../features/components/snackbars/errorSnackbarSlice.ts";
import customBackdropSlice from "../features/components/backdrop/customBackdropSlice.ts";
import channelSelectSlice from "../features/components/fileImport/channelSelectSlice.ts";
import previewCsvSlice from "../features/components/fileImport/previewCsvSlice.ts";
import csvHelperSlice from "../features/components/helperModals/csvHelperSlice.ts";
import addSourceSlice from "../features/components/sources/addSourceSlice.ts";

const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        auth: authReducer,
        successSnackbar: successSnackbarSlice,
        errorSnackbar: errorSnackbarSlice,
        customBackdrop: customBackdropSlice,
        channelSelect: channelSelectSlice,
        previewCsv: previewCsvSlice,
        csvHelper: csvHelperSlice,
        addSource: addSourceSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;