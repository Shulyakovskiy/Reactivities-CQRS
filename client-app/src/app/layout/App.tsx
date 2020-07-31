import * as React from "react";
import {Fragment} from "react";
import {Container} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import 'mobx-react-lite/batchingForReactDom'
import {HomePage} from "../../../features/home";
import {ActivityForm} from "../../../features/activities/form";
import {NavBar} from "../../../features/nav";
import ActivityDashBoard from "../../../features/activities/dashboard/ActivityDashboard";
import {ActivityDetails} from "../../../features/activities/details";
import NotFound from "./NotFound";
import {ToastContainer} from "react-toastify";


const App: React.FC<RouteComponentProps> = ({location}) => {

    return (
        <Fragment>
            <ToastContainer position='bottom-right'/>
            <Route exact path='/' component={HomePage}/>
            <Route exact path={'/(.+)'} render={() => (
                <Fragment>
                    <NavBar/>
                    <Container style={{marginTop: '7em'}}>
                        <Switch>
                            <Route exact path='/activities' component={ActivityDashBoard}/>
                            <Route path='/activity' component={ActivityDetails}/>
                            <Route key={location.key} path={['/create-activity', '/manage']}
                                   component={ActivityForm}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Container>
                </Fragment>
            )}/>

        </Fragment>

    );
};

// export default withRouter(hot(module)(App));
export default withRouter(observer(App));

