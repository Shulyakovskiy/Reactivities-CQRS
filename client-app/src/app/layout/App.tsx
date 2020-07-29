import * as React from "react";
import {Fragment} from "react";
import {Container} from "semantic-ui-react";
import {NavBar} from "../../../features";
import ActivityDashBoard, {ActivityDetails} from "../../../features/activities";
import {observer} from "mobx-react-lite";
import {Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import 'mobx-react-lite/batchingForReactDom'
import HomePage from "../../../features/home/HomePage";
import ActivityForm from "../../../features/activities/form/ActivityForm";


const App: React.FC<RouteComponentProps> = ({location}) => {

    return (
        <Fragment>
            <Route exact path='/' component={HomePage}/>
            <Route exact path={'/(.+)'} render={() => (
                <Fragment>
                    <NavBar/>
                    <Container style={{marginTop: '7em'}}>
                        <Switch>
                            <Route exact path='/activities' component={ActivityDashBoard}/>
                            <Route path='/activity/:id' component={ActivityDetails}/>
                            <Route key={location.key} path={['/createActivity', '/manage/:id']}
                                   component={ActivityForm}/>
                        </Switch>
                    </Container>
                </Fragment>
            )}/>

        </Fragment>

    );
};

// export default withRouter(hot(module)(App));
export default withRouter(observer(App));

