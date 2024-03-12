import { FileResponse } from "../../dto/file/fileResponse";
import axiosPrivate from "../axiosPrivate";

export const getArticles = async () : Promise<FileResponse[]> => {
    const response = await axiosPrivate.get("/api/article");
    return response.data
}
