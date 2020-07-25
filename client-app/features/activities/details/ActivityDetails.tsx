import * as  React from "react";
import {Button, Card, Image} from "semantic-ui-react";
import {IActivity} from "../../../src/app/model";

interface IProps {
    activity: IActivity;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({activity, setEditMode, setSelectedActivity}) => {
    return (
        <Card fluid>
            <Image src={`../../src/assets/img/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
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
                 <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit'/>
                 <Button onClick={() => setSelectedActivity(null)} basic color='grey' content='Cancel'/>
             </Button.Group>
            </Card.Content>
        </Card>
    );
}

export default ActivityDetails;