import * as  React from 'react';
import {Modal, Button} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite';
import {useContext} from "react";
import {RootStoreContext} from "../../stores";

const ModalContainer = () => {
    const rootStore = useContext(RootStoreContext);
    const {modal: {open, body}, closeModal} = rootStore.modalStore;
    return (
        <Modal
            open={open}
            onClose={closeModal}
            size='mini'>
            <Modal.Content>
                {body}
            </Modal.Content>
        </Modal>
    );
};

export default observer(ModalContainer);
