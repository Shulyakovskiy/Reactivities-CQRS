﻿import * as  React from "react";
import {Fragment, useContext} from "react";
import {Button, Container, Header, Image, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {RootStoreContext} from "../../src/app/stores";
import {LoginForm, RegisterForm} from "../user";

const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, user} = rootStore.userStore;
    const {openModal} = rootStore.modalStore;
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='../../src/assets/img/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    Reactivities
                </Header>
                {isLoggedIn && user ? (
                    <Fragment>
                        <Header as='h2' inverted content={`Welcome back ${user.displayName}`}/>
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to activities
                        </Button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Header as='h2' inverted content='Welcome to reactivities'/>
                        <Button onClick={() => openModal(<LoginForm/>)} size='huge' inverted>
                            Login
                        </Button>
                        <Button onClick={() => openModal(<RegisterForm/>)} size='huge' inverted>
                            Register
                        </Button>
                    </Fragment>
                )}
            </Container>
        </Segment>
    );
}

export default HomePage;