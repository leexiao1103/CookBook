import React, { Component } from 'react'
import { Button, Icon, Modal, Header } from 'semantic-ui-react'
import { withToggle } from './components/toggle'

class CheckClose extends Component {
    state = {
        visible: false
    }

    toggleOpen = () => this.setState(state => ({ visible: !state.visible }))

    render() {
        const { toggleFunc } = this.props
        return (
            <Modal
                basic
                onOpen={this.toggleOpen}
                onClose={this.toggleOpen}
                open={this.state.visible}
                size='small'
                trigger={
                    <Button
                        inverted
                        color='red'
                        content='Cancel'
                    />
                }
            >
                <Header icon={<Icon name='exclamation' color='yellow'></Icon>} content='確定取消嗎?' />
                <Modal.Actions>
                    <Button
                        basic
                        inverted
                        icon='remove'
                        color='red'
                        content='No'
                        onClick={this.toggleOpen}
                    >
                    </Button>
                    <Button
                        basic
                        inverted
                        icon='checkmark'
                        color='blue'
                        content='Yes'
                        onClick={toggleFunc}
                    >
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default withToggle(CheckClose)