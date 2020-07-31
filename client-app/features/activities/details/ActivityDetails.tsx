import * as  React from "react";
import {useContext, useEffect} from "react";
import {Grid} from "semantic-ui-react";
import {ActivitiesStore} from "../../../src/app/stores";
import {observer} from "mobx-react-lite";
import {RouteComponentProps, useLocation} from "react-router-dom";
import LoadingComponent from "../../../src/app/layout/LoadingComponent";
import {ActivityDetailsChat, ActivityDetailsHeader, ActivityDetailsInfo, ActivityDetailsSidebar} from "./index";


interface DetailParams {
    id: string;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    let query = useQuery();
    const activityStore = useContext(ActivitiesStore);
    const {activity, loadActivity, loadingInitial} = activityStore;
    useEffect(() => {
        const id = query.get("id");
        //match.param.id
        loadActivity(id).then();
    }, [loadActivity]);

    if (loadingInitial) return <LoadingComponent content='Loading Activity'/>
    if (!activity)
        return <h2>Activity Not found</h2>

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailsHeader activity={activity}/>
                <ActivityDetailsInfo activity={activity}/>
                <ActivityDetailsChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailsSidebar/>
            </Grid.Column>
        </Grid>
    );
}

export default observer(ActivityDetails);