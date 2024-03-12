import axiosPrivate from "../axiosPrivate.ts";

export const deleteArticle = async (articleId: string) => {
    try {
        const response = await axiosPrivate.delete(`/api/article/delete/${articleId}`);
        return response.data;
    } catch (error) {
        console.error("Error publishing article:", error);
        throw error;
    }
};