import * as React from "react";
import {Fragment, useContext, useEffect} from "react";
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
import {LoginForm} from "../../../features/user";
import {RootStoreContext} from "../stores";
import LoadingComponent from "./LoadingComponent";
import {ModalContainer} from "../common";


const App: React.FC<RouteComponentProps> = ({location}) => {
    const rootStore = useContext(RootStoreContext);
    const {setApploaded, token} = rootStore.commonStore;

    const {getUser} = rootStore.userStore;
    useEffect(() => {
        if (token) {
            getUser().finally(() => setApploaded());
        }else{
            setApploaded()
        }
    }, [getUser, setApploaded, token])
    
    if(!setApploaded) return <LoadingComponent content='Loading app...'/>

    return (
        <Fragment>
            <ModalContainer />
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
                            <Route path='/login' component={LoginForm}/>
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

