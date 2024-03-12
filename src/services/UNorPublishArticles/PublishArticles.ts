import axiosPrivate from "../axiosPrivate.ts";

export const publishArticle = async (articleId: string) => {
    try {
        const response = await axiosPrivate.put(`/api/article/publish/${articleId}`);
        return response.data;
    } catch (error) {
        console.error("Error publishing article:", error);
        throw error;
    }
};