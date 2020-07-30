import * as  React from "react";
import {Button, Icon, Item, ItemGroup, Label, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {ActivitiesStore} from "../../../src/app/stores";
import {IActivity} from "../../../src/app/models";

const ActivityListItem: React.FC<{ activity: IActivity }> = ({activity}) => {
    const activityStore = useContext(ActivitiesStore);
    const {deleteActivity, submitting, target} = activityStore
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Description>
                            Hosted by SEA
                        </Item.Description>
                        <Item.Extra>
                            <Button
                                as={Link} to={`/activity?id=${activity.id}`}
                                floated='right'
                                content='View'
                                color='blue'
                            />

                            <Label basic content={activity.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item.Group>
                <Item.Image size='tiny' circular src='../../src/assets/img/user.png'/>
            </Segment>
            <Segment>
                <Icon name='clock'/> {activity.date} <br/>
                <Icon name='marker'/> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                Attendees will go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    name={activity.id}
                    loading={target === activity.id && submitting}
                    onClick={(e) => deleteActivity(e, activity.id)}
                    floated='right'
                    content='Delete'
                    color='red'
                />
            </Segment>
        </Segment.Group>

    );
}

export default ActivityListItem;