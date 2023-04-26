import axios from "axios";
import type { AxiosError, AxiosInstance, RawAxiosRequestHeaders } from "axios";

const httpCommon = (
  host: string,
  options: RawAxiosRequestHeaders = {}
): AxiosInstance =>
  axios.create({
    baseURL: host,
    headers: {
      "Content-type": "application/json",
      ...options,
    },
  });

export default httpCommon;

export const axiosOptions = {
  onError: (error: AxiosError): void => {
    const api = error.config
      ? `${error.config.baseURL ?? ""}${error.config.url ?? ""}`
      : "";

    console.error(
      `[API][錯誤][${error.code ?? ""}]: ${error.message} ${
        api ? `- ${api}` : ""
      }`,
      error
    );
  },
};
