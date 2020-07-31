import {AxiosResponse} from "axios";
import axios from "axios";
import {IActivity} from "../models";
import {appHistory} from "../../index";
import {toast} from "react-toastify";

axios.defaults.baseURL = 'https://localhost:5001/api/Activities';

axios.interceptors.response.use(undefined, error => {

    if (error.message === 'Network Error' && !error.response)
        toast.error("Network Error");
    const {status, data, config} = error.response;
    if (status == 404) {
        appHistory.push('notfound');
    }
    if (status === 400 && config.method === 'get' && data.errors.hasOwnproperty('id'))
        appHistory.push('notfound');
    if (status === 5000) {
        toast.error("Server error - check terminal");
    }
});

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