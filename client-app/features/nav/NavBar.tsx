﻿import * as  React from "react";
import {useContext} from "react";
import {Button, Container, Menu} from "semantic-ui-react";
import {ActivitiesStore} from "../../src/app/stores";
import {observer} from "mobx-react-lite";

const NavBar: React.FC = () => {
    const activitiesStore = useContext(ActivitiesStore);
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src="../../src/assets/img/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="message"/>
                <Menu.Item name="friends">
                    <Button onClick={activitiesStore.openCreateForm} positive content="Create Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

export default observer(NavBar);