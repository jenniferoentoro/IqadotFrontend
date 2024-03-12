import axiosPrivate from "../axiosPrivate.ts";

export const unpublishArticles = async (articleId: string) => {
    try {
        const response = await axiosPrivate.put(`/api/article/unpublish/${articleId}`);
        return response.data;
    } catch (error) {
        console.error("Error unpublishing article:", error);
        throw error;
    }
};
