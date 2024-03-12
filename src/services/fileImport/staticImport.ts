import axiosPrivate from "../axiosPrivate.ts";
import {fillRequest} from "../../dto/file/staticFile/fillRequest.ts";
import {UploadJsonRequest} from "../../dto/file/json/uploadJsonRequest.ts";

export const staticFillUpload = async (data: fillRequest) => {
    const response = await axiosPrivate.post("/api/static-item", data);
    return response.data
}

export const staticCsvUpload = async (data: FormData) => {
    const response = await axiosPrivate.post("/api/static-item/create-csv", data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    return response.data
}

export const staticUploadJson = async (data: UploadJsonRequest) => {
    const url = `/api/static-item/importSelectedColumnsFromList/${data.apiId}?resultsField=${data.resultsField}&isPublished=${data.isPublished}&channel=${data.channel}&titleSelectedColumn=${data.titleSelectedColumn}&alignment=${data.alignment}&bodySelectedColumns=${data.bodySelectedColumns}`
    const response = await axiosPrivate.get(url);

    return response.data;
}