import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import {Container} from "semantic-ui-react";
import axios from "axios";
import {IActivity} from "../model";
import {NavBar} from "../../../features";
import ActivityDashBoard from "../../../features/activities";


const App = () => {

    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditMode] = useState(false);

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.filter(a => a.id == id)[0]);
    }

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    }

    useEffect(() => {
        axios.get<IActivity[]>('http://localhost:5000/api/activities')
            .then((resp) => {
                setActivities(resp.data);
            })
    }, [])

    return (
        <Fragment>
            <NavBar openCreateForm={handleOpenCreateForm}/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashBoard
                    activities={activities}
                    selectActivity={handleSelectActivity}
                    selectedActivity={selectedActivity}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    setSelectedActivity={setSelectedActivity}/>
            </Container>

        </Fragment>
    )
}

// export default hot(module)(App);
export default App;

