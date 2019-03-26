import React from 'react'
import { withCardGroup } from './components/cardgroup'
import { Button, Icon, Transition } from 'semantic-ui-react'

const addBoardButton = props => (
    <Transition animation={'fade left'} duration={800} transitionOnMount={true}>
        <Button icon circular id="add_board_btn" size="huge" color="blue" onClick={props.toggleAddBoard}>
            <Icon name='plus' size="large"></Icon>
        </Button>
    </Transition>
)

const deleteButton = props => (
    <Transition animation={'fade left'} duration={800} transitionOnMount={true}>
        <Button icon circular id="delete_btn" size="huge" color="red" onClick={props.toggleDelete}>
            <Icon name='trash alternate' size="large"></Icon>
        </Button>
    </Transition>
)

const checkDeleteButton = props => (
    <React.Fragment>
        <Transition animation={'fade up'} duration={800} transitionOnMount={true}>
            <Button icon circular size="huge" color="red" onClick={props.toggleDelete}>
                <Icon name="arrow right" size="large"></Icon>
            </Button>
        </Transition>
        <Transition animation={'fade up'} duration={800} transitionOnMount={true}>
            <Button icon circular size="huge" color="blue" onClick={props.deleteData}>
                <Icon name="check" size="large"></Icon>
            </Button>
        </Transition>
    </React.Fragment>
)

const AddBoardButton = withCardGroup(addBoardButton)
const DeleteButton = withCardGroup(deleteButton)
const CheckDeleteButton = withCardGroup(checkDeleteButton)

export { AddBoardButton, DeleteButton, CheckDeleteButton }