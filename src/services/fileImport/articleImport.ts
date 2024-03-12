import axiosPrivate from "../axiosPrivate.ts";
import {PreviewParent} from "../../dto/file/json/previewParent.ts";
import {PreviewChildren} from "../../dto/file/json/previewChildren.ts";
import {PreviewJsonRequest} from "../../dto/file/json/previewJsonRequest.ts";
import {UploadJsonRequest} from "../../dto/file/json/uploadJsonRequest.ts";

export const articlePdfUpload = async (data: FormData) => {
    const response = await axiosPrivate.post("/api/article/create-pdf", data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const articleCsvUpload = async (data: FormData) => {
    const response = await axiosPrivate.post("/api/article/create-csv", data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const previewCsvHeaders = async (data: FormData) => {
    const response = await axiosPrivate.post("/api/article/preview-csv", data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const previewCsvResult = async (data: FormData) => {
    const response = await axiosPrivate.post("/api/article/preview-csv-choose", data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });

    return response.data;
}

export const articleCustomCsvUpload = async (data: FormData) => {
    const response = await axiosPrivate.post("/api/article/create-csv-choose", data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });

    return response.data;
}

export const previewJsonParentHeaders = async (data: PreviewParent): Promise<string[]> => {
    const response = await axiosPrivate.get(`/api/article/getColumnsFromList/${data.apiId}`);

    return response.data;
}

export const previewJsonChildrenHeaders = async (data: PreviewChildren): Promise<string[]> => {
    const response = await axiosPrivate.get(`/api/article/getColumnsInResultsFromList/${data.apiId}?resultsField=${data.resultsField}`)

    return response.data;
}

export const previewJsonResult = async (data: PreviewJsonRequest) => {
    const url = `/api/article/previewSelectedColumnsFromList/${data.apiId}?resultsField=${data.resultsField}&titleSelectedColumn=${data.titleSelectedColumn}&alignment=${data.alignment}&bodySelectedColumns=${data.bodySelectedColumns}`
    const response = await axiosPrivate.get(url);

    return response.data;
}

export const articleUploadJson = async (data: UploadJsonRequest) => {
    const url = `/api/article/importSelectedColumnsFromList/${data.apiId}?resultsField=${data.resultsField}&isPublished=${data.isPublished}&channel=${data.channel}&titleSelectedColumn=${data.titleSelectedColumn}&alignment=${data.alignment}&bodySelectedColumns=${data.bodySelectedColumns}`
    const response = await axiosPrivate.get(url);

    return response.data;
}