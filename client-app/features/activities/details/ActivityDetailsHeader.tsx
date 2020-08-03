﻿import * as  React from "react";
import {Button, Header, Item, Segment, Image} from "semantic-ui-react";
import {IActivity} from "../../../src/app/models";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";

const activityImageStyle = {
    filter: 'brightness(30%)'
};
const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const ActivityDetailsHeader: React.FC<{activity: IActivity}> = ({activity}) => {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`../../src/assets/img/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{activity.date.toISOString()}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/manage?id=${activity.id}`} color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    );
}

export default observer(ActivityDetailsHeader);