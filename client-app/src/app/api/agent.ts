import {AxiosResponse} from "axios";
import axios from "axios";
import {IActivity, IUser, IUserFormValues} from "../models";
import {appHistory} from "../../index";
import {toast} from "react-toastify";

axios.defaults.baseURL = 'https://localhost:5001/api/'
    //'https://localhost:5001/api/';

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.authorization = 'Bearer ' + token;
    return config;
}, error => {
    Promise.reject(error).then();
});

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
}
const User = {
    current: (): Promise<IUser> => requests.get('user/detail'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post(`user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`user/register`, user),
}


const Activities = {
    list: (): Promise<IActivity[]> => requests.get('Activities/List'),
    details: (id: string) => requests.get(`Activities/Details/${id}`),
    create: (activity: IActivity) => requests.post('Activities/Create/', activity),
    update: (activity: IActivity) => requests.put(`Activities/Edit/${activity.id}`, activity),
    delete: (id: string) => requests.del(`Activities/Delete/${id}`)
}

export default {
    Activities, User
}