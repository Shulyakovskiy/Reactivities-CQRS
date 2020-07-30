import {AxiosResponse} from "axios";
import axios from "axios";
import {IActivity} from "../models";

axios.defaults.baseURL = 'https://localhost:5001/api/Activities';

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(500)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(500)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(500)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(500)).then(responseBody)
};

const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/List'),
    details: (id: string) => requests.get(`/Details/${id}`),
    create: (activity: IActivity) => requests.post('/Create/', activity),
    update: (activity: IActivity) => requests.put(`/Edit/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/Delete/${id}`)
}

export default {
    Activities
}