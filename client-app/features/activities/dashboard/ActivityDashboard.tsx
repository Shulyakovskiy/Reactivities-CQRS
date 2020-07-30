import * as  React from "react";
import {Grid} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {ActivitiesStore} from "../../../src/app/stores";
import LoadingComponent from "../../../src/app/layout/LoadingComponent";
import {ActivityList} from "./index";

const ActivityDashBoard: React.FC = () => {
    const activityStore = useContext(ActivitiesStore);

    useEffect(() => {
        activityStore.loadActivities().then();
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities'/>
    
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width={6}>
               <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    );
};


export default observer(ActivityDashBoard);