﻿import * as  React from "react";
import {Grid, List} from "semantic-ui-react";
import {IActivity} from "../../../src/app/model";
import {ActivityDetails, ActivityList} from "../index";
import ActivityForm from "../form/ActivityForm";

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDashBoard: React.FC<IProps> = ({
                                                 activities,
                                                 selectActivity,
                                                 selectedActivity,
                                                 editMode,
                                                 setEditMode,
                                                 setSelectedActivity
                                             }) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} selectActivity={selectActivity}/>
            </Grid.Column>
            <Grid.Column width={6}>
                {
                    selectedActivity && !editMode &&
                    <ActivityDetails activity={selectedActivity} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity}/>
                }
                {
                    editMode && <ActivityForm setEditMode={setEditMode} activity={selectedActivity}/>
                }
            </Grid.Column>
        </Grid>
    );
}

export default ActivityDashBoard;