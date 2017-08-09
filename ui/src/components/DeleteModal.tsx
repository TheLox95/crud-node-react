import * as React from 'react';
const delteIcon = require('../trashcan.svg');
import { Modal, Icon, Button } from 'semantic-ui-react';
import axios from 'axios';

interface ModalProps {
    productId: number;
    handler: Function;
}
export default class DeleteModal extends React.Component<ModalProps, { modalOpen: boolean, deleteSuccess: boolean }> {

    constructor(props: ModalProps) {
        super(props);

        this.state = { modalOpen: false, deleteSuccess: false };
    }

    handleOpen() {
        this.setState({ modalOpen: true });
    }

    handleClose() {
        this.setState({ modalOpen: false });
    }

    async handleDelete() {
        try {
            const productUpdateRes = await axios.delete(`http://127.0.0.1:4000/products/delete`, {
                data: {
                    id: this.props.productId
                }
            });

            if (productUpdateRes.status === 200) {
                this.setState({ deleteSuccess: true });
                this.setState({ modalOpen: false });
                this.props.handler(this.props.productId);
            }

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Modal
                trigger={<img src={delteIcon} onClick={() => this.handleOpen()} className="icon" alt="Delete" />}
                basic={true}
                size="small"
                open={this.state.modalOpen}
            >
                <Modal.Header>Edit</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this product?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" inverted={true} onClick={() => this.handleClose()}>
                        <Icon name="remove" /> No
      </Button>
                    <Button basic={true} color="green" inverted={true} onClick={() => this.handleDelete()}>
                        <Icon name="checkmark" /> Yes
      </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}