import React, { PureComponent } from 'react'
import ToolCenter from './toolcenter'
import CardGroup from './cardgroup'
import AddBoard from './addboard'
import { withAuthorization } from './components/auth'
import { ToggleContext, toggleAddBoard, toggleDelete } from './components/toggle'

class Home extends PureComponent {
    state = {
        isAddBoardOpen: false,
        isDeleteOpen: false,
    }

    render() {
        console.log('render home')
        const { isAddBoardOpen } = this.state
        return (
            <ToggleContext.Provider
                value={
                    {
                        toggleAddBoard: () => this.setState(toggleAddBoard),
                        toggleDelete: () => this.setState(toggleDelete)
                    }
                }
            >
                <CardGroup />
                <ToolCenter
                    toggleAddBoard={this.toggleAddBoard}
                    toggleDelete={this.toggleDelete}
                    toggleCheckDelete={this.toggleCheckDelete} />
                <AddBoard
                    visible={isAddBoardOpen}
                    toggleAddBoard={this.toggleAddBoard} />
            </ToggleContext.Provider>
        )
    }
}

export default withAuthorization(auth => !!auth)(Home)