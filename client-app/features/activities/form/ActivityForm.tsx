﻿import * as  React from "react";
import {Button, Form, Segment} from "semantic-ui-react";
import {FormEvent, useContext, useEffect, useState} from "react";
import {v4 as uuid} from 'uuid';
import {IActivity} from "../../../src/app/models";
import {ActivitiesStore} from "../../../src/app/stores";
import {observer} from "mobx-react-lite";
import {RouteComponentProps, useLocation} from "react-router-dom";

interface DetailParam {
    id: string;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ActivityForm: React.FC<RouteComponentProps<DetailParam>> = ({match, history}) => {
    const activityStore = useContext(ActivitiesStore);
    const {createActivity, editActivity, submitting, activity: initialFormState, loadActivity, clearActivity} = activityStore
    let query = useQuery();

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });
    const id = query.get("id");

    const  loadData = () => {
        //match.params.id
        if (id && activity.id.length === 0) {
            loadActivity(id)
                .then(() => initialFormState && setActivity(initialFormState));
        }
        return () => {
            clearActivity()
        }
    }

    useEffect(() => {
        return loadData();
    }, [loadData]);

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activity/${newActivity.id}`));
        } else {
            editActivity(activity).then(() => history.push(`/activity/${activity.id}`));
        }
    };

    const handleInputChange = (
        event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value});
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    onChange={handleInputChange}
                    name='title'
                    placeholder='Title'
                    value={activity.title}
                />
                <Form.TextArea
                    onChange={handleInputChange}
                    name='description'
                    rows={2}
                    placeholder='Description'
                    value={activity.description}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='category'
                    placeholder='Category'
                    value={activity.category}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='date'
                    type='datetime-local'
                    placeholder='Date'
                    value={activity.date}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='city'
                    placeholder='City'
                    value={activity.city}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='venue'
                    placeholder='Venue'
                    value={activity.venue}
                />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button
                    onClick={() => history.push('/activities')}
                    floated='right'
                    type='button'
                    content='Cancel'
                />
            </Form>
        </Segment>
    );
};


export default observer(ActivityForm);