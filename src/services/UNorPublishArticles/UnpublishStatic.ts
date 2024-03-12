import axiosPrivate from "../axiosPrivate.ts";

export const unpublishStatic = async (staticId: string) => {
    try {
        const response = await axiosPrivate.put(`/api/static-item/unpublish/${staticId}`);
        return response.data;
    } catch (error) {
        console.error("Error unpublishing article:", error);
        throw error;
    }
};