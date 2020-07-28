import * as  React from "react";
import {useContext} from "react";
import {Grid} from "semantic-ui-react";
import {ActivityDetails, ActivityList} from "../index";
import ActivityForm from "../form/ActivityForm";
import {observer} from "mobx-react-lite";
import {ActivitiesStore} from "../../../src/app/stores";

const ActivityDashBoard: React.FC = () => {
    const activityStore = useContext(ActivitiesStore);
    const {editMode, selectedActivity} = activityStore;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && (
                    <ActivityDetails/>
                )}
                {editMode && (
                    <ActivityForm
                        key={(selectedActivity && selectedActivity.id) || 0}
                        activity={selectedActivity!}
                    />
                )}
            </Grid.Column>
        </Grid>
    );
};


export default observer(ActivityDashBoard);