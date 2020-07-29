import * as  React from "react";
import {useContext, useEffect} from "react";
import {Button, Card, Image} from "semantic-ui-react";
import {ActivitiesStore} from "../../../src/app/stores";
import {observer} from "mobx-react-lite";
import {Link, RouteComponentProps} from "react-router-dom";
import LoadingComponent from "../../../src/app/layout/LoadingComponent";

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const activityStore = useContext(ActivitiesStore);
    const {activity, loadActivity, loadingInitial} = activityStore;
    useEffect(() => {
        loadActivity(match.params.id).then();
    }, [loadActivity]);

    if (loadingInitial || !activity) return <LoadingComponent content='Loading Activity'/>

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
                    <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit'/>
                    <Button onClick={() => history.push('/activities')} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    );
}

export default observer(ActivityDetails);