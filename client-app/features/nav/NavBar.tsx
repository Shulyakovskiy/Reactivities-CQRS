﻿import * as  React from "react";
import {NavLink} from "react-router-dom";
import {Button, Container, Menu} from "semantic-ui-react";
import {observer} from "mobx-react-lite";

const NavBar: React.FC = () => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/'>
                    <img src="../../src/assets/img/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="activities" as={NavLink} to='/activities'/>
                {/*<Menu.Item name="message"/>*/}
                <Menu.Item name="friends">
                    <Button 
                        as={NavLink} to='/create-activity' 
                        positive content="Create Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

export default observer(NavBar);