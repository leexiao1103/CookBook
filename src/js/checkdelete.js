import React, { PureComponent } from 'react'
import { Button, Icon, Transition } from 'semantic-ui-react'

export default class checkdelete extends PureComponent {
    render() {
        const { isDeleteOpen, toggleDelete, deleteData } = this.props
        return (
            <div id="check_delete">
                <Transition visible={isDeleteOpen} animation='fade left' duration={900}>
                    <Button icon circular size="huge" color="red" onClick={deleteData}>
                        <Icon name="check" size="large"></Icon>
                    </Button>
                </Transition>
                <Transition visible={isDeleteOpen} animation='fade left' duration={900}>
                    <Button icon circular size="huge" color="blue" onClick={toggleDelete}>
                        <Icon name="arrow right" size="large"></Icon>
                    </Button>
                </Transition>
            </div >
        )
    }
}