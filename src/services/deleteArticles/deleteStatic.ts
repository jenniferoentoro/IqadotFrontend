import axiosPrivate from "../axiosPrivate.ts";

export const deleteStatic = async (articleId: string) => {
    try {
        const response = await axiosPrivate.delete(`/api/static-item/delete/${articleId}`);
        return response.data;
    } catch (error) {
        console.error("Error publishing article:", error);
        throw error;
    }
};