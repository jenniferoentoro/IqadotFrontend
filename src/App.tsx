import "./App.css";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage"
import Root from "./pages/templates/Root";
import FileImportPage from "./pages/fileImport/FileImportPage.tsx"
import HistoryPage from "./pages/history/HistoryPage.tsx";
import UsersPage from "./pages/users/UsersPage.tsx";
import AddUserPage from "./pages/users/AddUserPage.tsx";
import RequireAuth from "./components/auth/RequireAuth.tsx";
import SourcesPage from "./pages/sources/SourcesPage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={"/"}>
            <Route index element={<Navigate to={"/login"} />} />
            <Route path={"login"} element={<LoginPage/>} />
            <Route element={<Root/>}>
                <Route element={<RequireAuth />}>
                    <Route path={"import"} element={<FileImportPage/>} />
                    <Route path={"history"} element={<HistoryPage />} />
                    <Route path={"sources"} element={<SourcesPage />} />
                    <Route path={"users"}>
                        <Route index element={<UsersPage />} />
                        <Route path={"add"} element={<AddUserPage/>} />
                    </Route>
                </Route>
            </Route>
        </Route>
    )
)

export default function App() {
    return (
        <RouterProvider router={router}/>
    );
}
