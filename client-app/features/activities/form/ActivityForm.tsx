import * as  React from "react";
import {useContext, useEffect, useState} from "react";
import {Button, Form, Grid, Segment} from "semantic-ui-react";
import {v4 as uuid} from 'uuid';
import {ActivityFormValues} from "../../../src/app/models";
import {ActivitiesStore} from "../../../src/app/stores";
import {observer} from "mobx-react-lite";
import {RouteComponentProps, useLocation} from "react-router-dom";
import {Field, Form as FinalForm} from "react-final-form";
import {SelectInput, TextAreaInput, TextInput} from "../../../src/app/common";
import {category} from "../../../src/app/common/options/categoryOptions";
import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate';
import {combineDateAndTime} from "../../../src/app/common/util/util";

const validate = combineValidators({
    title: isRequired({ message: 'The event title is required' }),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({
            message: 'Description needs to be at least 5 characters'
        })
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
});

interface DetailParam {
    id: string;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ActivityForm: React.FC<RouteComponentProps<DetailParam>> = ({history}) => {
    const activityStore = useContext(ActivitiesStore);
    const {createActivity, editActivity, submitting,loadActivity} = activityStore
    let query = useQuery();

    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false);
    const id = query.get("id");

    useEffect(() => {
        if (id) {
            setLoading(true);
            loadActivity(id)
                .then(activity => setActivity(new ActivityFormValues(activity)))
                .finally(() => setLoading(false));
        }
    }, [
        loadActivity,
        id]);

    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = '2020-01-01T01:01'; //dateAndTime;
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then();
        } else {
            editActivity(activity).then();
        }
    };

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field
                                    name='title'
                                    placeholder='Title'
                                    value={activity.title}
                                    component={TextInput}
                                />
                                <Field
                                    name='description'
                                    placeholder='Description'
                                    rows={3}
                                    value={activity.description}
                                    component={TextAreaInput}
                                />
                                <Field
                                    component={SelectInput}
                                    options={category}
                                    name='category'
                                    placeholder='Category'
                                    value={activity.category}
                                />
                                <Form.Input
                                    name='date'
                                    readOnly
                                    type='datetime-local'
                                    placeholder='Date'
                                    value='2020-01-01T01:01'
                                />
                                <Field
                                    component={TextInput}
                                    name='city'
                                    placeholder='City'
                                    value={activity.city}
                                />
                                <Field
                                    component={TextInput}
                                    name='venue'
                                    placeholder='Venue'
                                    value={activity.venue}
                                />
                                <Button
                                    loading={submitting}
                                    disabled={loading || invalid || pristine}
                                    floated='right'
                                    positive
                                    type='submit'
                                    content='Submit'
                                />
                                <Button
                                    onClick={
                                        activity.id
                                            ? () => history.push(`/activities/${activity.id}`)
                                            : () => history.push('/activities')
                                    }
                                    disabled={loading}
                                    floated='right'
                                    type='button'
                                    content='Cancel'
                                />
                            </Form>
                        )}
                    />
                </Segment>
            </Grid.Column>
        </Grid>
    );
};


export default observer(ActivityForm);