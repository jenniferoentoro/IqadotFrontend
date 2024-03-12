import { AxiosResponse } from "axios";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

const axiosPrivate = axios.create({
  baseURL: "http://localhost:8080",
})

export const login = async (data: LoginData): Promise<any> => {
  try {
    const response: AxiosResponse = await axiosPrivate.post("/api/auth/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
