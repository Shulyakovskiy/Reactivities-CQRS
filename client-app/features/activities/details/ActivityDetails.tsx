import * as  React from "react";
import {useContext} from "react";
import {Button, Card, Image} from "semantic-ui-react";
import {ActivitiesStore} from "../../../src/app/stores";
import {observer} from "mobx-react-lite";


const ActivityDetails: React.FC = () => {
    const activityStore = useContext(ActivitiesStore);
    const {selectedActivity: activity, openEditForm, cancelSelectedActivity} = activityStore;
    return (
        <Card fluid>
            <Image src={`../../src/assets/img/categoryImages/${activity.category}.jpg`} wrapped ui={false}/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={() => openEditForm(activity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    );
}

export default observer(ActivityDetails);