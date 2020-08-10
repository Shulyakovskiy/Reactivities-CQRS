﻿import * as  React from "react";
import {useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import {Button, Container, Dropdown, Menu, Image} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../src/app/stores";

const NavBar: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, user, logout} = rootStore.userStore;
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/'>
                    <img src="../../src/assets/img/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="activities" as={NavLink} to='/activities'/>
                <Menu.Item name="friends">
                    <Button 
                        as={NavLink} to='/create-activity' 
                        positive content="Create Activity"/>
                </Menu.Item>
                {user &&
                <Menu.Item position='right'>
                    <Image avatar spaced='right' src={user.image || '../../src/assets/img/user.png'} />
                    <Dropdown pointing='top left' text={user.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/username`} text='My profile' icon='user'/>
                            <Dropdown.Item onClick={() => logout()}  text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                }
            </Container>
        </Menu>
    );
}

export default observer(NavBar);