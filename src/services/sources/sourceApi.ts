import {Source} from "../../dto/sources/source.ts";
import axiosPrivate from "../axiosPrivate.ts";
import {SourceRequest} from "../../dto/sources/sourceRequest.ts";
import {EditSourceRequest} from "../../dto/sources/editSourceRequest.ts";

export const findAllSources = async (): Promise<Source[]> => {
    const response = await axiosPrivate.get("/api/sources/get-all-sources");
    return response.data;
}

export const createSource = async (data: SourceRequest) => {
    const response = await axiosPrivate.post('/api/sources', data);
    return response.data;
}

export const editSource = async (data: EditSourceRequest) => {
    const response = await axiosPrivate.put(`/api/sources/${data.id}`, data.request);
    return response.data;
}

export const deleteSource = async (data: number) => {
    const response = await axiosPrivate.delete(`/api/sources/${data}`);
    return response.data;
}