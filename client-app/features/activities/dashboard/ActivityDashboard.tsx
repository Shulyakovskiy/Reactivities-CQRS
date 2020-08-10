import * as  React from "react";
import {useContext, useEffect} from "react";
import {Grid} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../src/app/stores";
import LoadingComponent from "../../../src/app/layout/LoadingComponent";
import {ActivityList} from "./index";

const ActivityDashBoard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);

    useEffect(() => {
        rootStore.activitiesStore.loadActivities().then();
    }, [rootStore]);

    if (rootStore.activitiesStore.loadingInitial) return <LoadingComponent content='Loading activities'/>
    
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