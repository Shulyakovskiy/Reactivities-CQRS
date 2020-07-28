import * as React from "react";
import {Fragment, useContext, useEffect} from "react";
import {Container} from "semantic-ui-react";
import {NavBar} from "../../../features";
import LoadingComponent from "./LoadingComponent";
import ActivityDashBoard from "../../../features/activities";
import {ActivitiesStore} from "../stores";
import {observer} from "mobx-react-lite";
import 'mobx-react-lite/batchingForReactDom'


const App = () => {
    const activityStore = useContext(ActivitiesStore);
    
    useEffect(() => {
        activityStore.loadActivities().then();
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities'/>

    return (
        <Fragment>
            <NavBar/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashBoard/>
            </Container>
        </Fragment>
    );
};

// export default hot(module)(App);
export default observer(App);

