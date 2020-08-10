import * as  React from "react";
import {Fragment, useContext} from "react";
import {Item, Label} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../src/app/stores";
import {ActivityListItem} from "./index";

const ActivityList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {activitiesByDate} = rootStore.activitiesStore;
    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label key={group} size='large' color='blue'>
                        {group}
                    </Label>
                    <Item.Group divided>
                        {activities.map(activity => (
                            <ActivityListItem key={activity.id} activity={activity}/>

                        ))}
                    </Item.Group>
                </Fragment>

            ))}
        </Fragment>
    );
};

export default observer(ActivityList);