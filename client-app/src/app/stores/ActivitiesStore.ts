﻿import {action, computed, configure, observable, runInAction} from "mobx";
import {createContext, SyntheticEvent} from "react";
import {IActivity} from "../models";
import agent from "../api/agent";

configure({enforceActions: 'observed'})

class ActivitiesStore {
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined = undefined;
    @observable editMode = false;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction('loading activities', () => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('.')[0];
                    this.activityRegistry.set(activity.id, activity);
                });
                this.loadingInitial = false;
            })

        } catch (error) {
            runInAction('load activities error', () => {
                this.loadingInitial = false;
            })
        }
    };

    @action cancelFormOpen = () => {
        runInAction(() => {
            this.editMode = false;
        })
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction('getting activity', () => {
                    this.selectedActivity = activity;
                    this.loadingInitial = false;
                })
            } catch (error) {
                runInAction('get activity error', () => {
                    this.loadingInitial = false;
                })
                console.log(error);
            }
        }
    }

    @action clearActivity = () => {
        this.selectedActivity = null;
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction('create activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.submitting = false;
            })
        } catch (error) {
            runInAction('create activity error', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('editing activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.submitting = false;
            })
        } catch (error) {
            runInAction('edit activity error', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction('deleting activity', () => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            })
        } catch (error) {
            runInAction('delete activity error', () => {
                this.submitting = false;
                this.target = '';
            })
            console.log(error);
        }
    }

    @action openCreateForm = () => {
        runInAction(() => {
            this.editMode = true;
            this.selectActivity = undefined;  
        })
    }

    @action selectActivity = (id: string) => {
        runInAction(() => {
            this.selectedActivity = this.activityRegistry.get(id);
            this.editMode = false;
        })
    }

    @action cancelSelectedActivity = () => {
        runInAction(() => {
            this.selectedActivity = undefined; 
        })
    }

    @action openEditForm = (id: string) => {
        runInAction(() => {
            this.selectedActivity = this.activityRegistry.get(id);
            this.editMode = true; 
        });
    }
}

export default createContext(new ActivitiesStore());