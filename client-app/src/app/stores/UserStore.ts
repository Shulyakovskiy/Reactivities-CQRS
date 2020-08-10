import {action, computed, configure, observable, runInAction} from "mobx";
import {IUser, IUserFormValues} from "../models";
import agent from "../api/agent";
import {RootStore} from "./RootStore";
import {appHistory} from "../../index";

configure({enforceActions: 'observed'});

export default class UserStore {
    rootStore: RootStore;

    public constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {
        return this.user;
    }

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            runInAction(() => {
                this.user = user;
            });
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            appHistory.push('/activities');
        } catch (error) {
            throw error;
        }
    };

    @action register = async (values: IUserFormValues) => {
        try {
            console.log(values)
            const user = await agent.User.register(values);
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            appHistory.push('/activities')
        } catch (error) {
            throw error;
        }
    }

    @action getUser = async () => {
        try {
            const user = await agent.User.current();
            runInAction(() => {
                this.user = user;
            });
        } catch (error) {
            console.log(error);
        }
    };

    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        appHistory.push('/');
    };

}
