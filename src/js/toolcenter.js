import React, { PureComponent } from 'react'
import { Button, Icon, Transition } from 'semantic-ui-react'

export default class ToolCenter extends PureComponent {
    state = {
        isMenuOpen: false
    }

    openAddBoard = () => {
        const { toggleAddBoard } = this.props
        this.toggleMenu()
        toggleAddBoard()
    }

    toggleMenu = () => {
        this.setState(state => ({
            isMenuOpen: !state.isMenuOpen
        }))
    }

    openDelete = () => {        
        const { toggleDelete } = this.props
        this.toggleMenu()
        toggleDelete()
    }

    render() {
        const { isMenuOpen } = this.state
        return (            
            <div id="tool_center">
                <Transition visible={isMenuOpen} animation='fade left' duration={900}>
                    <Button icon circular id="showaddboard" size="huge" color="teal" onClick={this.openAddBoard}>
                        <Icon name='plus' size="large"></Icon>
                    </Button>
                </Transition>
                <Transition visible={isMenuOpen} animation='fade left' duration={900}>
                    <Button icon circular id="deletecard" size="huge" color="teal" onClick={this.openDelete}>
                        <Icon name='trash alternate' size="large"></Icon>
                    </Button>
                </Transition>
                <Button icon circular id="opentool" size="huge" color={isMenuOpen ? 'red' : 'blue'} onClick={this.toggleMenu}>
                    <Icon name={isMenuOpen ? 'close' : 'bars'} size="large"></Icon>
                </Button>
            </div>
        )
    }
}

