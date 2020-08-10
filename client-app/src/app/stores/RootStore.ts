import {ActivitiesStore, CommonStore, ModalStore, UserStore} from "./index";
import {createContext} from "react";

export class RootStore {
    activitiesStore: ActivitiesStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore : ModalStore;

    constructor() {
        this.commonStore = new CommonStore(this);
        this.activitiesStore = new ActivitiesStore(this);
        this.userStore = new UserStore(this);
        this.modalStore = new ModalStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());