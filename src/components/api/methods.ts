import instance from "./fetcher";

export const doGet = async (url: string) => {
    const response = await instance.get(url);
    return response;
};

export const doPost = async (url: string, data: any) => {
    const response = await instance.post(url, data);
    return response;
};

export const doDelete = async (url: string, id: string) => {
    const response = await instance.delete(url + "/" + id);
    return response;
}

export const doPut = async (url: string, data: any) => {
    const response = await instance.put(url, data);
    return response;
};

export const doPatch = async (url: string, data: any) => {
    const response = await instance.patch(url, data);
    return response;
};