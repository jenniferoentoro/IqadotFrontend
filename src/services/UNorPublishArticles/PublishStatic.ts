import axiosPrivate from "../axiosPrivate.ts";

export const publishStatic = async (staticId: string) => {
    try {
        const response = await axiosPrivate.put(`/api/static-item/publish/${staticId}`);
        return response.data;
    } catch (error) {
        console.error("Error publishing static:", error);
        throw error;
    }
};