import axiosPrivate from "../axiosPrivate.ts";

export const createUser = async (formData: any) => {
  const response = await axiosPrivate.post("/api/user", formData);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axiosPrivate.get("/api/user");
  return response.data;
};
