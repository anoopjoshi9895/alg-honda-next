import axios, { AxiosRequestConfig } from "axios";
import { ApiServiceDataStore } from "./data";
// import { saveAs } from 'file-saver';

export function getAuthHeader(token?: string) {
  if (!token) {
    return {};
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function get<T>(url: string, store?: ApiServiceDataStore) {
  const options = {
    headers: {
      ...getAuthHeader(store?.token),
    },
  };
  return axios.get<T>(url, options);
}

export async function post<T = any, U = any>(
  url: string,
  data: U,
  store?: ApiServiceDataStore
) {
  const options: AxiosRequestConfig = {
    data,
    url,
    method: "POST",
    headers: {
      ...getAuthHeader(store?.token),
      "Content-Type": "application/json",
    },
  };
  return axios.post<T>(url, JSON.stringify(data), options);
}

export async function put<T = any, U = any>(
  url: string,
  data: U,
  store?: ApiServiceDataStore
) {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeader(store?.token),
      "Content-Type": "application/json",
    },
  };
  return axios.put<T>(url, JSON.stringify(data), options);
}

export async function remove<T>(url: string, store?: ApiServiceDataStore) {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeader(store?.token),
    },
  };
  return axios.delete<T>(url, options);
}

export async function upload<T>(
  url: string,
  data: FormData,
  onUploadProgress: (progressEvent: any) => void,
  store?: ApiServiceDataStore
) {
  const options: AxiosRequestConfig = {
    onUploadProgress,
    headers: {
      ...getAuthHeader(store?.token),
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.post<T>(url, data, options);
}

export async function download(
  url: string,
  store?: ApiServiceDataStore,
  accept?: string
) {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeader(store?.token),
      Accept: accept,
    },
    responseType: "arraybuffer",
  };
  return axios.get(url, options);
}

export async function downloadPostData<T>(
  url: string,
  data: T,
  store?: ApiServiceDataStore,
  accept?: string
) {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeader(store?.token),
      Accept: accept,
    },
    responseType: "arraybuffer",
  };
  return axios.post(url, data, options);
}

// export const saveDownloadedFile = (
//   buffer: any,
//   type: string,
//   fileName: string
// ) => {
//   const data = new Blob([buffer], {
//     type,
//   });
//   saveAs(data, fileName);
// };
