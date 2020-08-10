import {RootStore} from "./RootStore";
import {action, configure, observable, runInAction} from "mobx";

configure({enforceActions: 'observed'});

export default class ModalStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable.shallow modal = {
        open: false,
        body: null
    }

    @action openModal = (content: any) => {
        runInAction('OPEN_MODAL', () => {
            this.modal.open = true;
            this.modal.body = content;
        });
    }

    @action closeModal = () => {
        runInAction('CLOSE_MODAL', () => {
            this.modal.open = false;
            this.modal.body = null;
        });
    }
}