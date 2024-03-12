import { FileResponse } from "../../dto/file/fileResponse";
import axiosPrivate from "../axiosPrivate";

export const getStatic = async () : Promise<FileResponse[]> => {
    const response = await axiosPrivate.get("/api/static-item");
    return response.data
}